import  React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Linking,
    TouchableOpacity
} from 'react-native';

import { Avatar } from 'react-native-material-design';

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

    render() {
        var info = this.props.info;
        var wl = this.props.wl;
        if(info.profile) {
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
                        <Text style = {{color: this.props.secondLegend, textDecorationLine: 'underline'}}>{info.profile.profileurl}</Text>
                    </TouchableOpacity>
                )
            } else {
                url = <View />
            }

            return (
                <View style = {[styles.profileCardContainer, {backgroundColor: this.props.mod}]}>
                    <View style = {styles.nameContainer}>
                        {name}
                    </View>
                    <View style = {styles.avatarContainer}>
                        <Avatar image = {<Image source = {{uri: info.profile.avatarfull}} />} size = {80} borderRadius = {40}/>
                    </View>
                    <Slider disabled = {true}
                            value = {winrate}
                            minimumTrackTintColor = {Colors.win}
                            maximumTrackTintColor = {Colors.lose}
                            thumbStyle = {styles.hiddenThumb}/>
                    <View style = {styles.winRateContainer}>
                        <FontAwesome name = "trophy" size = {25} allowFontAcaling = {false} color = {this.props.legend}/>
                        <View style = {styles.winRateTextContainer}>
                            <Text style = {{color: Colors.win, fontFamily: Fonts.base, fontSize: 14}}>{wl.win} </Text>
                            <Text style = {{color: this.props.secondLegend, fontFamily: Fonts.base, fontSize: 14}}>-</Text>
                            <Text style = {{color: Colors.lose, fontFamily: Fonts.base, fontSize: 14}}> {wl.lose}</Text>
                        </View>
                        <Text style = {{color: this.props.secondLegend, fontFamily: Fonts.base, fontSize: 14}}>({winPercentage}%)</Text>
                    </View>
                    <View style = {styles.mmrContainer}>
                        <View style = {styles.soloContainer}>
                            <FontAwesome name = "user" size = {20} allowFontAcaling = {false} color = {this.props.legend}/>
                            <Text style = {[styles.mmrText, {color: this.props.secondLegend}]}>{soloMMR}</Text>
                        </View>
                        <View style = {styles.estimateContainer}>
                            <FontAwesome name = "question" size = {20} allowFontAcaling = {false} color = {this.props.legend}/>
                            <Text style = {[styles.mmrText, {color: this.props.secondLegend}]}>{estimateMMR}</Text>
                        </View>
                        <View style = {styles.teamContainer}>
                            <FontAwesome name = "users" size = {20} allowFontAcaling = {false} color = {this.props.legend}/>
                            <Text style = {[styles.mmrText, {color: this.props.secondLegend}]}>{teamMMR}</Text>
                        </View>
                    </View>
                    <View style = {[styles.separator, {backgroundColor: this.props.legend}]} />
                    {url}

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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    dataContainer: {
        flex: 4,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center'
    },
    name: {
        fontFamily: Fonts.base,
        fontSize: 20,
        flex: 7
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
        justifyContent: 'center',
        alignItems: 'center'
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
        marginTop: 10,
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
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5
    },
    separator: {
        height: 2,
    },
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps)(ProfileCard);
