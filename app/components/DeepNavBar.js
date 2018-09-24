import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    BackHandler
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as navigationActions from '../actions/navigation_act';
import * as playerMatchesActions from '../actions/player_matches_act';
import * as playerHeroesActions from '../actions/player_heroes_act';
import * as peersActions from '../actions/peers_act';

import base from '../themes/BaseStyles';
import metrics from '../themes/Metrics';

import { Actions } from 'react-native-router-flux';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    contextIdStackHome: state.navigationState.contextIdStackHome,
    contextIdStackFavourite: state.navigationState.contextIdStackFavourite,
    contextIdStackSearch: state.navigationState.contextIdStackSearch,
    parent: state.navigationState.parent
});

export const mapDispatchToProps = (dispatch) => ({
    navigationActions: bindActionCreators(navigationActions, dispatch),
    playerMatchesActions: bindActionCreators(playerMatchesActions, dispatch),
    playerHeroesActions: bindActionCreators(playerHeroesActions, dispatch),
    peersActions: bindActionCreators(peersActions, dispatch)
});

class DeepNavBar extends Component {

    constructor(props) {
        super(props);
        this.backPressed = this.backPressed.bind(this);
    }

    backPressed() {
        if (this.props.parent == "Favourites") {
            this.props.navigationActions.popContextIdFavourite();
            this.props.navigationActions.changeContextId(this.props.contextIdStackFavourite[this.props.contextIdStackFavourite.length - 2]);
        } else if (this.props.parent == "Search") {
            this.props.navigationActions.popContextIdSearch();
            this.props.navigationActions.changeContextId(this.props.contextIdStackSearch[this.props.contextIdStackSearch.length - 2]);
        } else if (this.props.parent == "Home") {
            this.props.navigationActions.popContextIdHome();
            this.props.navigationActions.changeContextId(this.props.contextIdStackHome[this.props.contextIdStackHome.length - 2]);
        }
        this.props.playerMatchesActions.resetMatchesPage();
        this.props.playerHeroesActions.resetHeroesPage();
        this.props.peersActions.resetPeersPage();
        Actions.pop();
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            try {
                if (this.props.parent == "Favourites") {
                    this.props.navigationActions.popContextIdFavourite();
                    this.props.navigationActions.changeContextId(this.props.contextIdStackFavourite[this.props.contextIdStackFavourite.length - 1]);
                } else if (this.props.parent == "Search") {
                    this.props.navigationActions.popContextIdSearch();
                    this.props.navigationActions.changeContextId(this.props.contextIdStackSearch[this.props.contextIdStackSearch.length - 1]);
                } else if (this.props.parent == "Home") {
                    this.props.navigationActions.popContextIdHome();
                    this.props.navigationActions.changeContextId(this.props.contextIdStackHome[this.props.contextIdStackHome.length - 1]);
                }
                return false;
            } catch (err) {
                return false;
            }
        });
    }

    render() {
        let title = <Text style={[styles.title, { color: this.props.secondLegend }]}>{this.props.title}</Text>

        var leftElements = (
            <View style={styles.navItemView}>
                <TouchableOpacity onPress={() => { this.backPressed() }}>
                    <View style={styles.leftNavButtonView}>
                        <FontAwesome name="chevron-left" size={20} allowFontScaling={false} color={this.props.legend} />
                    </View>
                </TouchableOpacity>
                {title}
            </View>
        )

        var rightElements = (
            <View />
        )

        return (
            <View>
                <StatusBar
                    backgroundColor={this.props.mod}
                    barStyle="light-content"
                />
                <View style={{ height: metrics.statusBarHeight, backgroundColor: this.props.mod }} />
                <View style={[styles.navBarContainer, { height: metrics.navBarHeight, backgroundColor: this.props.mod, flexDirection: 'row' }]}>
                    <View style={styles.leftItemView}>
                        {leftElements}
                    </View>
                    <View style={styles.rightItemView}>
                        {rightElements}
                    </View>
                </View>
            </View>
        )
    }

}

const baseStyles = _.extend(base.navbar, {
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(DeepNavBar);
