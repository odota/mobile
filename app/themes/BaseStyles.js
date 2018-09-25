import Fonts from './Fonts';
import Colors from './Colors';

const base = {
    navbar: {
        navBarContainer: {
            flexDirection: 'row'
        },
        navBar: {
            paddingHorizontal: 15
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15,
            color: 'black'
        },
        leftItemView: {
            flex: 1,
            justifyContent: 'flex-start',
            flexDirection: 'row',
            paddingLeft: 15
        },
        rightItemView: {
            flex: 1,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            paddingRight: 15
        },
        leftNavButtonView: {
            paddingLeft: 15,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1
        },
        rightNavButtonView: {
            paddingRight: 15,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1
        },
        titleContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            flex: 1,
            zIndex: -1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    },

    general: {
        container: {
            flexDirection: 'column',
            alignSelf: 'stretch',
            alignItems: 'stretch',
            justifyContent:'space-between',
            flex: 1,
            backgroundColor: Colors.mainBackground
        },
        noDataText: {
            fontFamily: Fonts.base,
            fontSize: 16,
            textAlign: 'center'
        },
        hiddenThumb: {
            width: 0,
            height: 0
        },
        heroesCardContainer: {
            marginLeft: 10,
            marginRight: 10,
            marginTop: 5,
            marginBottom: 10,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 3
        },
        titleText: {
            fontFamily: Fonts.base,
            fontSize: 28
        },
        titleContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
        },
        separator: {
            height: 2
        },
        rowContainer: {
            paddingTop: 5,
            paddingBottom: 5
        },
        tableHeaderContainer: {
            flexDirection: 'row'
        },
        tableHeaderCell: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10
        },
        tableHeaderText: {
            fontFamily: Fonts.base,
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center'
        },
        tableValueText: {
            fontFamily: Fonts.base,
            fontSize: 14,
            alignSelf: 'center',
            textAlign: 'center'
        },
        peersCardContainer: {
            marginLeft: 10,
            marginRight: 10,
            marginTop: 5,
            marginBottom: 10,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 3
        },
        inRowSeparator: {
            height: 2,
            marginTop: 5,
            marginBottom: 5
        },
        filterText: {
            fontFamily: Fonts.base,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 10
        },
        bigImageAvatar: {
            width: 80,
            height: 80,
            borderRadius: 40
        },
        largerImageAvatar: {
            width: 60,
            height: 60,
            borderRadius: 30
        },
        imageAvatar: {
            width: 40,
            height: 40,
            borderRadius: 20
        }
    }
}

export default base;
