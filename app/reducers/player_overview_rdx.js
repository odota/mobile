import { types } from '../actions/player_overview_act';
var initialState = { isLoadingOverview: false, isEmptyOverview: false, overview: {}, isLoadingWl: false, isEmptyWl: false, wl: {} };

export default function playerOverviewState(state = initialState, action = {}) {
    switch(action.type) {
        case types.REQUEST_OVERVIEW:
            return Object.assign({}, state, { isLoadingOverview: true, isEmptyOverview: false, overview: {} });
        case types.RECEIVE_OVERVIEW:
            return Object.assign({}, state, { isLoadingOverview: false, isEmptyOverview: false, overview: action.overview });
        case types.RECEIVE_EMPTY_PLAYERS:
            return Object.assign({}, state, { isLoadingOverview: false, isEmptyOverview: true, overview: {} });
        case types.REQUEST_WL:
            return Object.assign({}, state, { isLoadingWl: true, isEmptyWl: false, wl: {} });
        case types.RECEIVE_WL:
            return Object.assign({}, state, { isLoadingWl: false, isEmptyWl: false, wl: action.wl });
        case types.RECEIVE_EMPTY_WL:
            return Object.assign({}, state, { isLoadingWl: false, isEmptyWl: true, wl: {} });
        default:
            return state;
    }
}
