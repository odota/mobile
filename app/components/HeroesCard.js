import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList
} from 'react-native';

import { connect } from 'react-redux';

import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import heroes from 'dotaconstants/build/heroes.json';
import { getHeroImage } from '../utils/getHeroImage';

import moment from 'moment';

import _ from 'lodash';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend
});

class HeroesCard extends Component {

    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.sortByKey = this.sortByKey.bind(this);
        this.generateProcessedArray = this.generateProcessedArray.bind(this);
        this.state = {
            processedHeroList: []
        };
    }

    sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    getIndex(heroId, heroesArray) {
        for (var hero in heroesArray) {
            if (heroesArray.hasOwnProperty(hero)) {
                if (heroesArray[hero].id == heroId) {
                    return hero;
                }
            }
        }
    }

    generateProcessedArray(unprocessedHeroList) {
        var processedHeroList = [];
        var maxPlayed = unprocessedHeroList[0].games;

        //Possible to use array foreach?
        for (let j = 0; j < unprocessedHeroList.length; j++) {

            var currentUnprocessedHero = unprocessedHeroList[j];
            // Process winrate %
            var winrate = currentUnprocessedHero.win / currentUnprocessedHero.games;
            var winPercentage;
            if (currentUnprocessedHero.games == 0) {
                winPercentage = "N/A";
            } else {
                winPercentage = Math.round(winrate * 10000) / 100;
            }



            // Process playedRate
            var playedRate = currentUnprocessedHero.games / maxPlayed;

            // Process index
            var index = this.getIndex(currentUnprocessedHero.hero_id, heroes);

            // Process staticUri
            //var staticUri = getHeroImage(unprocessedHeroList[i].hero_id);

            // Process lastPlayedTime
            var lastPlayedTime = currentUnprocessedHero.last_played * 1000;
            var friendlyLastPlayedTime;
            if (lastPlayedTime == 0) {
                friendlyLastPlayedTime = "N/A";
            } else {
                var now = moment();
                friendlyLastPlayedTime = moment.duration(now.diff(lastPlayedTime)).humanize();
            }
            // Process localized_name
            var localizedName = heroes[index].localized_name;


            var processedHero = {};
            processedHero.winPercentage = winPercentage;
            processedHero.playedRate = playedRate;
            processedHero.index = index;
            //processedHero.staticUri = staticUri;
            processedHero.lastPlayed = friendlyLastPlayedTime
            processedHero.heroId = currentUnprocessedHero.hero_id;
            processedHero.games = currentUnprocessedHero.games;
            processedHero.localizedName = localizedName;
            processedHero.winrate = winrate;

            processedHeroList[j] = processedHero;

        }
        return processedHeroList;
    }

    renderRow(item) {
        let rowData = item.item;
        var rowContainer;
        if ((parseInt(item.index) + 1) % 2 == 0) {
            rowContainer = { backgroundColor: this.props.mod, marginTop: 10, paddingVertical: 5, borderRadius: 3 };
        } else {
            rowContainer = { backgroundColor: this.props.alpha, marginTop: 10, paddingVertical: 5, borderRadius: 3 };
        }
        var staticUri = getHeroImage(rowData.heroId);
        return (
            <View style={rowContainer} >
                <Text style={[styles.heroValueText, { color: this.props.secondLegend }]} numberOfLines={1}>{rowData.localizedName}</Text>
                <View style={[styles.inRowSeparator, { backgroundColor: this.props.legend }]} />

                <View style={{ flexDirection: 'row' }}>

                    <View style={styles.heroCell}>
                        <View style={styles.heroValueTextWrapper}>
                            <View style={styles.avatarContainer}>
                                <Image source={staticUri} style={styles.imageAvatar} />
                            </View>

                        </View>
                    </View>
                    <View style={styles.playedCell}>
                        <Text style={[styles.tableValueText, { color: this.props.secondLegend }]}>{rowData.games}</Text>
                    </View>
                    <View style={styles.winCell}>
                        <Text style={[styles.tableValueText, { color: this.props.secondLegend }]}>{rowData.winPercentage}%</Text>
                    </View>
                    <View style={styles.lastPlayedCell}>
                        <Text style={[styles.tableValueText, { color: this.props.secondLegend }]}>{rowData.lastPlayed}</Text>
                    </View>

                </View>
            </View>
        )
    }

    render() {
        if (this.props.heroes && this.props.heroes.length > 0) {
            let heroesList = this.props.heroes;
            let processedHeroList = this.generateProcessedArray(heroesList);
            return (
                <View style={[styles.heroesCardContainer, {}]}>
                    <View style={{ backgroundColor: this.props.mod, borderRadius: 3 }}>
                        <View style={styles.titleContainer}>
                            <Text style={[styles.titleText, { color: this.props.secondLegend }]}>HEROES</Text>
                        </View>
                        <View style={[styles.separator, { backgroundColor: this.props.legend }]} />
                        <View style={styles.tableHeaderContainer}>
                            <View style={styles.tableHeaderCell}>
                                <Text style={[styles.tableHeaderText, { color: this.props.secondLegend }]}>Hero</Text>
                            </View>
                            <View style={styles.tableHeaderCell}>
                                <Text style={[styles.tableHeaderText, { color: this.props.secondLegend }]}>Played</Text>
                            </View>
                            <View style={styles.tableHeaderCell}>
                                <Text style={[styles.tableHeaderText, { color: this.props.secondLegend }]}>Win%</Text>
                            </View>
                            <View style={[styles.tableHeaderCell]}>
                                <Text style={[styles.tableHeaderText, { color: this.props.secondLegend }]}>Last Played</Text>
                            </View>
                        </View>
                    </View>
                    <FlatList
                        data={processedHeroList}
                        renderItem={this.renderRow}
                        enableEmptySections={true}
                        initialListSize={120}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            )
        } else {
            return (<View />);
        }

    }

}

const baseStyles = _.extend(base.general, {
    heroValueText: {
        fontFamily: Fonts.base,
        fontSize: 16,
        alignSelf: 'center'
    },
    avatarContainer: {
        alignSelf: 'center'
    },
    heroCell: {
        flex: 1,
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
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps)(HeroesCard);
