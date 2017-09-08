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
                    <View style = {{backgroundColor: this.props.mod, borderRadius: 5, borderWidth: 1, borderColor: this.props.mod, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 9, marginVertical: 5}}>
                        <Text style = {[styles.noDataText, {color: this.props.secondLegend}]}>
                            You have not set any profile as Home yet.
                        </Text>
                        <Text style = {[styles.noDataText, {color: this.props.secondLegend}]}>
                            You can search your profile below using Steam ID or Username
                        </Text>
                    </View>
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
