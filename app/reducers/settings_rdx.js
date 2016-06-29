import { types } from '../actions/settings_act';
import Colors from '../themes/Colors';
var initialState = { theme: 0, alpha: Colors.skyDolchAlpha, mod: Colors.skyDolchMod, legend: Colors.skyDolchLegend, secondLegend: Colors.skyDolchSecondLegend, legendHex: Colors.skyDolchLegendHex, legendTranslucent: Colors.skyDolchLegendTranslucent };

export default function settingsState(state = initialState, action = {}) {
    switch(action.type) {
        case types.CHANGE_THEME:
            return Object.assign({}, state, { theme: action.value, alpha: action.alpha, mod: action.mod, legend: action.legend, secondLegend: action.secondLegend, legendHex: action.legendHex, legendTranslucent: action.legendTranslucent });
        default:
            return state;
    }
}
