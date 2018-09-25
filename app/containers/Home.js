import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as homeActions from '../actions/home_act';
import * as navigationActions from '../actions/navigation_act';

import PlayerProfile from './PlayerProfile';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    legendHex: state.settingsState.legendHex,
    profile: state.homeState.profile,
    tracker: state.navigationState.tracker,
    background: state.settingsState.background
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...homeActions, ...navigationActions}, dispatch)
});

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'profileExist': false
        }
        this.onLoginPressed = this.onLoginPressed.bind(this);
    }

    onLoginPressed() {
        Actions.login();
    }

    componentDidMount() {
        this.props.tracker.trackScreenView('Home');
    }

    render() {
        var content;
        var profile = this.props.profile;
        var containerStyle;
        if(profile != "") {
            containerStyle = [styles.localContainer, {backgroundColor: this.props.background}];
            content = (
                <PlayerProfile />
            )

        } else {
            containerStyle = [styles.container, {backgroundColor: this.props.background}];
            content = (
                <ScrollView style = {styles.homeContentContainer}>
                    <View style = {{backgroundColor: this.props.mod, borderRadius: 5, borderWidth: 1, borderColor: this.props.mod, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 9, marginVertical: 5}}>
                        <Text style = {{color: this.props.secondLegend, fontFamily: Fonts.base, fontSize: 36, textAlign: 'center'}}>
                            OPENDOTA
                        </Text>
                        <Text style = {[styles.noDataText, {color: this.props.secondLegend}]}>
                            Open source Dota 2 data platform
                        </Text>
                        <TouchableOpacity onPress = {() => {this.onLoginPressed()}}>
                            <View style = {{borderColor: this.props.secondLegend, borderRadius: 1, borderWidth: 2, padding: 10, margin: 15, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                                <FontAwesome name = "steam-square" size = {20} allowFontScaling = {false} color = {this.props.legend} style = {{marginRight: 5}}/>
                                <Text style = {{fontFamily: Fonts.base, fontSize: 16, color: this.props.secondLegend}}>
                                    Login for automatic replay parsing
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style = {{flexDirection: 'row'}}>
                        <View style = {{backgroundColor: this.props.mod, borderRadius: 5, borderWidth: 1, borderColor: this.props.mod, paddingHorizontal: 10, paddingVertical: 10, marginLeft: 9, marginRight: 5, flex: 1}}>
                            <Image source={require('../assets/open_source.png')} style={{width: 50, height: 50, alignSelf: 'center'}}/>
                            <Text style = {{fontFamily: Fonts.base, fontSize: 22, color: this.props.legend, fontWeight: 'bold', textAlign: 'center'}}>
                                Open Source
                            </Text>
                            <Text style = {{fontFamily: Fonts.base, fontSize: 14, color: this.props.secondLegend, textAlign: 'center'}}>
                                All project code is open source and available for contributors to improve and modify.
                            </Text>
                        </View>

                        <View style = {{backgroundColor: this.props.mod, borderRadius: 5, borderWidth: 1, borderColor: this.props.mod, paddingHorizontal: 10, paddingVertical: 10, marginRight: 9, flex: 1}}>
                            <Image source={require('../assets/stats_bar.png')} style={{width: 50, height: 50, alignSelf: 'center'}}/>
                            <Text style = {{fontFamily: Fonts.base, fontSize: 22, color: this.props.legend, fontWeight: 'bold', textAlign: 'center'}}>
                                In-Depth Data
                            </Text>
                            <Text style = {{fontFamily: Fonts.base, fontSize: 14, color: this.props.secondLegend, textAlign: 'center'}}>
                                Parsing replay files provides highly detailed match data.
                            </Text>
                        </View>
                    </View>

                    <View style = {{backgroundColor: this.props.mod, borderRadius: 5, borderWidth: 1, borderColor: this.props.mod, paddingHorizontal: 10, paddingVertical: 10, marginHorizontal: 9, marginTop: 5}}>
                        <Image source={require('../assets/wand.png')} style={{width: 50, height: 50, alignSelf: 'center'}}/>
                        <Text style = {{fontFamily: Fonts.base, fontSize: 22, color: this.props.legend, fontWeight: 'bold', textAlign: 'center'}}>
                            Free of Charge
                        </Text>
                        <Text style = {{fontFamily: Fonts.base, fontSize: 14, color: this.props.secondLegend, textAlign: 'center'}}>
                            Servers are funded by sponsors and volunteers maintain the code, so the service is offered free of charge.
                        </Text>
                    </View>

                </ScrollView>
            )
        }
        return (
            <View style = {containerStyle}>
                {content}
            </View>
        )
    }
}

const baseStyles = _.extend(base.general, {
    homeContentContainer: {
        flex: 1,
        marginTop: 10
    },
    localContainer: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: Colors.mainBackground
    }
});

const styles = StyleSheet.create(baseStyles);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
