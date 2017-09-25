import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Picker
} from 'react-native'

import extend from 'lodash/extend'

import { connect } from 'react-redux'

import Colors from 'Themes/Colors'
import base from 'Themes/BaseStyles'
import Fonts from 'Themes/Fonts'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export const mapStateToProps = state => ({
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend
})

class PickerText extends React.Component {
    state = {
        selectedValue: this.props.selectedValue,
        selectedLabel: this.props.selectedLabel,
        items: null
    }

    componentWillMount () {
        this.setState({items: this.props.items})
    }

    onSelect = (value, idx) => {
        this.setState({selectedValue: value, selectedLabel: this.props.items[idx].localized_name})
        this.props.onPickerDone(value, this.props.items[idx].localized_name)
    }

    render () {
        if (this.props.disabled) {
            return (
                <TextInput
                    style={styles.pickerText}
                    value={this.props.title}
                    editable={false}
                />
            )
        } else {
            return (
                <Picker
                    style={[styles.pickerText, {color: this.props.secondLegend, backgroundColor: this.props.alpha}]}
                    selectedValue={this.state.selectedValue}
                    onValueChange={this.onSelect}
                    mode={'dropdown'}
                    >
                    { this.state.items.map(function (item) { return <Picker.Item label={item.localized_name} value={item.id} key={item.id} /> }) }
                </Picker>
            )
        }
    }
}

const styles = StyleSheet.create(extend(base.general, {
    pickerText: {
        borderRadius: 3,
        height: 35,
        paddingLeft: 10
    }
}))

export default connect(mapStateToProps)(PickerText)
