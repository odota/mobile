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
        case types.SORT_MATCHES:
            var matches = state.matches;
            var reversed = 1;

            if (action.sortDirection === "ASC" && state.sortColumn === action.sortColumn) {
                reversed = -1;
            }

            matches.sort((a, b) => {
                var x = a[action.sortColumn];
                var y = b[action.sortColumn];

                if(action.sortColumn === "ended") {
                    x = a.start_time + a.duration;
                    y = b.start_time + b.duration
                } else if (action.sortColumn === "kda") {
                    x = (a.kills + a.assists) / (a.deaths);
                    y = (b.kills + b.assists) / (b.deaths);
                }

                return ((x < y) ? reversed * -1 : ((x > y) ? reversed * 1 : 0))
            });

            return Object.assign({}, state, { sortColumn: action.sortColumn, sortDirection: action.sortDirection, matches });
        case types.NAVIGATE_NEXT_MATCHES:
            newPage = state.page + action.amount;

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
