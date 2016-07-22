import { fetchAPI } from '../utils/fetch';

export const types = {
    REQUEST_RECORDS: 'REQUEST_RECORDS',
    RECEIVE_RECORDS: 'RECEIVE_RECORDS',
    RECEIVE_EMPTY_RECORDS: RECEIVE_EMPTY_RECORDS
};

function requestRecords() {
    return {
        type: types.REQUEST_RECORDS
    };
}

function receiveRecords(records) {
    return {
        type: types.RECEIVE_RECORDS,
        records
    };
}

function receiveEmptyRecords() {
    return {
        type: types.RECEIVE_EMPTY_RECORDS
    };
}

export function fetchRecords(playerId) {
    var endpoint = "players/" + playerId + "/records";
    console.log(endpoint);
    return dispatch => {
        dispatch(requestRecords());

        var jsonData;
        return fetchAPI(endpoint)
        .then((json) => {
            dispatch(receiveRecords(json));
        })
        .catch((error) => {
            console.log("Action - FETCH RECORDS ERROR - " + error);
            dispatch(receiveEmptyRecords());
        })
    }
}
