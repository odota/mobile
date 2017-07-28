export const types = {
    CHANGE_CONTEXT_ID: 'CHANGE_CONTEXT_ID',
    PUSH_CONTEXT_ID_HOME: 'PUSH_CONTEXT_ID_HOME',
    POP_CONTEXT_ID_HOME: 'POP_CONTEXT_ID_HOME',
    PUSH_CONTEXT_ID_FAVOURITE: 'PUSH_CONTEXT_ID_FAVOURITE',
    POP_CONTEXT_ID_FAVOURITE: 'POP_CONTEXT_ID_FAVOURITE',
    PUSH_CONTEXT_ID_SEARCH: 'PUSH_CONTEXT_ID_SEARCH',
    POP_CONTEXT_ID_SEARCH: 'POP_CONTEXT_ID_SEARCH',
    CHANGE_PARENT: 'CHANGE_PARENT',
    CONSUME_HOME_TAB: 'CONSUME_HOME_TAB'
}

export function changeContextId(id) {
    return {
        type: types.CHANGE_CONTEXT_ID,
        contextId: id
    };
}

export function pushContextIdHome(id) {
    return {
        type: types.PUSH_CONTEXT_ID_HOME,
        newContextId: id
    };
}

export function popContextIdHome() {
    return {
        type: types.POP_CONTEXT_ID_HOME
    };
}

export function pushContextIdFavourite(id) {
    return {
        type: types.PUSH_CONTEXT_ID_FAVOURITE,
        newContextId: id
    };
}

export function popContextIdFavourite() {
    return {
        type: types.POP_CONTEXT_ID_FAVOURITE
    };
}

export function pushContextIdSearch(id) {
    return {
        type: types.PUSH_CONTEXT_ID_SEARCH,
        newContextId: id
    };
}

export function popContextIdSearch() {
    return {
        type: types.POP_CONTEXT_ID_SEARCH
    };
}

export function changeParent(parent) {
    return {
        type: types.CHANGE_PARENT,
        parent: parent
    };
}

export function consumeHomeTab() {
    return {
        type: types.CONSUME_HOME_TAB
    };
}
