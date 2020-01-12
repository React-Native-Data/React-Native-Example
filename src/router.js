import React, {
  useCallback
} from 'react'

import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'
import { connect } from './utils/dva'

import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Easing,
  Animated
} from 'react-native'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import {
  createBottomTabNavigator
} from 'react-navigation-tabs'

import {
  Transition
} from 'react-native-reanimated'


import Icon from 'react-native-vector-icons/Entypo'


import HomeScreen from './pages/home'
import UserScreen from './pages/user'
import HelloWorld from './pages/helloWorld'
import Login from './pages/login'

const BottomNavigator = createBottomTabNavigator(
  {
    HomeTab: {
      screen: HomeScreen,
    },
    UserTab: {
      screen: UserScreen
    }
  },
  {
    defaultNavigationOptions({ navigation }) {
      const tabBarIcon = (options) => {
        const { focused, tintColor } = options
        console.log('icon', options)
        const {
          state: {
            routeName = ''
          } = {}
        } = navigation
        return <Icon 
                  color={ tintColor }
                  name={ routeName === 'HomeTab' ? 'tree' : 'users' }
                  size={ 24 }
              />
      }
      return {
        tabBarIcon
      }
    },
    tabBarOptions: { // tabbar的一些配置
      activeTintColor: 'purple', 
      inactiveTintColor: 'red',
      showLabel: false, // 是否展示routeName
    },
    /**
     * tabBarComponent: RE // 自定义Tabbar
     */
  }
)

const LoginNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    }
  },
  {
    mode: 'modal'
  }
)

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions({ navigation }) {
        return {
          headerShown: false,
          headerBackTitle: '回到Home'
        }
      }
    },
    User: {
      screen: UserScreen
    },
    HelloWorld: {
      screen: HelloWorld
    }
  },
  {
    initialRouteName: 'Home',
    mode: 'modal', // 默认为card(即默认使用两端独有的页面切换方式), modal的方式则为从底部弹出的页面切换方式
    headerMode: 'screen', // 如何渲染header, 默认mode为card=>float, modal => screen, 若不需要header写为none即可
    headerLayoutPreset: 'center', // android默认为left, 消除差异则全部统一为center
    cardOverlayEnabled: true,
    transitionConfig: () => ({ // 自定义页面切换效果，并合并至当前的切换效果中
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),

    defaultNavigationOptions: {
      title: 'React-Native',
      headerTintColor: '#FFFFFF',
      headerLeft(options) {
        const {
          title = '',
          onPress = void(0),
          titleStyle = {},
          tintColor = '#000000',
          backImage = null
        } = options
        const extStyle = {
          color: tintColor
        }
        return (
          <TouchableOpacity
            onPress={ onPress }
          >
            <View style={ { flex: 1, alignItems: 'center', flexDirection: 'row' } }>
              <Image source={ backImage || require('./img/backblack.png') } style={ { width: 32, height: 32 } }/>
              <Text style={ [ titleStyle, extStyle ] }>{ title }</Text>
            </View>
          </TouchableOpacity>
        )
      },
      headerRight() {
        return <Text style={ { color: '#FFFFFF' } }>customer right</Text>
      },
      headerRightContainerStyle: {
        paddingRight: 12
      },
      headerStyle: { backgroundColor: '#1890ff' }
    }
  }
)

const SwitchNavigator = createAnimatedSwitchNavigator(
  {
    AppNavigator,
    LoginNavigator
  },
  {
    initialRouteName: 'AppNavigator',
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-top"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="slide-bottom" durationMs={500}/>
      </Transition.Together>
    ),
  }
)

const AppContainer = createAppContainer(
  createDrawerNavigator(
    {
      BottomNavigator,
      SwitchNavigator
    },
    {
      drawerType: 'slide', // 滑动时背景页面的行为方式
      drawerPosition: 'right', // 抽屉的位置，默认为left
      drawerBackgroundColor: '#000000F6', // 抽屉背景色
      contentOptions: { // 设置抽屉内的每个条目样式
        activeTintColor: '#fffccd', 
        inactiveTintColor: '#f67676'
      }
    }
  )
)

export const AppContainerReducer = createNavigationReducer(AppContainer)
export const AppContainerRouterMiddleWare = createReactNavigationReduxMiddleware(state => state.router)
const App = createReduxContainer(AppContainer)

const Router = ({
  dispatch,
  router
}) => {

  return <App 
            dispatch={ dispatch }
            state={ router }
          />
}

export default connect(state => ({ router: state.router }))(Router)