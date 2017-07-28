import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import * as navigationActions from '../actions/navigation_act';
import * as favouritesActions from '../actions/favourites_act';
import * as homeActions from '../actions/home_act';

import { Avatar } from 'react-native-material-design';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import _ from 'lodash';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    favourites: state.favouritesState.favourites,
    scene:state.navigationState.scene,
    parent: state.navigationState.parent,
    homeProfile: state.homeState.profile
});

export const mapDispatchToProps = (dispatch) => ({
    navigationActions: bindActionCreators(navigationActions, dispatch),
    favouritesActions: bindActionCreators(favouritesActions, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch)
});

class PlayerCard extends Component {

    constructor(props) {
        super(props);
        this.onPlayerPressed = this.onPlayerPressed.bind(this);
        this.favouritesPressed = this.favouritesPressed.bind(this);
    }

    onPlayerPressed() {
        if(this.props.parent == "Favourites") {
            this.props.navigationActions.pushContextIdFavourite(this.props.info.account_id);
            this.props.navigationActions.changeContextId(this.props.info.account_id);
            Actions.playerProfileFavourite();
        } else if (this.props.parent == "Search") {
            this.props.navigationActions.pushContextIdSearch(this.props.info.account_id);
            this.props.navigationActions.changeContextId(this.props.info.account_id);
            Actions.playerProfileSearch();
        } else if (this.props.parent == "Home") {
            this.props.navigationActions.pushContextIdHome(this.props.info.account_id);
            this.props.navigationActions.changeContextId(this.props.info.account_id);
            Actions.playerProfileHome();
        }
    }

    favouritesPressed(info) {
        if(this.props.parent == "Home") {
            if(this.props.homeProfile.account_id == info.account_id) {
                this.props.homeActions.resetHomeProfile();
            } else {
                this.props.navigationActions.pushContextIdHome(info.account_id);
                this.props.navigationActions.changeContextId(info.account_id);
                this.props.homeActions.setHomeProfile(info);
                let toast = Toast.show('Home is set', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0
                });
            }

            setTimeout(() => {
                var homeProfileString = JSON.stringify(info);
                AsyncStorage.setItem("homeProfile", homeProfileString);
            }, 1000);
        } else {
            var index = -1;
            for(i = 0; i < this.props.favourites.length; i++) {
                if(this.props.favourites[i].account_id == info.account_id) {
                    index = i;
                }
            }
            if(index == -1) {
                this.props.favouritesActions.addFavourites(info);
                let toast = Toast.show('Added to Favourites', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0
                });
            } else {
                this.props.favouritesActions.removeFavourites(info.account_id);
                let toast = Toast.show('Removed from Favourites', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0
                });
            }

            setTimeout(() => {
                var favouritesString = JSON.stringify(this.props.favourites);
                AsyncStorage.setItem("favourites", favouritesString);
            }, 1000);
        }

    }

    render() {
        var info = this.props.info;
        if(this.props.parent == "Home") {
            var iconName;
            if(this.props.homeProfile.account_id == info.account_id) {
                iconName = <IonIcon name = "ios-home" size = {30} allowFontScaling = {false} color = {this.props.legend} />
            } else {
                iconName = <IonIcon name = "ios-home-outline" size = {30} allowFontScaling = {false} color = {this.props.legend} />
            }
        } else {
            var iconName;
            var index = -1;
            for(i = 0; i < this.props.favourites.length; i++) {
                if(this.props.favourites[i].account_id == info.account_id) {
                    index = i;
                }
            }
            if(index == -1) {
                iconName = <FontAwesome name = "star-o" size = {30} allowFontScaling = {false} color = {this.props.legend}/>
            } else {
                iconName = <FontAwesome name = "star" size = {30} allowFontScaling = {false} color = {this.props.legend}/>
            }
        }

        return (
            <TouchableOpacity onPress = {this.onPlayerPressed}>
                <View style = {[styles.playerCardContainer, { backgroundColor: this.props.mod }]}>
                    <View style = {styles.avatarContainer}>
                        <Avatar image = {<Image source = {{uri: info.avatarfull}} />} size = {60} borderRadius = {30}/>
                    </View>
                    <View style = {styles.dataContainer}>
                        <View style = {styles.nameContainer}>
                            <Text style = {[styles.data, {color: this.props.secondLegend}]}>{info.personaname}</Text>
                        </View>
                        <View style = {[styles.separator, {backgroundColor: this.props.legend}]}/>
                        <View style = {styles.nameContainer}>
                            <Text style = {[styles.data, {color: this.props.secondLegend}]}>ID: {info.account_id}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style = {[styles.favContainer, {borderColor: this.props.legend}]} onPress = {() => {this.favouritesPressed(info)}}>
                        {iconName}
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }
}

const baseStyles = _.extend(base.general, {
    playerCardContainer: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 3,
        flexDirection: 'row'
    },
    avatarContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    dataContainer: {
        flex: 6,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5
    },
    data: {
        fontFamily: Fonts.base,
        fontSize: 14,
        overflow: 'hidden'
    },
    separator: {
        height: 2,
    },
    nameContainer: {
        marginBottom: 5,
        marginTop: 5,
    },
    favContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        paddingLeft: 10,
    },
    favIcon: {
    }
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCard);
