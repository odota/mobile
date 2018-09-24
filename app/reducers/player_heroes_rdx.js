import { types } from '../actions/player_heroes_act';
var initialState = { isLoadingHeroes: false, isEmptyHeroes: false, heroes: {}, page: 1, heroesSubset: [], showPreviousPage: false, showNextPage: true, initialValue: 1, endValue: 20, totalHeroes: 100 };

export default function playerHeroesState(state = initialState, action = {}) {
    switch (action.type) {
        case types.REQUEST_HEROES:
            return Object.assign({}, state, { isLoadingHeroes: true, isEmptyHeroes: false, heroes: {} });
        case types.RECEIVE_HEROES: {
            let initialValue = 1 + ((state.page - 1) * 20);
            let endValue = state.page * 20;
            let totalHeroes = action.heroes.length;
            let heroesSubset = new Array();
            let showPreviousPage = false;
            let showNextPage = true;
            if (totalHeroes > 0) {
                if (endValue > totalHeroes) {
                    endValue = totalHeroes;
                }
                
                for (let i = initialValue - 1; i < endValue; i++) {
                    heroesSubset.push(action.heroes[i]);
                }
                showPreviousPage = initialValue != 1;
                showNextPage = endValue != totalHeroes;
            }
            return Object.assign({}, state, { isLoadingHeroes: false, isEmptyHeroes: false, heroes: action.heroes, heroesSubset: heroesSubset, showPreviousPage: showPreviousPage, showNextPage: showNextPage, initialValue: initialValue, endValue: endValue, totalHeroes: totalHeroes });
        }
        case types.RECEIVE_EMPTY_HEROES:
            return Object.assign({}, state, { isLoadingHeroes: false, isEmptyHeroes: true, heroes: {} });
        case types.NAVIGATE_NEXT_HEROES: {
            let initialValue = 1 + ((state.page + 1 - 1) * 20);
            let endValue = (state.page + 1) * 20;
            let totalHeroes = state.heroes.length;
            let heroesSubset = new Array();
            let showPreviousPage = false;
            let showNextPage = true;
            if (totalHeroes > 0) {
                if (endValue > totalHeroes) {
                    endValue = totalHeroes;
                }
                for (let i = initialValue - 1; i < endValue; i++) {
                    heroesSubset.push(state.heroes[i]);
                }
                showPreviousPage = initialValue != 1;
                showNextPage = endValue != totalHeroes;
            }
            return Object.assign({}, state, { page: state.page + 1, heroesSubset: heroesSubset, showPreviousPage: showPreviousPage, showNextPage: showNextPage, initialValue: initialValue, endValue: endValue, totalHeroes: totalHeroes });
        }
        case types.NAVIGATE_PREVIOUS_HEROES: {
            let initialValue = 1 + ((state.page - 1 - 1) * 20);
            let endValue = (state.page - 1) * 20;
            let totalHeroes = state.heroes.length;
            let heroesSubset = new Array();
            let showPreviousPage = false;
            let showNextPage = true;
            if (totalHeroes > 0) {
                if (endValue > totalHeroes) {
                    endValue = totalHeroes;
                }
                for (let i = initialValue - 1; i < endValue; i++) {
                    heroesSubset.push(state.heroes[i]);
                }
                showPreviousPage = initialValue != 1;
                showNextPage = endValue != totalHeroes;
            }
            return Object.assign({}, state, { page: state.page - 1, heroesSubset: heroesSubset, showPreviousPage: showPreviousPage, showNextPage: showNextPage, initialValue: initialValue, endValue: endValue, totalHeroes: totalHeroes });
        }
        case types.RESET_PAGE:
            return Object.assign({}, state, { page: 1 });
        default:
            return state;
    }
}
