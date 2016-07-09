import { types } from '../actions/navigation_act';
var initialState = { contextId: -1, scene: {}, parent: "Home" };

export default function navigationState(state = initialState, action = {}) {
    switch(action.type) {
        case "focus":
            return {
                ...state,
                scene: action.scene
            };
        case types.CHANGE_CONTEXT_ID:
            return Object.assign({}, state, { contextId: action.contextId });
        case types.CHANGE_PARENT:
            return Object.assign({}, state, { parent: action.parent });
        default:
            return state;
    }
}
