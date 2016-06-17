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

import { Actions } from 'react-native-router-flux';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import heroes from '../json/heroes.json';
import gameMode from '../json/game_mode.json';
import skill from '../json/skill.json';
import { getHeroImage } from '../utils/getHeroImage';

import _ from 'lodash';
import moment from 'moment';

class MatchesCard extends Component {

    constructor(props) {
        super(props);
        this.matchesDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.renderRow = this.renderRow.bind(this);
    }

    renderRow(rowData, i , j) {
        var rowContainer;
        var team;
        var result;
        if(rowData.player_slot > 127) {
            team = 'Dire';
        } else {
            team = 'Radiant';
        }
        if(team == 'Radiant' && rowData.radiant_win == true) {
            result = 'W';
        } else if (team == 'Dire' && rowData.radiant_win == false){
            result = 'W';
        } else {
            result = 'L';
        }
        if(result == 'W') {
            indicatorColor = Colors.win;
        } else {
            indicatorColor = Colors.lose;
        }
        if((parseInt(j)+1) % 2 == 0) {
            rowContainer = styles.rowContainerEven;
        } else {
            rowContainer = styles.rowContainerOdd;
        }
        var staticUri = getHeroImage(rowData.hero_id);
        var minutes = Math.floor(rowData.duration/60);
        var seconds = rowData.duration - (minutes * 60);
        if(seconds < 10) {
            seconds = '0' + seconds;
        }
        var endTime = rowData.start_time + rowData.duration;
        var unixEndTime = endTime * 1000;
        var now = moment();
        var friendlyEndTime = moment.duration(now.diff(unixEndTime)).humanize();
        return (
            <TouchableOpacity style = {{flexDirection: 'row', flex: 1}}>
                <View style = {rowContainer}>
                    <View style = {{flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: -5}}>
                        <Avatar image = {<Image source = {staticUri} />} size = {40} borderRadius = {20} />
                    </View>
                    <View style = {styles.cell}>
                        <Text style = {styles.tableValueText}>{gameMode[rowData.game_mode].name}</Text>
                    </View>
                    <View style = {styles.cell}>
                        <Text style = {styles.tableValueText}>{friendlyEndTime}</Text>
                    </View>
                    <View style = {styles.cell}>
                        <Text style = {styles.tableValueText}>{minutes}:{seconds}</Text>
                    </View>
                    <View style = {styles.doubleCell}>
                        <Text style = {styles.tableValueText}>{rowData.kills}/{rowData.deaths}/{rowData.assists}</Text>
                    </View>

                </View>
                <View style = {{width: 5, backgroundColor: indicatorColor}} />
            </TouchableOpacity>
        )
    }

    render() {
        if(this.props.matches) {
            return (
                <View style = {styles.matchesCardContainer}>
                    <View style = {styles.titleContainer}>
                        <Text style = {styles.titleText}>MATCHES</Text>
                    </View>
                    <View style = {styles.separator} />
                    <View style = {styles.tableHeaderContainer}>
                        <View style = {{flex: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 10,
                            marginBottom: 10,
                            marginLeft: -5}}>
                            <Text style = {styles.tableHeaderText}>Hero</Text>
                        </View>
                        <View style = {styles.tableHeaderCell}>
                            <Text style = {styles.tableHeaderText}>Mode</Text>
                        </View>
                        <View style = {styles.tableHeaderCell}>
                            <Text style = {styles.tableHeaderText}>Ended</Text>
                        </View>
                        <View style = {styles.tableHeaderCell}>
                            <Text style = {styles.tableHeaderText}>Length</Text>
                        </View>
                        <View style = {styles.doubleTableHeaderCell}>
                            <Text style = {styles.tableHeaderText}>K/D/A</Text>
                        </View>
                        <View style = {{width: 5}} />
                    </View>
                    <ListView style = {styles.matchesListView}
                        dataSource = {this.matchesDS.cloneWithRows(this.props.matches)}
                        renderRow = {this.renderRow}
                        enableEmptySections = {true}
                    />
                </View>
            )
        } else {
            return (<View />);
        }
    }
}

const baseStyles = _.extend(base.general, {
    matchesCardContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 10,
        paddingTop: 10,
        backgroundColor: Colors.skyDolchMod,
        borderRadius: 3
    },
    titleText: {
        fontFamily: Fonts.base,
        fontSize: 28,
        color: Colors.skyDolchSecondLegend
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    separator: {
        height: 2,
        backgroundColor: Colors.skyDolchLegend
    },
    rowContainerEven: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Colors.skyDolchMod,
        flexDirection: 'row',
        flex: 1
    },
    rowContainerOdd: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Colors.skyDolchAlpha,
        flexDirection: 'row',
        flex: 1
    },
    tableHeaderContainer: {
        flexDirection: 'row'
    },
    tableHeaderCell: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    halfTableHeaderCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    doubleTableHeaderCell: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    tableHeaderText: {
        fontFamily: Fonts.base,
        fontSize: 14,
        color: Colors.skyDolchSecondLegend,
        fontWeight: 'bold'
    },
    tableValueText: {
        fontFamily: Fonts.base,
        fontSize: 14,
        color: Colors.skyDolchSecondLegend,
        alignSelf: 'center'
    },
    heroValueText: {
        fontFamily: Fonts.base,
        fontSize: 14,
        color: Colors.skyDolchSecondLegend,
        alignSelf: 'center'
    },
    cell: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    halfCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    doubleCell: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    }
});

const styles = StyleSheet.create(baseStyles);

export default MatchesCard;
