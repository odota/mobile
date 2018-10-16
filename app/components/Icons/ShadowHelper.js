import React from 'react';
import {View} from 'react-native';
import Svg, {RadialGradient, Stop, Circle } from 'react-native-svg'
import {Platform} from "react-native";

const Shadow = (props) => {
    if(Platform.OS === "ios"){
        return React.cloneElement(props.children, props);
    }

    const {style: {shadowColor, shadowRadius, height, width, margin, marginLeft, marginRight, marginBottom = 0, marginTop = 0}} = props
    const container = {
        width: width + (shadowRadius * 2),
        height: height + (shadowRadius * 2),
    }

    const wrapStyles = {
        position: "relative",
        marginBottom: -shadowRadius + marginBottom,
        marginTop: -shadowRadius + marginTop,
        height: container.height,
        width: container.width,
        margin: -shadowRadius + margin,
        marginLeft: -shadowRadius + marginLeft,
        marginRight: -shadowRadius + marginRight,
    }


    const svgStyles = {
        position: "absolute"

    }

    const innerStyles = {
        position: "absolute",
        top: shadowRadius,
        left: shadowRadius,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        margin: 0
    }

    return (
        <View height={container.height} width={container.width} style={[props.style, wrapStyles]}>
            <Svg height={container.height} width={container.width} style={svgStyles}>
                <RadialGradient id="dropshadow" r="100%" cx="50%" cy="50%" rx="50%" ry="50%" fx="50%" fy="50%" gradientUnits="userSpaceOnUse">
                    <Stop offset="0%" stopColor={shadowColor} stopOpacity=".6"/>
                    <Stop offset="50%" stopColor={shadowColor} stopOpacity=".2"/>
                    <Stop offset="100%" stopColor={shadowColor} stopOpacity="0"/>
                </RadialGradient>
                <Circle fill="url(#dropshadow)" cx="50%" cy="50%" r="100%" />
            </Svg>
            {React.cloneElement(props.children, {...props, style: [props.style, innerStyles]})}
        </View>)
}

export default Shadow
