import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export const headerStyle = {
    shadowRadius: 0,
    elevation: 0,
}

export const headerTitleStyle = {
    flex: 1,
    textAlign: 'center',
    marginLeft: -15,
    fontWeight: '600',
    color: '#fff',
}

export const headerBgStyle = {
    height: Platform.OS == 'android' ? 57 : DeviceInfo.hasNotch() ? 90 : 65,
    width: '100%',
    backgroundColor:'#664fc6'
}