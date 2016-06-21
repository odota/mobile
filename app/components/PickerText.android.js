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

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class PickerText extends React.Component {


    constructor(props) {
      super(props);
      this.onSelect = this.onSelect.bind(this);

      this.state = {
        selectedValue: props.selectedValue.key,
        selectedLabel: props.selectedValue.label
      }
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
            style = {styles.pickerText}
            selectedValue = {this.state.selectedValue}
            onValueChange={this.onSelect}
            >
            { this.props.items.map(function (item) { return <Picker.Item label={item.localized_name} value={item.id} key={item.id} /> }) }
            </Picker>
          );
        }
      }
}

const styles = StyleSheet.create(_.extend(base.general, {
  pickerText: {
    alignSelf: 'stretch',
    color: Colors.bodyText,
  },
  input: _.extend(base.general.input, {
      padding: 0,
      margin: 0
  })
} ));


export default PickerText;
