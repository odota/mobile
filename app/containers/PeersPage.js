import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as peersActions from '../actions/peers_act';
import * as navigationActions from '../actions/navigation_act';
import { Actions } from 'react-native-router-flux';

import PeersCard from '../components/PeersCard';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    peers: state.peersState.peers,
    page: state.peersState.page,
    isLoadingPeers: state.peersState.isLoadingPeers,
    isEmptyPeers: state.peersState.isEmptyPeers,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    legend: state.settingsState.legend,
    justPopped: state.navigationState.justPopped
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...peersActions, ...navigationActions}, dispatch)
});

class PeersPage extends Component {

    constructor(props) {
        console.log("CONSTRUCT");
        super(props);
        this.previousControl = (
            <TouchableOpacity onPress = {() => {this.props.actions.navigatePrevious()}}>
                <View style = {styles.individualPageControlView}>
                    <FontAwesome name = "chevron-left" size = {40} allowFontScaling = {false} color = {this.props.legend}/>
                </View>
            </TouchableOpacity>
        );
        this.nextControl = (
            <TouchableOpacity onPress = {() => {this.props.actions.navigateNext()}}>
                <View style = {styles.individualPageControlView}>
                    <FontAwesome name = "chevron-right" size = {40} allowFontScaling = {false} color = {this.props.legend}/>
                </View>
            </TouchableOpacity>
        );
        this.pageControl = (<View/>);
        this.state = {
            refreshing: false
        };
    }

    onRefresh() {
        this.setState({refreshing: true});
        this.props.actions.fetchPeers(this.props.contextId).then(() => {
            this.setState({refreshing: false});
        });
    }

    componentWillMount() {
        console.log("WILL MOUNT");
        if(!this.props.isLoadingPeers) {
            this.props.actions.fetchPeers(this.props.contextId);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        /*
        console.log("COMPONENT WILL UPDATE");
        if(this.props.justPopped) {
            this.props.actions.togglePop();
            this.props.actions.fetchPeers(this.props.contextId);
        }
        */
    }

    componentWillReceiveProps(nextProps) {
        this.initialValue = 1 + ((nextProps.page - 1) * 20);
        this.endValue = nextProps.page * 20;
        this.totalPeers = nextProps.peers.length;

        if(this.totalPeers > 0) {
            if(this.endValue > this.totalPeers) {
                this.endValue = this.totalPeers
            }
            this.peersSubset = new Array();
            for(var i = this.initialValue-1; i < this.endValue; i++) {
                this.peersSubset.push(nextProps.peers[i]);
            }
            if(this.initialValue == 1){
                this.pageControl = (
                    <View style={styles.paginationContainer}>
                        <FontAwesome style={styles.individualPageControlView} name = "chevron-left" size = {40} allowFontScaling = {false} color = "#00000000"/>
                        <View style={styles.pageContainer}>
                            <Text style={styles.individualPageControl}>{nextProps.page}</Text>
                        </View>
                        {this.nextControl}
                    </View>
                );
            } else if (this.endValue == this.totalPeers) {
                this.pageControl = (
                    <View style={styles.paginationContainer}>
                        {this.previousControl}
                        <View style={styles.pageContainer}>
                            <Text style={styles.individualPageControl}>{nextProps.page}</Text>
                        </View>
                        <FontAwesome style={styles.individualPageControlView} name = "chevron-right" size = {40} allowFontScaling = {false} color = "#00000000"/>
                    </View>
                );
            } else {
                this.pageControl = (
                    <View style={styles.paginationContainer}>
                        {this.previousControl}
                        <View style={styles.pageContainer}>
                            <Text style={styles.individualPageControl}>{nextProps.page}</Text>
                        </View>
                        {this.nextControl}
                    </View>
                );
            }
        }
    }

    render() {
        var content = (<View/>);
        if(this.props.isLoadingPeers) {
            content = (
                <View style = {styles.contentContainer}>
                    <ActivityIndicator size="large" color = {this.props.legend}/>
                </View>
            )
        } else if (this.props.isEmptyHeroes) {
            content = (
                <View style = {styles.contentContainer}>
                    <Text style = {styles.noDataText}>No data found</Text>
                </View>
            )
        } else if (this.peersSubset != null){
            var refreshColor = this.props.legendHex
            content = (
                <KeyboardAwareScrollView style = {{marginTop: 5}}
                    refreshControl={
                        <RefreshControl
                            refreshing = {this.state.refreshing}
                            onRefresh = {this.onRefresh.bind(this)}
                            tintColor = {refreshColor}
                            title = 'Refreshing'
                            titleColor = {refreshColor}
                            colors = {[refreshColor]}
                            progressBackgroundColor="#ffffffff"
                        />
                    }>
                    <Text style = {styles.filterText}>
                        {this.initialValue} - {this.endValue} of {this.totalPeers} peers
                    </Text>
                    <PeersCard peers = {this.peersSubset} />
                    {this.pageControl}
                    <Text style = {styles.filterText}>
                        {this.initialValue} - {this.endValue} of {this.totalPeers} peers
                    </Text>
                </KeyboardAwareScrollView>
            )
        }

        return (
            <View style = {styles.container}>
                {content}
            </View>
        )
    }

}

const baseStyles = _.extend(base.general, {
    paginationContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    individualPageControlView: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40
    },
    individualPageControl: {
        fontSize: 32
    },
    pageContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 5
    }
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(PeersPage);
