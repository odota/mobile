import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    RefreshControl
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as peersActions from '../actions/peers_act';
import * as navigationActions from '../actions/navigation_act';

import PeersCard from '../components/PeersCard';
import PageNavigationControl from '../components/PageNavigationControl';

import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import base from '../themes/BaseStyles';

export const mapStateToProps = state => ({
    peers: state.peersState.peers,
    page: state.peersState.page,
    isLoadingPeers: state.peersState.isLoadingPeers,
    isEmptyPeers: state.peersState.isEmptyPeers,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    legend: state.settingsState.legend,
    justPopped: state.navigationState.justPopped,
    tracker: state.navigationState.tracker,
    background: state.settingsState.background,
    reverseBackground: state.settingsState.reverseBackground
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...peersActions, ...navigationActions}, dispatch)
});

class PeersPage extends Component {

    constructor(props) {
        super(props);
        this.pageControl = (<View/>);
        this.state = {
            refreshing: false
        };
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    componentDidMount() {
        this.props.tracker.trackScreenView('Peers');
    }

    onRefresh() {
        this.setState({refreshing: true});
        this.props.actions.fetchPeers(this.props.contextId).then(() => {
            this.setState({refreshing: false});
        });
    }

    componentWillMount() {
        if(!this.props.isLoadingPeers) {
            this.props.actions.fetchPeers(this.props.contextId);
        }
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

            let showPreviousPage;
            let showNextPage;

            if (this.totalPeers <= 20) {
                showPreviousPage = false;
                showNextPage = false;
            } else if (this.initialValue == 1) {
                showPreviousPage = false;
                showNextPage = true;
            } else if (this.endValue == this.totalPeers) {
                showPreviousPage = true;
                showNextPage = false;
            } else {
                showPreviousPage = true;
                showNextPage = true;
            }

            this.pageControl = (<PageNavigationControl
                                  page = {nextProps.page}
                                  buttonColor = {this.props.legend}
                                  textColor = {this.props.reverseBackground}

                                  previousEnabled = {showPreviousPage}
                                  previousAction = {() => {
                                  this.props.actions.navigatePrevious();
                                  this.scrollToTop();
                                  }}

                                  nextEnabled = {showNextPage}
                                  nextAction = {() => {
                                  this.props.actions.navigateNext();
                                  this.scrollToTop();
                                  }} />
                                  );
        }
    }
    
    scrollToTop(){
        this.scrollViewRef.scrollTo({x:0,y:0,animated:true});
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
                     innerRef={ref => {
                        this.scrollViewRef = ref;
                        }}  
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
                    <Text style = {[styles.filterText, {color: this.props.reverseBackground}]}>
                        {this.initialValue} - {this.endValue} of {this.totalPeers} peers
                    </Text>
                    <PeersCard peers = {this.peersSubset} />
                    {this.pageControl}
                    <Text style = {[styles.filterText, {color: this.props.reverseBackground}]}>
                        {this.initialValue} - {this.endValue} of {this.totalPeers} peers
                    </Text>
                </KeyboardAwareScrollView>
            )
        }

        return (
            <View style = {[styles.container, {backgroundColor: this.props.background}]}>
                {content}
            </View>
        )
    }

}

const baseStyles = _.extend(base.general, {
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(PeersPage);
