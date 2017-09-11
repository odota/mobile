import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ListView,
    AsyncStorage
} from 'react-native';

import { Avatar } from 'react-native-material-design';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import * as favouritesActions from '../actions/favourites_act';
import * as navigationActions from '../actions/navigation_act';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from 'react-native-slider';
import Toast from 'react-native-root-toast';

import moment from 'moment';

import _ from 'lodash';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    favourites: state.favouritesState.favourites,
    parent: state.navigationState.parent,
    currentScene: state.navigationState.scene
});

export const mapDispatchToProps = (dispatch) => ({
    favouritesActions: bindActionCreators(favouritesActions, dispatch),
    navigationActions: bindActionCreators(navigationActions, dispatch)
});

class PeersCard extends Component {

    constructor(props) {
        super(props);
        this.peersDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.renderRow = this.renderRow.bind(this);
        this.generateProcessedPeers = this.generateProcessedPeers.bind(this);
        this.onProfilePressed = this.onProfilePressed.bind(this);
        this.onPeerPressed = this.onPeerPressed.bind(this);
        this.state = {
            processedPeersList: []
        };
    }

    onProfilePressed(accountId) {
        console.log(accountId);
    }

    onPeerPressed(accountId) {

        if(this.props.parent == "Favourites") {
            this.props.navigationActions.pushContextIdFavourite(accountId);
            this.props.navigationActions.changeContextId(accountId);
            Actions.playerProfileFavourite();
        } else if (this.props.parent == "Search") {
            this.props.navigationActions.pushContextIdSearch(accountId);
            this.props.navigationActions.changeContextId(accountId);
            Actions.playerProfileSearch();
        } else if (this.props.parent == "Home") {
            this.props.navigationActions.pushContextIdHome(accountId);
            this.props.navigationActions.changeContextId(accountId);
            Actions.playerProfileHome();
        }
    }

    onFavouritePressed(accountId, personaName, avatar) {
        var index = -1;
        for(i = 0; i < this.props.favourites.length; i++) {
            if(this.props.favourites[i].account_id == accountId) {
                index = i;
            }
        }
        if(index == -1) {
            var info = {};
            info.account_id = accountId;
            info.avatarfull = avatar;
            info.personaname = personaName;
            this.props.favouritesActions.addFavourites(info);
            let toast = Toast.show('Added to Favourites', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0
            });
        } else {
            this.props.favouritesActions.removeFavourites(accountId);
            let toast = Toast.show('Removed from Favourites', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0
            });
        }

        setTimeout(() => {
            var favouritesString = JSON.stringify(this.props.favourites);
            AsyncStorage.setItem("favourites", favouritesString);
        }, 1000);
    }

    generateProcessedPeers(unprocessedPeersList) {
        var processedPeersList = [];
        var maxPlayed = unprocessedPeersList[0].games;
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
            processedPeer.accountId = currentUnprocessedPeer.account_id;

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

    componentWillReceiveProps(nextProps) {
        if(nextProps.peers && nextProps.peers.length > 0) {
            var peersList = nextProps.peers;
            var processedPeersList = this.generateProcessedPeers(peersList);
            this.setState({processedPeersList: processedPeersList});
        }
    }

    renderRow(rowData, i, j) {
        var rowContainer;
        if((parseInt(j)+1) % 2 == 0) {
            rowContainer = {backgroundColor: this.props.mod, marginTop: 10, paddingVertical: 5, borderRadius: 3};

        } else {
            rowContainer = {backgroundColor: this.props.alpha, marginTop: 10, paddingVertical: 5, borderRadius: 3};
        }
        var iconName;
        var index = -1;
        for(i = 0; i < this.props.favourites.length; i++) {
            if(this.props.favourites[i].account_id == rowData.accountId) {
                index = i;
            }
        }

        if(index == -1) {
            iconName = <FontAwesome name = "star-o" size = {20} allowFontScaling = {false} color = {this.props.legend} style = {styles.favouriteIcon}/>
        } else {
            iconName = <FontAwesome name = "star" size = {20} allowFontScaling = {false} color = {this.props.legend} style = {styles.favouriteIcon}/>
        }
        return (
            <TouchableOpacity onPress = { () => {this.onPeerPressed(rowData.accountId)}}>
                <View style = {rowContainer}>
                    <TouchableOpacity onPress = { () => {this.onFavouritePressed(rowData.accountId, rowData.personaName, rowData.avatar)}}>
                        <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                            <Text style = {[styles.personaNameText, {color: this.props.secondLegend}]} numberOfLines = {1}>{rowData.personaName}</Text>
                            {iconName}
                        </View>
                    </TouchableOpacity>
                    <View style = {[styles.inRowSeparator, {backgroundColor: this.props.legend}]} />
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
            </TouchableOpacity>
        )
    }

    render() {
        if(this.props.peers && this.props.peers.length > 0) {
            var filteredPeers = this.state.processedPeersList.slice(0, 31);
            return (
                <View style = {[styles.peersCardContainer, {}]}>
                    <View style = {{backgroundColor: this.props.mod, borderRadius: 3}}>
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
                    </View>

                    <ListView style = {styles.peersListView}
                        dataSource = {this.peersDS.cloneWithRows(filteredPeers)}
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
        fontSize: 16
    },
    favouriteIcon: {
        position: 'absolute',
        right: 8
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

export default connect(mapStateToProps, mapDispatchToProps)(PeersCard);
