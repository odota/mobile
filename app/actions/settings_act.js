export const types = {
    CHANGE_THEME: 'CHANGE_THEME'
}

export function changeTheme(alpha, mod, legend, secondLegend, legendHex, legendTranslucent) {
    return {
        type: types.CHANGE_THEME,
        alpha,
        mod,
        legend,
        secondLegend,
        legendHex,
        legendTranslucent
    }
}
