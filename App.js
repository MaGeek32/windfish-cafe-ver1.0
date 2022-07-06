//Splash page first, then go to homepage
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from './screens/SplashScreen'
import { hideNavigationBar } from 'react-native-navigation-bar-color'

export default function App () {
  return (
    <SafeAreaProvider>
      <SplashScreen></SplashScreen>
    </SafeAreaProvider>
  )
}

hideNavigationBar()

