import { fetchAPI } from '../utils/fetch';

export const types = {
    REQUEST_MATCH_DETAILS: 'REQUEST_MATCH_DETAILS',
    RECEIVE_MATCH_DETAILS: 'RECEIVE_MATCH_DETAILS',
    RECEIVE_EMPTY_MATCH_DETAILS: 'RECEIVE_EMPTY_MATCH_DETAILS'
}

function requestMatchDetails() {
    return {
        type: types.REQUEST_MATCH_DETAILS
    };
}

function receiveMatchDetails(matchDetails) {
    return {
        type: types.RECEIVE_MATCH_DETAILS,
         matchDetails
    };
}

function receiveEmptyMatchDetails() {
    return {
        type: types.RECEIVE_EMPTY_MATCH_DETAILS
    };
}

export function fetchMatchDetails(matchId) {
    var endpoint = "matches/" + matchId;
    return dispatch => {
        dispatch(requestMatchDetails());

        var jsonData;
        return fetchAPI(endpoint)
        .then((json) => {
            dispatch(receiveMatchDetails(json));
        })
        .catch((error) => {
            console.log("Action - FETCH MATCH DETAILS ERROR - " + error);
            dispatch(receiveEmptyMatchDetails());
        });
    }
}
