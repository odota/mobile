import { types } from '../actions/peers_act';
var initialState = { isLoadingPeers: false, isEmptyPeers: false, peers: [] };

export default function peersState(state = initialState, action = {}) {
    switch(action.type) {
        case types.REQUEST_PEERS:
            return Object.assign({}, state, { isLoadingPeers: true, isEmptyPeers: false, peers: [] });
        case types.RECEIVE_PEERS:
            return Object.assign({}, state, { isLoadingPeers: false, isEmptyPeers: false, peers: action.peers });
        case types.RECEIVE_EMPTY_PEERS:
            return Object.assign({}, state, { isLoadingPeers: false, isEmptyPeers: true, peers: [] });
        default:
            return state;
    }
}
