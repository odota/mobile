import { fetchAPI } from '../utils/fetch';

export const types = {
    REQUEST_MATCHES: 'REQUEST_MATCHES',
    RECEIVE_MATCHES: 'RECEIVE_MATCHES',
    RECEIVE_EMPTY_MATCHES: 'RECEIVE_EMPTY_MATCHES',
    CHANGE_SORTED_BY: 'CHANGE_SORTED_BY',
    NAVIGATE_NEXT_MATCHES: 'NAVIGATE_NEXT_MATCHES',
    NAVIGATE_PREVIOUS_MATCHES: 'NAVIGATE_PREVIOUS_MATCHES'
}

export function navigateNextMatches() {
    return {
        type: types.NAVIGATE_NEXT_MATCHES
    };
}

export function navigatePreviousMatches() {
    return {
        type: types.NAVIGATE_PREVIOUS_MATCHES
    };
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

export function fetchMatches(playerId, limit, projects, sortCategory, heroId, result,
                                faction, gameMode, lane, lobbyType, patch, date, region) {
    var endpoint = "players/" + playerId + "/matches?limit=" + limit;

    if(projects){
        for(i = 0; i < projects.length; i++) {
            endpoint += ("&project=" + projects[i]);
        }
    }

    if(sortCategory !== undefined && sortCategory !== "match_id") {
        endpoint += ("&sort=" + sortCategory);
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

    if(gameMode !== undefined && gameMode !== -1) {
        endpoint += ("&game_mode=" + gameMode);
    }

    if(result !== undefined && result !== -1) {
        endpoint += ("&win=" + result);
    }

    if(lane !== undefined && lane !== -1) {
        endpoint += ("&lane_role=" + lane);
    }

    if(lobbyType !== undefined && lobbyType !== -2) {
        endpoint += ("&lobby_type=" + lobbyType);
    }

    if(date !== undefined && date !== -1) {
        endpoint += ("&date=" + date);
    }

    if(region !== undefined && region !== -1) {
        endpoint += ("&region=" + region);
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
