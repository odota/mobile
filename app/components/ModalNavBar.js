import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import { connect } from 'react-redux';

import base from '../themes/BaseStyles';
import metrics from '../themes/Metrics';

import { Actions } from 'react-native-router-flux';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend
});

class ModalNavBar extends Component {

    constructor(props) {
        super(props);
        this.backPressed = this.backPressed.bind(this);
    }

    backPressed() {
        Actions.pop();
    }

    render() {

        let title = <Text style = {[styles.title, {color: this.props.secondLegend}]}>{this.props.title}</Text>

        var leftElements = (
            <View style = {styles.navItemView}>
                <TouchableOpacity onPress = {() => {this.backPressed()}}>
                    <View style = {styles.leftNavButtonView}>
                        <FontAwesome name = "times" size = {26} allowFontScaling = {false} color = {this.props.legend}/>
                    </View>
                </TouchableOpacity>
                {title}
            </View>
        )

        var rightElements = (
            <View />
        )

        return (
            <View>
                <StatusBar
                    backgroundColor = {this.props.mod}
                    barStyle = "light-content"
                    />
                <View style={{ height: metrics.statusBarHeight, backgroundColor: this.props.mod }} />
                <View style={[styles.navBarContainer, { height: metrics.navBarHeight, backgroundColor: this.props.mod, flexDirection: 'row' }]}>
                    <View style={styles.leftItemView}>
                        {leftElements}
                    </View>
                    <View style={styles.rightItemView}>
                        {rightElements}
                    </View>
                </View>
            </View>
        )
    }

}

const baseStyles = _.extend(base.navbar, {
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps)(ModalNavBar);
