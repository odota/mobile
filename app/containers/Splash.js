import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    Image,
    StatusBar
} from 'react-native';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as homeActions from '../actions/home_act';
import * as favouritesActions from '../actions/favourites_act';
import * as settingsActions from '../actions/settings_act';
import * as navigationActions from '../actions/navigation_act';
import { Actions } from 'react-native-router-flux';

import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';
import Metrics from '../themes/Metrics';

export const mapStateToProps = state => ({

});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...homeActions, ...favouritesActions, ...settingsActions, ...navigationActions}, dispatch)
});

import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';

class Splash extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        GoogleAnalyticsSettings.setDispatchInterval(30);
        let tracker = new GoogleAnalyticsTracker('UA-107430194-1');
        this.props.actions.setGATracker(tracker);
        AsyncStorage.getItem("theme").then((value) => {
            this.props.actions.changeTheme(value);
        })
        .catch((error) => {
            this.props.actions.changeTheme(1);
        })

        AsyncStorage.getItem("favourites").then((value) => {
            if(value) {
                this.props.actions.initializeFavourites(value);
            }
        })
        .catch((error) => {
            console.log(error);
        })

        AsyncStorage.getItem("homeProfile").then((value) => {
            if(value) {
                parsedValue = JSON.parse(value);
                if(!(Object.keys(parsedValue).length === 0 && parsedValue.constructor === Object)) {
                    this.setState({'profileExist': true});
                }
                this.props.actions.pushContextIdHome(parsedValue);
                this.props.actions.changeContextId(parsedValue);
                this.props.actions.setHomeProfile(parsedValue);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    componentDidMount() {
        setTimeout(() => {
            Actions.navDrawer();
        }, 2000);
    }

    render() {
        return (
            <View style = {styles.contentContainer}>
                <StatusBar
                    backgroundColor = {this.props.mod}
                    barStyle = "dark-content"
                    />
                <Image source={require('../assets/splash.png')} style = {{flex: 1, width: Metrics.screenWidth, height: Metrics.screenHeight }}/>
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
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
