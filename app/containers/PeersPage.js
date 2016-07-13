import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ListView,
    TouchableOpacity,
    Platform
} from 'react-native';

import ProgressBar from 'ProgressBarAndroid';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as peersActions from '../actions/peers_act';
import { Actions } from 'react-native-router-flux';
