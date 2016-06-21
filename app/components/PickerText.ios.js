import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Picker
} from 'react-native';

import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

class PickerText extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} disabled={this.props.disabled} >
                <View style={styles.pickerText}>
                    <Text style={styles.input}>{this.props.title}</Text>
                    { !this.props.disabled && <FontAwesome name="caret-down" size={18} color={Colors.win} style = {styles.pickerIcon} /> }
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create(_.extend(base.general, {
    pickerText: {
        alignSelf: 'stretch',
        paddingTop: 0,
        paddingBottom: 0,
    },
    pickerIcon: {
        position: 'absolute',
        right: 25,
        top: -2
    },

}));


export default PickerText;
