import { types } from '../actions/navigation_act';
var initialState = { contextId: -1, scene: {}, parent: "Home", homeTab: false };

export default function navigationState(state = initialState, action = {}) {
    console.log(action.type);
    switch(action.type) {

        case "REACT_NATIVE_ROUTER_FLUX_JUMP":
            if(action.key == "homeTab") {
                return {
                    ...state,
                    homeTab: true
                };
            }

        case "REACT_NATIVE_ROUTER_FLUX_FOCUS":
            return {
                ...state,
                scene: action.scene
            };

        case types.CONSUME_HOME_TAB:
            return Object.assign({}, state, { homeTab: false });
        case types.CHANGE_CONTEXT_ID:
            return Object.assign({}, state, { contextId: action.contextId });
        case types.CHANGE_PARENT:
            return Object.assign({}, state, { parent: action.parent });
        default:
            return state;
    }
}
