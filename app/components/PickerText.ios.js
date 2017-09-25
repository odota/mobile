import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Picker
} from 'react-native'

import { connect } from 'react-redux'

import extend from 'lodash/extend'

import Colors from 'Themes/Colors'
import base from 'Themes/BaseStyles'
import Fonts from 'Themes/Fonts'

import FontAwesome from 'react-native-vector-icons/FontAwesome'

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend
})

class PickerText extends PureComponent {
    render () {
        return (
            <TouchableOpacity onPress={this.props.onPress} disabled={this.props.disabled}>
                <View style={[styles.pickerItem, {backgroundColor: this.props.alpha}]}>
                    <View style={styles.pickerTextContainer}>
                        <Text style={[styles.pickerText, {color: this.props.secondLegend}]}>{this.props.title}</Text>
                    </View>
                    <View style={styles.pickerIconContainer}>
                        { !this.props.disabled && <FontAwesome name='caret-down' size={18} color={this.props.legend} /> }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create(extend(base.general, {
    pickerItem: {
        borderRadius: 3,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 5,
        flex: 1
    },
    pickerIconContainer: {
        alignItems: 'center',
        flex: 1
    },
    pickerTextContainer: {
        flex: 7
    },
    pickerIcon: {
    },
    pickerText: {
        fontFamily: Fonts.base,
        fontSize: 14
    }

}))

export default connect(mapStateToProps)(PickerText)
