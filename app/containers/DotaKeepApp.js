import { Router, Scene, Actions } from 'react-native-router-flux';

import PlayerSearch from './PlayerSearch';
import PlayerProfile from './PlayerProfile';
import Settings from './Settings';
import MatchesSearch from './MatchesSearch';
import Drawers from './Drawer';
import customNavBar from '../components/NavBar';
import deepNavBar from '../components/DeepNavBar';
import modalNavBar from '../components/ModalNavBar';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { BackAndroid, Text } from 'react-native';

import Colors from '../themes/Colors';

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
            <Router sceneStyle = {{backgroundColor: Colors.mainBackground}}>
                <Scene key = "root" hideNavBar = {true}>
                    <Scene key = "navDrawer" component = {Drawers} panHandler = {null}>
                        <Scene key = "main" tabs = {true} hideTabBar = {true} panHandler = {null} navBar = {customNavBar}>
                            <Scene key = "searchTab" title = "Search" navBar = {customNavBar}>
                                <Scene key = "playerSearch" component = {PlayerSearch} title = "Search Profile" initial = {true} />
                                <Scene key = "playerProfile" component = {PlayerProfile} title = "Player Profile" panHandler = {null} navBar = {deepNavBar} />
                                <Scene key = "matchesSearch" component = {MatchesSearch} title = "Search Matches" panHandler = {null} navBar = {modalNavBar} />
                            </Scene>
                            <Scene key = "settingsTab" title = "Settings" navBar = {customNavBar}>
                                <Scene key = "settings" component = {Settings} />
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}

export default connect()(DotaKeepApp);
