import React, { Component } from 'react';
import { Platform, Text, TouchableOpacity, View, WebView, StyleSheet } from 'react-native';

import heatmapUtils from '../utils/heatmapUtils';
import base from '../themes/BaseStyles';

import { connect } from 'react-redux';

import _ from 'lodash';

class Heatmap extends Component {
    state = {}

    componentDidMount() {
        setTimeout(
            () => {
                this.refs.heatmap.measure((ox, oy, width, height) => {
                    const radius = Math.round(width * 0.05);
                    this.handleShuffle(width, height, radius);
                    this.setState({width, height, radius});
                });
            }
        );
    }

    generatePoints(width, height) {
        const points = [];
        for(const i = 0; i < 25; i++) {
            points.push({x: randomize(width), y: randomize(height) });
        }
        return points;
    }

    handleShuffle(width, height, radius) {
        setTimeout(() => {
            const points = this.generatePoints(width, height);
            const processedPoints = heatmapUtils.processPoints({x: 0, y: height}, {x:0, y:0}, {x: width, y: 0}, points, width, height, radius);
            this.setState({ processedPoints });
        });
        this.setState({processedPoints: null});
    }

    render() {
        let webview = null;
        console.log(this.state.processedPoints);
        console.log(this.props.background);
        if(this.state.processedPoints) {
            const uri = Platform.OS === 'ios' ? 'heatmap.html' : 'file:///android_asset/heatmap.html';
            const maxValue = Math.max(...this.state.processedPoints.map((p) => p.value));
            const script = heatmapInputGenerator(this.state.processedPoints, this.state.radius, maxValue);
            webview = <WebView
                source = {{uri: uri}}
                scrollEnabled = {false}
                injectedJavaScript = {script}
                javaScriptEnabled
                style = {{width: 300, height: 300, backgroundColor: this.props.background}}
                onError = {() => {console.log("FAILED");}}
                onLoad = {() => {console.log("LOAD");}}
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

const heatmapInputGenerator = (points, radius, max) => {
    return `
    var heatmapInstance = h337.create({
        container: document.querySelector('.heatmap'),
        radius: ${radius}
    });
    heatmapInstance.setData({
        max: ${max},
        data: ${JSON.stringify(points)}
    });
  `;
};

const randomize = (max) => parseInt(Math.random() * (max + 1));

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
