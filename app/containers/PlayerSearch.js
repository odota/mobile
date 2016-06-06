import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as playerSearchActions from '../actions/player_search_act';
import { Actions } from 'react-native-router-flux';

import base from '../themes/BaseStyles';

export const mapStateToProps = state => ({
    players: state.playerListState.players,
    isLoadingPlayers: state.playerListState.isLoadingPlayers,
    isEmptyPlayers: state.playerListState.isEmptyPlayers
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(playerSearchActions, dispatch)
});

class PlayerSearch extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <Text>
                    Main Page
                </Text>
            </View>
        )
    }
}

const baseStyles = base.general;
const styles = StyleSheet.create(baseStyles);

export default connect()(PlayerSearch);
