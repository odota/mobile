import { fetchAPI } from '../utils/fetch';

export const types = {
    REQUEST_MATCHES: 'REQUEST_MATCHES',
    RECEIVE_MATCHES: 'RECEIVE_MATCHES',
    RECEIVE_EMPTY_MATCHES: 'RECEIVE_EMPTY_MATCHES'
}

function requestMatches() {
    return {
        type: types.REQUEST_MATCHES
    };
}

function receiveMatches(matches) {
    return {
        type: types.RECEIVE_MATCHES,
        matches
    };
}

function receiveEmptyMatches() {
    return {
        type: types.RECEIVE_EMPTY_MATCHES
    };
}

export function fetchMatches(playerId, limit, heroId, faction) {
    console.log(faction);
    var endpoint = "players/" + playerId + "/matches?limit=" + limit;

    if(heroId !== undefined && heroId !== 0) {
        endpoint += ("&hero_id=" + heroId);
    }

    if(faction !== undefined && faction !== -1) {
        endpoint += ("&isRadiant=" + faction);
    }
    console.log(endpoint);
    return dispatch => {
        dispatch(requestMatches());

        var jsonData;
        return fetchAPI(endpoint)
        .then((json) => {
            dispatch(receiveMatches(json));
        })
        .catch((error) => {
            console.log("Action - FETCH MATCHES ERROR - " + error);
            dispatch(receiveEmptyMatches());
        })
    }
}
