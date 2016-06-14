import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    ListView
} from 'react-native';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as playerSearchActions from '../actions/player_search_act';
import { Actions } from 'react-native-router-flux';

import Spinner from 'react-native-spinkit';

import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import PlayerCard from '../components/PlayerCard';

export const mapStateToProps = state => ({
    players: state.playerListState.players,
    isLoadingPlayers: state.playerListState.isLoadingPlayers,
    isEmptyPlayers: state.playerListState.isEmptyPlayers
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(playerSearchActions, dispatch)
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

    renderRow(rowData, i, j) {
        return (
            <PlayerCard info = {rowData}/>
        );
    }

    searchPlayer() {
        this.props.actions.fetchPlayers(this.state.searchInput);
    }

    render() {
        var contentBottom;
        if(this.props.isLoadingPlayers) {
            contentBottom = (
                <View style = {styles.contentContainer}>
                    <Spinner isVisible = {true} size = {100} type = 'Pulse' color = {Colors.skyDolchLegendHex} />
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
                    <ListView
                        dataSource = {this.ds.cloneWithRows(this.props.players)}
                        renderRow = {this.renderRow}
                        style = {styles.listView}
                        enableEmptySections = {true}/>
                </ScrollView>
            )
        }

        return (
            <View style = {styles.container}>
                <View style = {styles.searchFieldContainer}>
                    <TextInput
                        placeholder = 'Search player'
                        value = {this.state.searchInput}
                        style = {styles.searchInput}
                        autoCorrect = {false}
                        placeholderTextColor = {Colors.skyDolchLegendTranslucent}
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
            backgroundColor: Colors.skyDolchAlpha,
            color: Colors.skyDolchLegend,
            fontFamily: Fonts.base
        },
        contentContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
);
const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSearch);
