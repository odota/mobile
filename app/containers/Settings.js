import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as settingsActions from '../actions/settings_act';
import { Actions } from 'react-native-router-flux';

import { RadioButtonGroup } from 'react-native-material-design';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    theme: state.settingsState.theme
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(settingsActions, dispatch)
});

class Settings extends Component {

    constructor(props) {
        super(props);
        this.onThemeSelected = this.onThemeSelected.bind(this);
        this.setTheme = this.setTheme.bind(this);
    }

    onThemeSelected(value) {
        AsyncStorage.setItem("theme", value.toString());
        this.setTheme(value);
    }

    setTheme(value) {
        this.setState({theme: value});
        this.props.actions.changeTheme(value);
    }

    componentWillMount() {

    }

    render() {
        //BUG:0 Selected does not get rendered if it's a variable. Probably problem with library?
        return (
            <View style = {styles.container}>
                <KeyboardAwareScrollView>
                    <View style = {[styles.settingsItemContainer, {backgroundColor: this.props.mod}]}>
                        <View style = {styles.settingsTitle}>
                            <Text style = {[styles.settingsTitleText, { color: this.props.legend}]}>Themes</Text>
                            <RadioButtonGroup
                                selected = {this.props.theme}
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
                </KeyboardAwareScrollView>
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
