import { types } from '../actions/match_details_act';
var initialState = { isLoadingMatchDetails: false, isEmptyMatchDetails: false, matchDetails: {} };

export default function matchDetailsState(state = initialState, action = {}) {
    switch(action.type) {
        case types.REQUEST_MATCH_DETAILS:
            return Object.assign({}, state, { isLoadingMatchDetails: true, isEmptyMatchDetails: false, matchDetails: {} });
        case types.RECEIVE_MATCH_DETAILS:
            return Object.assign({}, state, { isLoadingMatchDetails: false, isEmptyMatchDetails: false, matchDetails: action.matchDetails });
        case types.RECEIVE_EMPTY_MATCH_DETAILS:
            return Object.assign({}, state, { isLoadingMatchDetails: false, isEmptyMatchDetails: true, matchDetails: {} });
        default:
            return state;
    }
}
