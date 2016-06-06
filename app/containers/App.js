import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from '../stores/index';
import DotaKeepApp from './DotaKeepApp';

const store = configureStore();
export default class App extends Component {

    render() {
        return (
            <Provider store = {store}>
                <DotaKeepApp />
            </Provider>
        )
    }
}
