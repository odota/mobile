import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import base from '../themes/BaseStyles';
import _ from 'lodash';

class NavigationButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress = {this.props.show ? this.props.action : undefined}>
                <View style = {styles.individualPageControlView}>
                    <FontAwesome 
                      name = {this.props.name} 
                      size = {40} 
                      allowFontScaling = {false} 
                      color = {this.props.show ? this.props.fontColor : '#00000000'}/>
                </View>
            </TouchableOpacity>
        )
    }
}

export default class PageNavigationControl extends Component {
    render() {      
        const previousDoubleButton = (<NavigationButton 
                                        name = "angle-double-left"
                                        action = {this.props.previousDoubleAction}
                                        show = {this.props.previousDoubleEnabled}
                                        fontColor = {this.props.buttonColor} />);
        const previousButton = (<NavigationButton 
                                  name="chevron-left" 
                                  action = {this.props.previousAction}
                                  show = {this.props.previousEnabled}
                                  fontColor = {this.props.buttonColor} />);
        const nextButton = (<NavigationButton 
                              name = "chevron-right"
                              action = {this.props.nextAction}
                              show = {this.props.nextEnabled}
                              fontColor = {this.props.buttonColor} />);
        const nextDoubleButton = (<NavigationButton 
                                    name = "angle-double-right" 
                                    action = {this.props.nextDoubleAction}
                                    show = {this.props.nextDoubleEnabled}
                                    fontColor = {this.props.buttonColor} />);

        return (
                    <View style={styles.paginationContainer}>
                        <View style = {{flexDirection: 'row'}}>
                            {previousDoubleButton}
                            {previousButton}
                        </View>
                        <View style={styles.pageContainer}>
                            <Text style={styles.individualPageControl}>{this.props.page}</Text>
                        </View>
                        <View style = {{flexDirection: 'row'}}>
                            {nextButton}
                            {nextDoubleButton}
                        </View>
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
        paddingLeft: 10,
        paddingRight: 10
    },
    individualPageControl: {
        fontSize: 32,
        paddingLeft: 30,
        paddingRight: 30
    },
    pageContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 5
    }
});

const styles = StyleSheet.create(baseStyles);
