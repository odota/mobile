import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as playerOverviewActions from '../actions/player_overview_act';
import * as playerMatchesActions from '../actions/player_matches_act';
import * as navigationActions from '../actions/navigation_act';
import { Actions } from 'react-native-router-flux';

import _ from 'lodash';

import ProfileCard from '../components/ProfileCard';
import HeroesCard from '../components/HeroesCard';
import MatchesCard from '../components/MatchesCard';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    matchDetails: state.matchDetailsState.matchDetails,
    isLoadingMatchDetails: state.matchDetailsState.isLoadingMatchDetails,
    isEmptyMatchDetails: state.matchDetailsState.isEmptyMatchDetails,
    isLoadingOverview: state.playerOverviewState.isLoadingOverview,
    isEmptyOverview: state.playerOverviewState.isEmptyOverview,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    legend: state.settingsState.legend
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({}, dispatch)
});

class MatchOverview extends Component {

    constructor(props) {
        super(props);
        this.radiantDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.direDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            '0': false,
            '1': false,
            '2': false,
            '3': false,
            '4': false,
            '5': false,
            '6': false,
            '7': false,
            '8': false,
            '9': false,
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        this.players = this.props.matchDetails.players;
    }

    render() {
        var content;
        if(this.props.isLoadingMatchDetails) {
            content = (
                <View style = {styles.contentContainer}>
                    <ActivityIndicator size="large" color = {this.props.legend}/>
                </View>
            )
        } else if(this.props.isEmptyMatchDetails) {
            content = (
                <View style = {styles.contentContainer}>
                    <Text style = {styles.noDataText}>No data found</Text>
                </View>
            )
        } else {
            content = (
                <View />
            )
        }
        return(
            <View style = {styles.container}>
                {content}
            </View>
        )
    }

}

const baseStyles = _.extend(base.general, {

});
const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(MatchOverview);
