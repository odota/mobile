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
            '0': false,
            '1': false,
            '2': false,
            '3': false,
            '4': false,
            '5': false,
            '6': false,
            '7': false,
            '8': false,
            '9': false,
            radiantPlayersList: [],
            direPlayersList: [],
            refreshing: false
        };
        this.generateProcessedPlayers = this.generateProcessedPlayers.bind(this);
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

    generateProcessedPlayers(unprocessedPlayersList) {
        var processedPlayersList = [];
        for (i = 0; i < unprocessedPlayersList.length; i++) {
            var currentUnprocessedPlayer = unprocessedPlayersList[i];

            var processedPlayer = {};
            processedPlayer.hero = currentUnprocessedPlayer.hero_id;
            processedPlayer.player = currentUnprocessedPlayer.personaname;
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

    renderRow(rowData, i, j) {
        var rowContainer;
        if((parseInt(j)+1) % 2 == 0) {
            rowContainer = [styles.rowContainerEven, {backgroundColor: this.props.mod}];
        } else {
            rowContainer = [styles.rowContainerOdd, {backgroundColor: this.props.alpha}];
        }
        var staticUri = getHeroImage(rowData.hero);
        return (
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
