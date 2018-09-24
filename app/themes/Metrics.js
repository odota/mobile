import { Platform, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

let width, height, deviceOS;

width = Dimensions.get('window').width;
height = Dimensions.get('window').height;

if(Platform.OS == "ios") {
  deviceOS = "ios"
} else {
  deviceOS = "android"
}

const navBarHeight = (DeviceInfo.getModel() == "iPhone X") ? 44 : (Platform.OS === 'ios') ? 44 : 56;
const statusBarHeight = (DeviceInfo.getModel() == "iPhone X") ? 44 : (Platform.OS === 'ios') ? 20 : 0;

const metrics = {
    navBarHeight: navBarHeight,
    statusBarHeight: statusBarHeight,
    screenWidth: width,
    screenHeight: height,
    deviceOS: deviceOS,

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
