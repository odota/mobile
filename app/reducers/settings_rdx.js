import { types } from 'Actions/settings_act'
import Colors from 'Themes/Colors'
var initialState = { theme: 0, alpha: Colors.openDotaAlpha, mod: Colors.openDotaMod, legend: Colors.openDotaLegend, secondLegend: Colors.openDotaSecondLegend, legendHex: Colors.openDotaLegendHex, legendTranslucent: Colors.openDotaLegendTranslucent }

export default function settingsState (state = initialState, action = {}) {
    switch (action.type) {
    case types.CHANGE_THEME:
        return Object.assign({}, state, { theme: action.value, alpha: action.alpha, mod: action.mod, legend: action.legend, secondLegend: action.secondLegend, legendHex: action.legendHex, legendTranslucent: action.legendTranslucent })
    default:
        return state
    }
}
