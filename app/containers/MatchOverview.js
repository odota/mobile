import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as matchDetailsActions from '../actions/match_details_act';
import * as playerOverviewActions from '../actions/player_overview_act';
import * as playerMatchesActions from '../actions/player_matches_act';
import * as navigationActions from '../actions/navigation_act';
import { Actions } from 'react-native-router-flux';

import { Avatar } from 'react-native-material-design';
import { kFormatter } from '../utils/kFormatter';
import { getHeroImage } from '../utils/getHeroImage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import items from '../json/items.json';
import itemIds from '../json/item_ids.json';

import _ from 'lodash';

import ProfileCard from '../components/ProfileCard';
import HeroesCard from '../components/HeroesCard';
import MatchesCard from '../components/MatchesCard';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    matchDetails: state.matchDetailsState.matchDetails,
    isLoadingMatchDetails: state.matchDetailsState.isLoadingMatchDetails,
    isEmptyMatchDetails: state.matchDetailsState.isEmptyMatchDetails,
    isLoadingOverview: state.playerOverviewState.isLoadingOverview,
    isEmptyOverview: state.playerOverviewState.isEmptyOverview,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    legend: state.settingsState.legend,
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    secondLegend: state.settingsState.secondLegend,
    parent: state.navigationState.parent
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(matchDetailsActions, dispatch)
});

class MatchOverview extends Component {

    constructor(props) {
        super(props);
        this.radiantDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.direDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.renderRow = this.renderRow.bind(this);
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
            refreshing: false
        };
        this.generateProcessedPlayers = this.generateProcessedPlayers.bind(this);
        this.getItemIndex = this.getItemIndex.bind(this);
        this.onRowPressed = this.onRowPressed.bind(this);
    }

    componentWillMount() {
        if(this.props.matchDetails.players) {
            if(this.props.matchDetails.players.length > 0) {
                var players = this.props.matchDetails.players;
                var processedPlayersList = this.generateProcessedPlayers(players);
                var radiantPlayersList = processedPlayersList.slice(0,5);
                var direPlayersList = processedPlayersList.slice(5,10);
                this.setState({radiantPlayersList: radiantPlayersList});
                this.setState({direPlayersList: direPlayersList});
            }
        }
    }

    getItemIndex(itemId, itemsArray) {
        for (i = 0; i < itemsArray.length; i++) {
            if(itemId == itemsArray[i].id) {
                return i;
            }
        }
    }

    generateProcessedPlayers(unprocessedPlayersList) {
        var processedPlayersList = [];
        for (i = 0; i < unprocessedPlayersList.length; i++) {
            var currentUnprocessedPlayer = unprocessedPlayersList[i];

            var processedPlayer = {};
            processedPlayer.hero = currentUnprocessedPlayer.hero_id;
            if(currentUnprocessedPlayer.account_id) {
                processedPlayer.player = currentUnprocessedPlayer.personaname;
            } else {
                processedPlayer.player = "Anonymous";
            }
            processedPlayer.level = currentUnprocessedPlayer.level;
            processedPlayer.kills = currentUnprocessedPlayer.kills;
            processedPlayer.deaths = currentUnprocessedPlayer.deaths;
            processedPlayer.assists = currentUnprocessedPlayer.assists;
            processedPlayer.gpm = currentUnprocessedPlayer.gold_per_min;
            processedPlayer.xpm = currentUnprocessedPlayer.xp_per_min;
            processedPlayer.lastHits = currentUnprocessedPlayer.last_hits;
            processedPlayer.denies = currentUnprocessedPlayer.denies;
            processedPlayer.heroDamage= kFormatter(currentUnprocessedPlayer.hero_damage);
            processedPlayer.heroHealing = kFormatter(currentUnprocessedPlayer.hero_healing);
            processedPlayer.towerDamage = kFormatter(currentUnprocessedPlayer.tower_damage);
            processedPlayer.totalGold = kFormatter(currentUnprocessedPlayer.total_gold);
            processedPlayer.backpack_0 = currentUnprocessedPlayer.backpack_0;
            processedPlayer.backpack_1 = currentUnprocessedPlayer.backpack_1;
            processedPlayer.backpack_2 = currentUnprocessedPlayer.backpack_2;
            processedPlayer.item_0 = currentUnprocessedPlayer.item_0;
            processedPlayer.item_1 = currentUnprocessedPlayer.item_1;
            processedPlayer.item_2 = currentUnprocessedPlayer.item_2;
            processedPlayer.item_3 = currentUnprocessedPlayer.item_3;
            processedPlayer.item_4 = currentUnprocessedPlayer.item_4;
            processedPlayer.item_5 = currentUnprocessedPlayer.item_5;
            var backpack_0_key = itemIds[currentUnprocessedPlayer.backpack_0];
            if(backpack_0_key) {
                processedPlayer.backpack_0_path = items.itemdata[backpack_0_key].img;
            } else {
                processedPlayer.backpack_0_path = "../assets/blank.jpg";
            }
            console.log(currentUnprocessedPlayer.backpack_0);
            console.log(backpack_0_key);
            console.log(processedPlayer.backpack_0_path);
            processedPlayer.slot = i;

            processedPlayersList[i] = processedPlayer;
        }
        return processedPlayersList;
    }

    onRefresh() {
        this.setState({refreshing: true});
        this.props.actions.fetchMatchDetails(this.props.matchDetails.match_id).then(() => {
            this.setState({refreshing: false});
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.matchDetails && nextProps.matchDetails.players.length > 0) {
            var players = nextProps.matchDetails.players;
            var processedPlayersList = this.generateProcessedPlayers(players);
            var radiantPlayersList = processedPlayersList.slice(0,5);
            var direPlayersList = processedPlayersList.slice(5,9);
        }
    }

    onRowPressed(row) {
        if(row == 0) {
            this.setState({zero: !this.state.zero});
        } else if (row == 1) {
            this.setState({one: !this.state.one});
        } else if (row == 2) {
            this.setState({two: !this.state.two});
        } else if (row == 3) {
            this.setState({three: !this.state.three});
        } else if (row == 4) {
            this.setState({four: !this.state.four});
        } else if (row == 5) {
            this.setState({five: !this.state.five});
        } else if (row == 6) {
            this.setState({six: !this.state.six});
        } else if (row == 7) {
            this.setState({seven: !this.state.seven});
        } else if (row == 8) {
            this.setState({eight: !this.state.eight});
        } else if (row == 9) {
            this.setState({nine: !this.state.nine});
        }
    }

    renderRow(rowData, i, j) {
        var rowContainer;
        if((parseInt(j)+1) % 2 == 0) {
            rowContainer = [styles.rowContainerEven, {backgroundColor: this.props.mod}];
            additionalRowContainer = {paddingTop: 10, paddingBottom: 10, backgroundColor: this.props.mod, flex: 1, flexDirection: 'row'};
        } else {
            rowContainer = [styles.rowContainerOdd, {backgroundColor: this.props.alpha}];
            additionalRowContainer = {paddingTop: 10, paddingBottom: 10, backgroundColor: this.props.alpha, flex: 1, flexDirection: 'row'};
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
        if(toggled) {
            additionalInfo = (
                <View style = {[additionalRowContainer, {paddingHorizontal: 15}]}>
                    <View style = {{flex: 1}}>
                        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style = {{color: this.props.legend, fontSize: 12, fontWeight: 'bold'}}>Last Hits: </Text>
                            <Text style = {{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{rowData.lastHits}</Text>
                        </View>
                        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style = {{color: this.props.legend, fontSize: 12, fontWeight: 'bold'}}>Denies: </Text>
                            <Text style = {{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{rowData.denies}</Text>
                        </View>
                        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style = {{color: this.props.legend, fontSize: 12, fontWeight: 'bold'}}>Total Gold: </Text>
                            <Text style = {{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{rowData.totalGold}</Text>
                        </View>
                    </View>
                    <View style = {{flex: 1}}>
                        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style = {{color: this.props.legend, fontSize: 12, fontWeight: 'bold'}}>Hero Damage: </Text>
                            <Text style = {{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{rowData.heroDamage}</Text>
                        </View>
                        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style = {{color: this.props.legend, fontSize: 12, fontWeight: 'bold'}}>Hero Healing: </Text>
                            <Text style = {{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{rowData.heroHealing}</Text>
                        </View>
                        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style = {{color: this.props.legend, fontSize: 12, fontWeight: 'bold'}}>Tower Damage: </Text>
                            <Text style = {{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{rowData.towerDamage}</Text>
                        </View>
                    </View>
                    <View style = {{flex: 1}}>
                        <Image
                            source={{uri: rowData.backpack_0_path}}
                       />
                    </View>
                </View>
            );
        } else {
            additionalInfo = (<View/>);
        }
        return (
            <TouchableOpacity onPress = {() => {this.onRowPressed(rowData.slot)}}>
                <View style = {rowContainer}>
                    <View style = {{flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <Avatar image = {<Image source = {staticUri} />} size = {40} borderRadius = {20} />
                    </View>
                    <View style = {styles.cell}>
                        <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.player}</Text>
                    </View>
                    <View style = {styles.cell}>
                        <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.kills}/{rowData.deaths}/{rowData.assists}</Text>
                    </View>
                    <View style = {styles.cell}>
                        <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.gpm}</Text>
                    </View>
                    <View style = {styles.cell}>
                        <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.xpm}</Text>
                    </View>
                </View>
                {additionalInfo}
            </TouchableOpacity>

        );
    }

    render() {
        var content;
        if(this.props.isLoadingMatchDetails) {
            content = (
                <View style = {styles.contentContainer}>
                    <ActivityIndicator size="large" color = {this.props.legend}/>
                </View>
            )
        } else if(this.props.isEmptyMatchDetails) {
            content = (
                <View style = {styles.contentContainer}>
                    <Text style = {styles.noDataText}>No data found</Text>
                </View>
            )
        } else {
            if(this.props.matchDetails) {
                if(this.props.matchDetails.players.length > 0) {
                    var refreshColor = this.props.legendHex;
                    content = (
                        <KeyboardAwareScrollView style = {{marginTop: 5}}
                            refreshControl={
                                <RefreshControl
                                    refreshing = {this.state.refreshing}
                                    onRefresh = {this.onRefresh.bind(this)}
                                    tintColor = {refreshColor}
                                    title = 'Refreshing'
                                    titleColor = {refreshColor}
                                    colors = {[refreshColor]}
                                    progressBackgroundColor="#ffffffff"
                                />
                            }>
                            <View style = {[styles.matchesCardContainer, {backgroundColor: this.props.mod}]}>
                                <View style = {styles.titleContainer}>
                                    <Text style = {[styles.titleText, {color: this.props.secondLegend}]}>RADIANT</Text>
                                </View>
                                <View style = {[styles.separator, {backgroundColor: this.props.legend}]} />
                                <View style = {styles.tableHeaderContainer}>
                                    <View style = {{flex: 2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 10,
                                        marginBottom: 10}}>
                                        <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Hero</Text>
                                    </View>
                                    <View style = {styles.tableHeaderCell}>
                                        <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Player</Text>
                                    </View>
                                    <View style = {styles.tableHeaderCell}>
                                        <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>K/D/A</Text>
                                    </View>
                                    <View style = {styles.tableHeaderCell}>
                                        <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>GPM</Text>
                                    </View>
                                    <View style = {styles.tableHeaderCell}>
                                        <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>XPM</Text>
                                    </View>
                                </View>
                                <ListView style = {styles.matchesListView}
                                    dataSource = {this.radiantDS.cloneWithRows(this.state.radiantPlayersList)}
                                    renderRow = {this.renderRow}
                                    enableEmptySections = {true}
                                    initialListSize = {120}
                                />
                            </View>
                            <View style = {[styles.matchesCardContainer, {backgroundColor: this.props.mod}]}>
                                <View style = {styles.titleContainer}>
                                    <Text style = {[styles.titleText, {color: this.props.secondLegend}]}>DIRE</Text>
                                </View>
                                <View style = {[styles.separator, {backgroundColor: this.props.legend}]} />
                                <View style = {styles.tableHeaderContainer}>
                                    <View style = {{flex: 2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 10,
                                        marginBottom: 10}}>
                                        <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Hero</Text>
                                    </View>
                                    <View style = {styles.tableHeaderCell}>
                                        <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Player</Text>
                                    </View>
                                    <View style = {styles.tableHeaderCell}>
                                        <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>K/D/A</Text>
                                    </View>
                                    <View style = {styles.tableHeaderCell}>
                                        <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>GPM</Text>
                                    </View>
                                    <View style = {styles.tableHeaderCell}>
                                        <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>XPM</Text>
                                    </View>
                                </View>
                                <ListView style = {styles.matchesListView}
                                    dataSource = {this.direDS.cloneWithRows(this.state.direPlayersList)}
                                    renderRow = {this.renderRow}
                                    enableEmptySections = {true}
                                    initialListSize = {120}
                                />
                            </View>
                        </KeyboardAwareScrollView>
                    )
                }
            }
        }
        return(
            <View style = {{marginTop: 10}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(MatchOverview);
