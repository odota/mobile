import { types } from '../actions/player_overview_act';
var initialState = { isLoadingOverview: false, isEmptyOverview: false, overview: {} };

export default function playerOverviewState(state = initialState, action = {}) {
    switch(action.type) {
        case types.REQUEST_OVERVIEW:
            return Object.assign({}, state, { isLoadingOverview: true, isEmptyOverview: false, overview: {} });
        case types.RECEIVE_OVERVIEW:
            return Object.assign({}, state, { isLoadingOverview: false, isEmptyOverview: false, overview: action.overview });
        case types.RECEIVE_EMPTY_PLAYERS:
            return Object.assign({}, state, { isLoadingOverview: false, isEmptyOverview: true, overview: {} });
        default:
            return state;
    }
}
