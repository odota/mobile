import { types } from '../actions/player_search_act';
var initialState = { isLoadingPlayers: false, isEmptyPlayers: false, players: [] };

export default function playerListState(state = initialState, action = {}) {
    switch(action.type) {
        case types.REQUEST_PLAYERS:
            return Object.assign({}, state, { isLoadingPlayers: true, isEmptyPlayers: false, players: [] });
        case types.RECEIVE_PLAYERS:
            return Object.assign({}, state, { isLoadingPlayers: false, isEmptyPlayers: false, players: action.players });
        case types.RECEIVE_EMPTY_PLAYERS:
            return Object.assign({}, state, { isLoadingPlayers: false, isEmptyPlayers: true, players: [] });
        default:
            return state;
    }
}
