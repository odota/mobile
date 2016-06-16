import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import PlayerOverview from './PlayerOverview';
import MatchesPage from './MatchesPage';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

class PlayerProfile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <ScrollableTabView tabBarPosition = "bottom" tabBarTextStyle = {styles.tabBarText} tabBarBackgroundColor = {Colors.skyDolchAlpha} tabBarActiveTextColor = {Colors.skyDolchLegend} tabBarInactiveTextColor = {Colors.skyDolchSecondLegend} tabBarUnderlineColor = {Colors.skyDolchLegend}>
                <PlayerOverview tabLabel = "Overview" />
                <MatchesPage tabLabel = "Matches" />
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

export default PlayerProfile
