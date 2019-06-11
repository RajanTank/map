import React from 'react'
import { PermissionsAndroid } from 'react-native'

getPermission = async() => {

  let gotPermission = false

  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    title: 'Map need permission',
    message: 'App need Permission to Access the your Location',
    buttonPositive: 'Ok',
    buttonNeutral: 'Ask me later',
    buttonNegative: 'Cancel',
  }).then((result) => {
    console.log(result)
    if (result == 'granted') {
      gotPermission = true
      console.log(gotPermission + 'called');
      return gotPermission
    }
  })
  return gotPermission;
}
export default getPermission;