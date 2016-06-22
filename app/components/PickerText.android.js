import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Picker
} from 'react-native';

import _ from 'lodash';

import { connect } from 'react-redux';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const mapStateToProps = state => ({
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend
});

class PickerText extends React.Component {


    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);

        this.state = {
            selectedValue: props.selectedValue,
            selectedLabel: props.selectedLabel,
            items: null
        }
    }

    componentWillMount() {
        this.setState({items: this.props.items})
    }

    onSelect(value, idx) {
        this.setState({selectedValue: value, selectedLabel: this.props.items[idx].localized_name});
        this.props.onPickerDone(value, this.props.items[idx].localized_name);
    }

  	render() {
        if (this.props.disabled) {
            return (
                <TextInput
                style = {styles.pickerText}
                value = {this.props.title}
                editable={false}
                />
            );

        } else {
            return (
                <Picker
                style = {[styles.pickerText, {color: this.props.secondLegend, backgroundColor: this.props.alpha}]}
                selectedValue = {this.state.selectedValue}
                onValueChange={this.onSelect}
                mode = {'dropdown'}
                >
                    { this.state.items.map(function (item) { return <Picker.Item label={item.localized_name} value={item.id} key={item.id} /> }) }
                </Picker>
            );
        }
    }
}

const styles = StyleSheet.create(_.extend(base.general, {
  pickerText: {
    borderRadius: 3,
    height: 35,
    paddingLeft: 10
  },

} ));


export default connect(mapStateToProps)(PickerText);
