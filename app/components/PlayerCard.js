import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Avatar } from 'react-native-material-design';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import _ from 'lodash';

class PlayerCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var info = this.props.info;
        return (
            <TouchableOpacity>
                <View style = {styles.playerCardContainer}>
                    <View style = {styles.avatarContainer}>
                        <Avatar image = {<Image source = {{uri: info.avatarfull}} />} size = {60} borderRadius = {30}/>
                    </View>
                    <View style = {styles.dataContainer}>
                        <View style = {styles.nameContainer}>
                            <Text style = {styles.data}>{info.personaname}</Text>
                        </View>
                        <View style = {styles.separator}/>
                        <View style = {styles.nameContainer}>
                            <Text style = {styles.data}>ID: {info.account_id}</Text>
                        </View>
                    </View>
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
        backgroundColor: Colors.skyDolchAlpha,
        borderRadius: 3,
        flexDirection: 'row'
    },
    avatarContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dataContainer: {
        flex: 3,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5
    },
    data: {
        fontFamily: Fonts.base,
        fontSize: 14,
        color: Colors.skyDolchSecondLegend
    },
    separator: {
        height: 2,
        backgroundColor: Colors.skyDolchLegend
    },
    nameContainer: {
        marginBottom: 5,
        marginTop: 5
    }
});

const styles = StyleSheet.create(baseStyles);

export default connect()(PlayerCard);
