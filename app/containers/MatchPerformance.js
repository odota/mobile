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
import * as navigationActions from '../actions/navigation_act';
import { Actions } from 'react-native-router-flux';

import { Avatar } from 'react-native-material-design';
import { kFormatter } from '../utils/kFormatter';
import { getHeroImage } from '../utils/getHeroImage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import moment from 'moment';

import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

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
    parent: state.navigationState.parent
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(matchDetailsActions, dispatch)
});

class MatchPerformance extends Component {

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
        this.onRowPressed = this.onRowPressed.bind(this);
    }

    componentWillMount() {
        if(this.props.matchDetails) {
            if(this.props.matchDetails.players) {
                if(this.props.matchDetails.players.length > 0) {
                    var players = this.props.matchDetails.players;
                    var processedPlayersList = this.generateProcessedPlayers(players);
                    var radiantPlayersList = processedPlayersList.slice(0, 5);
                    var direPlayersList = processedPlayersList.slice(5, 10);
                    this.setState({radiantPlayersList: radiantPlayersList});
                    this.setState({direPlayersList: direPlayersList});
                }
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.matchDetails && nextProps.matchDetails.players.length > 0) {
            var players = nextProps.matchDetails.players;
            var processedPlayersList = this.generateProcessedPlayers(players);
            var radiantPlayersList = processedPlayersList.slice(0, 5);
            var direPlayersList = processedPlayersList.slice(5, 10);
            this.setState({radiantPlayersList: radiantPlayersList});
            this.setState({direPlayersList: direPlayersList});
        }
    }

    generateProcessedPlayers(unprocessedPlayersList) {
        var processedPlayersList = [];
        for (i = 0; i < unprocessedPlayersList.length; i ++) {
            var currentUnprocessedPlayer = unprocessedPlayersList[i];

            var processedPlayer = {};
            processedPlayer.hero = currentUnprocessedPlayer.hero_id;
            if(currentUnprocessedPlayer.account_id) {
                processedPlayer.player = currentUnprocessedPlayer.personaname;
            } else {
                processedPlayer.player = "Anonymous";
            }
            processedPlayer.soloCompetitiveRank = currentUnprocessedPlayer.solo_competitive_rank;

            if(Object.keys(currentUnprocessedPlayer.multi_kills)[Object.keys(currentUnprocessedPlayer.multi_kills).length - 1]) {
                processedPlayer.multi = Object.keys(currentUnprocessedPlayer.multi_kills)[Object.keys(currentUnprocessedPlayer.multi_kills).length - 1];
            } else {
                processedPlayer.multi = "-";
            }

            if(Object.keys(currentUnprocessedPlayer.kill_streaks)[Object.keys(currentUnprocessedPlayer.kill_streaks).length - 1]) {
                processedPlayer.streak = Object.keys(currentUnprocessedPlayer.kill_streaks)[Object.keys(currentUnprocessedPlayer.kill_streaks).length - 1];
            } else {
                processedPlayer.streak = "-";
            }

            if(currentUnprocessedPlayer.stuns > 0) {
                processedPlayer.stuns = currentUnprocessedPlayer.stuns.toFixed(2);
            } else {
                processedPlayer.stuns = "-";
            }

            if(currentUnprocessedPlayer.creeps_stacked > 0) {
                processedPlayer.stacked = currentUnprocessedPlayer.creeps_stacked;
            } else {
                processedPlayer.stacked = "-";
            }

            processedPlayer.dead = moment("1900-01-01 00:00:00").add(currentUnprocessedPlayer.life_state_dead, 'seconds').format("mm:ss");

            if(currentUnprocessedPlayer.buyback_count > 0) {
                processedPlayer.buyback = currentUnprocessedPlayer.buyback_count;
            } else {
                processedPlayer.buyback = "-";
            }

            if(currentUnprocessedPlayer.pings > 0) {
                processedPlayer.pings = currentUnprocessedPlayer.pings;
            } else {
                processedPlayer.pings = "-";
            }

            processedPlayer.heroDamagePerMin = (currentUnprocessedPlayer.benchmarks.hero_damage_per_min.pct * 100).toFixed(2);
            processedPlayer.heroDamagePerMinRaw = currentUnprocessedPlayer.benchmarks.hero_damage_per_min.raw.toFixed(2);

            processedPlayer.heroHealingPerMin = (currentUnprocessedPlayer.benchmarks.hero_healing_per_min.pct * 100).toFixed(2);
            processedPlayer.heroHealingPerMinRaw = currentUnprocessedPlayer.benchmarks.hero_healing_per_min.raw.toFixed(2);

            processedPlayer.killsPerMin = (currentUnprocessedPlayer.benchmarks.kills_per_min.pct * 100).toFixed(2);
            processedPlayer.killsPerMinRaw = currentUnprocessedPlayer.benchmarks.kills_per_min.raw.toFixed(2);

            processedPlayer.lastHitsPerMin = (currentUnprocessedPlayer.benchmarks.last_hits_per_min.pct * 100).toFixed(2);
            processedPlayer.lastHitsPerMinRaw = currentUnprocessedPlayer.benchmarks.last_hits_per_min.raw.toFixed(2);

            processedPlayer.towerDamage = (currentUnprocessedPlayer.benchmarks.tower_damage.pct * 100).toFixed(2);
            processedPlayer.towerDamageRaw = currentUnprocessedPlayer.benchmarks.tower_damage.raw;

            processedPlayer.xpPerMin = (currentUnprocessedPlayer.benchmarks.xp_per_min.pct * 100).toFixed(2);
            processedPlayer.xpPerMinRaw = currentUnprocessedPlayer.benchmarks.xp_per_min.raw.toFixed(2);

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
                        <Text style = {{color: this.props.legend, fontSize: 12, fontWeight: 'bold'}}>Stacked: </Text>
                        <Text style = {{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{rowData.stacked}</Text>
                    </View>
                    <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style = {{color: this.props.legend, fontSize: 12, fontWeight: 'bold'}}>Dead: </Text>
                        <Text style = {{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{rowData.dead}</Text>
                    </View>
                    <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style = {{color: this.props.legend, fontSize: 12, fontWeight: 'bold'}}>Buybacks: </Text>
                        <Text style = {{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{rowData.buyback}</Text>
                    </View>
                    <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style = {{color: this.props.legend, fontSize: 12, fontWeight: 'bold'}}>Pings (Map): </Text>
                        <Text style = {{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{rowData.pings}</Text>
                    </View>
                </View>
                </View>
            )
        } else {
            additionalInfo = (<View/>);
        }

        var mmr;
        if(rowData.soloCompetitiveRank) {
            mmr = (<Text style = {{color: this.props.legend, fontSize: 12}}>{rowData.soloCompetitiveRank}</Text>);
        } else {
            mmr = (<View/>);
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
                        {mmr}
                    </View>
                    <View style = {styles.cell}>
                        <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.multi}</Text>
                    </View>
                    <View style = {styles.cell}>
                        <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.streak}</Text>
                    </View>
                    <View style = {styles.cell}>
                        <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.stuns}</Text>
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
                                <View style = {[styles.titleContainer, {flexDirection: 'row'}]}>
                                    <Image source={require('../assets/radiant.png')} style={{width: 30, height: 30, marginRight: 10}}/>
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
                                        <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Multi</Text>
                                    </View>
                                    <View style = {styles.tableHeaderCell}>
                                        <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Streak</Text>
                                    </View>
                                    <View style = {styles.tableHeaderCell}>
                                        <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Stuns</Text>
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
                                <View style = {[styles.titleContainer, {flexDirection: 'row'}]}>
                                    <Image source={require('../assets/dire.png')} style={{width: 30, height: 30, marginRight: 10}}/>
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
                                        <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Multi</Text>
                                    </View>
                                    <View style = {styles.tableHeaderCell}>
                                        <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Streak</Text>
                                    </View>
                                    <View style = {styles.tableHeaderCell}>
                                        <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Stuns</Text>
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
    rawValueText: {
        fontFamily: Fonts.base,
        fontSize: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(MatchPerformance);
