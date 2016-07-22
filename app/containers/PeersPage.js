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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as peersActions from '../actions/peers_act';
import { Actions } from 'react-native-router-flux';

import PeersCard from '../components/PeersCard';

import ProgressBar from 'ProgressBarAndroid';
import Spinner from 'react-native-spinkit';
import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    peers: state.peersState.peers,
    isLoadingPeers: state.peersState.isLoadingPeers,
    isEmptyPeers: state.peersState.isEmptyPeers,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    legend: state.settingsState.legend
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(peersActions, dispatch)
});

class PeersPage extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.fetchPeers(this.props.contextId);
    }

    render() {
        var content;
        if(Platform.OS == 'ios') {
            spinner = <Spinner isVisible = {true} size = {100} type = 'Pulse' color = {this.props.legendHex} />
        } else {
            spinner = <ProgressBar styleAttr = "Large" color = {this.props.legend}/>
        }
        if(this.props.isLoadingPeers) {
            content = (
                <View style = {styles.contentContainer}>
                    {spinner}
                </View>
            )
        } else if (this.props.isEmptyHeroes) {
            content = (
                <View style = {styles.contentContainer}>
                    <Text style = {styles.noDataText}>No data found</Text>
                </View>
            )
        } else {
            content = (
                <ScrollView style = {{marginTop: 5}}>
                    <PeersCard peers = {this.props.peers}/>
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

});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(PeersPage);
