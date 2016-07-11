import { types } from '../actions/home_act';
var initialState = { profile: {} };

export default function homeState(state = initialState, action = {}) {
    switch(action.type) {
        case types.SET_HOME_PROFILE:
            return Object.assign({}, state, { profile: action.profile });
        case types.RESET_HOME_PROFILE:
            return Object.assign({}, state, { profile: {} });
        default:
            return state;
    }
}
