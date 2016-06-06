import { Router, Scene, Actions } from 'react-native-router-flux';

import PlayerSearch from './PlayerSearch';

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
                    <Scene key = "playerSearch" component = {PlayerSearch} initial = {true} />
                </Scene>
            </Router>
        )
    }
}

export default connect()(DotaKeepApp);
