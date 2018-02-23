import React, { Component } from 'react';
import { Platform, View, WebView, StyleSheet } from 'react-native';
import patch from 'dotaconstants/build/patch.json';

import base from '../themes/BaseStyles';

import { connect } from 'react-redux';

import _ from 'lodash';

const heatmapInputGenerator = (data, map) => {
    return `
        function scaleAndExtrema(points, scalef, max, shift) {
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
        document.querySelector('.map').src = 'maps/${map}';
        setTimeout(() => {
            var s = document.querySelector('.map').getBoundingClientRect();
            var w = s.width;
            var heatmapInstance = h337.create({
                container: document.querySelector('.heatmap'),
                radius: 15 * (w / 600)
            });

            heatmapInstance.setData(scaleAndExtrema(${data},w / 127, null, 25));
        }, 100);
    `;
}

const dotaMaps = [
    { patchName: '7.07', mapImage: 'detailed_707.png' },
    { patchName: '7.00', mapImage: 'detailed_700.png' },
    { patchName: '6.86', mapImage: 'detailed_686.png' },
    { patchName: '6.82', mapImage: 'detailed_682.png' },
    { patchName: '6.70', mapImage: 'detailed_pre682.png' },
];

const patchDate = {};
patch.forEach((patchElement) => {
    patchDate[patchElement.name] = new Date(patchElement.date).getTime() / 1000;
});

class Heatmap extends Component {
    getMap(startTime) {
        if (startTime == null) {
            return dotaMaps[0].mapImage;
        }
        for (let i = 0; i < dotaMaps.length; i += 1) {
            if (startTime >= patchDate[dotaMaps[i].patchName]) {
                return dotaMaps[i].mapImage;
            }
        }
        return dotaMaps[0].mapImage;
    }

    render() {
        let webview = null;
        let heatmap = (el) => this.heatmap = el;
        if(this.props.points) {
            let uri = Platform.OS === 'ios' ? 'heatmap.html' : 'file:///android_asset/heatmap.html';
            let script = heatmapInputGenerator(JSON.stringify(this.props.points), this.getMap(this.props.startTime));
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
                <View style = {styles.webview} ref = {heatmap}>
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
