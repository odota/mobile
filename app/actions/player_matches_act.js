import { fetchAPI } from '../utils/fetch';

export const types = {
    REQUEST_MATCHES: 'REQUEST_MATCHES',
    RECEIVE_MATCHES: 'RECEIVE_MATCHES',
    RECEIVE_EMPTY_MATCHES: 'RECEIVE_EMPTY_MATCHES',
    CHANGE_SORTED_BY: 'CHANGE_SORTED_BY'
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

export function changeSortedby(sortedBy) {
    return {
        type: types.CHANGE_SORTED_BY,
        sortedBy
    };
}

export function fetchMatches(playerId, limit, sortCategory, heroId, faction, patch) {
    var endpoint = "players/" + playerId + "/matches?limit=" + limit;

    if(sortCategory !== undefined && sortCategory !== "match_id") {
        endpoint += ("&desc=" + sortCategory);
    }

    if(heroId !== undefined && heroId !== 0) {
        endpoint += ("&hero_id=" + heroId);
    }

    if(faction !== undefined && faction !== -1) {
        endpoint += ("&isRadiant=" + faction);
    }

    if(patch !== undefined && patch !== -1) {
        endpoint += ("&patch=" + patch);
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
