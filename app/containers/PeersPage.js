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
    peersSubset: state.peersState.peersSubset,
    showPreviousPage: state.peersState.showPreviousPage,
    showNextPage: state.peersState.showNextPage,
    initialValue: state.peersState.initialValue,
    endValue: state.peersState.endValue,
    totalPeers: state.peersState.totalPeers,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    legend: state.settingsState.legend,
    justPopped: state.navigationState.justPopped,
    tracker: state.navigationState.tracker,
    background: state.settingsState.background,
    reverseBackground: state.settingsState.reverseBackground
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...peersActions, ...navigationActions }, dispatch)
});

class PeersPage extends Component {

    constructor(props) {
        super(props);
        this.pageControl = (<View />);
        this.state = {
            refreshing: false
        };
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    componentDidMount() {
        this.props.tracker.trackScreenView('Peers');
        if (!this.props.isLoadingPeers) {
            this.props.actions.fetchPeers(this.props.contextId);
        }
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.props.actions.fetchPeers(this.props.contextId).then(() => {
            this.setState({ refreshing: false });
        });
    }

    scrollToTop() {
        this.scrollViewRef.scrollTo({ x: 0, y: 0, animated: true });
    }

    render() {
        var content = (<View />);
        if (this.props.isLoadingPeers) {
            content = (
                <View style={styles.contentContainer}>
                    <ActivityIndicator size="large" color={this.props.legend} />
                </View>
            )
        } else if (this.props.isEmptyHeroes) {
            content = (
                <View style={styles.contentContainer}>
                    <Text style={styles.noDataText}>No data found</Text>
                </View>
            )
        } else if (this.props.peersSubset != null) {
            var refreshColor = this.props.legendHex
            this.pageControl = (<PageNavigationControl
                page={this.props.page}
                buttonColor={this.props.legend}
                textColor={this.props.reverseBackground}

                previousEnabled={this.props.showPreviousPage}
                previousAction={() => {
                    this.props.actions.navigatePrevious();
                    this.scrollToTop();
                }}

                nextEnabled={this.props.showNextPage}
                nextAction={() => {
                    this.props.actions.navigateNext();
                    this.scrollToTop();
                }} />
            );
            content = (
                <KeyboardAwareScrollView style={{ marginTop: 5 }}
                    innerRef={ref => {
                        this.scrollViewRef = ref;
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            tintColor={refreshColor}
                            title='Refreshing'
                            titleColor={refreshColor}
                            colors={[refreshColor]}
                            progressBackgroundColor="#ffffffff"
                        />
                    }>
                    <Text style={[styles.filterText, { color: this.props.reverseBackground }]}>
                        {this.props.initialValue} - {this.props.endValue} of {this.props.totalPeers} peers
                    </Text>
                    <PeersCard peers={this.props.peersSubset} />
                    {this.pageControl}
                    <Text style={[styles.filterText, { color: this.props.reverseBackground }]}>
                        {this.props.initialValue} - {this.props.endValue} of {this.props.totalPeers} peers
                    </Text>
                </KeyboardAwareScrollView>
            )
        }

        return (
            <View style={[styles.container, { backgroundColor: this.props.background }]}>
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
