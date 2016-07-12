import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    AsyncStorage,
    Platform,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as homeActions from '../actions/home_act';
import * as navigationActions from '../actions/navigation_act';
import { Actions } from 'react-native-router-flux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ProgressBar from 'ProgressBarAndroid';
import Spinner from 'react-native-spinkit';
import SGListView from 'react-native-sglistview';

import PlayerSearch from './PlayerSearch';
import PlayerProfile from './PlayerProfile';

import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    legendHex: state.settingsState.legendHex,
    profile: state.homeState.profile
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...homeActions, ...navigationActions}, dispatch)
});

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'profileExist': false
        }
    }

    componentWillMount() {
        // Move this to splash
        AsyncStorage.getItem("homeProfile").then((value) => {
            if(value) {
                parsedValue = JSON.parse(value);
                if(!(Object.keys(parsedValue).length === 0 && parsedValue.constructor === Object)) {
                    this.setState({'profileExist': true});
                }
                this.props.actions.changeContextId(parsedValue.account_id);
                this.props.actions.setHomeProfile(parsedValue);
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .done();
    }

    render() {
        var content;
        var profile = this.props.profile;
        if(!(Object.keys(profile).length === 0 && profile.constructor === Object)) {
            containerStyle = styles.localContainer;
            content = (
                <PlayerProfile />
            )

        } else {
            containerStyle = styles.container;
            content = (
                <View style = {styles.contentContainer}>
                    <Text style = {styles.noDataText}>
                        You have not set any profile as Home yet.
                    </Text>
                    <Text style = {styles.noDataText}>
                        You can search your profile below using Steam ID or Username
                    </Text>
                    <PlayerSearch />
                </View>
            )
        }
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
        justifyContent: 'center',
        marginTop: 10
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
