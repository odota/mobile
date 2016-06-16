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
import { bindActionCreators } from 'redux';
import * as navigationActions from '../actions/navigation_act';

import { Avatar } from 'react-native-material-design';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import _ from 'lodash';

export const mapStateToProps = state => ({

});

export const mapDispatchToProps = (dispatch) => ({
    navigationActions: bindActionCreators(navigationActions, dispatch)
});

class PlayerCard extends Component {

    constructor(props) {
        super(props);
        this.onPlayerPressed = this.onPlayerPressed.bind(this);
    }

    onPlayerPressed() {
        this.props.navigationActions.changeContextId(this.props.info.account_id);
        // Navigate to user home
        Actions.playerProfile();
    }

    render() {
        var info = this.props.info;
        return (
            <TouchableOpacity onPress = {this.onPlayerPressed}>
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
        backgroundColor: Colors.skyDolchMod,
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCard);
