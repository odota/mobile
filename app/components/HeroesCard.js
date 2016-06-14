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

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from 'react-native-slider';

import _ from 'lodash';

class HeroesCard extends Component {

    constructor(props) {
        super(props);
        this.heroesDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.renderRow = this.renderRow.bind(this);
    }

    renderRow(rowData, i, j) {
        console.log(rowData);
        return (
            <View style = {styles.rowContainer}>
                <Text>A hero</Text>
            </View>
        )
    }

    render() {
        if(this.props.heroes) {
            return (
                <View style = {styles.heroesCardContainer}>
                    <View style = {styles.titleContainer}>
                        <Text style = {styles.titleText}>HEROES</Text>
                    </View>
                    <View style = {styles.separator} />
                    <View style = {styles.tableHeaderContainer}>
                        <Text>Hero</Text>
                        <Text>Played</Text>
                        <Text>Win</Text>
                    </View>
                    <ListView style = {styles.heroesListView}
                        dataSource = {this.heroesDS.cloneWithRows(this.props.heroes)}
                        renderRow = {this.renderRow}
                        enableEmptySections = {true}
                    />
                </View>
            )
        } else {
            return (<View />)
        }

    }

}

const baseStyles = _.extend(base.general, {
    heroesCardContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Colors.skyDolchAlpha,
        borderRadius: 3
    },
    titleText: {
        fontFamily: Fonts.base,
        fontSize: 28,
        color: Colors.skyDolchSecondLegend
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    heroesListView: {
        marginLeft: 5,
        marginRight: 5
    },
    separator: {
        height: 2,
        backgroundColor: Colors.skyDolchLegend
    },
    rowContainer: {
        marginTop: 5,
        marginBottom: 5
    },
    tableHeaderContainer: {
        flexDirection: 'row'
    }
});

const styles = StyleSheet.create(baseStyles);

export default HeroesCard
