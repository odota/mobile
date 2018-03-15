import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as settingsActions from '../actions/settings_act';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
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
    theme: state.settingsState.theme,
    tracker: state.navigationState.tracker,
    background: state.settingsState.background
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(settingsActions, dispatch)
});

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            themesArray: [
                { value: 1, label: 'OpenDota ' },
                { value: 2, label: 'Sky Dolch' },
                { value: 3, label: 'Hyperfuse' },
                { value: 5, label: 'Invisibility' },
                { value: 9, label: 'NightDota'}
            ],
            theme: this.props.theme,
            themeIndex: this.props.theme
        };
        this.onThemeSelected = this.onThemeSelected.bind(this);
        this.setTheme = this.setTheme.bind(this);
    }

    componentDidMount() {
        this.props.tracker.trackScreenView('Settings');
    }

    onThemeSelected(value) {
        AsyncStorage.setItem("theme", value.toString());
        this.setTheme(value);
    }

    setTheme(value) {
        if (value === 1) {
            this.props.tracker.trackEvent('Theme Selected', 'OpenDota');
        } else if (value === 2) {
            this.props.tracker.trackEvent('Theme Selected', 'Sky Dolch');
        } else if (value === 3) {
            this.props.tracker.trackEvent('Theme Selected', 'Hyperfuse');
        } else if (value === 5) {
            this.props.tracker.trackEvent('Theme Selected', 'Invisibility');
        } else if (value === 9) {
            this.props.tracker.trackEvent('Theme Selected', 'Night');
        }
        this.props.actions.changeTheme(value);
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style = {[styles.container, {backgroundColor: this.props.background}]}>
                <KeyboardAwareScrollView>
                    <View style = {[styles.settingsItemContainer, {backgroundColor: this.props.mod}]}>
                        <View style = {styles.settingsTitle}>
                            <Text style = {[styles.settingsTitleText, { color: this.props.legend}]}>Themes</Text>
                                <View style = {{flex: 1, alignSelf: 'flex-start', marginTop: 20}}>
                                    <RadioForm animation={true}>
                                      {this.state.themesArray.map((obj, i) => {
                                        var onPress = (value, index) => {
                                            this.setState({
                                                theme: value,
                                                themeIndex: index
                                            })
                                            AsyncStorage.setItem("theme", value.toString());
                                            this.setTheme(value);
                                        }
                                        return (
                                            <RadioButton labelHorizontal={true} key={i} >
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}
                                                    isSelected={this.state.theme === obj.value}
                                                    onPress={onPress}
                                                    buttonInnerColor={'#66BBFF'}
                                                    buttonOuterColor={this.state.theme === obj.value ? '#66BBFF' : '#66BBFF'}
                                                    buttonSize={15}
                                                    buttonStyle={{}}
                                                    buttonWrapStyle={{marginBottom: 10}}
                                                    />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}
                                                    onPress={onPress}
                                                    labelStyle={{color: Colors.cyanLegend, marginBottom: 10, fontSize: 14}}
                                                    labelWrapStyle={{marginLeft: 10}}
                                                    />
                                            </RadioButton>
                                        )
                                      })}
                                    </RadioForm>
                                </View>

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
