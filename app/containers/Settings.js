import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    AsyncStorage
} from 'react-native'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import * as settingsActions from 'Actions/settings_act'
import { Actions } from 'react-native-router-flux'

import { RadioButtonGroup } from 'react-native-material-design'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import extend from 'lodash/extend'

import Colors from 'Themes/Colors'
import base from 'Themes/BaseStyles'
import Fonts from 'Themes/Fonts'

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    theme: state.settingsState.theme
})

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(settingsActions, dispatch)
})

class Settings extends PureComponent {
    onThemeSelected = (value) => {
        AsyncStorage.setItem('theme', value.toString())
        this.setTheme(value)
    }

    setTheme = (value) => {
        this.setState({theme: value})
        this.props.actions.changeTheme(value)
    }

    render () {
        // BUG:0 Selected does not get rendered if it's a variable. Probably problem with library?
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={[styles.settingsItemContainer, {backgroundColor: this.props.mod}]}>
                        <View style={styles.settingsTitle}>
                            <Text style={[styles.settingsTitleText, {color: this.props.legend}]}>Themes</Text>
                            <RadioButtonGroup
                                selected={this.props.theme}
                                theme='dark'
                                onSelect={this.onThemeSelected}
                                items={[
                                    { value: 1, label: 'OpenDota' },
                                    { value: 2, label: 'Sky Dolch' },
                                    { value: 3, label: 'Hyperfuse' },
                                    { value: 5, label: 'Invisibility' },
                                    { value: 6, label: 'Double Damage' }
                                ]}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const baseStyles = extend(base.general, {
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

})
const styles = StyleSheet.create(baseStyles)

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
