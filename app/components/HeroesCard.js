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

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from 'react-native-slider';

import heroes from '../json/heroes.json';
import { getHeroImage } from '../utils/getHeroImage';

import _ from 'lodash';

class HeroesCard extends Component {

    constructor(props) {
        super(props);
        this.heroesDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.renderRow = this.renderRow.bind(this);
        this.getIndex = this.getIndex.bind(this);
    }

    getIndex(heroId, heroesArray) {
        for(i = 0; i < heroesArray.length; i++) {
            if(heroId == heroesArray[i].id) {
                return i;
            }
        }
    }

    renderRow(rowData, i, j) {
        var rowContainer;
        if((parseInt(j)+1) % 2 == 0) {
            rowContainer = styles.rowContainerEven;
        } else {
            rowContainer = styles.rowContainerOdd;
        }
        winrate = rowData.win / rowData.games;
        winPercentage = Math.round(winrate * 10000)/100;
        maxPlayed = this.props.heroes[0].games;
        playedRate = rowData.games / maxPlayed
        index = this.getIndex(rowData.hero_id, heroes.result.heroes);
        var staticUri = getHeroImage(rowData.hero_id);
        return (
            <View style = {rowContainer}>
                <View style = {styles.heroCell}>
                    <View style = {styles.heroValueTextWrapper}>
                        <View style = {styles.avatarContainer}>
                            <Avatar image = {<Image source = {staticUri} />} size = {40} borderRadius = {20} style = {styles.heroIcon}/>
                        </View>
                        <Text style = {styles.heroValueText} numberOfLines = {1}>{heroes.result.heroes[index].localized_name}</Text>
                    </View>
                </View>
                <View style = {styles.playedCell}>
                    <Text style = {styles.tableValueText}>{rowData.games}</Text>
                    <Slider disabled = {true}
                            value = {playedRate}
                            minimumTrackTintColor = {Colors.lose}
                            maximumTrackTintColor = 'rgba(255, 255, 255, 0)'
                            style = {styles.sliderContainer}
                            thumbStyle = {styles.hiddenThumb}/>
                </View>
                <View style = {styles.winCell}>
                    <Text style = {styles.tableValueText}>{winPercentage}%</Text>
                    <Slider disabled = {true}
                            value = {winrate}
                            minimumTrackTintColor = {Colors.win}
                            maximumTrackTintColor = 'rgba(255, 255, 255, 0)'
                            style = {styles.sliderContainer}
                            thumbStyle = {styles.hiddenThumb}/>
                </View>

            </View>
        )
    }

    render() {
        if(this.props.heroes) {
            return (
                <View style = {styles.heroesCardContainer}>
                    <View style = {styles.titleContainer}>
                        <Text style = {styles.titleText}>HEROES</Text>
                    </View>
                    <View style = {styles.separator} />
                    <View style = {styles.tableHeaderContainer}>
                        <View style = {styles.tableHeaderCell}>
                            <Text style = {styles.tableHeaderText}>Hero</Text>
                        </View>
                        <View style = {styles.tableHeaderCell}>
                            <Text style = {styles.tableHeaderText}>Played</Text>
                        </View>
                        <View style = {styles.tableHeaderCell}>
                            <Text style = {styles.tableHeaderText}>Win</Text>
                        </View>
                    </View>
                    <ListView style = {styles.heroesListView}
                        dataSource = {this.heroesDS.cloneWithRows(this.props.heroes)}
                        renderRow = {this.renderRow}
                        enableEmptySections = {true}
                    />
                </View>
            )
        } else {
            return (<View />);
        }

    }

}

const baseStyles = _.extend(base.general, {
    heroesCardContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Colors.skyDolchMod,
        borderRadius: 3
    },
    titleText: {
        fontFamily: Fonts.base,
        fontSize: 28,
        color: Colors.skyDolchSecondLegend
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    separator: {
        height: 2,
        backgroundColor: Colors.skyDolchLegend
    },
    rowContainerEven: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Colors.skyDolchMod,
        flexDirection: 'row'
    },
    rowContainerOdd: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Colors.skyDolchAlpha,
        flexDirection: 'row'
    },
    tableHeaderContainer: {
        flexDirection: 'row'
    },
    tableHeaderCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    tableHeaderText: {
        fontFamily: Fonts.base,
        fontSize: 14,
        color: Colors.skyDolchSecondLegend,
        fontWeight: 'bold'
    },
    tableValueText: {
        fontFamily: Fonts.base,
        fontSize: 14,
        color: Colors.skyDolchSecondLegend,
        alignSelf: 'center'
    },
    heroValueText: {
        fontFamily: Fonts.base,
        fontSize: 14,
        color: Colors.skyDolchSecondLegend,
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

export default HeroesCard
