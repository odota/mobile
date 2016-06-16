import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import NavigationBar from 'react-native-navbar';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import { Actions } from 'react-native-router-flux';

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.openDrawer = this.openDrawer.bind(this);
    }

    openDrawer() {
        Actions.refresh({key: '0_navDrawer', open: true})
    }

    render() {

        title = <Text style = {styles.title}>{this.props.title}</Text>

        var leftElements = (
            <View style = {styles.navItemView}>
                <TouchableOpacity onPress = {() => {this.openDrawer()}}>
                    <View style = {styles.leftNavButtonView}>
                        <FontAwesome name = "bars" size = {20} allowFontScaling = {false} color = {Colors.skyDolchLegend}/>
                    </View>
                </TouchableOpacity>
                {title}
            </View>
        )

        var rightElements = (
            <View />
        )

        return (
            <View style = {styles.navBarContainer}>
                <NavigationBar
                    style = {styles.navBar}
                    leftButton = {leftElements}
                    rightButton = {rightElements}
                    />
            </View>
        )
    }

}

const baseStyles = _.extend(base.general, {
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
        backgroundColor: Colors.skyDolchMod,
        borderBottomWidth: 1,
        borderBottomColor: '#A5A5A5'
    },
    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: Fonts.base,
        color: Colors.skyDolchSecondLegend,
        marginLeft: 10,
        marginRight: 10
    },
    navItemView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftNavButtonView: {
        paddingLeft: 12,
        paddingRight: 5,
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    }
});

const styles = StyleSheet.create(baseStyles);

export default NavBar;
