import React, { Component } from 'react';
import {
    View,
    ScrollView,
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
    matches: state.playerMatchesState.matches,
    isLoadingMatches: state.playerMatchesState.isLoadingMatches,
    isEmptyMatches: state.playerMatchesState.isEmptyMatches,
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
    }

    componentDidMount() {
        this.props.tracker.trackScreenView('Player Overview');
    }

    componentWillMount() {
        if (!this.props.isLoadingOverview) {
            this.props.actions.fetchOverview(this.props.contextId);
            this.props.actions.fetchWl(this.props.contextId);
            this.props.actions.fetchMatches(this.props.contextId, 20);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.homeTab) {
            this.props.actions.consumeHomeTab();
            this.props.actions.fetchOverview(nextProps.contextId);
            this.props.actions.fetchWl(nextProps.contextId);
            this.props.actions.fetchMatches(this.props.contextId, 20);
        }
    }

    sortMatches(sortField, sortDirection) {
        this.props.actions.sortMatches(sortField, sortDirection);
    }

    render() {
        var content;
        if (this.props.isLoadingOverview || this.props.isLoadingMatches) {
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
                <ScrollView>
                    <ProfileCard info={this.props.overview} wl={this.props.wl} />
                    <MatchesCard title={"RECENT MATCHES"} matches={this.props.matches} sortMatches={this.sortMatches} default={false} />
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
