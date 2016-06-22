import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playerMatchesActions from '../actions/player_matches_act';
import { Actions } from 'react-native-router-flux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import heroes from '../json/heroes.json';
import factions from '../json/factions.json';
import PickerInput from '../components/PickerInput';
import PickerText from '../components/PickerText';

import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(playerMatchesActions, dispatch)
});

var sortedHeroes;
var sortedFactions;

class MatchesSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'hero': false,
            'hero_id': 0,
            'hero_name': 'None',
            'faction': false,
            'faction_id': -1,
            'faction_name': "None"
        }
        this.togglePicker = this.togglePicker.bind(this);
        this.valuePicked = this.valuePicked.bind(this);
        this.onFilterPressed = this.onFilterPressed.bind(this);
    }

    componentWillMount() {
        var heroesArray = _.cloneDeep(heroes.result.heroes);
        sortedHeroes = _.sortBy(heroesArray, ['localized_name']);
        sortedHeroes.unshift({"id": 0, "localized_name": "None"});
        sortedFactions = _.cloneDeep(factions);
        sortedFactions.unshift({"id": -1, "localized_name": "None"});
    }

    onFilterPressed() {
        this.props.actions.fetchMatches(this.props.contextId, 30, this.state.hero_id, this.state.faction_id);
        Actions.pop();
    }

    togglePicker(name) {
        var newState = _.cloneDeep(this.state);
        newState[name] = !newState[name];
        this.setState(newState);
    }

    valuePicked(pickerName, valueKey, labelKey, pickedValue, pickedLabel) {
        var newState = _.cloneDeep(this.state);
        if(pickedValue === undefined) {
            pickedValue = 0;
            pickedLabel = 'None';
        }
        newState[valueKey] = pickedValue;
        newState[labelKey] = pickedLabel;
        newState[pickerName] = false;
        this.setState(newState);
    }

    render() {

        var picker;
        console.log(this.state);

        if(this.state['hero']) {
            picker = <PickerInput
                        selectedValue = {this.state.hero_id}
                        selectedLabel = {this.state.hero_name}
                        onPickerDone = {(selectedValue, selectedLabel) => this.valuePicked('hero', 'hero_id', 'hero_name', selectedValue, selectedLabel)}
                        onPickerCancel = {() => this.togglePicker('hero')}
                        items = {sortedHeroes}
                        />
        }

        if(this.state['faction']) {
            picker = <PickerInput
                        selectedValue = {this.state.faction_id}
                        selectedLabel = {this.state.faction_name}
                        onPickerDone = {(selectedValue, selectedLabel) => this.valuePicked('faction', 'faction_id', 'faction_name', selectedValue, selectedLabel)}
                        onPickerCancel = {() => this.togglePicker('faction')}
                        items = {sortedFactions}
                        />
        }

        return (
            <ScrollView>
                <View style = {styles.container}>
                    <View style = {[styles.formContainer, {backgroundColor: this.props.mod}]}>

                        <View style = {styles.pickerItem}>
                            <View style = {styles.pickerTitleContainer}>
                                <Text style = {[styles.pickerTitle, {color: this.props.legend}]}>Hero</Text>
                            </View>
                            <PickerText
                                onPress = {() => this.togglePicker('hero')}
                                title = {this.state.hero_name}
                                selectedValue = {this.state.hero_id}
                                selectedLabel = {this.state.hero_name}
                                onPickerDone = {(selectedValue, selectedLabel) => this.valuePicked('hero', 'hero_id', 'hero_name', selectedValue, selectedLabel)}
                                onPickerCancel = {() => this.togglePicker('hero')}
                                items = {sortedHeroes}
                                />
                        </View>

                        <View style = {styles.pickerItem}>
                            <View style = {styles.pickerTitleContainer}>
                                <Text style = {[styles.pickerTitle, {color: this.props.legend}]}>Faction</Text>
                            </View>
                            <PickerText
                                onPress = {() => this.togglePicker('faction')}
                                title = {this.state.faction_name}
                                selectedValue = {this.state.faction_id}
                                selectedLabel = {this.state.faction_name}
                                onPickerDone = {(selectedValue, selectedLabel) => this.valuePicked('faction', 'faction_id', 'faction_name', selectedValue, selectedLabel)}
                                onPickerCancel = {() => this.togglePicker('faction')}
                                items = {sortedFactions}
                                />
                        </View>

                    </View>
                    <TouchableOpacity  onPress = {this.onFilterPressed} style = {styles.filterContainer}>
                        <View style = {[styles.filterIconContainer, {backgroundColor: this.props.mod}]}>
                            <FontAwesome name = "filter" size = {20} allowFontScaling = {false} color = {this.props.legend}/>
                        </View>
                        <View style = {[styles.filterButton, {backgroundColor: this.props.mod}]}>
                            <Text style = {[styles.filterButtonText, {color: this.props.legend}]}>Filter Matches</Text>
                        </View>
                    </TouchableOpacity>
                    {picker}
                </View>
            </ScrollView>

        )

    }

}

const baseStyles = _.extend(base.general, {
    formContainer: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 3
    },
    pickerTitleContainer: {
        marginBottom: 5
    },
    pickerTitle: {
        fontFamily: Fonts.base,
        fontSize: 18,
        fontWeight: 'bold'
    },
    pickerItem: {
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 10
    },
    filterContainer: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1
    },
    filterButton: {
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
    filterIconContainer: {
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
    filterButtonText: {
        fontFamily: Fonts.base,
        fontSize: 16
    },
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(MatchesSearch);
