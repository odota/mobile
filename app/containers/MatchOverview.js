import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ListView,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    RefreshControl,
    ImageBackground
} from 'react-native'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import * as matchDetailsActions from '../actions/match_details_act'
import * as navigationActions from '../actions/navigation_act'
import { Actions } from 'react-native-router-flux'

import { Avatar } from 'react-native-material-design'
import { kFormatter } from 'Utils/kFormatter'
import { getHeroImage } from 'Utils/getHeroImage'
import { getItemImage } from 'Utils/getItemImage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import gameMode from 'Json/game_mode.json'
import regionsArray from 'Json/regions_list.json'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import items from 'Json/item_ids.json'

import moment from 'moment'

import extend from 'lodash/extend'

import Colors from 'Themes/Colors'
import base from 'Themes/BaseStyles'
import Fonts from 'Themes/Fonts'

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
})

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(matchDetailsActions, dispatch)
})

class MatchOverview extends PureComponent {
    state = {
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
        skill: ''
    }
    radiantDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    direDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    componentWillMount () {
        if (this.props.matchDetails) {
            this.generateProcessedData(this.props.matchDetails)

            if (this.props.matchDetails.players) {
                if (this.props.matchDetails.players.length > 0) {
                    var players = this.props.matchDetails.players
                    var processedPlayersList = this.generateProcessedPlayers(players)
                    var radiantPlayersList = processedPlayersList.slice(0, 5)
                    var direPlayersList = processedPlayersList.slice(5, 10)
                    this.setState({radiantPlayersList: radiantPlayersList})
                    this.setState({direPlayersList: direPlayersList})
                }
            }
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.matchDetails && nextProps.matchDetails.players.length > 0) {
            this.generateProcessedData(nextProps.matchDetails)
            var players = nextProps.matchDetails.players
            var processedPlayersList = this.generateProcessedPlayers(players)
            var radiantPlayersList = processedPlayersList.slice(0, 5)
            var direPlayersList = processedPlayersList.slice(5, 10)
            this.setState({radiantPlayersList: radiantPlayersList})
            this.setState({direPlayersList: direPlayersList})
        }
    }

    generateProcessedData = (data) => {
        var duration = moment('1900-01-01 00:00:00').add(data.duration, 'seconds').format('HH:mm:ss')
        this.setState({formattedDuration: duration})
        this.setState({radiantScore: data.radiant_score})
        this.setState({direScore: data.dire_score})
        this.setState({radiantWin: data.radiant_win})

        if (data.duration && data.start_time) {
            var endedTime = (data.start_time + data.duration) * 1000
            var now = moment()
            var friendlyEndedTime
            friendlyEndedTime = moment.duration(now.diff(endedTime)).humanize()
            this.setState({endedTime: friendlyEndedTime})
        }
        if (data.game_mode) {
            this.setState({gameMode: gameMode[data.game_mode].name})
        }
        if (data.match_id) {
            this.setState({matchId: data.match_id})
        }

        if (data.region) {
            var index = this.getRegionIndex(data.region, regionsArray)
            this.setState({region: regionsArray[index].localized_name})
        }

        if (data.players) {
            var players = data.players
            this.calculateAverageMMR(players)
        }

        if (data.skill) {
            if (data.skill === 1) {
                this.setState({skill: 'Normal'})
            } else if (data.skill === 2) {
                this.setState({skill: 'High'})
            } else if (data.skill === 3) {
                this.setState({skill: 'Very High'})
            }
        }
    }

    calculateAverageMMR = (data) => {
        var totalMMR = 0
        var availablePlayers = 0
        for (let i = 0; i < data.length; i++) {
            if (data[i].solo_competitive_rank) {
                availablePlayers++
                totalMMR += data[i].solo_competitive_rank
            }
        }
        var averageMMR = Math.round(totalMMR / availablePlayers)
        this.setState({averageMMR: averageMMR})
    }

    getRegionIndex = (regionId, regionsArray) => {
        return regionsArray.findIndex(item => item.id === regionId)
    }

    generateProcessedPlayers = (unprocessedPlayersList) => {
        var processedPlayersList = []
        for (let i = 0; i < unprocessedPlayersList.length; i++) {
            var currentUnprocessedPlayer = unprocessedPlayersList[i]

            var processedPlayer = {}
            processedPlayer.hero = currentUnprocessedPlayer.hero_id
            if (currentUnprocessedPlayer.account_id) {
                processedPlayer.player = currentUnprocessedPlayer.personaname
            } else {
                processedPlayer.player = 'Anonymous'
            }
            processedPlayer.soloCompetitiveRank = currentUnprocessedPlayer.solo_competitive_rank
            processedPlayer.level = currentUnprocessedPlayer.level
            processedPlayer.kills = currentUnprocessedPlayer.kills
            processedPlayer.deaths = currentUnprocessedPlayer.deaths
            processedPlayer.assists = currentUnprocessedPlayer.assists
            processedPlayer.gpm = currentUnprocessedPlayer.gold_per_min
            processedPlayer.xpm = currentUnprocessedPlayer.xp_per_min
            processedPlayer.lastHits = currentUnprocessedPlayer.last_hits
            processedPlayer.denies = currentUnprocessedPlayer.denies
            processedPlayer.heroDamage = kFormatter(currentUnprocessedPlayer.hero_damage)
            processedPlayer.heroHealing = kFormatter(currentUnprocessedPlayer.hero_healing)
            processedPlayer.towerDamage = kFormatter(currentUnprocessedPlayer.tower_damage)
            processedPlayer.totalGold = kFormatter(currentUnprocessedPlayer.total_gold)

            processedPlayer.backpack_0 = currentUnprocessedPlayer.backpack_0
            var backpack0Name = this.getItemName(processedPlayer.backpack_0)
            if (backpack0Name) {
                processedPlayer.backpack_0_timing = moment('1900-01-01 00:00:00').add(this.findItemTiming(currentUnprocessedPlayer.purchase_log, backpack0Name), 'seconds').format('mm:ss')
            }
            processedPlayer.backpack_1 = currentUnprocessedPlayer.backpack_1
            var backpack1Name = this.getItemName(processedPlayer.backpack_1)
            if (backpack1Name) {
                processedPlayer.backpack_1_timing = moment('1900-01-01 00:00:00').add(this.findItemTiming(currentUnprocessedPlayer.purchase_log, backpack1Name), 'seconds').format('mm:ss')
            }
            processedPlayer.backpack_2 = currentUnprocessedPlayer.backpack_2
            var backpack2Name = this.getItemName(processedPlayer.backpack_2)
            if (backpack2Name) {
                processedPlayer.backpack_2_timing = moment('1900-01-01 00:00:00').add(this.findItemTiming(currentUnprocessedPlayer.purchase_log, backpack2Name), 'seconds').format('mm:ss')
            }
            processedPlayer.item_0 = currentUnprocessedPlayer.item_0
            var item0Name = this.getItemName(processedPlayer.item_0)
            if (item0Name) {
                processedPlayer.item_0_timing = moment('1900-01-01 00:00:00').add(this.findItemTiming(currentUnprocessedPlayer.purchase_log, item0Name), 'seconds').format('mm:ss')
            }
            processedPlayer.item_1 = currentUnprocessedPlayer.item_1
            var item1Name = this.getItemName(processedPlayer.item_1)
            if (item1Name) {
                processedPlayer.item_1_timing = moment('1900-01-01 00:00:00').add(this.findItemTiming(currentUnprocessedPlayer.purchase_log, item1Name), 'seconds').format('mm:ss')
            }
            processedPlayer.item_2 = currentUnprocessedPlayer.item_2
            var item2Name = this.getItemName(processedPlayer.item_2)
            if (item2Name) {
                processedPlayer.item_2_timing = moment('1900-01-01 00:00:00').add(this.findItemTiming(currentUnprocessedPlayer.purchase_log, item2Name), 'seconds').format('mm:ss')
            }
            processedPlayer.item_3 = currentUnprocessedPlayer.item_3
            var item3Name = this.getItemName(processedPlayer.item_3)
            if (item3Name) {
                processedPlayer.item_3_timing = moment('1900-01-01 00:00:00').add(this.findItemTiming(currentUnprocessedPlayer.purchase_log, item3Name), 'seconds').format('mm:ss')
            }
            processedPlayer.item_4 = currentUnprocessedPlayer.item_4
            var item4Name = this.getItemName(processedPlayer.item_4)
            if (item4Name) {
                processedPlayer.item_4_timing = moment('1900-01-01 00:00:00').add(this.findItemTiming(currentUnprocessedPlayer.purchase_log, item4Name), 'seconds').format('mm:ss')
            }
            processedPlayer.item_5 = currentUnprocessedPlayer.item_5
            var item5Name = this.getItemName(processedPlayer.item_5)
            if (item5Name) {
                processedPlayer.item_5_timing = moment('1900-01-01 00:00:00').add(this.findItemTiming(currentUnprocessedPlayer.purchase_log, item5Name), 'seconds').format('mm:ss')
            }
            processedPlayer.backpack_0_uri = getItemImage(currentUnprocessedPlayer.backpack_0)
            processedPlayer.backpack_1_uri = getItemImage(currentUnprocessedPlayer.backpack_1)
            processedPlayer.backpack_2_uri = getItemImage(currentUnprocessedPlayer.backpack_2)
            processedPlayer.item_0_uri = getItemImage(currentUnprocessedPlayer.item_0)
            processedPlayer.item_1_uri = getItemImage(currentUnprocessedPlayer.item_1)
            processedPlayer.item_2_uri = getItemImage(currentUnprocessedPlayer.item_2)
            processedPlayer.item_3_uri = getItemImage(currentUnprocessedPlayer.item_3)
            processedPlayer.item_4_uri = getItemImage(currentUnprocessedPlayer.item_4)
            processedPlayer.item_5_uri = getItemImage(currentUnprocessedPlayer.item_5)
            processedPlayer.slot = i

            processedPlayersList[i] = processedPlayer
        }
        return processedPlayersList
    }

    getItemName = (itemId) => {
        return items[itemId]
    }

    findItemTiming = (purchaseLog, itemName) => {
        for (var purchase in purchaseLog) {
            if (purchaseLog.hasOwnProperty(purchase)) {
                if (purchaseLog[purchase].key === itemName) {
                    return purchaseLog[purchase].time
                }
            }
        }
    }

    onRefresh = () => {
        this.setState({refreshing: true})
        this.props.actions.fetchMatchDetails(this.props.matchDetails.match_id).then(() => {
            this.setState({refreshing: false})
        })
    }

    onRowPressed = (row) => {
        if (row === 0) {
            this.setState({zero: !this.state.zero})
        } else if (row === 1) {
            this.setState({one: !this.state.one})
        } else if (row === 2) {
            this.setState({two: !this.state.two})
        } else if (row === 3) {
            this.setState({three: !this.state.three})
        } else if (row === 4) {
            this.setState({four: !this.state.four})
        } else if (row === 5) {
            this.setState({five: !this.state.five})
        } else if (row === 6) {
            this.setState({six: !this.state.six})
        } else if (row === 7) {
            this.setState({seven: !this.state.seven})
        } else if (row === 8) {
            this.setState({eight: !this.state.eight})
        } else if (row === 9) {
            this.setState({nine: !this.state.nine})
        }
    }

    renderRow = (rowData, i, j) => {
        var rowContainer
        let additionalRowContainer
        if ((parseInt(j) + 1) % 2 === 0) {
            rowContainer = [styles.rowContainerEven, {backgroundColor: this.props.mod}]
            additionalRowContainer = {paddingTop: 10, paddingBottom: 10, backgroundColor: this.props.mod, flex: 1, flexDirection: 'row'}
        } else {
            rowContainer = [styles.rowContainerOdd, {backgroundColor: this.props.alpha}]
            additionalRowContainer = {paddingTop: 10, paddingBottom: 10, backgroundColor: this.props.alpha, flex: 1, flexDirection: 'row'}
        }
        var staticUri = getHeroImage(rowData.hero)
        var toggled
        if (rowData.slot === 0) {
            toggled = this.state.zero
        } else if (rowData.slot === 1) {
            toggled = this.state.one
        } else if (rowData.slot === 2) {
            toggled = this.state.two
        } else if (rowData.slot === 3) {
            toggled = this.state.three
        } else if (rowData.slot === 4) {
            toggled = this.state.four
        } else if (rowData.slot === 5) {
            toggled = this.state.five
        } else if (rowData.slot === 6) {
            toggled = this.state.six
        } else if (rowData.slot === 7) {
            toggled = this.state.seven
        } else if (rowData.slot === 8) {
            toggled = this.state.eight
        } else if (rowData.slot === 9) {
            toggled = this.state.nine
        }
        var additionalInfo
        if (toggled) {
            additionalInfo = (
                <View style={[additionalRowContainer, {paddingHorizontal: 15}]}>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: this.props.legend, fontSize: 12, fontWeight: 'bold'}}>Last Hits: </Text>
                            <Text style={{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{rowData.lastHits}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: this.props.legend, fontSize: 12, fontWeight: 'bold'}}>Denies: </Text>
                            <Text style={{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{rowData.denies}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: this.props.legend, fontSize: 12, fontWeight: 'bold'}}>Total Gold: </Text>
                            <Text style={{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{rowData.totalGold}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: this.props.legend, fontSize: 12, fontWeight: 'bold'}}>Hero Damage: </Text>
                            <Text style={{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{rowData.heroDamage}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: this.props.legend, fontSize: 12, fontWeight: 'bold'}}>Hero Healing: </Text>
                            <Text style={{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{rowData.heroHealing}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: this.props.legend, fontSize: 12, fontWeight: 'bold'}}>Tower Damage: </Text>
                            <Text style={{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{rowData.towerDamage}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 23}}>
                        <View style={{flexDirection: 'row'}}>
                            <ImageBackground source={rowData.item_0_uri} style={{width: 30, height: 24, marginLeft: 23}}>
                                <View style={{backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: this.props.secondLegend, fontSize: 10}}>{rowData.item_0_timing}</Text>
                                </View>
                            </ImageBackground>
                            <ImageBackground source={rowData.item_1_uri} style={{width: 30, height: 24}}>
                                <View style={{backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: this.props.secondLegend, fontSize: 10}}>{rowData.item_1_timing}</Text>
                                </View>
                            </ImageBackground>
                            <ImageBackground source={rowData.item_2_uri} style={{width: 30, height: 24}}>
                                <View style={{backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: this.props.secondLegend, fontSize: 10}}>{rowData.item_2_timing}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <ImageBackground source={rowData.item_3_uri} style={{width: 30, height: 24, marginLeft: 23}}>
                                <View style={{backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: this.props.secondLegend, fontSize: 10}}>{rowData.item_3_timing}</Text>
                                </View>
                            </ImageBackground>
                            <ImageBackground source={rowData.item_4_uri} style={{width: 30, height: 24}}>
                                <View style={{backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: this.props.secondLegend, fontSize: 10}}>{rowData.item_4_timing}</Text>
                                </View>
                            </ImageBackground>
                            <ImageBackground source={rowData.item_5_uri} style={{width: 30, height: 24}}>
                                <View style={{backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: this.props.secondLegend, fontSize: 10}}>{rowData.item_5_timing}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Image
                                source={require('Assets/backpack.png')} style={{width: 23, height: 23}}
                            />
                            <ImageBackground source={rowData.backpack_0_uri} style={{width: 30, height: 24}}>
                                <View style={{backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: this.props.secondLegend, fontSize: 10}}>{rowData.backpack_0_timing}</Text>
                                </View>
                            </ImageBackground>
                            <ImageBackground source={rowData.backpack_1_uri} style={{width: 30, height: 24}}>
                                <View style={{backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: this.props.secondLegend, fontSize: 10}}>{rowData.backpack_1_timing}</Text>
                                </View>
                            </ImageBackground>
                            <ImageBackground source={rowData.backpack_2_uri} style={{width: 30, height: 24}}>
                                <View style={{backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: this.props.secondLegend, fontSize: 10}}>{rowData.backpack_2_timing}</Text>
                                </View>
                            </ImageBackground>
                        </View>

                    </View>
                </View>
            )
        } else {
            additionalInfo = (<View />)
        }

        var mmr
        if (rowData.soloCompetitiveRank) {
            mmr = (<Text style={{color: this.props.legend, fontSize: 12}}>{rowData.soloCompetitiveRank}</Text>)
        } else {
            mmr = (<View />)
        }
        return (
            <TouchableOpacity onPress={() => { this.onRowPressed(rowData.slot) }}>
                <View style={rowContainer}>
                    <View style={{flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <Avatar image={<Image source={staticUri} />} size={40} borderRadius={20} />
                    </View>
                    <View style={styles.cell}>
                        <Text style={[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.player}</Text>
                        {mmr}
                    </View>
                    <View style={styles.cell}>
                        <Text style={[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.kills}/{rowData.deaths}/{rowData.assists}</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.gpm}</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.xpm}</Text>
                    </View>
                </View>
                {additionalInfo}
            </TouchableOpacity>
        )
    }

    render () {
        var content
        if (this.props.isLoadingMatchDetails) {
            content = (
                <View style={styles.contentContainer}>
                    <ActivityIndicator size='large' color={this.props.legend} />
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
                    var teamImage = (<View />)
                    if (this.state.radiantWin) {
                        teamImage = (
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Image source={require('Assets/radiant.png')} style={{width: 50, height: 50}} />
                                <Text style={{color: this.props.secondLegend, fontSize: 16, fontWeight: 'bold'}}>Radiant Victory</Text>
                            </View>
                        )
                    } else {
                        teamImage = (
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Image source={require('Assets/dire.png')} style={{width: 50, height: 50}} />
                                <Text style={{color: this.props.secondLegend, fontSize: 16, fontWeight: 'bold'}}>Dire Victory</Text>
                            </View>
                        )
                    }
                    var parsedWarning = (<View />)
                    if (this.props.matchDetails.radiant_gold_adv) {
                        parsedWarning = (<View />)
                    } else {
                        parsedWarning = (
                            <View style={[styles.profileCardContainer, {backgroundColor: this.props.mod, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}]}>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <FontAwesome name='exclamation-triangle' size={24} allowFontScaling={false} color={this.props.legend} />
                                </View>
                                <View style={{flex: 7}}>
                                    <Text style={{color: this.props.secondLegend, fontSize: 16}}>The replay for this match has not yet been parsed. Not all data may be available.</Text>
                                </View>
                            </View>
                        )
                    }
                    var refreshColor = this.props.legendHex
                    content = (
                        <KeyboardAwareScrollView style={{marginTop: 5}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
                                    tintColor={refreshColor}
                                    title='Refreshing'
                                    titleColor={refreshColor}
                                    colors={[refreshColor]}
                                    progressBackgroundColor='#ffffffff'
                                />
                            }>
                            {parsedWarning}
                            <View style={[styles.profileCardContainer, {backgroundColor: this.props.mod}]}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{flex: 4}}>
                                        {teamImage}
                                    </View>
                                    <View style={{flex: 5, justifyContent: 'center'}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{color: this.props.legend, fontSize: 14, fontWeight: 'bold'}}>Match ID: </Text>
                                            <Text style={{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{this.state.matchId}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{color: this.props.legend, fontSize: 14, fontWeight: 'bold'}}>Region: </Text>
                                            <Text style={{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{this.state.region}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{color: this.props.legend, fontSize: 14, fontWeight: 'bold'}}>Average MMR: </Text>
                                            <Text style={{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{this.state.averageMMR}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{color: this.props.legend, fontSize: 14, fontWeight: 'bold'}}>Skill: </Text>
                                            <Text style={{color: this.props.secondLegend, fontSize: 12, fontWeight: 'bold'}}>{this.state.skill}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', marginTop: 10}}>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{color: Colors.win, fontSize: 40}}>{this.state.radiantScore}</Text>
                                    </View>
                                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{color: this.props.secondLegend, fontSize: 14}}>{this.state.gameMode}</Text>
                                        <Text style={{color: this.props.secondLegend, fontSize: 14, fontWeight: 'bold'}}>{this.state.formattedDuration}</Text>
                                        <Text style={{color: this.props.secondLegend, fontSize: 14}}>ENDED {this.state.endedTime} AGO</Text>
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{color: Colors.lose, fontSize: 40}}>{this.state.direScore}</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={[styles.matchesCardContainer, {backgroundColor: this.props.mod}]}>
                                <View style={[styles.titleContainer, {flexDirection: 'row'}]}>
                                    <Image source={require('Assets/radiant.png')} style={{width: 30, height: 30, marginRight: 10}} />
                                    <Text style={[styles.titleText, {color: this.props.secondLegend}]}>RADIANT</Text>
                                </View>
                                <View style={[styles.separator, {backgroundColor: this.props.legend}]} />
                                <View style={styles.tableHeaderContainer}>
                                    <View style={{flex: 2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 10,
                                        marginBottom: 10}}>
                                        <Text style={[styles.tableHeaderText, {color: this.props.secondLegend}]}>Hero</Text>
                                    </View>
                                    <View style={styles.tableHeaderCell}>
                                        <Text style={[styles.tableHeaderText, {color: this.props.secondLegend}]}>Player</Text>
                                    </View>
                                    <View style={styles.tableHeaderCell}>
                                        <Text style={[styles.tableHeaderText, {color: this.props.secondLegend}]}>K/D/A</Text>
                                    </View>
                                    <View style={styles.tableHeaderCell}>
                                        <Text style={[styles.tableHeaderText, {color: this.props.secondLegend}]}>GPM</Text>
                                    </View>
                                    <View style={styles.tableHeaderCell}>
                                        <Text style={[styles.tableHeaderText, {color: this.props.secondLegend}]}>XPM</Text>
                                    </View>
                                </View>
                                <ListView style={styles.matchesListView}
                                    dataSource={this.radiantDS.cloneWithRows(this.state.radiantPlayersList)}
                                    renderRow={this.renderRow}
                                    enableEmptySections
                                    initialListSize={120}
                                />
                            </View>
                            <View style={[styles.matchesCardContainer, {backgroundColor: this.props.mod}]}>
                                <View style={[styles.titleContainer, {flexDirection: 'row'}]}>
                                    <Image source={require('Assets/dire.png')} style={{width: 30, height: 30, marginRight: 10}} />
                                    <Text style={[styles.titleText, {color: this.props.secondLegend}]}>DIRE</Text>
                                </View>
                                <View style={[styles.separator, {backgroundColor: this.props.legend}]} />
                                <View style={styles.tableHeaderContainer}>
                                    <View style={{flex: 2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 10,
                                        marginBottom: 10}}>
                                        <Text style={[styles.tableHeaderText, {color: this.props.secondLegend}]}>Hero</Text>
                                    </View>
                                    <View style={styles.tableHeaderCell}>
                                        <Text style={[styles.tableHeaderText, {color: this.props.secondLegend}]}>Player</Text>
                                    </View>
                                    <View style={styles.tableHeaderCell}>
                                        <Text style={[styles.tableHeaderText, {color: this.props.secondLegend}]}>K/D/A</Text>
                                    </View>
                                    <View style={styles.tableHeaderCell}>
                                        <Text style={[styles.tableHeaderText, {color: this.props.secondLegend}]}>GPM</Text>
                                    </View>
                                    <View style={styles.tableHeaderCell}>
                                        <Text style={[styles.tableHeaderText, {color: this.props.secondLegend}]}>XPM</Text>
                                    </View>
                                </View>
                                <ListView style={styles.matchesListView}
                                    dataSource={this.direDS.cloneWithRows(this.state.direPlayersList)}
                                    renderRow={this.renderRow}
                                    enableEmptySections
                                    initialListSize={120}
                                />
                            </View>
                        </KeyboardAwareScrollView>
                    )
                }
            }
        }
        return (
            <View style={{marginTop: 10}}>
                {content}
            </View>
        )
    }
}

const baseStyles = extend(base.general, {
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
})
const styles = StyleSheet.create(baseStyles)

export default connect(mapStateToProps, mapDispatchToProps)(MatchOverview)
