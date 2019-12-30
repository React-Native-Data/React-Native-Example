import React, {
  useCallback
} from 'react'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from './pages/home'
import UserScreen from './pages/user'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    User: {
      screen: UserScreen
    }
  },
  {
    initialRouteName: 'Home'
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default () => {

  const onNavigationStateChange = useCallback((prevState, newState, action) => {
    console.log(prevState, newState, action)
  }, [])

  return <AppContainer 
            onNavigationStateChange={ onNavigationStateChange }
          />
}