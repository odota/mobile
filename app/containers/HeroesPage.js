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
    heroesSubset: state.playerHeroesState.heroesSubset,
    showPreviousPage: state.playerHeroesState.showPreviousPage,
    showNextPage: state.playerHeroesState.showNextPage,
    initialValue: state.playerHeroesState.initialValue,
    endValue: state.playerHeroesState.endValue,
    totalHeroes: state.playerHeroesState.totalHeroes,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    legend: state.settingsState.legend,
    tracker: state.navigationState.tracker,
    background: state.settingsState.background,
    reverseBackground: state.settingsState.reverseBackground
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
        this.scrollToTop = this.scrollToTop.bind(this);
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

    scrollToTop(){
        this.scrollViewRef.scrollTo({x:0,y:0,animated:true})
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
        } else if (this.props.heroesSubset != null){
            var refreshColor = this.props.legendHex;
            this.pageControl = (<PageNavigationControl
                page = {this.props.page}
                buttonColor = {this.props.legend}
                textColor = {this.props.reverseBackground}

                previousEnabled = {this.props.showPreviousPage}
                previousAction = {() => {
                this.props.actions.navigatePrevious();
                this.scrollToTop()
                }}

                nextEnabled = {this.props.showNextPage}
                nextAction = {() => {
                this.props.actions.navigateNext();
                this.scrollToTop()
                }} />);
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
                    }
                    >
                    <Text style = {[styles.filterText, {color: this.props.reverseBackground}]}>
                        {this.props.initialValue} - {this.props.endValue} of {this.props.totalHeroes} heroes
                    </Text>
                    <HeroesCard heroes = {this.props.heroesSubset} />
                    {this.pageControl}
                    <Text style = {[styles.filterText, {color: this.props.reverseBackground}]}>
                        {this.props.initialValue} - {this.props.endValue} of {this.props.totalHeroes} heroes
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

export default connect(mapStateToProps, mapDispatchToProps)(HeroesPage);
