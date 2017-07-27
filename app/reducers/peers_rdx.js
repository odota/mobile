import { types } from '../actions/peers_act';
var initialState = { isLoadingPeers: false, isEmptyPeers: false, peers: [], page: 1 };

export default function peersState(state = initialState, action = {}) {
    switch(action.type) {
        case types.REQUEST_PEERS:
            return Object.assign({}, state, { isLoadingPeers: true, isEmptyPeers: false, peers: [] });
        case types.RECEIVE_PEERS:
            return Object.assign({}, state, { isLoadingPeers: false, isEmptyPeers: false, peers: action.peers });
        case types.RECEIVE_EMPTY_PEERS:
            return Object.assign({}, state, { isLoadingPeers: false, isEmptyPeers: true, peers: [] });
        case types.NAVIGATE_NEXT_PEERS:
            return Object.assign({}, state, { page: state.page + 1 });
        case types.NAVIGATE_PREVIOUS_PEERS:
            return Object.assign({}, state, { page: state.page - 1 });
        default:
            return state;
    }
}
