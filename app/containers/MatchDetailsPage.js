import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as matchDetailsActions from '../actions/match_details_act';
import { Actions } from 'react-native-router-flux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import _ from 'lodash';

import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import MatchOverview from './MatchOverview';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    matchDetails: state.matchDetailsState.matchDetails,
    isLoadingMatchDetails: state.matchDetailsState.isLoadingMatchDetails,
    isEmptyMatchDetails: state.matchDetailsState.isEmptyMatchDetails,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    mod: state.settingsState.mod,
    alpha: state.settingsState.alpha,
    parent: state.navigationState.parent
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(matchDetailsActions, dispatch)
});

class MatchDetailsPage extends Component {

    componentWillMount() {
        if(!this.props.isLoadingMatchDetails) {
            this.props.actions.fetchMatchDetails(this.props.data)
        }

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.matchDetails) {
            this.content = nextProps.matchDetails;
        }
    }

    render() {
        var content = (<View />);
        if(this.props.isLoadingMatchDetails) {
            content = (
                <View style = {styles.contentContainer}>
                    <ActivityIndicator size="large" color = {this.props.legend}/>
                </View>
            );
        } else if (this.props.isEmptyMatchDetails) {
            content = (
                <View style = {styles.contentContainer}>
                    <Text style = {styles.noDataText}>No data found</Text>
                </View>
            );
        } else {
            content = (
                <ScrollableTabView tabBarPosition = "bottom" tabBarTextStyle = {styles.tabBarText}
                    tabBarBackgroundColor = {this.props.alpha} tabBarActiveTextColor = {this.props.legend} tabBarInactiveTextColor = {this.props.secondLegend}
                    tabBarUnderlineStyle = {[styles.tabBarUnderlineStyle, {backgroundColor: this.props.legend}]}
                    renderTabBar = {() => <ScrollableTabBar />}locked = {true} >
                    <MatchOverview tabLabel = "Overview" />
                    <MatchOverview tabLabel = "Benchmarks" />
                    <MatchOverview tabLabel = "Performances" />
                    <MatchOverview tabLabel = "Laning" />
                </ScrollableTabView>
            );
        }
        return (
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
        justifyContent: 'center',
        marginTop: 10
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(MatchDetailsPage);
