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
import * as matchDetailsActions from '../actions/match_details_act';
import { Actions } from 'react-native-router-flux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import _ from 'lodash';

import Colors from '../themes/Colors';
import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

export const mapStateToProps = state => ({
    matchDetails: state.matchDetailsState.matchDetails,
    isLoadingMatchDetails: state.matchDetailsState.isLoadingMatchDetails,
    isEmptyMatchDetails: state.matchDetailsState.isEmptyMatchDetails,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    mod: state.settingsState.mod,
    alpha: state.settingsState.alpha,
    parent: state.navigationState.parent
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(matchDetailsActions, dispatch)
});

class MatchDetailsPage extends Component {

    componentWillMount() {
        if(!this.props.isLoadingMatchDetails) {
            this.props.actions.fetchMatchDetails(this.props.data)
        }

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if(nextProps.matchDetails) {
            this.content = nextProps.matchDetails;
        }
    }

    render() {
        var content = (<View />);
        if(this.props.isLoadingMatchDetails) {
            content = (
                <View style = {styles.contentContainer}>
                    <ActivityIndicator size="large" color = {this.props.legend}/>
                </View>
            );
        } else if (this.props.isEmptyMatchDetails) {
            content = (
                <View style = {styles.contentContainer}>
                    <Text style = {styles.noDataText}>No data found</Text>
                </View>
            );
        } else {
            content = (<View />);
        }
        return (
            <View style = {styles.container}>
                {content}
            </View>
        )
    }

}

const baseStyles = _.extend(base.general, {

});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(MatchDetailsPage);
