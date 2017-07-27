import { fetchAPI } from '../utils/fetch';

export const types = {
    REQUEST_PEERS: 'REQUEST_PEERS',
    RECEIVE_PEERS: 'RECEIVE_PEERS',
    RECEIVE_EMPTY_PEERS: 'RECEIVE_EMPTY_PEERS',
    NAVIGATE_NEXT_PEERS: 'NAVIGATE_NEXT_PEERS',
    NAVIGATE_PREVIOUS_PEERS: 'NAVIGATE_PREVIOUS_PEERS'
}

function requestPeers() {
    return {
        type: types.REQUEST_PEERS
    };
}

function receivePeers(peers) {
    return {
        type: types.RECEIVE_PEERS,
        peers
    };
}

function receiveEmptyPeers() {
    return {
        type: types.RECEIVE_EMPTY_PEERS
    };
}

export function fetchPeers(playerId) {
    var endpoint = "players/" + playerId + "/peers";
    console.log(endpoint);
    return dispatch => {
        dispatch(requestPeers());

        var jsonData;
        return fetchAPI(endpoint)
        .then((json) => {
            dispatch(receivePeers(json));
        })
        .catch((error) => {
            console.log("Action - FETCH PEERS ERROR - " + error);
            dispatch(receiveEmptyPeers());
        });
    }
}

export function navigateNext() {
    return {
        type: types.NAVIGATE_NEXT_PEERS
    }
}

export function navigatePrevious() {
    return {
        type: types.NAVIGATE_PREVIOUS_PEERS
    }
}
