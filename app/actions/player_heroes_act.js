import { fetchAPI } from '../utils/fetch';

export const types = {
    REQUEST_HEROES: 'REQUEST_HEROES',
    RECEIVE_HEROES: 'RECEIVE_HEROES',
    RECEIVE_EMPTY_HEROES: 'RECEIVE_EMPTY_HEROES',
    NAVIGATE_NEXT_HEROES: 'NAVIGATE_NEXT_HEROES',
    NAVIGATE_PREVIOUS_HEROES: 'NAVIGATE_PREVIOUS_HEROES'
};

function requestHeroes() {
    return {
        type: types.REQUEST_HEROES
    };
}

function receiveHeroes(heroes) {
    return {
        type: types.RECEIVE_HEROES,
        heroes
    };
}

function receiveEmptyHeroes() {
    return {
        type: types.RECEIVE_EMPTY_HEROES
    };
}

export function fetchHeroes(playerId, limit) {
    var endpoint = "players/" + playerId + "/heroes";
    console.log(endpoint);
    return dispatch => {
        dispatch(requestHeroes());

        var jsonData;
        return fetchAPI(endpoint)
        .then((json) => {
            dispatch(receiveHeroes(json));
        })
        .catch((error) => {
            console.log("Action - FETCH MATCHES ERROR - " + error);
            dispatch(receiveEmptyHeroes());
        });
    }
}

export function navigateNext() {
    return {
        type: types.NAVIGATE_NEXT_HEROES
    }
}

export function navigatePrevious() {
    return {
        type: types.NAVIGATE_PREVIOUS_HEROES
    }
}
