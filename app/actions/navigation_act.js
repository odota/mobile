export const types = {
    CHANGE_CONTEXT_ID: 'CHANGE_CONTEXT_ID'
}

export function changeContextId(id) {
    return {
        type: types.CHANGE_CONTEXT_ID,
        contextId: id
    }
}
