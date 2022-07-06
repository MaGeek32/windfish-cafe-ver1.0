//A page show home page.

import { StatusBar } from 'expo-status-bar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import StoryList from './StoryList'
import Characters from './Characters'
import { GlobalStyles } from '../constants/styles'
import { Ionicons } from '@expo/vector-icons'
import IconButton from '../components/UI/IconButton'
import TimelineScreen from './TimelineScreen'
import Editor from './Editor'
import StoriesContextProvider from '../store/stories-context'
import Character from './Character'

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

function StoriesOverview () {

  //Set bottom tabs
  return (<BottomTabs.Navigator screenOptions={({ navigation }) => ({
    headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    headerTintColor: 'white',
    tabBarStyle: {
      backgroundColor: GlobalStyles.colors.primary500,
    },
    //Set editor icon in right corner
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight: ({ tintColor }) => <IconButton
      icon="cafe-outline"
      size={24}
      color={tintColor}
      onPress={() => {
        navigation.navigate('Editor')
      }} />,

    // headerLeft: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor}
    //   onPress={() => {
    //     navigation.navigate('RichEditorScreen')
    //   }} />
  })}>

    <BottomTabs.Screen
      //Set Storylist 
      name='Windfish Café'
      component={StoryList}
      options={{
        titile: 'StoryList',
        tabBarLabel: 'StoryList',
        tabBarActiveTintColor: GlobalStyles.colors.primary600,
        tabBarInactiveTintColor: GlobalStyles.colors.primary700,
        tabBarOptions: {
          activeTintColor: '#000',
          inactiveTintColor: '#fff',

        },

        tabBarIcon: ({ color, size }) => (
          <Ionicons name="albums-outline"
            size={size}
            color={color}

          />
        )
      }}
    />
    <BottomTabs.Screen
      //Set Characters
      name='Characters'
      component={Characters}
      options={{
        titile: 'Characters',
        tabBarActiveTintColor: GlobalStyles.colors.primary600,
        tabBarInactiveTintColor: GlobalStyles.colors.primary700,
        tabBarLabel: 'Characters',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="happy-outline" size={size} color={color} />
        )
      }}
    />

    <BottomTabs.Screen
      //Set Timeline
      name='Timeline'
      component={TimelineScreen}
      options={{
        titile: 'Timeline',
        tabBarLabel: 'Timeline',
        tabBarActiveTintColor: GlobalStyles.colors.primary600,
        tabBarInactiveTintColor: GlobalStyles.colors.primary700,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="analytics-outline" size={size} color={color} />
        )
      }}
    />


    {/* //A test screen 
    <BottomTabs.Screen
      name='Test'
      component={Test}
      options={{
        titile: 'Test',
        tabBarLabel: 'Test',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="analytics-outline" size={size} color={color} />
        )
      }}
    /> */}

  </BottomTabs.Navigator>
  )
}

export default function Home () {
  return (
    <>
      <StatusBar
        //Set status bar
        style="light"
        backgroundColor='#54BAB9'
      />
      <StoriesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            //Set whole page background
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
            }}>
            <Stack.Screen
              name="StoriesOverview"
              component={StoriesOverview}
              options={{ headerShown: false }} />
            <Stack.Screen
              name="Character"
              component={Character}
              options={{ presentation: 'modal', }} />
            <Stack.Screen
              name="Editor"
              component={Editor}
              options={{
                presentation: 'modal',
              }} />

          </Stack.Navigator>
        </NavigationContainer>
      </StoriesContextProvider>
    </>
  )
}

