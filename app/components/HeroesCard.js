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

import { connect } from 'react-redux';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from 'react-native-slider';

import heroes from '../json/heroes.json';
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
        this.heroesDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.renderRow = this.renderRow.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.sortByKey = this.sortByKey.bind(this);
        this.generateProcessedArray = this.generateProcessedArray.bind(this);
        this.state = {
            processedHeroList: []
        };
    }

    sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x  = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    getIndex(heroId, heroesArray) {
        for(i = 0; i < heroesArray.length; i++) {
            if(heroId == heroesArray[i].id) {
                return i;
            }
        }
    }

    generateProcessedArray(unprocessedHeroList) {
        var processedHeroList = [];
        var maxPlayed = unprocessedHeroList[0].games;

        //Possible to use array foreach?
        for(j = 0; j < unprocessedHeroList.length; j++) {

            var currentUnprocessedHero = unprocessedHeroList[j];
            // Process winrate %
            var winrate = currentUnprocessedHero.win / currentUnprocessedHero.games;
            var winPercentage;
            if(currentUnprocessedHero.games == 0) {
                winPercentage = "N/A";
            } else {
                winPercentage = Math.round(winrate * 10000)/100;
            }



            // Process playedRate
            var playedRate = currentUnprocessedHero.games / maxPlayed;

            // Process index
            var index = this.getIndex(currentUnprocessedHero.hero_id, heroes.result.heroes);

            // Process staticUri
            //var staticUri = getHeroImage(unprocessedHeroList[i].hero_id);

            // Process lastPlayedTime
            var lastPlayedTime = currentUnprocessedHero.last_played * 1000;
            var friendlyLastPlayedTime;
            if(lastPlayedTime == 0) {
                friendlyLastPlayedTime = "N/A";
            } else {
                var now = moment();
                friendlyLastPlayedTime = moment.duration(now.diff(lastPlayedTime)).humanize();
            }
            // Process localized_name
            var localizedName = heroes.result.heroes[index].localized_name;


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

    componentWillMount() {
        if(this.props.heroes && this.props.heroes.length > 0) {
            var heroesList = this.props.heroes;
            var processedHeroList = this.generateProcessedArray(heroesList);
            this.setState({processedHeroList: processedHeroList});
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.heroes && nextProps.heroes.length > 0) {
            var heroesList = nextProps.heroes;
            var processedHeroList = this.generateProcessedArray(heroesList);
            this.setState({processedHeroList: processedHeroList});
        }
    }

    renderRow(rowData, i, j) {
        var rowContainer;
        if((parseInt(j)+1) % 2 == 0) {
            rowContainer = {backgroundColor: this.props.mod, marginTop: 10, paddingVertical: 5, borderRadius: 3};
        } else {
            rowContainer = {backgroundColor: this.props.alpha, marginTop: 10, paddingVertical: 5, borderRadius: 3};
        }
        var staticUri = getHeroImage(rowData.heroId);
        return (
            <View style = {rowContainer}>
                <Text style = {[styles.heroValueText, {color: this.props.secondLegend}]} numberOfLines = {1}>{rowData.localizedName}</Text>
                <View style = {[styles.inRowSeparator, {backgroundColor: this.props.legend}]} />

                <View style = {{flexDirection: 'row'}}>

                    <View style = {styles.heroCell}>
                        <View style = {styles.heroValueTextWrapper}>
                            <View style = {styles.avatarContainer}>
                                <Avatar image = {<Image source = {staticUri} />} size = {40} borderRadius = {20} style = {styles.heroIcon}/>
                            </View>

                        </View>
                    </View>
                    <View style = {styles.playedCell}>
                        <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.games}</Text>
                        {/*<Slider disabled = {true}*/}
                                {/*value = {rowData.playedRate}*/}
                                {/*minimumTrackTintColor = {Colors.lose}*/}
                                {/*maximumTrackTintColor = 'rgba(255, 255, 255, 0)'*/}
                                {/*style = {styles.sliderContainer}*/}
                                {/*thumbStyle = {styles.hiddenThumb}/>*/}
                    </View>
                    <View style = {styles.winCell}>
                        <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.winPercentage}%</Text>
                        {/*<Slider disabled = {true}*/}
                                {/*value = {rowData.winrate}*/}
                                {/*minimumTrackTintColor = {Colors.win}*/}
                                {/*maximumTrackTintColor = 'rgba(255, 255, 255, 0)'*/}
                                {/*style = {styles.sliderContainer}*/}
                                {/*thumbStyle = {styles.hiddenThumb}/>*/}
                    </View>
                    <View style = {styles.lastPlayedCell}>
                        <Text style = {[styles.tableValueText, {color: this.props.secondLegend}]}>{rowData.lastPlayed}</Text>
                    </View>

                </View>
            </View>
        )
    }

    render() {
        if(this.props.heroes && this.props.heroes.length > 0) {
            return (
                <View style = {[styles.heroesCardContainer, {}]}>
                    <View style = {{backgroundColor: this.props.mod, borderRadius: 3}}>
                        <View style = {styles.titleContainer}>
                            <Text style = {[styles.titleText, {color: this.props.secondLegend}]}>HEROES</Text>
                        </View>
                        <View style = {[styles.separator, {backgroundColor: this.props.legend}]} />
                        <View style = {styles.tableHeaderContainer}>
                            <View style = {styles.tableHeaderCell}>
                                <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Hero</Text>
                            </View>
                            <View style = {styles.tableHeaderCell}>
                                <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Played</Text>
                            </View>
                            <View style = {styles.tableHeaderCell}>
                                <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Win%</Text>
                            </View>
                            <View style = {[styles.tableHeaderCell]}>
                                <Text style = {[styles.tableHeaderText, {color: this.props.secondLegend}]}>Last Played</Text>
                            </View>
                        </View>
                    </View>
                    <ListView
                        dataSource = {this.heroesDS.cloneWithRows(this.state.processedHeroList)}
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
