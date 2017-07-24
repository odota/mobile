import Colors from '../themes/Colors';

export const types = {
    CHANGE_THEME: 'CHANGE_THEME'
}

export function changeTheme(themeSet) {
    var alpha, mod, legend, secondLegend, legendHex, legendTranslucent;
    if(themeSet == 1) {
        alpha = Colors.skyDolchAlpha;
        mod = Colors.skyDolchMod;
        legend = Colors.skyDolchLegend;
        secondLegend = Colors.skyDolchSecondLegend;
        legendHex = Colors.skyDolchLegendHex;
        legendTranslucent = Colors.skyDolchLegendTranslucent;
    } else if (themeSet == 2) {
        alpha = Colors.hyperfuseAlpha;
        mod = Colors.hyperfuseMod;
        legend = Colors.hyperfuseLegend;
        secondLegend = Colors.hyperfuseSecondLegend;
        legendHex = Colors.hyperfuseLegendHex;
        legendTranslucent = Colors.hyperfuseLegendTranslucent;
    } else if (themeSet == 3) {
        alpha = Colors.hasteAlpha;
        mod = Colors.hasteMod;
        legend = Colors.hasteLegend;
        secondLegend = Colors.hasteSecondLegend;
        legendHex = Colors.hasteLegendHex;
        legendTranslucent = Colors.hasteLegendTranslucent;
    } else if (themeSet == 4) {
        alpha = Colors.invisibilityAlpha;
        mod = Colors.invisibilityMod;
        legend = Colors.invisibilityLegend;
        secondLegend = Colors.invisibilitySecondLegend;
        legendHex = Colors.invisibilityLegendHex;
        legendTranslucent = Colors.invisibilityLegendTranslucent;
    } else if (themeSet == 5) {
        alpha = Colors.doubleDamageAlpha;
        mod = Colors.doubleDamageMod;
        legend = Colors.doubleDamageLegend;
        secondLegend = Colors.doubleDamageSecondLegend;
        legendHex = Colors.doubleDamageLegendHex;
        legendTranslucent = Colors.doubleDamageLegendTranslucent;
    } else if (themeSet == 6) {
        alpha = Colors.regenerationAlpha;
        mod = Colors.regenerationMod;
        legend = Colors.regenerationLegend;
        secondLegend = Colors.regenerationSecondLegend;
        legendHex = Colors.regenerationLegendHex;
        legendTranslucent = Colors.regenerationLegendTranslucent;
    } else if (themeSet == 7) {
        alpha = Colors.illusionAlpha;
        mod = Colors.illusionMod;
        legend = Colors.illusionLegend;
        secondLegend = Colors.illusionSecondLegend;
        legendHex = Colors.illusionLegendHex;
        legendTranslucent = Colors.illusionLegendTranslucent;
    } else {
        console.log(value);
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
