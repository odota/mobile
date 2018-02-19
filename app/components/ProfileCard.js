import  React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Linking,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from 'react-native-slider';

import _ from 'lodash';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend
});

class ProfileCard extends Component {

    constructor(props) {
        super(props);
        this.onURLPressed = this.onURLPressed.bind(this);
    }

    onURLPressed(url) {
        Linking.canOpenURL(url).then(supported => {
            if(!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occured ', err));
    }

    getRankIcon(rankTier, leaderboardRank) {
        const rankIcons = {
            '0': require('../assets/rank_icons/rank_icon_0.png'),
            '1': require('../assets/rank_icons/rank_icon_1.png'),
            '2': require('../assets/rank_icons/rank_icon_2.png'),
            '3': require('../assets/rank_icons/rank_icon_3.png'),
            '4': require('../assets/rank_icons/rank_icon_4.png'),
            '5': require('../assets/rank_icons/rank_icon_5.png'),
            '6': require('../assets/rank_icons/rank_icon_6.png'),
            '7a': require('../assets/rank_icons/rank_icon_7a.png'),
            '7b': require('../assets/rank_icons/rank_icon_7b.png'),
            '7c': require('../assets/rank_icons/rank_icon_7c.png'),
        };

        const starIcons = {
            '1': require('../assets/rank_icons/rank_star_1.png'),
            '2': require('../assets/rank_icons/rank_star_2.png'),
            '3': require('../assets/rank_icons/rank_star_3.png'),
            '4': require('../assets/rank_icons/rank_star_4.png'),
            '5': require('../assets/rank_icons/rank_star_5.png'),
        };

        if (!rankTier) return null;
        let rank, star;
        if (rankTier > 9) {
            if (leaderboardRank) {
                if (leaderboardRank <= 10) {
                    rank = '7c'; // Divine Top 10
                } else if (leaderboardRank <= 100) {
                    rank = '7b'; // Divine Top 100
                }
            }
            if (rankTier === 76) {
                rank = rank || '7a'; // Divine Elite
            } else {
                const intRankTier = parseInt(rankTier, 10);
                const intStar = parseInt(intRankTier % 10, 10);
                if (!rank) {
                    if (intStar <= 0) {
                        star = 0;
                    } else if (intStar >= 5) {
                        star = 5;
                    } else {
                        star = intStar;
                    }
                }
                rank = rank || parseInt(intRankTier / 10, 10);
            }
        } else {
            rank = '0';
        }

        return (
            <View style = {styles.rankContainer}>
                <Image style={styles.rankIcon} source={rankIcons[rank]}/>
                {(star > 0) ? <Image style={styles.rankIcon} source={starIcons[star]}/> : null}
            </View>
        );
    }

    render() {
        var info = this.props.info;
        var wl = this.props.wl;
        if(info.profile) {
            const { rank_tier: rankTier, leaderboard_rank: leaderboardRank } = info;
            var soloMMR;
            var teamMMR;
            var name;
            var winrate = 0;
            var estimateMMR;
            var url;
            if(info.solo_competitive_rank) {
                soloMMR = info.solo_competitive_rank;
            } else {
                soloMMR = "N/A";
            }
            if(info.competitive_rank) {
                teamMMR = info.competitive_rank
            } else {
                teamMMR = "N/A"
            }
            if(info.profile.loccountrycode) {
                name = <Text style = {[styles.name, {color: this.props.secondLegend}]}>{info.profile.personaname} ({info.profile.loccountrycode})</Text>;
            } else {
                name = <Text style = {[styles.name, {color: this.props.secondLegend}]}>{info.profile.personaname}</Text>;
            }
            if(wl.win && wl.lose) {
                winrate = wl.win / (wl.win+wl.lose);
            }
            winPercentage = Math.round(winrate * 10000)/100;

            if(info.mmr_estimate.estimate) {
                estimateMMR = info.mmr_estimate.estimate;
            } else {
                estimateMMR = "N/A";
            }

            if(info.profile.profileurl) {
                url = (
                    <TouchableOpacity style = {styles.urlContainer} onPress = {() => this.onURLPressed(info.profile.profileurl)}>
                        <Text style = {{color: this.props.secondLegend, textDecorationLine: 'underline', fontFamily: Fonts.base}}>{info.profile.profileurl}</Text>
                    </TouchableOpacity>
                )
            } else {
                url = <View />
            }

            return (
                <View style = {[styles.profileCardContainer, {backgroundColor: this.props.mod}]}>

                    <View style = {{flexDirection: 'row'}}>
                        <View style = {styles.avatarContainer}>
                            <Image style = {styles.bigImageAvatar} source = {{uri: info.profile.avatarfull}} />
                            {this.getRankIcon(rankTier, leaderboardRank)}
                        </View>
                        <View style = {styles.info}>
                            <View style = {styles.nameContainer}>
                                {name}
                            </View>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style = {[styles.captionText, {color: this.props.legend}]}>WINS: </Text>
                                <Text style = {[styles.contentText, {color: this.props.secondLegend}]}>{wl.win}</Text>
                            </View>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style = {[styles.captionText, {color: this.props.legend}]}>LOSSES: </Text>
                                <Text style = {[styles.contentText, {color: this.props.secondLegend}]}>{wl.lose}</Text>
                            </View>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style = {[styles.captionText, {color: this.props.legend}]}>WINRATE: </Text>
                                <Text style = {[styles.contentText, {color: this.props.secondLegend}]}>{winPercentage}%</Text>
                            </View>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style = {[styles.captionText, {color: this.props.legend}]}>SOLO MMR: </Text>
                                <Text style = {[styles.contentText, {color: this.props.secondLegend}]}>{soloMMR}</Text>
                            </View>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style = {[styles.captionText, {color: this.props.legend}]}>PARTY MMR: </Text>
                                <Text style = {[styles.contentText, {color: this.props.secondLegend}]}>{teamMMR}</Text>
                            </View>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style = {[styles.captionText, {color: this.props.legend}]}>ESTIMATED MMR: </Text>
                                <Text style = {[styles.contentText, {color: this.props.secondLegend}]}>{estimateMMR}</Text>
                            </View>
                        </View>
                    </View>

                    <Slider disabled = {true}
                            value = {winrate}
                            minimumTrackTintColor = {Colors.win}
                            maximumTrackTintColor = {Colors.lose}
                            thumbStyle = {styles.hiddenThumb}/>
                        <View style = {{marginHorizontal: 15, marginBottom: 10, flexDirection: 'row', alignItems: 'center'}}>
                        {url}
                    </View>
                </View>
            )
        } else {
            return (
                <View />
            )
        }

    }
}

const baseStyles = _.extend(base.general, {
    profileCardContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 3
    },
    topContainer: {
        flexDirection: 'row'
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    rankContainer: {
        width: 50,
        height: 100,
        display: 'flex',
        alignItems: 'center',
    },
    rankIcon: {
        width: 64,
        height: 64,
    },
    info: {
        flex: 2
    },
    dataContainer: {
        flex: 4,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center'
    },
    name: {
        fontFamily: Fonts.base,
        fontSize: 20
    },
    country: {
        fontFamily: Fonts.base,
        fontSize: 14,
        flex: 1,
        alignSelf: 'center'
    },
    countryWrapper: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    nameContainer: {
    },
    soloContainer: {
        flex: 1,
        alignItems: 'center'
    },
    estimateContainer: {
        flex: 1,
        alignItems: 'center'
    },
    winRateContainer: {
        flex: 1,
        alignItems: 'center'
    },
    teamContainer: {
        flex: 1,
        alignItems: 'center'
    },
    mmrContainer: {
        flexDirection: 'row',
        marginTop: 60,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    winRateTextContainer: {
        flexDirection: 'row'
    },
    mmrText: {
        fontFamily: Fonts.base,
        fontSize: 14
    },
    urlContainer: {
        marginRight: 10,
        marginTop: 5
    },
    separator: {
        height: 2,
    },
    captionText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: Fonts.base
    },
    contentText: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: Fonts.base
    }
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps)(ProfileCard);
