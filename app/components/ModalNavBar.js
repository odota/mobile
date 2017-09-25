import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Platform
} from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import extend from 'lodash/extend'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import NavigationBar from 'react-native-navbar'

import Colors from 'Themes/Colors'
import base from 'Themes/BaseStyles'
import Fonts from 'Themes/Fonts'

import { Actions } from 'react-native-router-flux'

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend
})

class ModalNavBar extends PureComponent {
    backPressed = () => {
        Actions.pop()
    }

    render () {
        const title = <Text style={[styles.title, {color: this.props.secondLegend}]}>{this.props.title}</Text>

        const leftElements = (
            <View style={styles.navItemView}>
                <TouchableOpacity onPress={() => { this.backPressed() }}>
                    <View style={styles.leftNavButtonView}>
                        <FontAwesome name='times' size={26} allowFontScaling={false} color={this.props.legend} />
                    </View>
                </TouchableOpacity>
                {title}
            </View>
        )

        const rightElements = (
            <View />
        )

        let statusBarPadding
        let navBarMargin
        if (Platform.OS === 'ios') {
            statusBarPadding = <View style={[styles.statusBarPadding, {backgroundColor: this.props.mod}]} />
            navBarMargin = -20
        } else {
            statusBarPadding = <View />
            navBarMargin = 0
        }

        return (
            <View style={styles.navBarContainer}>
                <StatusBar
                    backgroundColor={this.props.mod}
                    barStyle='light-content'
                    />
                {statusBarPadding}
                <NavigationBar
                    style={[styles.navBar, {backgroundColor: this.props.mod, marginTop: navBarMargin}]}
                    leftButton={leftElements}
                    rightButton={rightElements}
                    />
            </View>
        )
    }
}

const baseStyles = extend(base.general, {
    statusBarPadding: {
        height: 16
    },
    navBarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        alignSelf: 'stretch',
        flex: 1
    },
    navBar: {
        borderBottomWidth: 1,
        borderBottomColor: '#A5A5A5',
        paddingLeft: 30,
        paddingRight: 30
    },
    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: Fonts.base,
        marginLeft: 10,
        marginRight: 10
    },
    navItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftNavButtonView: {
        paddingRight: 20,
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    }
})

const styles = StyleSheet.create(baseStyles)

export default connect(mapStateToProps)(ModalNavBar)
