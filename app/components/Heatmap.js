import React, { Component } from 'react';
import { Platform, Text, TouchableOpacity, View, WebView, StyleSheet } from 'react-native';

import heatmapUtils from '../utils/heatmapUtils';
import base from '../themes/BaseStyles';

import { connect } from 'react-redux';

import _ from 'lodash';

const heatmapInputGenerator = (adjustedData, width) => {
    return `
        var heatmapInstance = h337.create({
            container: document.querySelector('.heatmap'),
            radius: ${15 * (width / 600)}
        });
        heatmapInstance.setData(${adjustedData})
    `;
}

class Heatmap extends Component {
    scaleAndExtrema(points, scalef, max, shift) {
        const newPoints = points.map(p => ({
            x: Math.floor(p.x * scalef),
            y: Math.floor(p.y * scalef),
            value: p.value + (shift || 0),
        }));
        const vals = points.map(p => p.value);
        const localMax = Math.max.apply(null, vals);
        return {
            min: 0,
            max: max || localMax,
            data: newPoints,
        }
    }

    render() {
        let webview = null;
        if(this.props.points) {
            uri = Platform.OS === 'ios' ? 'heatmap.html' : 'file:///android_asset/heatmap.html';
            const width = 285;
            const adjustedData = this.scaleAndExtrema(this.props.points, width / 127, null, 25)
            script = heatmapInputGenerator(JSON.stringify(adjustedData), width);
            webview = <WebView
                source = {{uri: uri}}
                scrollEnabled = {false}
                injectedJavaScript = {script}
                javaScriptEnabled
                style = {{width: 300, height: 300, backgroundColor: this.props.background}}
            />;
        }

        return (
            <View style = {styles.webviewContainer} >
                <View style = {styles.webview} ref = 'heatmap'>
                    {webview}
                </View>
            </View>
        );
    }
}

const baseStyles = _.extend(base.general, {
    button: {
       backgroundColor: 'blue',
       borderRadius: 10,
       marginTop: 25,
       padding: 10
     },
     webviewContainer: {
       alignItems: 'center',
       flex: 1,
       justifyContent: 'center'
     },
     text: {
       color: 'black',
       fontWeight: 'bold',
       letterSpacing: 3
     },
     webview: {
     }
});

const styles = StyleSheet.create(baseStyles);

export default connect()(Heatmap);
