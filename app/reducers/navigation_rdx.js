import { types } from '../actions/navigation_act';
var initialState = { contextId: -1 };

export default function navigationState(state = initialState, action = {}) {
    switch(action.type) {
        case types.CHANGE_CONTEXT_ID:
            return Object.assign({}, state, { contextId: action.contextId });
        default:
            return state;
    }
}
