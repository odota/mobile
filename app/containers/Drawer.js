import React, { PureComponent } from 'react'
import NavDrawer from 'Components/NavDrawer'
import Drawer from 'react-native-drawer'
import { Actions, DefaultRenderer } from 'react-native-router-flux'

class Drawers extends PureComponent {
    state = {
        onFirstLevelPage: true
    }

    render () {
        const state = this.props.navigationState
        const children = state.children
        return (
            <Drawer
                ref='navigation'
                open={state.open}
                onOpen={() => Actions.refresh({key: state.key, open: true})}
                onClose={() => Actions.refresh({key: state.key, open: false})}
                type='displace'
                content={<NavDrawer />}
                tapToClose
                openDrawerOffset={0.3}
                negotiatePan
                panCloseMask={0.2}
                panOpenMask={0.1}
                tweenHandler={(ratio) => ({
                 main: { opacity: Math.max(0.54, 1 - ratio) }
             })}>
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        )
    }
}

export default Drawers
