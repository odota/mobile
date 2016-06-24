import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Picker
} from 'react-native';

import { connect } from 'react-redux';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import _ from 'lodash';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend
});

class PickerInput extends Component {

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onPickerDone = this.onPickerDone.bind(this);
        this.state = {
            selectedValue: props.selectedValue,
            selectedLabel: props.selectedLabel
        }
    }

    onSelect() {
        this.props.onPickerDone(this.state.selectedValue, this.state.selectedLabel);
    }

    onCancel() {
        this.props.onPickerCancel();
    }

    onPickerDone(pickedValue, idx) {
        item = this.props.items[idx];
        this.setState({selectedValue: pickedValue, selectedLabel: item.localized_name});
    }

    render() {
        return (
            <View style = {styles.pickerWrapper}>
                <View style = {styles.pickerContainer}>
                    <View style = {styles.inputRow}>
                        <TouchableOpacity onPress = {this.onCancel}>
                            <Text style = {[styles.inputRowItemLeft, {color: this.props.legend}]} ref = {textInput => this.textInput = textInput}> CANCEL </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {this.onSelect}>
                            <Text style={[styles.inputRowItemRight, {color: this.props.legend}]} ref={textInput => this.textInput = textInput}> OK </Text>
                        </TouchableOpacity>
                    </View>
                    <Picker
                        ref={picker => this.pickers = picker}
                        style={styles.picker}
                        showDuration={300}
                        showMask={true}
                        selectedValue = {this.state.selectedValue}
                        onValueChange={this.onPickerDone}
                        itemStyle = {styles.item}
                        >
                    { this.props.items.map(function (item) {
                        return <Picker.Item label={item.localized_name} value={item.id} key={item.id} />
                    }) }
                  </Picker>
                </View>
            </View>
        );
    }

}

const baseStyles = _.extend(base.general, {
    pickerWrapper: {
        height: Dimensions.get('window').height,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    inputRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        height: 40
    },
    inputRowItemLeft: {
        flex: 1,
        paddingVertical: 10,
        paddingLeft: 10,
        paddingRight: 50
    },
    inputRowItemRight: {
        flex: 1,
        paddingVertical: 10,
        paddingLeft: 50,
        paddingRight: 10
    },
    pickerContainer: {
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#bbb'
    },
    picker: {
        backgroundColor: '#aaa',
        flex: 1
    },
    item: {
    }

});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps)(PickerInput);
