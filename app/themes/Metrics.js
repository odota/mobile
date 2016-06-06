import React from 'react';
import { Platform, Dimensions } from 'react-native';

let width, height;

width = Dimensions.get('window').width;
height = Dimensions.get('window').height;

const navBarHeight = (Platform.OS === 'ios') ? 60 : 40;

const metrics = {
    navBarHeight: navBarHeight,
    screenWidth: width,
    screenHeight: height,

    fonts: {
      loginTitle: 18,
      loginInputText: 16,
      loginBtnText: 14,
      title: 40,
      accordionHeader: 16,
      header: 20,
      regular: 12,
      medium: 14,
      small: 11,
      tiny: 8.5
    }
}

export default metrics;
