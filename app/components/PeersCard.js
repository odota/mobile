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
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend
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
        console.log(unprocessedPeersList);
        for(j = 0; j < unprocessedPeersList.length; j++) {
            var currentUnprocessedPeer = unprocessedPeersList[j];

            var winrate = currentUnprocessedPeer.with_win / currentUnprocessedPeer.with_games;
            var winPercentage;
            if(currentUnprocessedPeer.with_games == 0) {
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
            processedPeer.withGames = currentUnprocessedPeer.with_games;
            processedPeer.winRate = winrate;

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

    renderRow(rowData, i, j) {
        var rowContainer;
        if((parseInt(j)+1) % 2 == 0) {
            rowContainer = [styles.rowContainer, {backgroundColor: this.props.mod}];
        } else {
            rowContainer = [styles.rowContainer, {backgroundColor: this.props.alpha}];
        }
        return (
            <View style = {rowContainer}>
                <Text style = {[styles.personaNameText, {color: this.props.secondLegend}]} numberOfLines = {1}>{rowData.personaName}</Text>
                <View style = {[styles.inRowSeparator, {backgroundColor: this.props.secondLegend}]} />
                <View style = {{flexDirection: 'row'}}>
                    <View style = {styles.peerCell}>
                        <View style = {styles.peerValueTextWrapper}>
                            <View style = {styles.avatarContainer}>
                                <Avatar image = {<Image source = {{uri: rowData.avatar}} />} size = {40} borderRadius = {20} style = {styles.peerIcon} />
                            </View>
                        </View>
                    </View>
                    <View style = {styles.withCell}>
                        <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.withGames}</Text>
                        <Slider disabled = {true}
                                value = {rowData.playedRate}
                                minimumTrackTintColor = {Colors.lose}
                                maximumTrackTintColor = 'rgba(255, 255, 255, 0)'
                                style = {styles.sliderContainer}
                                thumbStyle = {styles.hiddenThumb}/>
                    </View>
                    <View style = {styles.winCell}>
                        <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.winPercentage}%</Text>
                        <Slider disabled = {true}
                                value = {rowData.winRate}
                                minimumTrackTintColor = {Colors.win}
                                maximumTrackTintColor = 'rgba(255, 255, 255, 0)'
                                style = {styles.sliderContainer}
                                thumbStyle = {styles.hiddenThumb}/>
                    </View>
                    <View style = {styles.lastPlayedCell}>
                        <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.lastPlayed}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        console.log(this.state.processedPeersList);
        if(this.props.peers && this.props.peers.length > 0) {
            return (
                <View style = {[styles.peersCardContainer, {backgroundColor: this.props.mod}]}>
                    <View style = {styles.titleContainer}>
                        <Text style = {[styles.titleText, {color: this.props.secondLegend}]}>PEERS</Text>
                    </View>
                    <View style = {[styles.separator, {backgroundColor: this.props.legend}]} />
                    <View style = {styles.tableHeaderContainer}>
                        <View style = {styles.tableHeaderCell}>
                            <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Player</Text>
                        </View>
                        <View style = {styles.tableHeaderCell}>
                            <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>With</Text>
                        </View>
                        <View style = {styles.tableHeaderCell}>
                            <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Win%</Text>
                        </View>
                        <View style = {[styles.tableHeaderCell, {marginRight: 10}]}>
                            <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Last Played</Text>
                        </View>
                    </View>
                    <SGListView style = {styles.peersListView}
                        dataSource = {this.peersDS.cloneWithRows(this.state.processedPeersList)}
                        renderRow = {this.renderRow}
                        enableEmptySections = {true}
                        initialListSize = {40}
                    />
                </View>
            )
        } else {
            return (
                <View />
            )
        }

    }

}

const baseStyles = _.extend(base.general, {
    personaNameText: {
        fontFamily: Fonts.base,
        fontSize: 14,
        alignSelf: 'center'
    },
    avatarContainer: {
        alignSelf: 'center'
    },
    peerCell: {
        flex: 1
    },
    withCell: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center'
    },
    winCell: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center'
    },
    lastPlayedCell: {
        flex: 1,
        marginLeft: 10,
        marginRight: 20,
        justifyContent: 'center'
    },
    peerValueTextWrapper: {
        marginLeft: 5,
        marginRight: 5
    }
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps)(PeersCard);
