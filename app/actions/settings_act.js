import Colors from 'Themes/Colors'

export const types = {
    CHANGE_THEME: 'CHANGE_THEME'
}

export function changeTheme (themeSet) {
    const themeSetId = parseInt(themeSet)
    var alpha, mod, legend, secondLegend, legendHex, legendTranslucent
    if (themeSetId === 1) {
        alpha = Colors.openDotaAlpha
        mod = Colors.openDotaMod
        legend = Colors.openDotaLegend
        secondLegend = Colors.openDotaSecondLegend
        legendHex = Colors.openDotaLegendHex
        legendTranslucent = Colors.openDotaLegendTranslucent
    } else if (themeSetId === 2) {
        alpha = Colors.skyDolchAlpha
        mod = Colors.skyDolchMod
        legend = Colors.skyDolchLegend
        secondLegend = Colors.skyDolchSecondLegend
        legendHex = Colors.skyDolchLegendHex
        legendTranslucent = Colors.skyDolchLegendTranslucent
    } else if (themeSetId === 3) {
        alpha = Colors.hyperfuseAlpha
        mod = Colors.hyperfuseMod
        legend = Colors.hyperfuseLegend
        secondLegend = Colors.hyperfuseSecondLegend
        legendHex = Colors.hyperfuseLegendHex
        legendTranslucent = Colors.hyperfuseLegendTranslucent
    } else if (themeSetId === 4) {
        alpha = Colors.hasteAlpha
        mod = Colors.hasteMod
        legend = Colors.hasteLegend
        secondLegend = Colors.hasteSecondLegend
        legendHex = Colors.hasteLegendHex
        legendTranslucent = Colors.hasteLegendTranslucent
    } else if (themeSetId === 5) {
        alpha = Colors.invisibilityAlpha
        mod = Colors.invisibilityMod
        legend = Colors.invisibilityLegend
        secondLegend = Colors.invisibilitySecondLegend
        legendHex = Colors.invisibilityLegendHex
        legendTranslucent = Colors.invisibilityLegendTranslucent
    } else if (themeSetId === 6) {
        alpha = Colors.doubleDamageAlpha
        mod = Colors.doubleDamageMod
        legend = Colors.doubleDamageLegend
        secondLegend = Colors.doubleDamageSecondLegend
        legendHex = Colors.doubleDamageLegendHex
        legendTranslucent = Colors.doubleDamageLegendTranslucent
    } else if (themeSetId === 7) {
        alpha = Colors.regenerationAlpha
        mod = Colors.regenerationMod
        legend = Colors.regenerationLegend
        secondLegend = Colors.regenerationSecondLegend
        legendHex = Colors.regenerationLegendHex
        legendTranslucent = Colors.regenerationLegendTranslucent
    } else if (themeSetId === 8) {
        alpha = Colors.illusionAlpha
        mod = Colors.illusionMod
        legend = Colors.illusionLegend
        secondLegend = Colors.illusionSecondLegend
        legendHex = Colors.illusionLegendHex
        legendTranslucent = Colors.illusionLegendTranslucent
    }
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
