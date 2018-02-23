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

import _ from 'lodash';

import ProfileCard from '../components/ProfileCard';

import base from '../themes/BaseStyles';

export const mapStateToProps = state => ({
    overview: state.playerOverviewState.overview,
    isLoadingOverview: state.playerOverviewState.isLoadingOverview,
    isEmptyOverview: state.playerOverviewState.isEmptyOverview,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    wl: state.playerOverviewState.wl,
    legend: state.settingsState.legend,
    homeTab: state.navigationState.homeTab,
    tracker: state.navigationState.tracker
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...playerOverviewActions, ...playerMatchesActions, ...navigationActions}, dispatch)
});

class PlayerOverview extends Component {

    constructor(props) {
        super(props);
        this.matchesDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    componentDidMount() {
        this.props.tracker.trackScreenView('Player Overview');
    }

    componentWillMount() {
        if(!this.props.isLoadingOverview) {
            this.props.actions.fetchOverview(this.props.contextId);
            this.props.actions.fetchWl(this.props.contextId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.homeTab) {
            this.props.actions.consumeHomeTab();
            this.props.actions.fetchOverview(nextProps.contextId);
            this.props.actions.fetchWl(nextProps.contextId);
        }
    }

    render() {
        var content;
        if(this.props.isLoadingOverview) {
            content = (
                <View style = {styles.contentContainer}>
                    <ActivityIndicator size="large" color = {this.props.legend}/>
                </View>
            )
        } else if(this.props.isEmptyOverview) {
            content = (
                <View style = {styles.contentContainer}>
                    <Text style = {styles.noDataText}>No data found</Text>
                </View>
            )
        } else {
            content = (
                <ProfileCard info = {this.props.overview} wl = {this.props.wl}/>
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
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(PlayerOverview);
