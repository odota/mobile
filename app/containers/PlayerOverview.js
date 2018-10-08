import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    ListView,
    ActivityIndicator,
    RefreshControl
} from 'react-native';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as playerOverviewActions from '../actions/player_overview_act';
import * as playerMatchesActions from '../actions/player_matches_act';
import * as navigationActions from '../actions/navigation_act';

import _ from 'lodash';

import MatchesCard from '../components/MatchesCard';
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
    tracker: state.navigationState.tracker,
    recentMatches: state.playerMatchesState.recentMatches,
    isLoadingRecentMatches: state.playerMatchesState.isLoadingRecentMatches,
    isEmptyRecentMatches: state.playerMatchesState.isEmptyRecentMatches,
    background: state.settingsState.background
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...playerOverviewActions, ...playerMatchesActions, ...navigationActions }, dispatch)
});

class PlayerOverview extends Component {

    constructor(props) {
        super(props);
        this.matchesDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.sortMatches = this.sortMatches.bind(this);
        this.initiateOverview = this.initiateOverview.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        this.props.tracker.trackScreenView('Player Overview');
        this.initiateOverview();
    }

    onRefresh() {
        this.initiateOverview();
    }

    initiateOverview() {
        if (!this.props.isLoadingOverview) {
            this.props.actions.fetchOverview(this.props.contextId);
            this.props.actions.fetchWl(this.props.contextId);
            this.props.actions.fetchRecentMatches(this.props.contextId, 20);
        }
    }

    sortMatches(sortField, sortDirection) {
        this.props.actions.sortMatches(sortField, sortDirection);
    }

    render() {
        var content;
        if (this.props.isLoadingOverview || this.props.isLoadingRecentMatches) {
            content = (
                <View style={styles.contentContainer}>
                    <ActivityIndicator size="large" color={this.props.legend} />
                </View>
            )
        } else if (this.props.isEmptyOverview) {
            content = (
                <View style={styles.contentContainer}>
                    <Text style={styles.noDataText}>No data found</Text>
                </View>
            )
        } else {
            content = (
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.props.isLoadingOverview}
                        onRefresh={this.onRefresh}
                        tintColor={this.props.legendHex}
                        title='Refreshing'
                        titleColor={this.props.legendHex}
                        colors={[this.props.legendHex]}
                        progressBackgroundColor="#ffffffff"
                    />}>
                    <ProfileCard info={this.props.overview} wl={this.props.wl} />
                    <MatchesCard title={"RECENT MATCHES"} matches={this.props.recentMatches} sortMatches={this.sortMatches} default={false} />
                </ScrollView>
            )
        }
        return (
            <View style={[styles.container, { backgroundColor: this.props.background }]}>
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
