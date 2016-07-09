export const types = {
    CHANGE_CONTEXT_ID: 'CHANGE_CONTEXT_ID',
    CHANGE_PARENT: 'CHANGE_PARENT'
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
