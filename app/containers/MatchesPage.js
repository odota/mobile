import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playerMatchesActions from '../actions/player_matches_act';
import { Actions } from 'react-native-router-flux';

import MatchesCard from '../components/MatchesCard';
import PageNavigationControl from '../components/PageNavigationControl';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import _ from 'lodash';

import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    matches: state.playerMatchesState.matches,
    isLoadingMatches: state.playerMatchesState.isLoadingMatches,
    isEmptyMatches: state.playerMatchesState.isEmptyMatches,
    page: state.playerMatchesState.page,
    sortField: state.playerMatchesState.sortField,
    sortDirection: state.playerMatchesState.sortDirection,
    matchesSubset: state.playerMatchesState.matchesSubset,
    showPreviousPage: state.playerMatchesState.showPreviousPage,
    showNextPage: state.playerMatchesState.showNextPage,
    initialValue: state.playerMatchesState.initialValue,
    endValue: state.playerMatchesState.endValue,
    totalMatches: state.playerMatchesState.totalMatches,
    totalPages: state.playerMatchesState.totalPages,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    mod: state.settingsState.mod,
    alpha: state.settingsState.alpha,
    parent: state.navigationState.parent,
    tracker: state.navigationState.tracker,
    background: state.settingsState.background,
    reverseBackground: state.settingsState.reverseBackground
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(playerMatchesActions, dispatch)
});

class MatchesPage extends Component {

    constructor(props) {
        super(props);
        this.onSearchPressed = this.onSearchPressed.bind(this);
        this.pageControl = (<View />);
        this.state = {
            refreshing: false
        };

        this.sortMatches = this.sortMatches.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    componentDidMount() {
        this.props.tracker.trackScreenView('Matches');
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.props.actions.fetchMatches(this.props.contextId).then(() => {
            this.setState({ refreshing: false });
        });
    }

    onSearchPressed() {
        if (this.props.parent == "Favourites") {
            Actions.matchesSearchFavourite();
        } else if (this.props.parent == "Search") {
            Actions.matchesSearchSearch();
        } else if (this.props.parent == "Home") {
            Actions.matchesSearchHome();
        }
    }

    sortMatches(sortField, sortDirection) {
        this.props.actions.sortMatches(sortField, sortDirection);
    }

    scrollToTop() {
        this.scrollViewRef.scrollTo({ x: 0, y: 0, animated: true })
    }

    render() {
        var content = (<View />);
        if (this.props.isLoadingMatches) {
            content = (
                <View style={styles.contentContainer}>
                    <ActivityIndicator size="large" color={this.props.legend} />
                </View>
            )
        } else if (this.props.isEmptyMatches) {
            content = (
                <View style={styles.contentContainer}>
                    <Text style={styles.noDataText}>No data found</Text>
                </View>
            )
        } else if (this.props.matchesSubset != null) {
            var refreshColor = this.props.legendHex;
            this.pageControl = (<PageNavigationControl
                page={this.props.page}
                buttonColor={this.props.legend}
                textColor={this.props.reverseBackground}

                previousDoubleEnabled={this.props.showPreviousPage}
                previousDoubleAction={() => {
                    this.props.actions.navigatePreviousMatches(10);
                    this.scrollToTop();
                }}
                previousEnabled={this.props.showPreviousPage}
                previousAction={() => {
                    this.props.actions.navigatePreviousMatches(1);
                    this.scrollToTop();
                }}

                nextEnabled={this.props.showNextPage}
                nextAction={() => {
                    this.props.actions.navigateNextMatches(1);
                    this.scrollToTop();
                }}
                nextDoubleEnabled={this.props.showNextPage}
                nextDoubleAction={() => {
                    this.props.actions.navigateNextMatches(10)
                    this.scrollToTop();
                }}
            />
            );
            content = (
                <KeyboardAwareScrollView style={{ marginTop: 5 }}
                    innerRef={ref => {
                        this.scrollViewRef = ref;
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            tintColor={refreshColor}
                            title='Refreshing'
                            titleColor={refreshColor}
                            colors={[refreshColor]}
                            progressBackgroundColor="#ffffffff"
                        />
                    }>
                    <TouchableOpacity onPress={this.onSearchPressed} style={styles.searchContainer}>
                        <View style={[styles.searchIconContainer, { backgroundColor: this.props.alpha }]}>
                            <FontAwesome name="search" size={20} allowFontScaling={false} color={this.props.secondLegend} />
                        </View>
                        <View style={[styles.searchButton, { backgroundColor: this.props.alpha }]}>
                            <Text style={[styles.searchButtonText, { color: this.props.secondLegend }]}>Search Matches</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.filterText, { color: this.props.reverseBackground }]}>
                        {this.props.initialValue} - {this.props.endValue} of {this.props.totalMatches} matches
                    </Text>
                    <MatchesCard matches={this.props.matchesSubset} sortMatches={this.sortMatches} default={false} />
                    {this.pageControl}
                    <Text style={[styles.filterText, { color: this.props.reverseBackground }]}>
                        {this.props.initialValue} - {this.props.endValue} of {this.props.totalMatches} matches
                    </Text>
                </KeyboardAwareScrollView>
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
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(MatchesPage);
