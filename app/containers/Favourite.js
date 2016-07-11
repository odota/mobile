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

import ProgressBar from 'ProgressBarAndroid';
import Spinner from 'react-native-spinkit';
import SGListView from 'react-native-sglistview';

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
        this.onPurgePressed = this.onPurgePressed.bind(this);
    }

    componentWillMount() {
        // Move this to splash
        AsyncStorage.getItem("favourites").then((value) => {
            if(value) {
                this.props.actions.initializeFavourites(value);
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .done();
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

    onPurgePressed() {
        Alert.alert('Delete All Favourites',
                    'Are you sure that you want to delete all profiles from favourites?',
                    [
                        {text: 'Cancel', style: 'cancel'},
                        {text: 'OK', onPress: () => {
                            this.props.actions.purgeFavourites();
                            setTimeout(() => {
                                var favouritesString = JSON.stringify(this.props.favouritesList);
                                AsyncStorage.setItem("favourites", favouritesString);
                            }, 1000);}},
                    ])
                    /*
        this.props.actions.purgeFavourites();
        setTimeout(() => {
            var favouritesString = JSON.stringify(this.props.favouritesList);
            AsyncStorage.setItem("favourites", favouritesString);
        }, 1000);
        */
    }

    render() {
        var content;
        var spinner
        if(Platform.OS == 'ios') {
            spinner = <Spinner isVisible = {true} size = {100} type = 'Pulse' color = {this.props.legendHex} />
        } else {
            spinner = <ProgressBar styleAttr = "Large" color = {this.props.legend} />
        }

        if(this.props.favouritesList.length < 1) {
            content = (
                <View style = {styles.contentContainer}>
                    <Text style = {styles.noDataText}>Looks like you have not added anyone as favourite.
                    Add them from search tab!</Text>
                </View>
            )
        } else {
            var purgeButton = (
                <TouchableOpacity  onPress = {this.onPurgePressed} style = {styles.purgeContainer}>
                    <View style = {[styles.purgeIconContainer, {backgroundColor: Colors.lose}]}>
                        <FontAwesome name = "trash" size = {20} allowFontScaling = {false} color = {this.props.secondLegend}/>
                    </View>
                    <View style = {[styles.purgeButton, {backgroundColor: Colors.lose}]}>
                        <Text style = {[styles.purgeButtonText, {color: this.props.secondLegend}]}>Delete All Favourites</Text>
                    </View>
                </TouchableOpacity>
            )
            content = (
                <View style = {{flex: 1}}>
                    <SGListView
                        dataSource = {this.ds.cloneWithRows(this.props.favouritesList)}
                        renderRow = {this.renderRow}
                        style = {styles.listView}
                        enableEmptySections = {true} />
                    {purgeButton}
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
        alignItems: 'center',
        justifyContent: 'center'
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
