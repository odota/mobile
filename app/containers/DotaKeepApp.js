import { Router, Scene, Actions } from 'react-native-router-flux';

import Home from './Home';
import PlayerSearch from './PlayerSearch';
import PlayerProfile from './PlayerProfile';
import Favourite from './Favourite';
import Settings from './Settings';
import MatchesSearch from './MatchesSearch';
import Splash from './Splash';
import Drawers from './Drawer';
import customNavBar from '../components/NavBar';
import deepNavBar from '../components/DeepNavBar';
import modalNavBar from '../components/ModalNavBar';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { BackHandler, Text } from 'react-native';

import Colors from '../themes/Colors';

const RouterWithRedux = connect()(Router);

class DotaKeepApp extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            try {
                return Actions.pop();
            } catch (err) {
                return false;
            }
        });

        return (
            <RouterWithRedux sceneStyle = {{backgroundColor: Colors.mainBackground}}>
                <Scene key = "root" hideNavBar = {true}>
                    <Scene key = "splash" component = {Splash} panHandlers = {null} initial = {true}/>
                    <Scene key = "navDrawer" component = {Drawers} panHandlers = {null} type = "replace">
                        <Scene key = "main" tabs = {true} hideTabBar = {true} panHandlers = {null} navBar = {customNavBar}>
                            <Scene key = "homeTab" title = "Home" navBar = {customNavBar}>
                                <Scene key = "home" component = {Home} title = "Home" />
                                <Scene key = "playerProfileHome" component = {PlayerProfile} title = "Player Profile" panHandlers = {null} navBar = {deepNavBar} />
                                <Scene key = "matchesSearchHome" component = {MatchesSearch} title = "Search Matches" direction = 'vertical' panHandlers = {null} navBar = {modalNavBar} />
                            </Scene>
                            <Scene key = "favouriteTab" title = "Favourites" navBar = {customNavBar}>
                                <Scene key = "favourite" component = {Favourite} title = "Favourites"/>
                                <Scene key = "playerProfileFavourite" component = {PlayerProfile} title = "Player Profile" panHandlers = {null} navBar = {deepNavBar} />
                                <Scene key = "matchesSearchFavourite" component = {MatchesSearch} title = "Search Matches" direction = 'vertical' panHandlers = {null} navBar = {modalNavBar} />
                            </Scene>
                            <Scene key = "searchTab" title = "Search" navBar = {customNavBar}>
                                <Scene key = "playerSearch" component = {PlayerSearch} title = "Search Profile" />
                                <Scene key = "playerProfileSearch" component = {PlayerProfile} title = "Player Profile" panHandlers = {null} navBar = {deepNavBar} />
                                <Scene key = "matchesSearchSearch" component = {MatchesSearch} title = "Search Matches" direction = 'vertical' panHandlers = {null} navBar = {modalNavBar} />
                            </Scene>
                            <Scene key = "settingsTab" title = "Settings" navBar = {customNavBar}>
                                <Scene key = "settings" component = {Settings} />
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </RouterWithRedux>
        )
    }
}

export default connect()(DotaKeepApp);
