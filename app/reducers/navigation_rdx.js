import { types } from '../actions/navigation_act';
var initialState = { contextId: -1, scene: {}, parent: "Home", homeTab: false, contextIdStackHome: [], contextIdStackFavourite: [], contextIdStackSearch: [] };

export default function navigationState(state = initialState, action = {}) {
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
        case types.PUSH_CONTEXT_ID_HOME:
            return Object.assign({}, state, { contextIdStackHome: [...state.contextIdStackHome, action.newContextId] });
        case types.POP_CONTEXT_ID_HOME:
            return Object.assign({}, state, { contextIdStackHome: state.contextIdStackHome.slice(0, state.contextIdStackHome.length - 1) });
        case types.PUSH_CONTEXT_ID_FAVOURITE:
            return Object.assign({}, state, { contextIdStackFavourite: [...state.contextIdStackHome, action.newContextId] });
        case types.POP_CONTEXT_ID_FAVOURITE:
            return Object.assign({}, state, { contextIdStackFavourite: state.contextIdStackFavourite.slice(0, state.contextIdStackFavourite.length - 1) });
        case types.PUSH_CONTEXT_ID_SEARCH:
            return Object.assign({}, state, { contextIdStackSearch: [...state.contextIdStackSearch, action.newContextId] });
        case types.POP_CONTEXT_ID_SEARCH:
            return Object.assign({}, state, { contextIdStackSearch: state.contextIdStackSearch.slice(0, state.contextIdStackSearch.length - 1) });
        default:
            return state;
    }
}
