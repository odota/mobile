import { fetchAPI } from '../utils/fetch';

export const types = {
    REQUEST_MATCHES: 'REQUEST_MATCHES',
    RECEIVE_MATCHES: 'RECEIVE_MATCHES',
    RECEIVE_EMPTY_MATCHES: 'RECEIVE_EMPTY_MATCHES',
    REQUEST_RECENT_MATCHES: 'REQUEST_RECENT_MATCHES',
    RECEIVE_RECENT_MATCHES: 'RECEIVE_RECENT_MATCHES',
    RECEIVE_EMPTY_RECENT_MATCHES: 'RECEIVE_EMPTY_RECENT_MATCHES',
    CHANGE_SORTED_BY: 'CHANGE_SORTED_BY',
    SORT_MATCHES: 'SORT_MATCHES',
    SET_MAX_PAGES: 'SET_MAX_PAGES',
    NAVIGATE_NEXT_MATCHES: 'NAVIGATE_NEXT_MATCHES',
    NAVIGATE_PREVIOUS_MATCHES: 'NAVIGATE_PREVIOUS_MATCHES',
    RESET_PAGE: 'RESET_PAGE'
}

export function navigateNextMatches(amount) {
    return {
        type: types.NAVIGATE_NEXT_MATCHES,
        amount
    };
}

export function navigatePreviousMatches(amount) {
    return {
        type: types.NAVIGATE_PREVIOUS_MATCHES,
        amount
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

function requestRecentMatches() {
    return {
        type: types.REQUEST_RECENT_MATCHES
    };
}

function receiveRecentMatches(recentMatches) {
    return {
        type: types.RECEIVE_RECENT_MATCHES,
        recentMatches
    };
}

function receiveEmptyRecentMatches() {
    return {
        type: types.RECEIVE_EMPTY_RECENT_MATCHES
    };
}

export function fetchRecentMatches(playerId, limit) {
    var endpoint = "players/" + playerId + "/matches?limit=" + limit;

    return dispatch => {
        dispatch(requestRecentMatches());

        return fetchAPI(endpoint)
            .then((json) => {
                dispatch(receiveRecentMatches(json));
            })
            .catch(() => {
                dispatch(receiveEmptyRecentMatches());
            })
    }
}

export function setMaxPages(maxPages) {
    return {
        type: types.SET_MAX_PAGES,
        maxPages
    }
}

export function changeSortedby(sortedBy) {
    return {
        type: types.CHANGE_SORTED_BY,
        sortedBy
    };
}

export function sortMatches(sortField, sortDirection) {
    return {
        type: types.SORT_MATCHES,
        sortField,
        sortDirection
    }
}

export function resetMatchesPage() {
    return {
        type: types.RESET_PAGE
    }
}

export function fetchMatches(playerId, limit, projects, sortCategory, heroId, result,
    faction, gameMode, lane, lobbyType, patch, date, region) {
    var endpoint = "players/" + playerId + "/matches?limit=" + limit;

    if (projects) {
        for (let i = 0; i < projects.length; i++) {
            endpoint += ("&project=" + projects[i]);
        }
    }

    if (sortCategory !== undefined && sortCategory !== "match_id") {
        endpoint += ("&sort=" + sortCategory);
    }

    if (heroId !== undefined && heroId !== 0) {
        endpoint += ("&hero_id=" + heroId);
    }

    if (faction !== undefined && faction !== -1) {
        endpoint += ("&isRadiant=" + faction);
    }

    if (patch !== undefined && patch !== -1) {
        endpoint += ("&patch=" + patch);
    }

    if (gameMode !== undefined && gameMode !== -1) {
        endpoint += ("&game_mode=" + gameMode);
    }

    if (result !== undefined && result !== -1) {
        endpoint += ("&win=" + result);
    }

    if (lane !== undefined && lane !== -1) {
        endpoint += ("&lane_role=" + lane);
    }

    if (lobbyType !== undefined && lobbyType !== -2) {
        endpoint += ("&lobby_type=" + lobbyType);
    }

    if (date !== undefined && date !== -1) {
        endpoint += ("&date=" + date);
    }

    if (region !== undefined && region !== -1) {
        endpoint += ("&region=" + region);
    }

    return dispatch => {
        dispatch(requestMatches());

        return fetchAPI(endpoint)
            .then((json) => {
                dispatch(receiveMatches(json));
            })
            .catch(() => {
                dispatch(receiveEmptyMatches());
            })
    }
}
