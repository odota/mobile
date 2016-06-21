import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playerMatchesActions from '../actions/player_matches_act';
import { Actions } from 'react-native-router-flux';

import heroes from '../json/heroes.json';

import MatchesCard from '../components/MatchesCard';
import PickerInput from '../components/PickerInput';
import PickerText from '../components/PickerText';

import Spinner from 'react-native-spinkit';
import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    matches: state.playerMatchesState.matches,
    isLoadingMatches: state.playerMatchesState.isLoadingMatches,
    isEmptyMatches: state.playerMatchesState.isEmptyMatches,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(playerMatchesActions, dispatch)
});

class MatchesPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'hero': false
        }
        this.togglePicker = this.togglePicker.bind(this);
        this.valuePicked = this.valuePicked.bind(this);
    }

    togglePicker(name) {
        var newState = _.cloneDeep(this.state);
        newState[name] = !newState[name];
        this.setState(newState);
    }

    valuePicked(pickerName, valueKey, labelKey, pickedValue, pickedLabel) {
        var newState = _.cloneDeep(this.state);
        if(pickedValue === 0) {
            pickedValue = null;
            pickedLabel = '';
        }
        newState[valueKey] = pickedValue;
        newState[labelKey] = pickedLabel;
        newState[pickerName] = false;
        this.setState(newState);
    }

    componentWillMount() {
        this.props.actions.fetchMatches(this.props.contextId, 30);
    }

    render() {

        var content;
        if(this.props.isLoadingMatches) {
            content = (
                <View style = {styles.contentContainer}>
                    <Spinner isVisible = {true} size = {100} type = 'Pulse' color = {this.props.legendHex} />
                </View>
            )
        } else if (this.props.isEmptyMatches) {
            content = (
                <View style = {styles.contentContainer}>
                    <Text style = {styles.noDataText}>No data found</Text>
                </View>
            )
        } else {
            var picker;
            console.log(this.state);
            var sortedHeroes = _.sortBy(heroes.result.heroes, ['localized_name']);
            if(this.state['hero']) {
                picker = <PickerInput
                            selectedValue = {1}
                            selectedLabel = {'Abbadon'}
                            onPickerDone = {(selectedValue, selectedLabel) => this.valuePicked('hero', 'hero_id', 'hero_name', selectedValue, selectedLabel)}
                            onPickerCancel = {() => this.togglePicker('hero')}
                            items = {sortedHeroes}
                            />
            }

            content = (
                <ScrollView style = {{marginTop: 5}}>
                    <PickerText
                        onPress = {() => this.togglePicker('hero')}
                        selectedValue = {1}
                        selectedLabel = {'Abbadon'}
                        onPickerDone = {(selectedValue, selectedLabel) => this.valuePicked('hero', 'hero_id', 'hero_name', selectedValue, selectedLabel)}
                        onPickerCancel = {() => this.togglePicker('hero')}
                        items = {sortedHeroes}
                        />
                    <MatchesCard matches = {this.props.matches.matches} />
                    {picker}
                </ScrollView>
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

});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(MatchesPage);
