import { types } from '../actions/player_matches_act';
import { defaultSort, SORT_ENUM } from '../utils/sorting';

var initialState = { isLoadingMatches: false, isEmptyMatches: false, matches: {}, sortedBy: "match_id", page: 1, maxPages: 0, sortField: "", sortDirection: "", matchesSubset: [], showPreviousPage: false, showNextPage: true, initialValue: 1, endValue: 20, totalMatches: 100};

export default function playerMatchesState(state = initialState, action = {}) {
    switch (action.type) {
        case types.REQUEST_MATCHES:
            return Object.assign({}, state, { isLoadingMatches: true, isEmptyMatches: false, matches: {} });
        case types.RECEIVE_MATCHES: {
            let initialValue = 1 + ((state.page - 1) * 20);
            let endValue = state.page * 20;
            let totalMatches = action.matches.length;
            let totalPages = Math.ceil(totalMatches / 20);
            let matchesSubset = new Array();
            let showPreviousPage = false;
            let showNextPage = true;
            if (totalMatches > 0) {
                if (endValue > totalMatches) {
                    endValue = totalMatches;
                }
                for (var i = initialValue - 1; i < endValue; i++) {
                    matchesSubset.push(action.matches[i]);
                }
                if (totalMatches <= 20) {
                    showPreviousPage = false;
                    showNextPage = false;
                } else if (initialValue == 1) {
                    showPreviousPage = false;
                    showNextPage = true;
                } else if (endValue == totalMatches) {
                    showPreviousPage = true;
                    showNextPage = false;
                } else {
                    showPreviousPage = true;
                    showNextPage = true;
                }
            }
            return Object.assign({}, state, { isLoadingMatches: false, isEmptyMatches: false, matches: action.matches, matchesSubset: matchesSubset, showPreviousPage: showPreviousPage, showNextPage: showNextPage, initialValue: initialValue, endValue: endValue, totalMatches: totalMatches, maxPages: totalPages });
        }
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
            return Object.assign({}, state, { maxPages: action.maxPages });
        case types.NAVIGATE_NEXT_MATCHES: {
            let newPage = state.page + action.amount;
            if (newPage > state.maxPages) {
                newPage = state.maxPages
            }
            
            let initialValue = 1 + ((newPage - 1) * 20);
            let endValue = newPage * 20;
            let totalMatches = state.matches.length;
            let totalPages = Math.ceil(totalMatches / 20);
            let matchesSubset = new Array();
            let showPreviousPage = false;
            let showNextPage = true;
            if (totalMatches > 0) {
                if (endValue > totalMatches) {
                    endValue = totalMatches;
                }
                for (let i = initialValue - 1; i < endValue; i++) {
                    matchesSubset.push(state.matches[i]);
                }
                if (totalMatches <= 20) {
                    showPreviousPage = false;
                    showNextPage = false;
                } else if (initialValue == 1) {
                    showPreviousPage = false;
                    showNextPage = true;
                } else if (endValue == totalMatches) {
                    showPreviousPage = true;
                    showNextPage = false;
                } else {
                    showPreviousPage = true;
                    showNextPage = true;
                }
            }
            return Object.assign({}, state, { page: newPage, matchesSubset: matchesSubset, showPreviousPage: showPreviousPage, showNextPage: showNextPage, initialValue: initialValue, endValue: endValue, totalMatches: totalMatches, maxPages: totalPages });
        }
        case types.NAVIGATE_PREVIOUS_MATCHES: {
            let newPage = state.page - action.amount;
            if (newPage < 1) {
                newPage = 1;
            }
            let initialValue = 1 + ((newPage - 1) * 20);
            let endValue = newPage * 20;
            let totalMatches = state.matches.length;
            let totalPages = Math.ceil(totalMatches / 20);
            let matchesSubset = new Array();
            let showPreviousPage = false;
            let showNextPage = true;
            if (totalMatches > 0) {
                if (endValue > totalMatches) {
                    endValue = totalMatches;
                }
                for (let i = initialValue - 1; i < endValue; i++) {
                    matchesSubset.push(state.matches[i]);
                }
                if (totalMatches <= 20) {
                    showPreviousPage = false;
                    showNextPage = false;
                } else if (initialValue == 1) {
                    showPreviousPage = false;
                    showNextPage = true;
                } else if (endValue == totalMatches) {
                    showPreviousPage = true;
                    showNextPage = false;
                } else {
                    showPreviousPage = true;
                    showNextPage = true;
                }
            }
            return Object.assign({}, state, { page: newPage, matchesSubset: matchesSubset, showPreviousPage: showPreviousPage, showNextPage: showNextPage, initialValue: initialValue, endValue: endValue, totalMatches: totalMatches, maxPages: totalPages });
        }
        case types.RESET_PAGE: {
            return Object.assign({}, state, { page: 1 });
        }

        default:
            return state;
    }
}
