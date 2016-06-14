import { fetchAPI } from '../utils/fetch';

export const types = {
    REQUEST_OVERVIEW: 'REQUEST_OVERVIEW',
    RECEIVE_OVERVIEW: 'RECEIVE_OVERVIEW',
    RECEIVE_EMPTY_OVERVIEW: 'RECEIVE_EMPTY_OVERVIEW'
}

function requestOverview() {
    return {
        type: types.REQUEST_OVERVIEW
    };
}

function receiveOverview(overview) {
    return {
        type: types.RECEIVE_OVERVIEW,
        overview
    };
}

function receiveEmptyOverview() {
    return {
        type: types.RECEIVE_EMPTY_OVERVIEW
    };
}

export function fetchOverview(playerId) {
    var endpoint = "players/" + playerId;
    return dispatch => {
        dispatch(requestOverview());

        var jsonData;
        return fetchAPI(endpoint)
        .then((json) => {
            dispatch(receiveOverview(json));
        })
        .catch((error) => {
            console.log("Action - FETCH OVERVIEW ERROR - " + error);
            dispatch(receiveEmptyOverview());
        })
    }
}
