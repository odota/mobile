import { types } from '../actions/navigation_act';
var initialState = { contextIdHome: [], contextIdFavourites: [], contextIdSearch: [], scene: {}, parent: "Home", homeTab: false };

// TODO: Need to separate contextId into 3 different array. 1 for each drawer item.
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
        case types.PUSH_CONTEXT_ID:
            if(action.parentType == "Home") {
                return Object.assign({}, state, { contextIdHome: [...state.contextIdHome, action.contextId] });
            } else if (action.parentType == "Favourites") {
                return Object.assign({}, state, { contextIdHome: [...state.contextIdFavourites, action.contextId] });
            } else if (action.parentType == "Search") {
                return Object.assign({}, state, { contextIdHome: [...state.contextIdSearch, action.contextId] });
            }
        case types.POP_CONTEXT_ID:
            if(action.parentType == "Home") {
                return Object.assign({}, state, { contextIdHome: [...state.contextIdHome.slice(0, state.contextIdHome.length - 1)] });
            } else if (action.parentType == "Favourites") {
                return Object.assign({}, state, { contextIdFavourites: [...state.contextIdFavourites.slice(0, state.contextIdFavourites.length - 1)] });
            } else if (action.parentType == "Search") {
                return Object.assign({}, state, { contextIdSearch: [...state.contextIdSearch.slice(0, state.contextIdSearch.length - 1)] });
            }
        case types.SWITCH_CONTEXT_ID:
            if(action.parentType == "Home") {
                return Object.assign({}, state, { contextIdHome: [...state.contextIdHome.slice(0, state.contextIdHome.length - 1), action.contextId] });
            } else if (action.parentType == "Favourites") {
                return Object.assign({}, state, { contextIdFavourites: [...state.contextIdFavourites.slice(0, state.contextIdFavourites.length - 1), action.contextId] });
            } else if (action.parentType == "Search") {
                return Object.assign({}, state, { contextIdSearch: [...state.contextIdSearch.slice(0, state.contextIdSearch.length - 1), action.contextId] });
            }
        default:
            return state;
    }
}
