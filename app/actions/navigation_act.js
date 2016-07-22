export const types = {
    CHANGE_CONTEXT_ID: 'CHANGE_CONTEXT_ID',
    CHANGE_PARENT: 'CHANGE_PARENT',
    CONSUME_HOME_TAB: 'CONSUME_HOME_TAB',
    PUSH_CONTEXT_ID: 'PUSH_CONTEXT_ID',
    POP_CONTEXT_ID: 'POP_CONTEXT_ID',
    SWITCH_CONTEXT_ID: 'SWITCH_CONTEXT_ID'
}

export function pushContextId(id, parentType) {
    return {
        type: types.PUSH_CONTEXT_ID,
        contextId: id,
        parentType
    }
}

export function popContextId(parentType) {
    return {
        type: types.POP_CONTEXT_ID,
        parentType
    }
}

export function switchContextId(id, parentType) {
    return {
        type: types.SWITCH_CONTEXT_ID,
        contextId: id,
        parentType
    }
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
