import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    ListView,
    AsyncStorage,
    Platform
} from 'react-native';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as playerSearchActions from '../actions/player_search_act';
import * as settingsActions from '../actions/settings_act';
import * as favouritesActions from '../actions/favourites_act';
import { Actions } from 'react-native-router-flux';

import ProgressBar from 'ProgressBarAndroid';
import Spinner from 'react-native-spinkit';
import SGListView from 'react-native-sglistview';

import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import PlayerCard from '../components/PlayerCard';

export const mapStateToProps = state => ({
    players: state.playerListState.players,
    isLoadingPlayers: state.playerListState.isLoadingPlayers,
    isEmptyPlayers: state.playerListState.isEmptyPlayers,
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    legendHex: state.settingsState.legendHex,
    legendTranslucent: state.settingsState.legendTranslucent,
    parent: state.navigationState.parent
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(playerSearchActions, dispatch),
    settingsActions: bindActionCreators(settingsActions, dispatch),
    favouritesActions: bindActionCreators(favouritesActions, dispatch)
});

class PlayerSearch extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource ({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            searchInput: ''
        };
        this.renderRow = this.renderRow.bind(this);
        this.searchPlayer = this.searchPlayer.bind(this);
    }

    componentWillMount() {
    }

    renderRow(rowData, i, j) {
        return (
            <PlayerCard info = {rowData} />
        );
    }

    searchPlayer() {
        this.props.actions.fetchPlayers(this.state.searchInput);
    }

    render() {
        var contentBottom;
        if(Platform.OS == 'ios') {
            spinner = <Spinner isVisible = {true} size = {100} type = 'Pulse' color = {this.props.legendHex} />
        } else {
            spinner = <ProgressBar styleAttr = "Large" color = {this.props.legend}/>
        }
        if(this.props.isLoadingPlayers) {
            contentBottom = (
                <View style = {styles.contentContainer}>
                    {spinner}
                </View>
            )
        } else if(this.props.isEmptyPlayers) {
            contentBottom = (
                <View style = {styles.contentContainer}>
                    <Text style = {styles.noDataText}>No data found</Text>
                </View>
            )
        } else if(this.props.players.length > 0){
            contentBottom = (
                <ScrollView>
                    <SGListView
                        dataSource = {this.ds.cloneWithRows(this.props.players)}
                        renderRow = {this.renderRow}
                        style = {styles.listView}
                        enableEmptySections = {true}/>
                </ScrollView>
            )
        }

        if(this.props.parent == "Home") {
            containerStyle = styles.noMarginContainer;
        } else {
            containerStyle = styles.container;
        }

        return (
            <View style = {containerStyle}>
                <View style = {styles.searchFieldContainer}>
                    <TextInput
                        placeholder = 'Search player'
                        value = {this.state.searchInput}
                        style = {[styles.searchInput, { backgroundColor: this.props.alpha, color: this.props.secondLegend}]}
                        autoCorrect = {false}
                        placeholderTextColor = {this.props.legendTranslucent}
                        autoCapitalize = 'none'
                        returnKeyType = 'search'
                        selectionColor = 'white'
                        onSubmitEditing = {this.searchPlayer}
                        onChange = {(event) => {
                            this.setState({
                                searchInput: event.nativeEvent.text
                            });
                        }}/>
                </View>
                {contentBottom}
            </View>
        )
    }
}

const baseStyles = _.extend(base.general, {
        searchFieldContainer: {
            height: 60
        },
        searchInput: {
            height: 40,
            fontSize: 14,
            marginVertical: 10,
            marginHorizontal: 10,
            borderRadius: 3,
            paddingHorizontal: 20,
            paddingVertical: 3,
            fontFamily: Fonts.base
        },
        contentContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        noMarginContainer: {
            flexDirection: 'column',
            alignSelf: 'stretch',
            alignItems: 'stretch',
            justifyContent:'space-between',
            flex: 1,
            backgroundColor: Colors.mainBackground
        }
    }
);
const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSearch);
