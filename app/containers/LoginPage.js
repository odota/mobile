import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage,
    WebView
} from 'react-native';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as homeActions from '../actions/home_act';
import * as navigationActions from '../actions/navigation_act';

import { Actions } from 'react-native-router-flux';

import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Metrics from '../themes/Metrics';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    legendHex: state.settingsState.legendHex,
    tracker: state.navigationState.tracker
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...homeActions, ...navigationActions}, dispatch)
});

const opendotaURL = 'https://api.opendota.com/login/';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'redirecting': false
        }
    }

    componentDidMount() {
        this.props.tracker.trackScreenView('Login');
    }

    componentWillMount() {
    }

    onNavigationStateChange(navState) {
        var splitted = navState.url.split("/");
        if(splitted[2] == "www.opendota.com" && !this.state.redirecting) {
            this.props.tracker.trackEvent('Login', 'Success');
            this.setState({redirecting: true});
            this.props.actions.pushContextIdHome(splitted[4]);
            this.props.actions.changeContextId(splitted[4]);
            this.props.actions.setHomeProfile(splitted[4]);
            setTimeout(() => {
                var homeProfileString = splitted[4];
                AsyncStorage.setItem("homeProfile", homeProfileString);
                Actions.home();
            }, 1000);
        }
    }

    render() {
        let containerStyle = styles.container;
        let content = (
            <View style = {styles.contentContainer}>
                <WebView
                    source = {{uri: opendotaURL}}
                    scrollEnabled = {true}
                    javaScriptEnabled
                    onNavigationStateChange = {this.onNavigationStateChange.bind(this)}
                    scalesPageToFit = {true}
                    startInLoadingState = {true}
                    style = {{flex: 1, width: Metrics.screenWidth, height: Metrics.screenHeight}}
                />
            </View>
        )
        return (
            <View style = {containerStyle}>
                {content}
            </View>
        )
    }
}

const baseStyles = _.extend(base.general, {
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    localContainer: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: Colors.mainBackground
    }
});

const styles = StyleSheet.create(baseStyles);
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
