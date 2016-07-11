import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    TouchableOpacity,
    Platform
} from 'react-native';

import ProgressBar from 'ProgressBarAndroid';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playerMatchesActions from '../actions/player_matches_act';
import { Actions } from 'react-native-router-flux';

import MatchesCard from '../components/MatchesCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Spinner from 'react-native-spinkit';
import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    matches: state.playerMatchesState.matches,
    isLoadingMatches: state.playerMatchesState.isLoadingMatches,
    isEmptyMatches: state.playerMatchesState.isEmptyMatches,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    mod: state.settingsState.mod,
    alpha: state.settingsState.alpha,
    parent: state.navigationState.parent
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(playerMatchesActions, dispatch)
});

class MatchesPage extends Component {

    constructor(props) {
        super(props);
        this.onSearchPressed = this.onSearchPressed.bind(this);
    }

    onSearchPressed() {
        if(this.props.parent == "Favourites") {
            Actions.matchesSearchFavourite();
        } else if (this.props.parent == "Search") {
            Actions.matchesSearchSearch();
        }
    }

    componentWillMount() {
        var projects = ['game_mode'];
        this.props.actions.fetchMatches(this.props.contextId, 30, projects);
    }

    render() {
        var content;
        var spinner;
        if(Platform.OS == 'ios') {
            spinner = <Spinner isVisible = {true} size = {100} type = 'Pulse' color = {this.props.legendHex} />
        } else {
            spinner = <ProgressBar styleAttr = "Large" color = {this.props.legend}/>
        }
        if(this.props.isLoadingMatches) {
            content = (
                <View style = {styles.contentContainer}>
                    {spinner}
                </View>
            )
        } else if (this.props.isEmptyMatches) {
            content = (
                <View style = {styles.contentContainer}>
                    <Text style = {styles.noDataText}>No data found</Text>
                </View>
            )
        } else {
            content = (
                <ScrollView style = {{marginTop: 5}}>
                        <TouchableOpacity  onPress = {this.onSearchPressed} style = {styles.searchContainer}>
                            <View style = {[styles.searchIconContainer, {backgroundColor: this.props.mod}]}>
                                <FontAwesome name = "search" size = {20} allowFontScaling = {false} color = {this.props.legend}/>
                            </View>
                            <View style = {[styles.searchButton, {backgroundColor: this.props.mod}]}>
                                <Text style = {[styles.searchButtonText, {color: this.props.legend}]}>Search Matches</Text>
                            </View>
                        </TouchableOpacity>
                    <MatchesCard matches = {this.props.matches} default = {false} />
                </ScrollView>
            )
        }

        return (
            <View style = {styles.container}>
                {content}
            </View>
        )
    }
}

const baseStyles = _.extend(base.general, {
    searchButton: {
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 10,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 2
    },
    searchIconContainer: {
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 8,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1
    },
    searchButtonText: {
        fontFamily: Fonts.base,
        fontSize: 16
    },
    searchContainer: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1
    }
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(MatchesPage);
