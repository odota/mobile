import { types } from '../actions/player_matches_act';
import { defaultSort, SORT_ENUM } from '../utils/sorting';

var initialState = { isLoadingMatches: false, isEmptyMatches: false, matches: {}, sortedBy: "match_id", page: 1, maxPages: 0, sortField: "", sortDirection: "" };

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
        case types.SORT_MATCHES:
            var matches = state.matches;
            var sortDirection = action.sortField === state.sortField ? SORT_ENUM.next(SORT_ENUM[action.sortDirection]) : SORT_ENUM[0];
            matches = defaultSort(matches, action.sortField, sortDirection);

            return Object.assign({}, state, { sortField: action.sortField, sortDirection: sortDirection, matches });
        case types.SET_MAX_PAGES:
            return Object.assign({}, state, {maxPages: action.maxPages});
        case types.NAVIGATE_NEXT_MATCHES:
            newPage = state.page + action.amount;
            if(newPage > state.maxPages) {
                newPage = state.maxPages
            }
            return Object.assign({}, state, { page: newPage });
        case types.NAVIGATE_PREVIOUS_MATCHES:
            newPage = state.page - action.amount;
            if(newPage < 1) {
                newPage = 1;
            }
            return Object.assign({}, state, { page: newPage });
        default:
            return state;
    }
}
