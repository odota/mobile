import { types } from '../actions/peers_act';
var initialState = { isLoadingPeers: false, isEmptyPeers: false, peers: [], page: 1, peersSubset: [], showPreviousPage: false, showNextPage: true, initialValue: 1, endValue: 20, totalPeers: 10 };

export default function peersState(state = initialState, action = {}) {
    switch (action.type) {
        case types.REQUEST_PEERS:
            return Object.assign({}, state, { isLoadingPeers: true, isEmptyPeers: false, peers: [] });
        case types.RECEIVE_PEERS: {
            let initialValue = 1 + ((state.page - 1) * 20);
            let endValue = state.page * 20;
            let totalPeers = action.peers.length;
            let peersSubset = new Array();
            let showPreviousPage = false;
            let showNextPage = true;
            if (totalPeers > 0) {
                if (endValue > totalPeers) {
                    endValue = totalPeers
                }
                for (let i = initialValue - 1; i < endValue; i++) {
                    peersSubset.push(action.peers[i]);
                }

                if (totalPeers <= 20) {
                    showPreviousPage = false;
                    showNextPage = false;
                } else if (initialValue == 1) {
                    showPreviousPage = false;
                    showNextPage = true;
                } else if (endValue == totalPeers) {
                    showPreviousPage = true;
                    showNextPage = false;
                } else {
                    showPreviousPage = true;
                    showNextPage = true;
                }
            }
            return Object.assign({}, state, { isLoadingPeers: false, isEmptyPeers: false, peers: action.peers, peersSubset: peersSubset, showPreviousPage: showPreviousPage, showNextPage: showNextPage, initialValue: initialValue, endValue: endValue, totalPeers: totalPeers });
        }
        case types.RECEIVE_EMPTY_PEERS:
            return Object.assign({}, state, { isLoadingPeers: false, isEmptyPeers: true, peers: [] });
        case types.NAVIGATE_NEXT_PEERS: {
            let initialValue = 1 + ((state.page + 1 - 1) * 20);
            let endValue = (state.page + 1) * 20;
            let totalPeers = state.peers.length;
            let peersSubset = new Array();
            let showPreviousPage = false;
            let showNextPage = true;
            if (totalPeers > 0) {
                if (endValue > totalPeers) {
                    endValue = totalPeers
                }
                for (let i = initialValue - 1; i < endValue; i++) {
                    peersSubset.push(state.peers[i]);
                }

                if (totalPeers <= 20) {
                    showPreviousPage = false;
                    showNextPage = false;
                } else if (initialValue == 1) {
                    showPreviousPage = false;
                    showNextPage = true;
                } else if (endValue == totalPeers) {
                    showPreviousPage = true;
                    showNextPage = false;
                } else {
                    showPreviousPage = true;
                    showNextPage = true;
                }
            }
            return Object.assign({}, state, { page: state.page + 1, peersSubset: peersSubset, showPreviousPage: showPreviousPage, showNextPage: showNextPage, initialValue: initialValue, endValue: endValue, totalPeers: totalPeers });
        }
        case types.NAVIGATE_PREVIOUS_PEERS: {
            let initialValue = 1 + ((state.page - 1 - 1) * 20);
            let endValue = (state.page - 1) * 20;
            let totalPeers = state.peers.length;
            let peersSubset = new Array();
            let showPreviousPage = false;
            let showNextPage = true;
            if (totalPeers > 0) {
                if (endValue > totalPeers) {
                    endValue = totalPeers
                }
                for (let i = initialValue - 1; i < endValue; i++) {
                    peersSubset.push(state.peers[i]);
                }

                if (totalPeers <= 20) {
                    showPreviousPage = false;
                    showNextPage = false;
                } else if (initialValue == 1) {
                    showPreviousPage = false;
                    showNextPage = true;
                } else if (endValue == totalPeers) {
                    showPreviousPage = true;
                    showNextPage = false;
                } else {
                    showPreviousPage = true;
                    showNextPage = true;
                }
            }

            return Object.assign({}, state, { page: state.page - 1, peersSubset: peersSubset, showPreviousPage: showPreviousPage, showNextPage: showNextPage, initialValue: initialValue, endValue: endValue, totalPeers: totalPeers });
        }
        case types.RESET_PAGE:
            return Object.assign({}, state, { page: 1 });
        default:
            return state;
    }
}
