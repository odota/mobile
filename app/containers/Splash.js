import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import * as homeActions from 'Actions/home_act'
import * as favouritesActions from 'Actions/favourites_act'
import * as settingsActions from 'Actions/settings_act'
import * as navigationActions from 'Actions/navigation_act'
import { Actions } from 'react-native-router-flux'

import extend from 'lodash/extend'

import Colors from 'Themes/Colors'
import base from 'Themes/BaseStyles'
import Fonts from 'Themes/Fonts'

export const mapStateToProps = state => ({

})

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...homeActions, ...favouritesActions, ...settingsActions, ...navigationActions}, dispatch)
})

class Splash extends PureComponent {
    componentWillMount () {
        AsyncStorage
            .getItem('theme')
            .then((value) => {
                this.props.actions.changeTheme(value)
            })
            .catch(error => {
                if (error) {
                    console.log(error)
                }
                this.props.actions.changeTheme(1)
            })
            .done()

        AsyncStorage
            .getItem('favourites')
            .then((value) => {
                if (value) {
                    this.props.actions.initializeFavourites(value)
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .done()

        AsyncStorage
            .getItem('homeProfile')
            .then((value) => {
                let parsedValue
                if (value) {
                    parsedValue = JSON.parse(value)
                    if (!(Object.keys(parsedValue).length === 0 && parsedValue.constructor === Object)) {
                        this.setState({'profileExist': true})
                    }
                    this.props.actions.pushContextIdHome(parsedValue.account_id)
                    this.props.actions.changeContextId(parsedValue.account_id)
                    this.props.actions.setHomeProfile(parsedValue)
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .done()
    }

    componentDidMount () {
        setTimeout(() => {
            Actions.navDrawer()
        }, 2000)
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.noDataText}>Dota Keep</Text>
                </View>
            </View>
        )
    }
}

const baseStyles = extend(base.general, {
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const styles = StyleSheet.create(baseStyles)

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
