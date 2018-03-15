import Colors from '../themes/Colors';

export const types = {
    CHANGE_THEME: 'CHANGE_THEME'
}

export function changeTheme(themeSet) {
    var alpha, mod, legend, secondLegend, legendHex, legendTranslucent, background, reverseBackground;
    if(themeSet == 1) {
        alpha = Colors.openDotaAlpha;
        mod = Colors.openDotaMod;
        legend = Colors.openDotaLegend;
        secondLegend = Colors.openDotaSecondLegend;
        legendHex = Colors.openDotaLegendHex;
        legendTranslucent = Colors.openDotaLegendTranslucent;
        background = Colors.openDotaBackground;
        reverseBackground = Colors.openDotaReverseBackground;
    } else if(themeSet == 2) {
        alpha = Colors.skyDolchAlpha;
        mod = Colors.skyDolchMod;
        legend = Colors.skyDolchLegend;
        secondLegend = Colors.skyDolchSecondLegend;
        legendHex = Colors.skyDolchLegendHex;
        legendTranslucent = Colors.skyDolchLegendTranslucent;
        background = Colors.skyDolchBackground;
        reverseBackground = Colors.skyDolchReverseBackground;
    } else if (themeSet == 3) {
        alpha = Colors.hyperfuseAlpha;
        mod = Colors.hyperfuseMod;
        legend = Colors.hyperfuseLegend;
        secondLegend = Colors.hyperfuseSecondLegend;
        legendHex = Colors.hyperfuseLegendHex;
        legendTranslucent = Colors.hyperfuseLegendTranslucent;
        background = Colors.hyperfuseBackground;
        reverseBackground = Colors.hyperfuseReverseBackground;
    } else if (themeSet == 4) {
        alpha = Colors.hasteAlpha;
        mod = Colors.hasteMod;
        legend = Colors.hasteLegend;
        secondLegend = Colors.hasteSecondLegend;
        legendHex = Colors.hasteLegendHex;
        legendTranslucent = Colors.hasteLegendTranslucent;
        background = Colors.hasteBackground;
        reverseBackground = Colors.hasteReverseBackground;
    } else if (themeSet == 5) {
        alpha = Colors.invisibilityAlpha;
        mod = Colors.invisibilityMod;
        legend = Colors.invisibilityLegend;
        secondLegend = Colors.invisibilitySecondLegend;
        legendHex = Colors.invisibilityLegendHex;
        legendTranslucent = Colors.invisibilityLegendTranslucent;
        background = Colors.invisibilityBackground;
        reverseBackground = Colors.invisibilityReverseBackground;
    } else if (themeSet == 6) {
        alpha = Colors.doubleDamageAlpha;
        mod = Colors.doubleDamageMod;
        legend = Colors.doubleDamageLegend;
        secondLegend = Colors.doubleDamageSecondLegend;
        legendHex = Colors.doubleDamageLegendHex;
        legendTranslucent = Colors.doubleDamageLegendTranslucent;
        background = Colors.doubleDamageBackground;
        reverseBackground = Colors.doubleDamageReverseBackground;
    } else if (themeSet == 7) {
        alpha = Colors.regenerationAlpha;
        mod = Colors.regenerationMod;
        legend = Colors.regenerationLegend;
        secondLegend = Colors.regenerationSecondLegend;
        legendHex = Colors.regenerationLegendHex;
        legendTranslucent = Colors.regenerationLegendTranslucent;
        background = Colors.regenerationBackground;
        reverseBackground = Colors.regenerationReverseBackground;
    } else if (themeSet == 8) {
        alpha = Colors.illusionAlpha;
        mod = Colors.illusionMod;
        legend = Colors.illusionLegend;
        secondLegend = Colors.illusionSecondLegend;
        legendHex = Colors.illusionLegendHex;
        legendTranslucent = Colors.illusionLegendTranslucent;
        background = Colors.illusionBackground;
        reverseBackground = Colors.illusionReverseBackground;
    } else if (themeSet == 9) {
        alpha = Colors.nightAlpha;
        mod = Colors.nightMod;
        legend = Colors.nightLegend;
        secondLegend = Colors.nightSecondLegend;
        legendHex = Colors.nightLegendHex;
        legendTranslucent = Colors.nightLegendTranslucent;
        background = Colors.nightBackground;
        reverseBackground = Colors.nightReverseBackground;
    }
    return {
        type: types.CHANGE_THEME,
        themeSet,
        alpha,
        mod,
        legend,
        secondLegend,
        legendHex,
        legendTranslucent,
        background,
        reverseBackground
    }
}
