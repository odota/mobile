import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform
} from 'react-native';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Actions } from 'react-native-router-flux';

import _ from 'lodash';

class NavDrawer extends Component {

    static contextTypes = {
        drawer: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.goto = this.goto.bind(this);
    }

    goto(route) {
        this.context.drawer.close();
        if(route == 'home') {

        } else if(route == 'search') {
            Actions.searchTab();
        } else {
            console.log('UNDEFINED');
        }
    }

    render() {
        var paddingView;
        if(Platform.OS === 'ios') {
            paddingView = <View style = {{marginTop: 15}} />
        } else {
            paddingView = <View />
        }
        return (
            <View style = {styles.drawerContainer}>
                {paddingView}
                <ScrollView style = {styles.navScroll}>
                    <TouchableOpacity onPress = {() => {this.goto('home')}}>
                        <View style = {styles.navItem}>
                            <View style = {styles.navIconContainer}>
                                <FontAwesome name = "home" size = {26} allowFontScaling = {false} color = {Colors.skyDolchLegend}/>
                            </View>
                            <View style = {styles.navTextContainer}>
                                <Text style = {styles.navText}>Home</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style = {styles.separator} />

                    <TouchableOpacity onPress = {() => {this.goto('search')}}>
                        <View style = {styles.navItem}>
                            <View style = {styles.navIconContainer}>
                                <FontAwesome name = "search" size = {26} allowFontScaling = {false} color = {Colors.skyDolchLegend}/>
                            </View>
                            <View style = {styles.navTextContainer}>
                                <Text style = {styles.navText}>Search</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style = {styles.separator} />

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
        backgroundColor: Colors.skyDolchMod,
        paddingTop: 10,
        paddingBottom: 10
    },
    navIconContainer: {
        marginLeft: 10,
        marginRight: 10
    },
    navTextContainer: {
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 10
    },
    navText: {
        fontFamily: Fonts.base,
        fontSize: 16,
        color: Colors.skyDolchSecondLegend
    },
    separator: {
        height: 2,
        backgroundColor: Colors.skyDolchLegend
    },
    drawerContainer: {
        alignSelf: 'stretch',
        alignItems: 'stretch',
        flex: 1,
        backgroundColor: Colors.skyDolchMod
    }
});

const styles = StyleSheet.create(baseStyles);

export default NavDrawer;
