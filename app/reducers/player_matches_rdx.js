import { types } from '../actions/player_matches_act';
var initialState = { isLoadingMatches: false, isEmptyMatches: false, matches: {} };

export default function playerMatchesState(state = initialState, action = {}) {
    switch(action.type) {
        case types.REQUEST_MATCHES:
            return Object.assign({}, state, { isLoadingMatches: true, isEmptyMatches: false, matches: {} });
        case types.RECEIVE_MATCHES:
            return Object.assign({}, state, { isLoadingMatches: false, isEmptyMatches: false, matches: action.matches });
        case types.RECEIVE_EMPTY_MATCHES:
            return Object.assign({}, state, { isLoadingMatches: false, isEmptyMatches: true, matches: {} });
        default:
            return state;
    }
}
