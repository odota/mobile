import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';

export default initialState => {

    const finalCreateStore = compose(
        applyMiddleware(
            thunk
        )
    )(createStore);

    const reducer = combineReducers(reducers);
    return finalCreateStore(reducer, initialState);
};
