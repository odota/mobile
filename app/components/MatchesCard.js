import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ListView
} from 'react-native';

import { connect } from 'react-redux';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import { Actions } from 'react-native-router-flux';

import gameMode from 'dotaconstants/build/game_mode.json';
import lobbyType from 'dotaconstants/build/lobby_type.json';
import { getHeroImage } from '../utils/getHeroImage';

import _ from 'lodash';
import moment from 'moment';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    sortedBy: state.playerMatchesState.sortedBy,
    sortDirection: state.playerMatchesState.sortDirection,
    parent: state.navigationState.parent
});

class MatchesCard extends Component {

    constructor(props) {
        super(props);
        this.matchesDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.renderRow = this.renderRow.bind(this);
        this.getHeader = this.getHeader.bind(this);
        this.getValue = this.getValue.bind(this);
        this.getFriendlyDuration = this.getFriendlyDuration.bind(this);
        this.matchPressed = this.matchPressed.bind(this);
        this.normalizeGameMode = this.normalizeGameMode.bind(this);
        this.normalizeLobbyType = this.normalizeLobbyType.bind(this);
    }

    matchPressed(data) {
        var matchId = data.match_id;
        if(this.props.parent == "Favourites") {
            Actions.matchDetailsFavourite(matchId);
        } else if (this.props.parent == "Search") {
            Actions.matchDetailsSearch(matchId);
        } else if (this.props.parent == "Home") {
            Actions.matchDetailsHome(matchId);
        }
    }

    getHeader() {
        var dynamicHeader;
        if(this.props.default) {
            dynamicHeader = "K/D/A"
        } else {
            if(this.props.sortedBy == "match_id") {
                dynamicHeader = "K/D/A";
            } else if (this.props.sortedBy == "kills") {
                dynamicHeader = "Kills";
            } else if (this.props.sortedBy == "deaths") {
                dynamicHeader = "Deaths";
            } else if (this.props.sortedBy == "assists") {
                dynamicHeader = "Assits";
            } else if (this.props.sortedBy == "kda") {
                dynamicHeader = "K/D/A";
            } else if (this.props.sortedBy == "gold_per_min") {
                dynamicHeader = "GPM";
            } else if (this.props.sortedBy == "xp_per_min") {
                dynamicHeader = "XPM";
            } else if (this.props.sortedBy == "last_hits") {
                dynamicHeader = "LH";
            } else if (this.props.sortedBy == "denies") {
                dynamicHeader = "Denies";
            } else if (this.props.sortedBy == "lane_efficiency_pct") {
                dynamicHeader = "Lane Efficiency Percentage";
            } else if (this.props.sortedBy == "duration") {
                dynamicHeader = "Duration";
            } else if (this.props.sortedBy == "level") {
                dynamicHeader = "Level";
            } else if (this.props.sortedBy == "hero_damage") {
                dynamicHeader = "HD";
            } else if (this.props.sortedBy == "tower_damage") {
                dynamicHeader = "TD";
            } else if (this.props.sortedBy == "hero_healing") {
                dynamicHeader = "HH";
            } else if (this.props.sortedBy == "stuns") {
                dynamicHeader = "Stuns";
            } else if (this.props.sortedBy == "tower_kills") {
                dynamicHeader = "Tower Kills";
            } else if (this.props.sortedBy == "neutral_kills") {
                dynamicHeader = "Neutral Kills";
            } else if (this.props.sortedBy == "courier_kills") {
                dynamicHeader = "Courier Kills";
            } else if (this.props.sortedBy == "purchase_tpscroll") {
                dynamicHeader = "TP Scroll Purchased";
            } else if (this.props.sortedBy == "purchase_ward_observer") {
                dynamicHeader = "Observer Purchased";
            } else if (this.props.sortedBy == "purchase_ward_sentry") {
                dynamicHeader = "Sentry Purchased";
            } else if (this.props.sortedBy == "purchase_gem") {
                dynamicHeader = "Gem Purchased";
            } else if (this.props.sortedBy == "purchase_rapier") {
                dynamicHeader = "Rapier Purchased";
            } else if (this.props.sortedBy == "pings") {
                dynamicHeader = "Pings";
            } else if (this.props.sortedBy == "throw") {
                dynamicHeader = "Throw";
            } else if (this.props.sortedBy == "comeback") {
                dynamicHeader = "Comeback";
            } else if (this.props.sortedBy == "stomp") {
                dynamicHeader = "Stomp";
            } else if (this.props.sortedBy == "loss") {
                dynamicHeader = "Loss";
            } else if (this.props.sortedBy == "actions_per_min") {
                dynamicHeader = "APM";
            }
        }
        return dynamicHeader;
    }

    getValue(rowData) {
        var dynamicValue;
        if(this.props.default) {
            dynamicValue = rowData.kills + "/" + rowData.deaths + "/" + rowData.assists;
         } else {
            if(this.props.sortedBy == "match_id") {
                dynamicValue = rowData.kills + "/" + rowData.deaths + "/" + rowData.assists;
            } else if (this.props.sortedBy == "kills") {
                dynamicValue = rowData.kills;
            } else if (this.props.sortedBy == "deaths") {
                dynamicValue = rowData.deaths;
            } else if (this.props.sortedBy == "assists") {
                dynamicValue = rowData.assists;
            } else if (this.props.sortedBy == "kda") {
                dynamicValue = rowData.kills + "/" + rowData.deaths + "/" + rowData.assists
            } else if (this.props.sortedBy == "gold_per_min") {
                dynamicValue = rowData.gold_per_min;
            } else if (this.props.sortedBy == "xp_per_min") {
                dynamicValue = rowData.xp_per_min;
            } else if (this.props.sortedBy == "last_hits") {
                dynamicValue = rowData.last_hits;
            } else if (this.props.sortedBy == "denies") {
                dynamicValue = rowData.denies;
            } else if (this.props.sortedBy == "lane_efficiency_pct") {
                dynamicValue = rowData.lane_efficiency_pct;
            } else if (this.props.sortedBy == "duration") {
                dynamicValue = this.getFriendlyDuration(rowData.duration);
            } else if (this.props.sortedBy == "level") {
                dynamicValue = rowData.level;
            } else if (this.props.sortedBy == "hero_damage") {
                dynamicValue = rowData.hero_damage;
            } else if (this.props.sortedBy == "tower_damage") {
                dynamicValue = rowData.tower_damage;
            } else if (this.props.sortedBy == "hero_healing") {
                dynamicValue = rowData.hero_healing;
            } else if (this.props.sortedBy == "stuns") {
                dynamicValue = rowData.stuns;
            } else if (this.props.sortedBy == "tower_kills") {
                dynamicValue = rowData.tower_kills;
            } else if (this.props.sortedBy == "neutral_kills") {
                dynamicValue = rowData.neutral_kills;
            } else if (this.props.sortedBy == "courier_kills") {
                dynamicValue = rowData.courier_kills;
            } else if (this.props.sortedBy == "purchase_tpscroll") {
                dynamicValue = rowData.purchase_tpscroll;
            } else if (this.props.sortedBy == "purchase_ward_observer") {
                dynamicValue = rowData.purchase_ward_observer;
            } else if (this.props.sortedBy == "purchase_ward_sentry") {
                dynamicValue = rowData.purchase_ward_sentry;
            } else if (this.props.sortedBy == "purchase_gem") {
                dynamicValue = rowData.purchase_gem;
            } else if (this.props.sortedBy == "purchase_rapier") {
                dynamicValue = rowData.purchase_rapier;
            } else if (this.props.sortedBy == "pings") {
                dynamicValue = rowData.pings;
            } else if (this.props.sortedBy == "throw") {
                dynamicValue = rowData.throw;
            } else if (this.props.sortedBy == "comeback") {
                dynamicValue = rowData.comeback;
            } else if (this.props.sortedBy == "stomp") {
                dynamicValue = rowData.stomp;
            } else if (this.props.sortedBy == "loss") {
                dynamicValue = rowData.loss;
            } else if (this.props.sortedBy == "actions_per_min") {
                dynamicValue = rowData.actions_per_min;
            }
        }
        return dynamicValue;
    }

    getFriendlyDuration(duration) {
        var minutes = Math.floor(duration/60);
        var seconds = duration - (minutes * 60);
        if(seconds < 10) {
            seconds = '0' + seconds;
        }
        var friendlyDuration = minutes + ":" + seconds;
        return friendlyDuration;
    }

    renderRow(rowData, i , j) {
        if(rowData) {
            var rowContainer;
            var team;
            var result;
            if(rowData.player_slot > 127) {
                team = 'Dire';
            } else {
                team = 'Radiant';
            }
            if(team == 'Radiant' && rowData.radiant_win == true) {
                result = 'W';
            } else if (team == 'Dire' && rowData.radiant_win == false){
                result = 'W';
            } else {
                result = 'L';
            }
            let indicatorColor;
            if(result == 'W') {
                indicatorColor = Colors.win;
            } else {
                indicatorColor = Colors.lose;
            }
            if((parseInt(j)+1) % 2 == 0) {
                rowContainer = [styles.rowContainerEven, {backgroundColor: this.props.mod}];
            } else {
                rowContainer = [styles.rowContainerOdd, {backgroundColor: this.props.alpha}];
            }
            var staticUri = getHeroImage(rowData.hero_id);
            var friendlyDuration = this.getFriendlyDuration(rowData.duration);
            var endTime = rowData.start_time + rowData.duration;
            var unixEndTime = endTime * 1000;
            var now = moment();
            var friendlyEndTime = moment.duration(now.diff(unixEndTime)).humanize();
            var dynamicValue = this.getValue(rowData);
            var localizedGameMode = this.normalizeGameMode(gameMode[rowData.game_mode].name);
            var localizedLobbyType = this.normalizeLobbyType(lobbyType[rowData.lobby_type].name);
            return (
                <TouchableOpacity style = {{flexDirection: 'row', flex: 1}} onPress = {() => {this.matchPressed(rowData)}}>
                    <View style = {rowContainer}>
                        <View style = {{flex: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: -5}}>
                            <Image source = {staticUri} style = {styles.imageAvatar}/>
                        </View>
                        <View style = {styles.cell}>
                            <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{localizedGameMode}</Text>
                            <Text style = {[styles.tableValueText, {color: this.props.secondLegend, fontSize: 12}]}>{localizedLobbyType}</Text>
                        </View>
                        <View style = {styles.cell}>
                            <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{friendlyEndTime}</Text>
                        </View>
                        <View style = {styles.cell}>
                            <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{friendlyDuration}</Text>
                        </View>
                        <View style = {styles.doubleCell}>
                            <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{dynamicValue}</Text>
                        </View>

                    </View>
                    <View style = {{width: 5, backgroundColor: indicatorColor}} />
                </TouchableOpacity>
            )
        } else {
            return <View />;
        }

    }

    normalizeGameMode(gameMode) {
        var trimmed = gameMode.replace('game_mode_', '');
        var split = trimmed.split("_");
        var normalized = "";
        for(var i = 0; i < split.length; i++) {
            normalized += split[i].charAt(0).toUpperCase() + split[i].slice(1) + " ";
        }
        return normalized;
    }

    normalizeLobbyType(lobbyType) {
        var trimmed = lobbyType.replace('lobby_type_', '');
        var split = trimmed.split("_");
        var normalized = "";
        for(var i = 0; i < split.length; i++) {
            split[i][0].toUpperCase();
            normalized += split[i].charAt(0).toUpperCase() + split[i].slice(1) + " ";
        }
        return normalized;
    }

    render() {
        if(this.props.matches) {

            var dynamicHeader = this.getHeader();
            var dynamicText = <Text numberOfLines = {1} style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>{dynamicHeader}</Text>;

            if (dynamicHeader === 'K/D/A') {
                dynamicText = (
                    <TouchableOpacity onPress = {() => {this.props.sortMatches("kda", this.props.sortDirection)}}>
                        {dynamicText}
                    </TouchableOpacity>
                );
            }
            var title = "MATCHES";
            if(this.props.title) {
                title = this.props.title;
            }

            return (
                <View style = {[styles.matchesCardContainer, {backgroundColor: this.props.mod}]}>
                    <View style = {styles.titleContainer}>
                        <Text style = {[styles.titleText, {color: this.props.secondLegend}]}>{title}</Text>
                    </View>
                    <View style = {[styles.separator, {backgroundColor: this.props.legend}]} />
                    <View style = {styles.tableHeaderContainer}>
                        <View style = {{flex: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 10,
                            marginBottom: 10,
                            marginLeft: -5}}>
                            <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Hero</Text>
                        </View>
                        <View style = {styles.tableHeaderCell}>
                            <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Mode</Text>
                        </View>
                        <View style = {styles.tableHeaderCell}>
                            <TouchableOpacity onPress = {() => {this.props.sortMatches("ended", this.props.sortDirection)}}>
                                <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Ended</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.tableHeaderCell}>
                            <TouchableOpacity onPress = {() => {this.props.sortMatches("duration", this.props.sortDirection)}}>
                                <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Length</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.doubleTableHeaderCell}>
                            {dynamicText}
                        </View>
                        <View style = {{width: 5}} />
                    </View>
                    <ListView style = {styles.matchesListView}
                        dataSource = {this.matchesDS.cloneWithRows(this.props.matches)}
                        renderRow = {this.renderRow}
                        enableEmptySections = {true}
                        initialListSize = {120}
                    />
                </View>
            )
        } else {
            return (<View />);
        }
    }
}

const baseStyles = _.extend(base.general, {
    matchesCardContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 10,
        paddingTop: 10,
        borderRadius: 3
    },
    titleText: {
        fontFamily: Fonts.base,
        fontSize: 28
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    separator: {
        height: 2
    },
    rowContainerEven: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        flex: 1
    },
    rowContainerOdd: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        flex: 1
    },
    tableHeaderContainer: {
        flexDirection: 'row'
    },
    tableHeaderCell: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    halfTableHeaderCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    doubleTableHeaderCell: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    tableHeaderText: {
        fontFamily: Fonts.base,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    tableValueText: {
        fontFamily: Fonts.base,
        fontSize: 14,
        alignSelf: 'center',
        textAlign: 'center'
    },
    heroValueText: {
        fontFamily: Fonts.base,
        fontSize: 14,
        alignSelf: 'center'
    },
    cell: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    halfCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    doubleCell: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    }
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps)(MatchesCard);
