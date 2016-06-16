import { Router, Scene, Actions } from 'react-native-router-flux';

import PlayerSearch from './PlayerSearch';
import PlayerProfile from './PlayerProfile';
import Drawers from './Drawer';
import customNavBar from '../components/NavBar';
import deepNavBar from '../components/DeepNavBar';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { BackAndroid, Text } from 'react-native';

class DotaKeepApp extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            try {
                return Actions.pop();
            } catch (err) {
                return false;
            }
        });

        return (
            <Router sceneStyle = {{backgroundColor: 'white'}}>
                <Scene key = "root" hideNavBar = {true}>
                    <Scene key = "navDrawer" component = {Drawers} panHandler = {null}>
                        <Scene key = "main" tabs = {true} hideTabBar = {true} panHandler = {null} navBar = {customNavBar}>
                            <Scene key = "searchTab" title = "Search" navBar = {customNavBar}>
                                <Scene key = "playerSearch" component = {PlayerSearch} initial = {true} />
                                <Scene key = "playerProfile" component = {PlayerProfile} panHandler = {null} navBar = {deepNavBar} />
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}

export default connect()(DotaKeepApp);
