import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl
} from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as playerHeroesActions from 'Actions/player_heroes_act'
import { Actions } from 'react-native-router-flux'

import HeroesCard from 'Components/HeroesCard'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import extend from 'lodash/extend'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Colors from 'Themes/Colors'
import base from 'Themes/BaseStyles'
import Fonts from 'Themes/Fonts'

export const mapStateToProps = state => ({
    heroes: state.playerHeroesState.heroes,
    page: state.playerHeroesState.page,
    isLoadingHeroes: state.playerHeroesState.isLoadingHeroes,
    isEmptyHeroes: state.playerHeroesState.isEmptyHeroes,
    contextId: state.navigationState.contextId,
    legendHex: state.settingsState.legendHex,
    legend: state.settingsState.legend
})

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(playerHeroesActions, dispatch)
})

class HeroesPage extends PureComponent {
    state = {
        refreshing: false
    }
    previousControl = (
        <TouchableOpacity onPress={() => { this.props.actions.navigatePrevious() }}>
            <View style={styles.individualPageControlView}>
                <FontAwesome name='chevron-left' size={40} allowFontScaling={false} color={this.props.legend} />
            </View>
        </TouchableOpacity>
    )
    nextControl = (
        <TouchableOpacity onPress={() => { this.props.actions.navigateNext() }}>
            <View style={styles.individualPageControlView}>
                <FontAwesome name='chevron-right' size={40} allowFontScaling={false} color={this.props.legend} />
            </View>
        </TouchableOpacity>
    )
    pageControl = <View />

    onRefresh = () => {
        this.setState({refreshing: true})
        this.props.actions.fetchHeroes(this.props.contextId, 30).then(() => {
            this.setState({refreshing: false})
        })
    }

    componentWillMount () {
        if (!this.props.isLoadingHeroes) {
            this.props.actions.fetchHeroes(this.props.contextId, 30)
        }
    }

    componentWillReceiveProps (nextProps) {
        this.initialValue = 1 + ((nextProps.page - 1) * 20)
        this.endValue = nextProps.page * 20
        this.totalHeroes = nextProps.heroes.length

        if (this.totalHeroes > 0) {
            if (this.endValue > this.totalHeroes) {
                this.endValue = this.totalHeroes
            }
            this.heroesSubset = []
            for (var i = this.initialValue - 1; i < this.endValue; i++) {
                this.heroesSubset.push(nextProps.heroes[i])
            }

            if (this.initialValue === 1) {
                this.pageControl = (
                    <View style={styles.paginationContainer}>
                        <FontAwesome style={styles.individualPageControlView} name='chevron-left' size={40} allowFontScaling={false} color='#00000000' />
                        <View style={styles.pageContainer}>
                            <Text style={styles.individualPageControl}>{nextProps.page}</Text>
                        </View>
                        {this.nextControl}
                    </View>
                )
            } else if (this.endValue === this.totalHeroes) {
                this.pageControl = (
                    <View style={styles.paginationContainer}>
                        {this.previousControl}
                        <View style={styles.pageContainer}>
                            <Text style={styles.individualPageControl}>{nextProps.page}</Text>
                        </View>
                        <FontAwesome style={styles.individualPageControlView} name='chevron-right' size={40} allowFontScaling={false} color='#00000000' />
                    </View>
                )
            } else {
                this.pageControl = (
                    <View style={styles.paginationContainer}>
                        {this.previousControl}
                        <View style={styles.pageContainer}>
                            <Text style={styles.individualPageControl}>{nextProps.page}</Text>
                        </View>
                        {this.nextControl}
                    </View>
                )
            }
        }
    }

    render () {
        let content = <View />
        if (this.props.isLoadingHeroes) {
            content = (
                <View style={styles.contentContainer}>
                    <ActivityIndicator size='large' color={this.props.legend} />
                </View>
            )
        } else if (this.props.isEmptyHeroes) {
            content = (
                <View style={styles.contentContainer}>
                    <Text style={styles.noDataText}>No data found</Text>
                </View>
            )
        } else if (this.heroesSubset != null) {
            const refreshColor = this.props.legendHex
            content = (
                <KeyboardAwareScrollView style={{marginTop: 5}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                            tintColor={refreshColor}
                            title='Refreshing'
                            titleColor={refreshColor}
                            colors={[refreshColor]}
                            progressBackgroundColor='#ffffffff'
                        />
                    }
                    >
                    <Text style={styles.filterText}>
                        {this.initialValue} - {this.endValue} of {this.totalHeroes} heroes
                    </Text>
                    <HeroesCard heroes={this.heroesSubset} />
                    {this.pageControl}
                    <Text style={styles.filterText}>
                        {this.initialValue} - {this.endValue} of {this.totalHeroes} heroes
                    </Text>
                </KeyboardAwareScrollView>
            )
        }

        return (
            <View style={styles.container}>
                {content}
            </View>
        )
    }
}

const baseStyles = extend(base.general, {
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
})

const styles = StyleSheet.create(baseStyles)

export default connect(mapStateToProps, mapDispatchToProps)(HeroesPage)
