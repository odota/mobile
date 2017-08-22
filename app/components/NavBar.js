import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Platform,
    Alert,
    AsyncStorage
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as favouritesActions from '../actions/favourites_act';
import * as homeActions from '../actions/home_act';

import NavigationBar from 'react-native-navbar';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import { Actions } from 'react-native-router-flux';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    favouritesList: state.favouritesState.favourites,
    homeProfile: state.homeState.profile
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...favouritesActions, ...homeActions}, dispatch)
});

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
        this.onPurgeFavouritesPressed = this.onPurgeFavouritesPressed.bind(this);
        this.onResetHomeProfilePressed = this.onResetHomeProfilePressed.bind(this);
    }

    openDrawer() {
        Actions.drawerOpen();
    }

    onPurgeFavouritesPressed() {
        Alert.alert('Delete All Favourites',
                    'Are you sure that you want to delete all profiles from favourites?',
                    [
                        {text: 'Cancel', style: 'cancel'},
                        {text: 'OK', onPress: () => {
                            this.props.actions.purgeFavourites();
                            setTimeout(() => {
                                AsyncStorage.setItem("favourites", "");
                            }, 1000);}},
                    ])
    }

    onResetHomeProfilePressed() {
        Alert.alert('Reset Home Profile',
                    'Are you sure that you want delete this profile from home?',
                    [
                        {text: 'Cancel', style: 'cancel'},
                        {text: 'OK', onPress: () => {
                            this.props.actions.resetHomeProfile();
                            setTimeout(() => {
                                AsyncStorage.setItem("homeProfile", "");
                            }, 1000);}},
                    ])
    }

    render() {
        title = <Text style = {[styles.title, {color: this.props.secondLegend}]}>{this.props.title}</Text>
        var rightElements;
        if(this.props.title == 'Favourites' && this.props.favouritesList.length > 0) {
            rightElements = (
                <View style = {styles.navItemView}>
                    <TouchableOpacity onPress = {() => {this.onPurgeFavouritesPressed()}}>
                        <View style = {styles.rightNavButtonView}>
                            <FontAwesome name = "trash-o" size = {26} allowFontScaling = {false} color = {this.props.legend}/>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        } else if (this.props.title == 'Home' && !(Object.keys(this.props.homeProfile).length === 0 && this.props.homeProfile.constructor === Object)) {
            rightElements = (
                <View style = {styles.navItemView}>
                    <TouchableOpacity onPress = {() => {this.onResetHomeProfilePressed()}}>
                        <View style = {styles.rightNavButtonView}>
                            <FontAwesome name = "trash-o" size = {26} allowFontScaling = {false} color = {this.props.legend}/>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        } else {
            rightElements = <View />
        }

        var leftElements = (
            <View style = {styles.navItemView}>
                <TouchableOpacity onPress = {() => {this.openDrawer()}}>
                    <View style = {styles.leftNavButtonView}>
                        <FontAwesome name = "bars" size = {26} allowFontScaling = {false} color = {this.props.legend}/>
                    </View>
                </TouchableOpacity>
                {title}
            </View>
        )

        var statusBarPadding;
        var navBarMargin;
        if(Platform.OS == "ios") {
            statusBarPadding = <View style = {[styles.statusBarPadding, { backgroundColor: this.props.mod}]} />;
            navBarMargin = -20;
        } else {
            statusBarPadding = <View />;
            navBarMargin = 0;
        }

        return (
            <View style = {styles.navBarContainer}>
                <StatusBar
                    backgroundColor = {this.props.mod}
                    barStyle = "light-content"
                    />
                {statusBarPadding}
                <NavigationBar
                    style = {[styles.navBar, {backgroundColor: this.props.mod, marginTop: navBarMargin}]}
                    leftButton = {leftElements}
                    rightButton = {rightElements}
                    />
            </View>
        )
    }

}

const baseStyles = _.extend(base.general, {
    statusBarPadding: {
        height: 16
    },
    navBarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        alignSelf: 'stretch',
        flex: 1
    },
    navBar: {
        borderBottomWidth: 1,
        borderBottomColor: '#A5A5A5',
        paddingLeft: 15,
        paddingRight: 15
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: Fonts.base,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    navItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftNavButtonView: {
        paddingRight: 20,
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    rightNavButtonView: {
        paddingLeft: 20,
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    }
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
