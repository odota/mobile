export const types = {
    ADD_FAVOURITES: 'ADD_FAVOURITES',
    REMOVE_FAVOURITES: 'REMOVE_FAVOURITES',
    INITIALIZE_FAVOURITES: 'INITIALIZE_FAVOURITES',
    PURGE_FAVOURITES: 'PURGE_FAVOURITES'
}

export function addFavourites(info) {
    return {
        type: types.ADD_FAVOURITES,
        info
    };
}

export function removeFavourites(id) {
    return {
        type: types.REMOVE_FAVOURITES,
        id
    };
}

export function initializeFavourites(favouritesString) {
    var restoredFavourites = JSON.parse(favouritesString);
    return {
        type: types.INITIALIZE_FAVOURITES,
        restoredFavourites
    };
}

export function purgeFavourites() {
    return {
        type: types.PURGE_FAVOURITES
    };
}
