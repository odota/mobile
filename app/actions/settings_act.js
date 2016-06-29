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
    } else if (themeSet == 5) {
        alpha = Colors.doubleDamageAlpha;
        mod = Colors.doubleDamageMod;
        legend = Colors.doubleDamageLegend;
        secondLegend = Colors.doubleDamageSecondLegend;
        legendHex = Colors.doubleDamageLegendHex;
        legendTranslucent = Colors.doubleDamageLegendTranslucent;
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
