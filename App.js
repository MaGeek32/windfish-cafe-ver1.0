import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from './screens/SplashScreen'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { hideNavigationBar } from 'react-native-navigation-bar-color'




export default function App () {
  return (
    <SafeAreaProvider>
      <SplashScreen></SplashScreen>
    </SafeAreaProvider>
  )
}

hideNavigationBar()





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
