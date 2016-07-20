import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ListView
} from 'react-native';

import { Avatar } from 'react-native-material-design';
import { connect } from 'react-redux';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from 'react-native-slider';
import SGListView from 'react-native-sglistview';

import moment from 'moment';

import _ from 'lodash';

export const mapStateToProps = state => ({

});

class PeersCard extends Component {

    constructor(props) {
        super(props);
        this.peersDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.renderRow = this.renderRow.bind(this);
        this.generateProcessedPeers = this.generateProcessedPeers.bind(this);
        this.state = {
            processedPeersList: []
        };
    }

    generateProcessedPeers(unprocessedPeersList) {
        var processedPeersList = [];
        var maxPlayed = unprocessedPeersList[0].games;

        for(j = 0; j < unprocessedPeersList.length; j++) {
            var currentUnprocessedPeer = unprocessedPeersList[j];

            var winrate = currentUnprocessedPeer.win / currentUnprocessedPeer.games;
            var winPercentage;
            if(currentUnprocessedPeer.games == 0) {
                winPercentage = "N/A";
            } else {
                winPercentage = Math.round(winrate * 10000)/100;
            }

            var playedRate = currentUnprocessedPeer.games / maxPlayed;

            var lastPlayedTime = currentUnprocessedPeer.last_played * 1000;
            var friendlyLastPlayedTime;
            if(lastPlayedTime == 0) {
                friendlyLastPlayedTime = "N/A";
            } else {
                var now = moment();
                friendlyLastPlayedTime = moment.duration(now.diff(lastPlayedTime)).humanize();
            }

            var processedPeer = {};
            processedPeer.winPercentage = winPercentage;
            processedPeer.playedRate = playedRate;
            processedPeer.lastPlayed = friendlyLastPlayedTime;
            processedPeer.personaName = currentUnprocessedPeer.personaname;
            processedPeer.avatar = currentUnprocessedPeer.avatar;

            processedPeersList[j] = processedPeer;
        }
        return processedPeersList;
    }

    componentWillMount() {
        if(this.props.peers && this.props.peers.length > 0) {
            var peersList = this.props.peers;
            var processedPeersList = this.generateProcessedPeers(peersList);
            this.setState({processedPeersList: processedPeersList});
        }
    }

    renderRow() {

    }

    render() {
        console.log(this.state.processedPeersList);
        return (
            <View />
        )
    }

}

const baseStyles = _.extend(base.general, {

});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps)(PeersCard);
