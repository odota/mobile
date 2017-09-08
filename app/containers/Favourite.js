import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    AsyncStorage,
    Platform,
    TouchableOpacity,
    Alert
} from 'react-native';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as favouritesActions from '../actions/favourites_act';
import { Actions } from 'react-native-router-flux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import PlayerCard from '../components/PlayerCard';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    legendHex: state.settingsState.legendHex,
    legendTranslucent: state.settingsState.legendTranslucent,
    favouritesList: state.favouritesState.favourites
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(favouritesActions, dispatch)
});

class Favourite extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.renderRow = this.renderRow.bind(this);
    }

    componentWillMount() {
    }

    renderRow(rowData, i, j) {
        if(rowData !== undefined) {
            return (
                <PlayerCard info = {rowData}/>
            );
        } else {
            return <View />
        }
    }

    render() {
        var content;

        if(this.props.favouritesList.length < 1) {
            content = (
                <View style = {styles.contentContainer}>
                    <View style = {{backgroundColor: this.props.mod, borderRadius: 5, borderWidth: 1, borderColor: this.props.mod, paddingHorizontal: 10, paddingVertical: 5}}>
                        <Text style = {[styles.noDataText, {color: this.props.secondLegend}]}>Looks like you have not added anyone as favourite.
                        Add them from search tab!</Text>
                    </View>
                </View>
            )
        } else {
            content = (
                <View style = {{flex: 1}}>
                    <ListView
                        dataSource = {this.ds.cloneWithRows(this.props.favouritesList)}
                        renderRow = {this.renderRow}
                        style = {styles.listView}
                        enableEmptySections = {true} />
                </View>

            )
        }
        return (
            <View style = {styles.container}>
                {content}
            </View>
        )
    }
}

const baseStyles = _.extend(base.general, {
    contentContainer: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10
    },
    purgeButton: {
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 10,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 2
    },
    purgeIconContainer: {
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 8,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1
    },
    purgeButtonText: {
        fontFamily: Fonts.base,
        fontSize: 16
    },
    purgeContainer: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
});

const styles = StyleSheet.create(baseStyles);
export default connect(mapStateToProps, mapDispatchToProps)(Favourite);
