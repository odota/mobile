import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as settingsActions from '../actions/settings_act';
import { Actions } from 'react-native-router-flux';

import { RadioButtonGroup } from 'react-native-material-design';

import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(settingsActions, dispatch)
});

class Settings extends Component {

    constructor(props) {
        super(props);
        this.onThemeSelected = this.onThemeSelected.bind(this);
    }

    onThemeSelected(value) {
        if(value == 1) {
            this.props.actions.changeTheme(Colors.skyDolchAlpha, Colors.skyDolchMod, Colors.skyDolchLegend, Colors.skyDolchSecondLegend, Colors.skyDolchLegendHex, Colors.skyDolchLegendTranslucent);
        } else if (value == 2) {
            this.props.actions.changeTheme(Colors.hyperfuseAlpha, Colors.hyperfuseMod, Colors.hyperfuseLegend, Colors.hyperfuseSecondLegend, Colors.hyperfuseLegendHex, Colors.hyperfuseLegendTranslucent);
        } else if (value == 5) {
            this.props.actions.changeTheme(Colors.doubleDamageAlpha, Colors.doubleDamageMod, Colors.doubleDamageLegend, Colors.doubleDamageSecondLegend, Colors.doubleDamageLegendHex, Colors.doubleDamageLegendTranslucent);
        } else {
            console.log(value);
        }
    }

    render() {
        return (
            <View style = {styles.container}>
                <ScrollView>
                    <View style = {[styles.settingsItemContainer, {backgroundColor: this.props.mod}]}>
                        <View style = {styles.settingsTitle}>
                            <Text style = {[styles.settingsTitleText, { color: this.props.legend}]}>Themes</Text>
                            <RadioButtonGroup
                                selected = {1}
                                theme = 'dark'
                                onSelect = {this.onThemeSelected}
                                items = {[
                                    { value: 1, label: 'Sky Dolch' },
                                    { value: 2, label: 'Hyperfuse' },
                                    { value: 3, label: 'Haste' },
                                    { value: 4, label: 'Invisibility' },
                                    { value: 5, label: 'Double Damage' },
                                    { value: 6, label: 'Regeneration' },
                                    { value: 7, label: 'Illusion' }
                                ]}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>

        )

    }
}

const baseStyles = _.extend(base.general, {
    settingsItemContainer: {
        flex: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3
    },
    settingsTitle: {
        padding: 10
    },
    settingsTitleText: {
        fontFamily: Fonts.base,
        fontSize: 18,
        fontWeight: 'bold'
    }

});
const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
