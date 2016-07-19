export const types = {
    CHANGE_CONTEXT_ID: 'CHANGE_CONTEXT_ID',
    CHANGE_PARENT: 'CHANGE_PARENT',
    CONSUME_HOME_TAB: 'CONSUME_HOME_TAB'
}

export function changeContextId(id) {
    return {
        type: types.CHANGE_CONTEXT_ID,
        contextId: id
    }
}

export function changeParent(parent) {
    return {
        type: types.CHANGE_PARENT,
        parent: parent
    }
}

export function consumeHomeTab() {
    return {
        type: types.CONSUME_HOME_TAB
    }
}
