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
    secondLegend: state.settingsState.secondLegend
});

class PlayerProfile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <ScrollableTabView tabBarPosition = "bottom" tabBarTextStyle = {styles.tabBarText} tabBarBackgroundColor = {this.props.alpha} tabBarActiveTextColor = {this.props.legend} tabBarInactiveTextColor = {this.props.secondLegend} tabBarUnderlineColor = {this.props.legend}>
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
        fontSize: 14
    }
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps)(PlayerProfile);
