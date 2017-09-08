import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ListView,
    ActivityIndicator,
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as playerSearchActions from '../actions/player_search_act';
import * as settingsActions from '../actions/settings_act';
import * as favouritesActions from '../actions/favourites_act';
import { Actions } from 'react-native-router-flux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
        Keyboard.dismiss();
    }

    render() {
        var contentBottom;
        if(this.props.isLoadingPlayers) {
            contentBottom = (
                <View style = {styles.contentContainer}>
                    <ActivityIndicator size="large" color = {this.props.legend}/>
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
                <KeyboardAwareScrollView>
                    <ListView
                        dataSource = {this.ds.cloneWithRows(this.props.players)}
                        renderRow = {this.renderRow}
                        style = {styles.listView}
                        enableEmptySections = {true}/>
                </KeyboardAwareScrollView>
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
                    <View style = {{flex: 1, borderTopLeftRadius: 3, borderBottomLeftRadius: 3, marginLeft: 10, backgroundColor: this.props.alpha, height: 40, alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}>
                        <FontAwesome name = "search" size = {20} allowFontScaling = {false} color = {this.props.secondLegend}/>
                    </View>
                    <View style = {{flex: 7}}>
                        <TextInput
                            underlineColorAndroid='rgba(255,255,255,0)'
                            placeholder = 'Search player'
                            value = {this.state.searchInput}
                            style = {[styles.searchInput, { backgroundColor: this.props.alpha, color: this.props.secondLegend}]}
                            autoCorrect = {false}
                            placeholderTextColor = {this.props.secondLegend}
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
                </View>
                {contentBottom}
            </View>
        )
    }
}

const baseStyles = _.extend(base.general, {
        searchFieldContainer: {
            height: 60,
            flexDirection: 'row',
            alignItems: 'center'
        },
        searchInput: {
            height: 40,
            fontSize: 14,
            marginRight: 10,
            borderTopRightRadius: 3,
            borderBottomRightRadius: 3,
            paddingRight: 20,
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
