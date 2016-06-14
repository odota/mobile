import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';

import { Platform } from 'react-native';

const base = {
    navbar: {
        navBarContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 50,
            alignSelf: 'stretch',
            flex: 1
        },
        navItemView:{
            flex:1,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            alignSelf: 'stretch'
        },
        navTextWrapper: {
            flex: 1,
        },
        title:{
            flex: 1,
            fontSize: Metrics.fonts.header,
            fontWeight: '400',
            fontFamily: Fonts.base,
            color: Colors.navBaseText,
            marginRight: 8,
            marginLeft: 8,
        },
        titleDelete:{
            fontSize: Metrics.fonts.header,
            fontWeight: '400',
            fontFamily: Fonts.base,
            color: Colors.delete,
            marginRight: 8,
            marginLeft: 8,
        },
        navBar:{
            backgroundColor:'#FFFFFF',
            borderBottomWidth: 0.9,
            borderBottomColor: '#A5A5A5',
        },
        leftNavButtonView: {
            paddingRight: 5,
            paddingLeft: 12,
            paddingTop: 8,
            marginBottom: 8,
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'row',
            flex:1
        },
        rightNavButtonView: {
            paddingLeft: 12,
            paddingRight: 14,
            paddingTop: 8,
            paddingBottom: 8,
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'row',
            flex:1
        },
        expandIconButtonView:{
            paddingLeft: 6,
            paddingRight: 6,
            paddingTop: 8,
            paddingBottom: 8,
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'row',
            flex:1
        },
        icon: {
            marginRight: 6,
            marginLeft: 8
        },
        leftIcon: {
            marginRight: 4,
            marginLeft: 6,
            height: 22,
            width: 22
        },
        notificationBadge:{
            marginLeft: 0
        }
    },

    general: {
        container: {
            flexDirection: 'column',
            alignSelf: 'stretch',
            alignItems: 'stretch',
            justifyContent:'space-between',
            marginTop: Metrics.navBarHeight,
            flex: 1,
            backgroundColor: Colors.mainBackground
        },
        noDataText: {
            fontFamily: Fonts.base,
            fontSize: 20,
            color: Colors.skyDolchMod
        }
    }
}

export default base;
