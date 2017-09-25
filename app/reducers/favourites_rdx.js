import { types } from 'Actions/favourites_act'
var initialState = { favourites: [] }

export default function favouritesState (state = initialState, action = {}) {
    switch (action.type) {
    case types.INITIALIZE_FAVOURITES:
        return Object.assign({}, state, { favourites: action.restoredFavourites })
    case types.ADD_FAVOURITES:
        return Object.assign({}, state, { favourites: [...state.favourites, action.info] })
    case types.REMOVE_FAVOURITES:
        const index = state.favourites.findIndex(item => item.account_id === action.id)
        return Object.assign({}, state, { favourites: [...state.favourites.slice(0, index),
            ...state.favourites.slice(index + 1)] }
        )
    case types.PURGE_FAVOURITES:
        return Object.assign({}, state, { favourites: [] })
    default:
        return state
    }
}
