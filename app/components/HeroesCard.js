import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ListView
} from 'react-native'

import { Avatar } from 'react-native-material-design'

import { connect } from 'react-redux'

import Colors from 'Themes/Colors'
import base from 'Themes/BaseStyles'
import Fonts from 'Themes/Fonts'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Slider from 'react-native-slider'

import heroes from 'Json/heroes.json'
import { getHeroImage } from 'Utils/getHeroImage'

import moment from 'moment'
import map from 'lodash/map'
import extend from 'lodash/extend'

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend
})

class HeroesCard extends PureComponent {
    heroesDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    state = {
        processedHeroList: []
    }

    sortByKey = (array, key) => {
        return array.sort((a, b) => a[key] - b[key])
    }

    getIndex = (heroId, heroesArray) => {
        return heroesArray.findIndex(item => item.id === heroId)
    }

    generateProcessedArray = (unprocessedHeroList) => {
        const maxPlayed = unprocessedHeroList[0].games
        return map(unprocessedHeroList, currentUnprocessedHero => {
            // Process winrate %
            const winrate = currentUnprocessedHero.win / currentUnprocessedHero.games
            const winPercentage = currentUnprocessedHero.games === 0 ? 'N/A' : Math.round(winrate * 10000) / 100

            // Process playedRate
            const playedRate = currentUnprocessedHero.games / maxPlayed

            // Process index
            const index = this.getIndex(currentUnprocessedHero.hero_id, heroes.result.heroes)

            // Process staticUri
            // const staticUri = getHeroImage(unprocessedHeroList[i].hero_id)

            // Process lastPlayedTime
            const lastPlayedTime = currentUnprocessedHero.last_played * 1000
            let friendlyLastPlayedTime
            if (lastPlayedTime === 0) {
                friendlyLastPlayedTime = 'N/A'
            } else {
                const now = moment()
                friendlyLastPlayedTime = moment.duration(now.diff(lastPlayedTime)).humanize()
            }

            // Process localized_name
            const localizedName = heroes.result.heroes[index] ? heroes.result.heroes[index].localized_name : null

            return {
                winPercentage: winPercentage,
                playedRate: playedRate,
                index: index,
                // processedHero.staticUri: staticUri,
                lastPlayed: friendlyLastPlayedTime,
                heroId: currentUnprocessedHero.hero_id,
                games: currentUnprocessedHero.games,
                localizedName: localizedName,
                winrate: winrate
            }
        })
    }

    componentWillMount () {
        const { heroes } = this.props
        if (heroes && heroes.length > 0) {
            const processedHeroList = this.generateProcessedArray(heroes)
            this.setState({ processedHeroList })
        }
    }

    componentWillReceiveProps (nextProps) {
        const { heroes } = nextProps
        if (heroes && heroes.length > 0) {
            const processedHeroList = this.generateProcessedArray(heroes)
            this.setState({ processedHeroList })
        }
    }

    renderRow = (rowData, i, j) => {
        const staticUri = getHeroImage(rowData.heroId)
        let rowContainer
        if ((parseInt(j) + 1) % 2 === 0) {
            rowContainer = {backgroundColor: this.props.mod, marginTop: 10, paddingVertical: 5, borderRadius: 3}
        } else {
            rowContainer = {backgroundColor: this.props.alpha, marginTop: 10, paddingVertical: 5, borderRadius: 3}
        }

        return (
            <View style={rowContainer}>
                <Text style={[styles.heroValueText, {color: this.props.secondLegend}]} numberOfLines={1}>
                    {rowData.localizedName}
                </Text>
                <View style={[styles.inRowSeparator, {backgroundColor: this.props.legend}]} />

                <View style={{flexDirection: 'row'}}>

                    <View style={styles.heroCell}>
                        <View style={styles.heroValueTextWrapper}>
                            <View style={styles.avatarContainer}>
                                <Avatar image={<Image source={staticUri} />} size={40} borderRadius={20} style={styles.heroIcon} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.playedCell}>
                        <Text style={[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.games}</Text>
                        {/* <Slider disabled = {true} */}
                        {/* value = {rowData.playedRate} */}
                        {/* minimumTrackTintColor = {Colors.lose} */}
                        {/* maximumTrackTintColor = 'rgba(255, 255, 255, 0)' */}
                        {/* style={styles.sliderContainer} */}
                        {/* thumbstyle={styles.hiddenThumb}/> */}
                    </View>
                    <View style={styles.winCell}>
                        <Text style={[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.winPercentage}%</Text>
                        {/* <Slider disabled = {true} */}
                        {/* value = {rowData.winrate} */}
                        {/* minimumTrackTintColor = {Colors.win} */}
                        {/* maximumTrackTintColor = 'rgba(255, 255, 255, 0)' */}
                        {/* style={styles.sliderContainer} */}
                        {/* thumbstyle={styles.hiddenThumb}/> */}
                    </View>
                    <View style={styles.lastPlayedCell}>
                        <Text style={[styles.tableValueText, {color: this.props.secondLegend}]}>
                            {rowData.lastPlayed}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    render () {
        const { heroes } = this.props
        if (heroes && heroes.length > 0) {
            return (
                <View style={[styles.heroesCardContainer, {}]}>
                    <View style={{backgroundColor: this.props.mod, borderRadius: 3}}>
                        <View style={styles.titleContainer}>
                            <Text style={[styles.titleText, {color: this.props.secondLegend}]}>HEROES</Text>
                        </View>
                        <View style={[styles.separator, {backgroundColor: this.props.legend}]} />
                        <View style={styles.tableHeaderContainer}>
                            <View style={styles.tableHeaderCell}>
                                <Text style={[styles.tableHeaderText, {color: this.props.secondLegend}]}>Hero</Text>
                            </View>
                            <View style={styles.tableHeaderCell}>
                                <Text style={[styles.tableHeaderText, {color: this.props.secondLegend}]}>Played</Text>
                            </View>
                            <View style={styles.tableHeaderCell}>
                                <Text style={[styles.tableHeaderText, {color: this.props.secondLegend}]}>Win%</Text>
                            </View>
                            <View style={[styles.tableHeaderCell]}>
                                <Text style={[styles.tableHeaderText, {color: this.props.secondLegend}]}>Last Played</Text>
                            </View>
                        </View>
                    </View>
                    <ListView
                        dataSource={this.heroesDS.cloneWithRows(this.state.processedHeroList)}
                        renderRow={this.renderRow}
                        enableEmptySections
                        initialListSize={120}
                    />
                </View>
            )
        }
        return <View />
    }
}

const baseStyles = extend(base.general, {
    heroValueText: {
        fontFamily: Fonts.base,
        fontSize: 16,
        alignSelf: 'center'
    },
    avatarContainer: {
        alignSelf: 'center'
    },
    heroCell: {
        flex: 1
    },
    playedCell: {
        flex: 1,
        justifyContent: 'center'
    },
    winCell: {
        flex: 1,
        justifyContent: 'center'
    },
    lastPlayedCell: {
        flex: 1,
        justifyContent: 'center'
    },
    sliderContainer: {
        marginTop: -10,
        marginBottom: -10
    },
    heroValueTextWrapper: {
        marginLeft: 5,
        marginRight: 5
    }
})

const styles = StyleSheet.create(baseStyles)

export default connect(mapStateToProps)(HeroesCard)
