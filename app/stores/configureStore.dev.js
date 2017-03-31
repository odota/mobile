import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import { createLogger } from 'redux-logger';

export default initialState => {

    const finalCreateStore = compose(
        applyMiddleware(
            thunk,
            createLogger()
        )
    )(createStore);

    const reducer = combineReducers(reducers);
    return finalCreateStore(reducer, initialState);
};
