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
import * as playerHeroesActions from '../actions/player_heroes_act';

import HeroesCard from '../components/HeroesCard';
import PageNavigationControl from '../components/PageNavigationControl';

import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import base from '../themes/BaseStyles';

export const mapStateToProps = state => ({
    heroes: state.playerHeroesState.heroes,
    page: state.playerHeroesState.page,
    isLoadingHeroes: state.playerHeroesState.isLoadingHeroes,
    isEmptyHeroes: state.playerHeroesState.isEmptyHeroes,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    legend: state.settingsState.legend,
    tracker: state.navigationState.tracker
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(playerHeroesActions, dispatch)
});

class HeroesPage extends Component {

    constructor(props) {
        super(props);
        this.pageControl = (<View/>);
        this.state = {
            refreshing: false
        };
    }

    componentDidMount() {
        this.props.tracker.trackScreenView('Heroes');
    }

    onRefresh() {
        this.setState({refreshing: true});
        this.props.actions.fetchHeroes(this.props.contextId, 30).then(() => {
            this.setState({refreshing: false});
        });
    }

    componentWillMount() {
        if(!this.props.isLoadingHeroes) {
            this.props.actions.fetchHeroes(this.props.contextId, 30);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.initialValue = 1 + ((nextProps.page - 1) * 20);
        this.endValue = nextProps.page * 20;
        this.totalHeroes = nextProps.heroes.length;

        if(this.totalHeroes > 0){
            if(this.endValue > this.totalHeroes) {
                this.endValue = this.totalHeroes;
            }
            this.heroesSubset = new Array();
            for(var i = this.initialValue-1; i < this.endValue; i++) {
                this.heroesSubset.push(nextProps.heroes[i]);
            }

            let showPreviousPage = this.initialValue != 1;
            let showNextPage = this.endValue != this.totalHeroes;

            this.pageControl = (<PageNavigationControl 
                                  page = {nextProps.page}
                                  buttonColor = {this.props.legend} 
                                  
                                  previousEnabled = {showPreviousPage} 
                                  previousAction = {() => {this.props.actions.navigatePrevious()}}

                                  nextEnabled = {showNextPage} 
                                  nextAction = {() => {this.props.actions.navigateNext()}} />);
        }
    }

    render() {
        var content = (<View/>);
        if(this.props.isLoadingHeroes) {
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
        } else if (this.heroesSubset != null){
            var refreshColor = this.props.legendHex;
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
                    }
                    >
                    <Text style = {styles.filterText}>
                        {this.initialValue} - {this.endValue} of {this.totalHeroes} heroes
                    </Text>
                    <HeroesCard heroes = {this.heroesSubset} />
                    {this.pageControl}
                    <Text style = {styles.filterText}>
                        {this.initialValue} - {this.endValue} of {this.totalHeroes} heroes
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
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const styles = StyleSheet.create(baseStyles);

export default connect(mapStateToProps, mapDispatchToProps)(HeroesPage);
