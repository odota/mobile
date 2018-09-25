import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    RefreshControl,
    ImageBackground,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as matchDetailsActions from '../actions/match_details_act';
import * as navigationActions from '../actions/navigation_act';
import * as playerMatchesActions from '../actions/player_matches_act';
import * as playerHeroesActions from '../actions/player_heroes_act';
import * as peersActions from '../actions/peers_act';
import { Actions } from 'react-native-router-flux';

import { kFormatter } from '../utils/kFormatter';
import { getHeroImage } from '../utils/getHeroImage';
import { getItemImage } from '../utils/getItemImage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import gameMode from 'dotaconstants/build/game_mode.json';
import items from 'dotaconstants/build/item_ids.json';
import regionsArray from '../json/regions_list.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import moment from 'moment';

import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import { defaultSort, SORT_ENUM } from '../utils/sorting';

export const mapStateToProps = state => ({
    matchDetails: state.matchDetailsState.matchDetails,
    isLoadingMatchDetails: state.matchDetailsState.isLoadingMatchDetails,
    isEmptyMatchDetails: state.matchDetailsState.isEmptyMatchDetails,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    legend: state.settingsState.legend,
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    secondLegend: state.settingsState.secondLegend,
    parent: state.navigationState.parent,
    tracker: state.navigationState.tracker
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(matchDetailsActions, dispatch),
    navigationActions: bindActionCreators(navigationActions, dispatch),
    playerMatchesActions: bindActionCreators(playerMatchesActions, dispatch),
    playerHeroesActions: bindActionCreators(playerHeroesActions, dispatch),
    peersActions: bindActionCreators(peersActions, dispatch)
});

class MatchOverview extends Component {

    constructor(props) {
        super(props);
        this.radiantDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.direDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            zero: false,
            one: false,
            two: false,
            three: false,
            four: false,
            five: false,
            six: false,
            seven: false,
            eight: false,
            nine: false,
            radiantPlayersList: [],
            direPlayersList: [],
            refreshing: false,
            formattedDuration: '',
            radiantScore: -1,
            direScore: -1,
            radiantWin: true,
            endedTime: '',
            gameMode: '',
            matchId: -1,
            region: '',
            averageMMR: -1,
            skill: "",
            radiantGoldAdvantage: [],
            radiantXpAdvantage: [],
            radiantSortField: "",
            radiantSortDirection: "",
            direSortField: "",
            direSortDirection: ""
        };
        this.renderRow = this.renderRow.bind(this);
        this.generateProcessedPlayers = this.generateProcessedPlayers.bind(this);
        this.generateProcessedData = this.generateProcessedData.bind(this);
        this.getRegionIndex = this.getRegionIndex.bind(this);
        this.getItemName = this.getItemName.bind(this);
        this.findItemTiming = this.findItemTiming.bind(this);
        this.calculateAverageMMR = this.calculateAverageMMR.bind(this);
        this.onRowPressed = this.onRowPressed.bind(this);
        this.onNamePressed = this.onNamePressed.bind(this);
        this.normalizeGameMode = this.normalizeGameMode.bind(this);
        this.sortPlayers = this.sortPlayers.bind(this);
    }

    componentDidMount() {
        this.props.tracker.trackScreenView('Match Overview');
        if (this.props.matchDetails) {
            if (this.props.matchDetails.players) {
                if (this.props.matchDetails.players.length > 0) {
                    var players = this.props.matchDetails.players;
                    var processedPlayersList = this.generateProcessedPlayers(players);
                    let radiantPlayersList = processedPlayersList.slice(0, 5);
                    let direPlayersList = processedPlayersList.slice(5, 10);
                    this.setState({ radiantPlayersList: radiantPlayersList, direPlayersList: direPlayersList });
                }
            }
            this.generateProcessedData(this.props.matchDetails);
        }
    }

    generateProcessedData(data) {
        var duration = moment("1900-01-01 00:00:00").add(data.duration, 'seconds').format("HH:mm:ss");
        this.setState({ formattedDuration: duration });
        this.setState({ radiantScore: data.radiant_score });
        this.setState({ direScore: data.dire_score });
        this.setState({ radiantWin: data.radiant_win });

        if (data.duration && data.start_time) {
            var endedTime = (data.start_time + data.duration) * 1000;
            var now = moment();
            let friendlyEndedTime = moment.duration(now.diff(endedTime)).humanize();
            this.setState({ endedTime: friendlyEndedTime.toUpperCase() });
        }
        if (data.game_mode) {
            var localizedName = this.normalizeGameMode(gameMode[data.game_mode].name);
            this.setState({ gameMode: localizedName });
        }
        if (data.match_id) {
            this.setState({ matchId: data.match_id });
        }

        if (data.region) {
            var index = this.getRegionIndex(data.region, regionsArray);
            this.setState({ region: regionsArray[index].localized_name });
        }

        if (data.players) {
            var players = data.players;
            this.calculateAverageMMR(players);
        }

        if (data.skill) {
            if (data.skill == 1) {
                this.setState({ skill: "Normal" });
            } else if (data.skill == 2) {
                this.setState({ skill: "High" });
            } else if (data.skill == 3) {
                this.setState({ skill: "Very High" });
            }
        }

        if (data.radiant_gold_adv) {
            let graphDataArray = [];
            let graphData = [];
            for (let point in data.radiant_gold_adv) {
                if (data.radiant_gold_adv.hasOwnProperty(point)) {
                    let newPoint = { x: parseInt(point), y: data.radiant_gold_adv[point] };
                    graphData.push(newPoint);
                }
            }
            graphDataArray.push(graphData);
            this.setState({ radiantGoldAdvantage: graphDataArray });
        }

        if (data.radiant_xp_adv) {
            let graphDataArray = [];
            let graphData = [];
            for (let point in data.radiant_xp_adv) {
                if (data.radiant_xp_adv.hasOwnProperty(point)) {
                    let newPoint = { x: parseInt(point), y: data.radiant_xp_adv[point] };
                    graphData.push(newPoint);
                }
            }
            graphDataArray.push(graphData);
            this.setState({ radiantXpAdvantage: graphDataArray });
        }
    }

    normalizeGameMode(gameMode) {
        var trimmed = gameMode.replace('game_mode_', '');
        var split = trimmed.split("_");
        var normalized = "";
        for (var i = 0; i < split.length; i++) {
            split[i][0].toUpperCase();
            normalized += split[i].charAt(0).toUpperCase() + split[i].slice(1) + " ";
        }
        return normalized;
    }

    sortPlayers(array, sortField, sortDirection, isRadiant) {
        var obj = {};

        if (isRadiant) {
            obj.radiantSortField = sortField;
            obj.radiantSortDirection =
                sortField === this.state.radiantSortField ?
                    SORT_ENUM.next(SORT_ENUM[sortDirection]) :
                    SORT_ENUM[0]
            obj.radiantsPlayerList = defaultSort(array, sortField, obj.radiantSortDirection);
        } else {
            obj.direSortField = sortField;
            obj.direSortDirection =
                sortField === this.state.direSortField ?
                    SORT_ENUM.next(SORT_ENUM[sortDirection]) :
                    SORT_ENUM[0]
            obj.direPlayersList = defaultSort(array, sortField, obj.direSortDirection);
        }

        this.setState(obj)
    }

    calculateAverageMMR(data) {
        var totalMMR = 0;
        var availablePlayers = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].solo_competitive_rank) {
                availablePlayers++;
                totalMMR += data[i].solo_competitive_rank;
            }
        }
        var averageMMR = Math.round(totalMMR / availablePlayers);
        this.setState({ averageMMR: averageMMR });
    }

    getRegionIndex(regionId, regionsArray) {
        for (let i = 0; i < regionsArray.length; i++) {
            if (regionId == regionsArray[i].id) {
                return i;
            }
        }
    }

    generateProcessedPlayers(unprocessedPlayersList) {
        var processedPlayersList = [];
        for (let i = 0; i < unprocessedPlayersList.length; i++) {
            var currentUnprocessedPlayer = unprocessedPlayersList[i];

            var processedPlayer = {};
            processedPlayer.hero = currentUnprocessedPlayer.hero_id;
            if (currentUnprocessedPlayer.account_id) {
                processedPlayer.player = currentUnprocessedPlayer.personaname;
            } else {
                processedPlayer.player = "Anonymous";
            }
            processedPlayer.soloCompetitiveRank = currentUnprocessedPlayer.solo_competitive_rank;
            processedPlayer.level = currentUnprocessedPlayer.level;
            processedPlayer.kills = currentUnprocessedPlayer.kills;
            processedPlayer.deaths = currentUnprocessedPlayer.deaths;
            processedPlayer.assists = currentUnprocessedPlayer.assists;
            processedPlayer.gpm = currentUnprocessedPlayer.gold_per_min;
            processedPlayer.xpm = currentUnprocessedPlayer.xp_per_min;
            processedPlayer.lastHits = currentUnprocessedPlayer.last_hits;
            processedPlayer.denies = currentUnprocessedPlayer.denies;
            processedPlayer.heroDamage = kFormatter(currentUnprocessedPlayer.hero_damage);
            processedPlayer.heroHealing = kFormatter(currentUnprocessedPlayer.hero_healing);
            processedPlayer.towerDamage = kFormatter(currentUnprocessedPlayer.tower_damage);
            processedPlayer.totalGold = kFormatter(currentUnprocessedPlayer.total_gold);

            processedPlayer.backpack_0 = currentUnprocessedPlayer.backpack_0;
            var backpack_0_name = this.getItemName(processedPlayer.backpack_0);
            if (backpack_0_name) {
                let itemTiming = this.findItemTiming(currentUnprocessedPlayer.purchase_log, backpack_0_name);
                if (itemTiming) {
                    processedPlayer.backpack_0_timing = moment("1900-01-01 00:00:00").add(itemTiming, 'seconds').format("mm:ss");
                }
            }
            processedPlayer.backpack_1 = currentUnprocessedPlayer.backpack_1;
            var backpack_1_name = this.getItemName(processedPlayer.backpack_1);
            if (backpack_1_name) {
                let itemTiming = this.findItemTiming(currentUnprocessedPlayer.purchase_log, backpack_1_name);
                if (itemTiming) {
                    processedPlayer.backpack_1_timing = moment("1900-01-01 00:00:00").add(itemTiming, 'seconds').format("mm:ss");
                }
            }
            processedPlayer.backpack_2 = currentUnprocessedPlayer.backpack_2;
            var backpack_2_name = this.getItemName(processedPlayer.backpack_2);
            if (backpack_2_name) {
                let itemTiming = this.findItemTiming(currentUnprocessedPlayer.purchase_log, backpack_2_name);
                if (itemTiming) {
                    processedPlayer.backpack_2_timing = moment("1900-01-01 00:00:00").add(itemTiming, 'seconds').format("mm:ss");
                }
            }
            processedPlayer.item_0 = currentUnprocessedPlayer.item_0;
            var item_0_name = this.getItemName(processedPlayer.item_0);
            if (item_0_name) {
                let itemTiming = this.findItemTiming(currentUnprocessedPlayer.purchase_log, item_0_name);
                if (itemTiming) {
                    processedPlayer.item_0_timing = moment("1900-01-01 00:00:00").add(itemTiming, 'seconds').format("mm:ss");
                }
            }
            processedPlayer.item_1 = currentUnprocessedPlayer.item_1;
            var item_1_name = this.getItemName(processedPlayer.item_1);
            if (item_1_name) {
                let itemTiming = this.findItemTiming(currentUnprocessedPlayer.purchase_log, item_1_name);
                if (itemTiming) {
                    processedPlayer.item_1_timing = moment("1900-01-01 00:00:00").add(itemTiming, 'seconds').format("mm:ss");
                }
            }
            processedPlayer.item_2 = currentUnprocessedPlayer.item_2;
            var item_2_name = this.getItemName(processedPlayer.item_2);
            if (item_2_name) {
                let itemTiming = this.findItemTiming(currentUnprocessedPlayer.purchase_log, item_2_name);
                if (itemTiming) {
                    processedPlayer.item_2_timing = moment("1900-01-01 00:00:00").add(itemTiming, 'seconds').format("mm:ss");
                }
            }
            processedPlayer.item_3 = currentUnprocessedPlayer.item_3;
            var item_3_name = this.getItemName(processedPlayer.item_3);
            if (item_3_name) {
                let itemTiming = this.findItemTiming(currentUnprocessedPlayer.purchase_log, item_3_name);
                if (itemTiming) {
                    processedPlayer.item_3_timing = moment("1900-01-01 00:00:00").add(itemTiming, 'seconds').format("mm:ss");
                }
            }
            processedPlayer.item_4 = currentUnprocessedPlayer.item_4;
            var item_4_name = this.getItemName(processedPlayer.item_4);
            if (item_4_name) {
                let itemTiming = this.findItemTiming(currentUnprocessedPlayer.purchase_log, item_4_name);
                if (itemTiming) {
                    processedPlayer.item_4_timing = moment("1900-01-01 00:00:00").add(itemTiming, 'seconds').format("mm:ss");
                }
            }
            processedPlayer.item_5 = currentUnprocessedPlayer.item_5;
            var item_5_name = this.getItemName(processedPlayer.item_5);
            if (item_5_name) {
                let itemTiming = this.findItemTiming(currentUnprocessedPlayer.purchase_log, item_5_name);
                if (itemTiming) {
                    processedPlayer.item_5_timing = moment("1900-01-01 00:00:00").add(itemTiming, 'seconds').format("mm:ss");
                }
            }
            processedPlayer.backpack_0_uri = getItemImage(currentUnprocessedPlayer.backpack_0);
            processedPlayer.backpack_1_uri = getItemImage(currentUnprocessedPlayer.backpack_1);
            processedPlayer.backpack_2_uri = getItemImage(currentUnprocessedPlayer.backpack_2);
            processedPlayer.item_0_uri = getItemImage(currentUnprocessedPlayer.item_0);
            processedPlayer.item_1_uri = getItemImage(currentUnprocessedPlayer.item_1);
            processedPlayer.item_2_uri = getItemImage(currentUnprocessedPlayer.item_2);
            processedPlayer.item_3_uri = getItemImage(currentUnprocessedPlayer.item_3);
            processedPlayer.item_4_uri = getItemImage(currentUnprocessedPlayer.item_4);
            processedPlayer.item_5_uri = getItemImage(currentUnprocessedPlayer.item_5);

            processedPlayer.accountId = currentUnprocessedPlayer.account_id;
            processedPlayer.slot = i;

            processedPlayersList[i] = processedPlayer;
        }
        return processedPlayersList;
    }

    getItemName(itemId) {
        for (var key in items) {
            if (items.hasOwnProperty(key)) {
                if (key == itemId) {
                    return items[key];
                }
            }
        }
    }

    findItemTiming(purchaseLog, itemName) {
        for (var purchase in purchaseLog) {
            if (purchaseLog.hasOwnProperty(purchase)) {
                if (purchaseLog[purchase].key == itemName) {
                    return purchaseLog[purchase].time;
                }
            }
        }
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.props.actions.fetchMatchDetails(this.props.matchDetails.match_id).then(() => {
            this.setState({ refreshing: false });
        });
    }

    onRowPressed(row) {
        if (row == 0) {
            this.setState({ zero: !this.state.zero });
        } else if (row == 1) {
            this.setState({ one: !this.state.one });
        } else if (row == 2) {
            this.setState({ two: !this.state.two });
        } else if (row == 3) {
            this.setState({ three: !this.state.three });
        } else if (row == 4) {
            this.setState({ four: !this.state.four });
        } else if (row == 5) {
            this.setState({ five: !this.state.five });
        } else if (row == 6) {
            this.setState({ six: !this.state.six });
        } else if (row == 7) {
            this.setState({ seven: !this.state.seven });
        } else if (row == 8) {
            this.setState({ eight: !this.state.eight });
        } else if (row == 9) {
            this.setState({ nine: !this.state.nine });
        }
    }

    onNamePressed(id) {
        if (id) {
            if (this.props.parent == "Favourites") {
                this.props.navigationActions.pushContextIdFavourite(id);
                this.props.navigationActions.changeContextId(id);
                this.props.playerMatchesActions.resetMatchesPage();
                this.props.playerHeroesActions.resetHeroesPage();
                this.props.peersActions.resetPeersPage();
                Actions.playerProfileFavourite();
            } else if (this.props.parent == "Search") {
                this.props.navigationActions.pushContextIdSearch(id);
                this.props.navigationActions.changeContextId(id);
                this.props.playerMatchesActions.resetMatchesPage();
                this.props.playerHeroesActions.resetHeroesPage();
                this.props.peersActions.resetPeersPage();
                Actions.playerProfileSearch();
            } else if (this.props.parent == "Home") {
                this.props.navigationActions.pushContextIdHome(id);
                this.props.navigationActions.changeContextId(id);
                this.props.playerMatchesActions.resetMatchesPage();
                this.props.playerHeroesActions.resetHeroesPage();
                this.props.peersActions.resetPeersPage();
                Actions.playerProfileHome();
            }
        }
    }

    renderRow(rowData, i, j) {
        var rowContainer;
        var additionalRowContainer;
        if ((parseInt(j) + 1) % 2 == 0) {
            rowContainer = [styles.rowContainerEven, { backgroundColor: this.props.mod }];
            additionalRowContainer = { paddingTop: 10, paddingBottom: 10, backgroundColor: this.props.mod, flex: 1, flexDirection: 'row' };
        } else {
            rowContainer = [styles.rowContainerOdd, { backgroundColor: this.props.alpha }];
            additionalRowContainer = { paddingTop: 10, paddingBottom: 10, backgroundColor: this.props.alpha, flex: 1, flexDirection: 'row' };
        }
        var staticUri = getHeroImage(rowData.hero);
        var toggled;
        if (rowData.slot == 0) {
            toggled = this.state.zero;
        } else if (rowData.slot == 1) {
            toggled = this.state.one;
        } else if (rowData.slot == 2) {
            toggled = this.state.two;
        } else if (rowData.slot == 3) {
            toggled = this.state.three;
        } else if (rowData.slot == 4) {
            toggled = this.state.four;
        } else if (rowData.slot == 5) {
            toggled = this.state.five;
        } else if (rowData.slot == 6) {
            toggled = this.state.six;
        } else if (rowData.slot == 7) {
            toggled = this.state.seven;
        } else if (rowData.slot == 8) {
            toggled = this.state.eight;
        } else if (rowData.slot == 9) {
            toggled = this.state.nine;
        }
        var additionalInfo;
        if (toggled) {
            additionalInfo = (
                <View style={[additionalRowContainer, { paddingHorizontal: 15 }]}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: this.props.legend, fontSize: 12, fontWeight: 'bold' }}>Last Hits: </Text>
                            <Text style={{ color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold' }}>{rowData.lastHits}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: this.props.legend, fontSize: 12, fontWeight: 'bold' }}>Denies: </Text>
                            <Text style={{ color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold' }}>{rowData.denies}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: this.props.legend, fontSize: 12, fontWeight: 'bold' }}>Total Gold: </Text>
                            <Text style={{ color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold' }}>{rowData.totalGold}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: this.props.legend, fontSize: 12, fontWeight: 'bold' }}>Hero Damage: </Text>
                            <Text style={{ color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold' }}>{rowData.heroDamage}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: this.props.legend, fontSize: 12, fontWeight: 'bold' }}>Hero Healing: </Text>
                            <Text style={{ color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold' }}>{rowData.heroHealing}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: this.props.legend, fontSize: 12, fontWeight: 'bold' }}>Tower Damage: </Text>
                            <Text style={{ color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold' }}>{rowData.towerDamage}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 23 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <ImageBackground source={rowData.item_0_uri} style={{ width: 30, height: 24, marginLeft: 23 }}>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: this.props.secondLegend, fontSize: 10 }}>{rowData.item_0_timing}</Text>
                                </View>
                            </ImageBackground>
                            <ImageBackground source={rowData.item_1_uri} style={{ width: 30, height: 24 }}>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: this.props.secondLegend, fontSize: 10 }}>{rowData.item_1_timing}</Text>
                                </View>
                            </ImageBackground>
                            <ImageBackground source={rowData.item_2_uri} style={{ width: 30, height: 24 }}>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: this.props.secondLegend, fontSize: 10 }}>{rowData.item_2_timing}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <ImageBackground source={rowData.item_3_uri} style={{ width: 30, height: 24, marginLeft: 23 }}>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: this.props.secondLegend, fontSize: 10 }}>{rowData.item_3_timing}</Text>
                                </View>
                            </ImageBackground>
                            <ImageBackground source={rowData.item_4_uri} style={{ width: 30, height: 24 }}>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: this.props.secondLegend, fontSize: 10 }}>{rowData.item_4_timing}</Text>
                                </View>
                            </ImageBackground>
                            <ImageBackground source={rowData.item_5_uri} style={{ width: 30, height: 24 }}>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: this.props.secondLegend, fontSize: 10 }}>{rowData.item_5_timing}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={require('../assets/backpack.png')} style={{ width: 23, height: 23 }}
                            />
                            <ImageBackground source={rowData.backpack_0_uri} style={{ width: 30, height: 24 }}>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: this.props.secondLegend, fontSize: 10 }}>{rowData.backpack_0_timing}</Text>
                                </View>
                            </ImageBackground>
                            <ImageBackground source={rowData.backpack_1_uri} style={{ width: 30, height: 24 }}>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: this.props.secondLegend, fontSize: 10 }}>{rowData.backpack_1_timing}</Text>
                                </View>
                            </ImageBackground>
                            <ImageBackground source={rowData.backpack_2_uri} style={{ width: 30, height: 24 }}>
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: this.props.secondLegend, fontSize: 10 }}>{rowData.backpack_2_timing}</Text>
                                </View>
                            </ImageBackground>
                        </View>

                    </View>
                </View>
            );
        } else {
            additionalInfo = (<View />);
        }

        var mmr;
        if (rowData.soloCompetitiveRank) {
            mmr = (<Text style={{ color: this.props.legend, fontSize: 12, alignSelf: 'center' }}>{rowData.soloCompetitiveRank}</Text>);
        } else {
            mmr = (<View />);
        }
        return (
            <TouchableOpacity onPress={() => { this.onRowPressed(rowData.slot) }}>
                <View style={rowContainer}>
                    <View style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={staticUri} style={styles.imageAvatar} />
                    </View>
                    <TouchableOpacity style={styles.cell} onPress={() => { this.onNamePressed(rowData.accountId) }}>
                        <View>
                            <Text style={[styles.tableValueText, { color: this.props.secondLegend }]}>{rowData.player}</Text>
                            {mmr}
                        </View>
                    </TouchableOpacity>
                    <View style={styles.cell}>
                        <Text style={[styles.tableValueText, { color: this.props.secondLegend }]}>{rowData.kills}/{rowData.deaths}/{rowData.assists}</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={[styles.tableValueText, { color: this.props.secondLegend }]}>{rowData.gpm}</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={[styles.tableValueText, { color: this.props.secondLegend }]}>{rowData.xpm}</Text>
                    </View>
                </View>
                {additionalInfo}
            </TouchableOpacity>
        );
    }

    render() {
        var content;
        if (this.props.isLoadingMatchDetails) {
            content = (
                <View style={styles.contentContainer}>
                    <ActivityIndicator size="large" color={this.props.legend} />
                </View>
            )
        } else if (this.props.isEmptyMatchDetails) {
            content = (
                <View style={styles.contentContainer}>
                    <Text style={styles.noDataText}>No data found</Text>
                </View>
            )
        } else {
            if (this.props.matchDetails) {
                if (this.props.matchDetails.players.length > 0) {
                    var teamImage = (<View />);
                    var goldGraph;
                    var xpGraph;
                    if (this.state.radiantWin) {
                        teamImage = (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../assets/radiant.png')} style={{ width: 50, height: 50 }} />
                                <Text style={{ color: this.props.secondLegend, fontSize: 16, fontWeight: 'bold' }}>Radiant Victory</Text>
                            </View>
                        );
                    } else {
                        teamImage = (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../assets/dire.png')} style={{ width: 50, height: 50 }} />
                                <Text style={{ color: this.props.secondLegend, fontSize: 16, fontWeight: 'bold' }}>Dire Victory</Text>
                            </View>
                        );
                    }
                    var parsedWarning = (<View />);
                    if (this.props.matchDetails.radiant_gold_adv) {
                        parsedWarning = (<View />);
                        
                        goldGraph = (
                            <View style={[styles.profileCardContainer, { backgroundColor: this.props.mod }]}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginHorizontal: 10 }}>
                                    <Text style={[styles.titleText, { color: this.props.secondLegend }]}>Radiant Gold Advantage</Text>
                                </View>
                                <View style={[styles.separator, { backgroundColor: this.props.legend }]} />
                                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                                    <View style={{ flexDirection: 'row' }}>
                                    </View>
                                </ScrollView>
                            </View>

                        );
                    } else {
                        parsedWarning = (
                            <View style={[styles.profileCardContainer, { backgroundColor: this.props.mod, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }]}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <FontAwesome name="exclamation-triangle" size={24} allowFontScaling={false} color={this.props.legend} />
                                </View>
                                <View style={{ flex: 7 }}>
                                    <Text style={{ color: this.props.secondLegend, fontSize: 16 }}>The replay for this match has not yet been parsed. Not all data may be available.</Text>
                                </View>
                            </View>
                        );
                        goldGraph = (<View />);
                    }

                    if (this.props.matchDetails.radiant_xp_adv) {
                        
                        xpGraph = (
                            <View style={[styles.profileCardContainer, { backgroundColor: this.props.mod }]}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginHorizontal: 10 }}>
                                    <Text style={[styles.titleText, { color: this.props.secondLegend }]}>Radiant XP Advantage</Text>
                                </View>
                                <View style={[styles.separator, { backgroundColor: this.props.legend }]} />
                                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                                    <View style={{ flexDirection: 'row' }}>
                                    </View>
                                </ScrollView>
                            </View>

                        );
                    } else {
                        xpGraph = (<View />);
                    }

                    var refreshColor = this.props.legendHex;
                    content = (
                        <KeyboardAwareScrollView style={{ marginTop: 5 }}
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
                            {parsedWarning}
                            <View style={[styles.profileCardContainer, { backgroundColor: this.props.mod }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 4 }}>
                                        {teamImage}
                                    </View>
                                    <View style={{ flex: 5, justifyContent: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ color: this.props.legend, fontSize: 14, fontWeight: 'bold' }}>Match ID: </Text>
                                            <Text style={{ color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold' }}>{this.state.matchId}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ color: this.props.legend, fontSize: 14, fontWeight: 'bold' }}>Region: </Text>
                                            <Text style={{ color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold' }}>{this.state.region}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ color: this.props.legend, fontSize: 14, fontWeight: 'bold' }}>Skill: </Text>
                                            <Text style={{ color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold' }}>{this.state.skill}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: Colors.win, fontSize: 40 }}>{this.state.radiantScore}</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: this.props.secondLegend, fontSize: 14 }}>{this.state.gameMode}</Text>
                                        <Text style={{ color: this.props.secondLegend, fontSize: 14, fontWeight: 'bold' }}>{this.state.formattedDuration}</Text>
                                        <Text style={{ color: this.props.secondLegend, fontSize: 14 }}>ENDED {this.state.endedTime} AGO</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: Colors.lose, fontSize: 40 }}>{this.state.direScore}</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={[styles.matchesCardContainer, { backgroundColor: this.props.mod }]}>
                                <View style={[styles.titleContainer, { flexDirection: 'row' }]}>
                                    <Image source={require('../assets/radiant.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
                                    <Text style={[styles.titleText, { color: this.props.secondLegend }]}>RADIANT</Text>
                                </View>
                                <View style={[styles.separator, { backgroundColor: this.props.legend }]} />
                                <View style={styles.tableHeaderContainer}>
                                    <View style={{
                                        flex: 2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 10,
                                        marginBottom: 10
                                    }}>
                                        <Text style={[styles.tableHeaderText, { color: this.props.secondLegend }]}>Hero</Text>
                                    </View>
                                    <View style={styles.tableHeaderCell}>
                                        <TouchableOpacity onPress={() => this.sortPlayers(this.state.radiantPlayersList, "player", this.state.radiantSortDirection, true)}>
                                            <Text style={[styles.tableHeaderText, { color: this.props.secondLegend }]}>Player</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.tableHeaderCell}>
                                        <TouchableOpacity onPress={() => this.sortPlayers(this.state.radiantPlayersList, "kda", this.state.radiantSortDirection, true)}>
                                            <Text style={[styles.tableHeaderText, { color: this.props.secondLegend }]}>K/D/A</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.tableHeaderCell}>
                                        <TouchableOpacity onPress={() => this.sortPlayers(this.state.radiantPlayersList, "gpm", this.state.radiantSortDirection, true)}>
                                            <Text style={[styles.tableHeaderText, { color: this.props.secondLegend }]}>GPM</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.tableHeaderCell}>
                                        <TouchableOpacity onPress={() => this.sortPlayers(this.state.radiantPlayersList, "xpm", this.state.radiantSortDirection, true)}>
                                            <Text style={[styles.tableHeaderText, { color: this.props.secondLegend }]}>XPM</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <ListView style={styles.matchesListView}
                                    dataSource={this.radiantDS.cloneWithRows(this.state.radiantPlayersList)}
                                    renderRow={this.renderRow}
                                    enableEmptySections={true}
                                    initialListSize={120}
                                />
                            </View>
                            <View style={[styles.matchesCardContainer, { backgroundColor: this.props.mod }]}>
                                <View style={[styles.titleContainer, { flexDirection: 'row' }]}>
                                    <Image source={require('../assets/dire.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
                                    <Text style={[styles.titleText, { color: this.props.secondLegend }]}>DIRE</Text>
                                </View>
                                <View style={[styles.separator, { backgroundColor: this.props.legend }]} />
                                <View style={styles.tableHeaderContainer}>
                                    <View style={{
                                        flex: 2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 10,
                                        marginBottom: 10
                                    }}>
                                        <Text style={[styles.tableHeaderText, { color: this.props.secondLegend }]}>Hero</Text>
                                    </View>
                                    <View style={styles.tableHeaderCell}>
                                        <TouchableOpacity onPress={() => this.sortPlayers(this.state.direPlayersList, "player", this.state.direSortDirection)}>
                                            <Text style={[styles.tableHeaderText, { color: this.props.secondLegend }]}>Player</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.tableHeaderCell}>
                                        <TouchableOpacity onPress={() => this.sortPlayers(this.state.direPlayersList, "kda", this.state.direSortDirection)}>
                                            <Text style={[styles.tableHeaderText, { color: this.props.secondLegend }]}>K/D/A</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.tableHeaderCell}>
                                        <TouchableOpacity onPress={() => this.sortPlayers(this.state.direPlayersList, "gpm", this.state.direSortDirection)}>
                                            <Text style={[styles.tableHeaderText, { color: this.props.secondLegend }]}>GPM</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.tableHeaderCell}>
                                        <TouchableOpacity onPress={() => this.sortPlayers(this.state.direPlayersList, "xpm", this.state.direSortDirection)}>
                                            <Text style={[styles.tableHeaderText, { color: this.props.secondLegend }]}>XPM</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <ListView style={styles.matchesListView}
                                    dataSource={this.direDS.cloneWithRows(this.state.direPlayersList)}
                                    renderRow={this.renderRow}
                                    enableEmptySections={true}
                                    initialListSize={120}
                                />
                            </View>
                            {goldGraph}
                            {xpGraph}
                        </KeyboardAwareScrollView>
                    )
                }
            }
        }
        return (
            <View style={{ marginTop: 10 }}>
                {content}
            </View>
        )
    }

}

const baseStyles = _.extend(base.general, {
    matchesCardContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        paddingTop: 10,
        borderRadius: 3
    },
    titleText: {
        fontFamily: Fonts.base,
        fontSize: 28,
        textAlign: 'center'
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

export default connect(mapStateToProps, mapDispatchToProps)(MatchOverview);
