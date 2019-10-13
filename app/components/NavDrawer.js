import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    AsyncStorage,
    Alert
} from 'react-native';

import { connect } from 'react-redux';

import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import DeviceInfo from 'react-native-device-info';

import * as navigationActions from '../actions/navigation_act';
import * as homeActions from '../actions/home_act';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import _ from 'lodash';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    profile: state.homeState.profile,
    contextIdStackHome: state.navigationState.contextIdStackHome,
    contextIdStackSearch: state.navigationState.contextIdStackSearch,
    contextIdStackFavourite: state.navigationState.contextIdStackFavourite,
    tracker: state.navigationState.tracker
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...navigationActions, ...homeActions}, dispatch)
});

class NavDrawer extends Component {

    constructor(props) {
        super(props);
        this.goto = this.goto.bind(this);
        this.onResetHomeProfilePressed = this.onResetHomeProfilePressed.bind(this);
    }

    onResetHomeProfilePressed() {
        const {tracker, actions} = this.props;

        Alert.alert('Logout',
                    'Are you sure that you want to logout?',
                    [
                        {text: 'Cancel', style: 'cancel'},
                        {text: 'OK', onPress: () => {
                            tracker.trackEvent('Logout', 'Success');
                            actions.resetHomeProfile();
                            setTimeout(() => {
                                AsyncStorage.setItem("homeProfile", "");
                            }, 1000);
                            Actions.drawerClose();}},
                    ])
    }

    goto(route) {
        const {actions, contextIdStackFavourite, contextIdStackHome, contextIdStackSearch} = this.props;

        Actions.drawerClose();
        actions.changeParent(route);
        if(route == 'Home') {
            if(contextIdStackHome.length > 0) {
                actions.changeContextId(contextIdStackHome[contextIdStackHome.length-1]);
            }
            Actions.homeTab();
        } else if(route == 'Favourites') {
            if(contextIdStackFavourite.length > 0) {
                actions.changeContextId(contextIdStackFavourite[contextIdStackFavourite.length-1]);
            }
            Actions.favouriteTab();
        } else if(route == 'Search') {
            if(contextIdStackSearch.length > 0) {
                actions.changeContextId(contextIdStackSearch[contextIdStackSearch.length-1]);
            }
            Actions.searchTab();
        } else if(route == 'Settings') {
            Actions.settingsTab();
        }
    }

    getPaddingView = () => {
        if(Platform.OS === 'ios') {
            if(DeviceInfo.getModel() == "iPhone X")
                return <View style = {{marginTop: 44}} />;
            else
                return <View style = {{marginTop: 15}} />;
        } else {
            return <View />;
        }
    }

    getLogoutView = () => {
        const { profile, mod, legend, secondLegend } = this.props;
        
        return (profile != "") ?
        <View>
                    <TouchableOpacity onPress = {() => {this.onResetHomeProfilePressed()}}>
                        <View style = {[styles.navItem, {backgroundColor: mod}]}>
                            <View style = {styles.navIconContainer}>
                                <FontAwesome name = "power-off" size = {26} allowFontScaling = {false} color = {legend}/>
                            </View>
                            <View style = {styles.navTextContainer}>
                                <Text style = {[styles.navText, {color: secondLegend}]}>Logout</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style = {[styles.separator, {backgroundColor: legend}]} />
                </View>
            : 
            <View />;
        }
        
    getMenuItem = (itemName, fontName) => {
        const { mod, legend, secondLegend } = this.props;

        return <TouchableOpacity onPress = {() => {this.goto(itemName)}}>
            <View style = {[styles.navItem, {backgroundColor: mod}]}>
                <View style = {styles.navIconContainer}>
                    <FontAwesome name = {fontName} size = {26} allowFontScaling = {false} color = {legend}/>
                </View>
                <View style = {styles.navTextContainer}>
                    <Text style = {[styles.navText, {color: secondLegend}]}>{itemName}</Text>
                </View>
            </View>
        </TouchableOpacity>;
    }

    render() {
        const { mod, legend } = this.props;
        
        const paddingView = this.getPaddingView();
        const logoutView = this.getLogoutView();

        return (
            <View style = {[styles.drawerContainer, {backgroundColor: mod}]}>
                {paddingView}
                <ScrollView style = {styles.navScroll}>
                    {this.getMenuItem("Home", "home")}
                    <View style = {[styles.separator, {backgroundColor: legend}]} />
                    {this.getMenuItem("Favourites", "star")}
                    <View style = {[styles.separator, {backgroundColor: legend}]} />
                    {this.getMenuItem("Search", "search")}
                    <View style = {[styles.separator, {backgroundColor: legend}]} />
                    {this.getMenuItem("Settings", "cog")}
                    <View style = {[styles.separator, {backgroundColor: legend}]} />
                    {logoutView}
                </ScrollView>
            </View>
        )
    }

}

const baseStyles = _.extend(base.general, {
    navScroll: {
        flex: 1
    },
    navItem: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20
    },
    navIconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navTextContainer: {
        justifyContent: 'center',
        marginRight: 10,
        flex: 3
    },
    navText: {
        fontFamily: Fonts.base,
        fontSize: 16,
    },
    separator: {
        height: 2,
    },
    drawerContainer: {
        alignSelf: 'stretch',
        alignItems: 'stretch',
        flex: 1,
    }
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(NavDrawer);
