import { types } from '../actions/player_matches_act';
var initialState = { isLoadingMatches: false, isEmptyMatches: false, matches: {}, sortedBy: "match_id", page: 1 };

export default function playerMatchesState(state = initialState, action = {}) {
    switch(action.type) {
        case types.REQUEST_MATCHES:
            return Object.assign({}, state, { isLoadingMatches: true, isEmptyMatches: false, matches: {} });
        case types.RECEIVE_MATCHES:
            return Object.assign({}, state, { isLoadingMatches: false, isEmptyMatches: false, matches: action.matches });
        case types.RECEIVE_EMPTY_MATCHES:
            return Object.assign({}, state, { isLoadingMatches: false, isEmptyMatches: true, matches: {} });
        case types.CHANGE_SORTED_BY:
            return Object.assign({}, state, { sortedBy: action.sortedBy });
        case types.NAVIGATE_NEXT_MATCHES:
            return Object.assign({}, state, { page: state.page + 1 });
        case types.NAVIGATE_PREVIOUS_MATCHES:
            return Object.assign({}, state, { page: state.page - 1 });
        default:
            return state;
    }
}
