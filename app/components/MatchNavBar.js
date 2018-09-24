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
import { bindActionCreators } from 'redux';

import * as navigationActions from '../actions/navigation_act';

import base from '../themes/BaseStyles';
import metrics from '../themes/Metrics';

import { Actions } from 'react-native-router-flux';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    contextIdStackHome: state.navigationState.contextIdStackHome,
    contextIdStackFavourite: state.navigationState.contextIdStackFavourite,
    contextIdStackSearch: state.navigationState.contextIdStackSearch,
    parent: state.navigationState.parent
});

export const mapDispatchToProps = (dispatch) => ({
    navigationActions: bindActionCreators(navigationActions, dispatch)
});

class MatchNavBar extends Component {

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
                        <FontAwesome name = "chevron-left" size = {20} allowFontScaling = {false} color = {this.props.legend}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MatchNavBar);
