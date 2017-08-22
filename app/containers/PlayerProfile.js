import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as playerOverviewActions from '../actions/player_overview_act';
import * as playerMatchesActions from '../actions/player_matches_act';
import * as navigationActions from '../actions/navigation_act';
import * as peersActions from '../actions/peers_act';
import * as playerHeroesActions from '../actions/player_heroes_act';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import PlayerOverview from './PlayerOverview';
import MatchesPage from './MatchesPage';
import HeroesPage from './HeroesPage';
import Peers from './PeersPage';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    isLoadingOverview: state.playerOverviewState.isLoadingOverview,
    isLoadingPeers: state.peersState.isLoadingPeers,
    isLoadingMatches: state.peersState.isLoadingMatches,
    isLoadingHeroes: state.playerHeroesState.isLoadingHeroes,
    contextId: state.navigationState.contextId
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...playerOverviewActions, ...playerMatchesActions, ...navigationActions, ...playerHeroesActions, ...peersActions}, dispatch)
});

class PlayerProfile extends Component {

    constructor(props) {
        super(props)
        console.log(this.props);
    }

    handleChangeTab({i, ref, from}) {
        if(this.props) {
            if (i == 0 && !this.props.isLoadingOverview) {
                this.props.actions.fetchOverview(this.props.contextId);
                this.props.actions.fetchWl(this.props.contextId);
            } else if (i == 1 && !this.props.isLoadingMatches) {
                this.props.actions.fetchMatches(this.props.contextId);
            } else if (i == 2 && !this.props.isLoadingHeroes) {
                this.props.actions.fetchHeroes(this.props.contextId, 30);
            } else if (i == 3 && !this.props.isLoadingPeers) {
                this.props.actions.fetchPeers(this.props.contextId);
            }
        }

    }

    render() {
        return(
            <ScrollableTabView tabBarPosition = "bottom" tabBarTextStyle = {styles.tabBarText} tabBarBackgroundColor = {this.props.alpha} tabBarActiveTextColor = {this.props.legend} tabBarInactiveTextColor = {this.props.secondLegend} tabBarUnderlineStyle = {[styles.tabBarUnderlineStyle, {backgroundColor: this.props.legend}]}
                locked = {true} onChangeTab={this.handleChangeTab.bind(this)}>
                <PlayerOverview tabLabel = "Overview" />
                <MatchesPage tabLabel = "Matches" />
                <HeroesPage tabLabel = "Heroes" />
                <Peers tabLabel = "Peers" />
            </ScrollableTabView>
        )
    }

}

const baseStyles = _.extend(base.general, {
    tabBarText: {
        fontFamily: Fonts.base,
        fontSize: 16,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    tabBarUnderlineStyle: {

    }
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(PlayerProfile);
