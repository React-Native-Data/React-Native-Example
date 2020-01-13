# 《React-Native 从入门到放弃》 \(三\) ———— 状态管理篇

> 前面我们初步的搭起了一个 APP 的简单雏形，也让 APP 动了起来，但是作为一个 APP 在多页面之间进行数据传递是必然的，当然通过路由传参是一种形式，但是随着跨多个页面进行一些共享数据的时候，路由传参就变得不是那么灵活了，这个时候就要集中管理我们 APP 的状态了，耳熟能详的就是我们常用的`redux`。今天我们以`dva`为例来为我们的 APP 增加状态管理。

### `Dva-core`

> The core lightweight library for dva, based on redux and redux-saga.

#### 安装

```text
yarn add dva-core
# 注意的是dva-core里内置了redux-saga但是没有redux，我们需要自己手动安装react-redux
yarn add react-redux
yarn add redux
```

#### 使用`Dva-core`

> \`Dva-opts\`\[1\]

使用上和简单的`dva`使用没有什么特别的不一样的地方，只有在使用`plugins`的时候需要注意一下。下面的例子里我会讲到。

**Dva实例**

> 一次挂载，后顾无忧, 要注意的是我们这里无需考虑`history`部分，无论你是用`react-router`还是用`react-navigation`来管理你的 APP 路由，都可以通过`Middlewares`的方式来进行集中管理。

```text
// src -> utils -> dva.js
import React from 'react'
import {
  connect,
  Provider
} from 'react-redux'
import {
  create
} from 'dva-core'


/**
 *
 * @param {*} options 详细options参数参考: https://dvajs.com/api/#api
 */
// 写法参考: https://github.com/dvajs/dva/blob/master/packages/dva/src/index.js
export const dva = (options) => {
  // 利用create来创造dva实例
  const $Dva = create(options)

  // 挂载modal
  if (options.models) {
    options.models.forEach(modal => $Dva.model(modal))
  }

  // 挂载plugins
  if (options.plugins) {
    options.plugins.forEach(plugin => $Dva.use(plugin))
  }

  // 启动应用(在dva里对start方法返回的实例做了一些插件方面的判断，我们这边不对相关的配置)
  $Dva.start()

  // 重新挂载start方法
  $Dva.start = start

  return $Dva

  function start(container) {
    const store = $Dva._store

    console.log('store', store)
    // 其实dva的源码里还对container的实例进行了很多判断，以及路由的挂载等等，我们这里默认container为一个jsx，不做过多的判断，如果业务需要可以参考多做判断
    return () => <Provider store={ store }>{ container }</Provider>
  }
}

export {
  connect,
  Provider
}

// src -> index.js
import React from 'react'

// models
import * as models from './pages/models'

// router
import Router from './router'

import {
  dva
} from './utils/dva'

const $$Dva = dva({
  initialState: {},
	models: Object.values(models),
	onError(e) {
		console.error('onError', e);
	}
})

const APP = $$Dva.start(<Router />)

export default APP

// youproject -> index.js
import 'react-native-gesture-handler'

import {AppRegistry} from 'react-native';
import App from './App';
// import AppContainer from './src/router'
import AppContainer from './src'

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppContainer);

// src -> pages -> home -> index.js
import React, {
  useCallback
} from 'react'
import { connect } from '../../utils/dva'

import {
  SafeAreaView,
  Text,
  Button
} from 'react-native'

import styles from '../helloWorld/index.style'

const Home = ({
  navigation,
  dispatch,
  count
}) => {
  ...

  const countAction = useCallback((type) => {
    let copyCount = count
    if (type === 'add') {
      copyCount = copyCount + 1
    } else {
      copyCount = copyCount - 1
    }
    dispatch({ type: 'counter/updateState', payload: { count: copyCount } })
  }, [ count ])

  return (
    <SafeAreaView style={ styles.flexContainer }>
      <Text style={ styles.flexText }>Home: count({ count })</Text>
      <Button title='+' onPress={ () => countAction('add') }/>
      <Button title='-' onPress={ () => countAction('reduce') }/>
      ...
    </SafeAreaView>
  )
}

export default connect(state => ({
  count: state.counter.count
}))(Home)
```

[connect dva demo](https://imgkr.cn-bj.ufileos.com/3ff394ef-7544-4dac-8cc9-e99c2fa2a121.gif)

![connect dva demo](https://imgkr.cn-bj.ufileos.com/3ff394ef-7544-4dac-8cc9-e99c2fa2a121.gif)

### `Manage Router State`

当页面数量增加的时候，我们需要通过`redux`来集中管理我们的路由。而`react-navigation`就为我们提供了一个很方便的库来协助我们管理。\(多嘴一句，这个库不是官方推荐的哈，但是广泛为大家使用。\)

#### 安装\`react-navigation-redux-helpers\`\[2\]

```text
yarn add react-navigation-redux-helpers
```

#### 使用

```text
// src -> router.js
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'
import { connect } from './utils/dva'
...
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
```

```text
// src -> index.js
import React from 'react'

// models
import * as models from './pages/models'

// router
import Router, {
  AppContainerRouterMiddleWare,
  AppContainerReducer
} from './router'

import {
  dva
} from './utils/dva'

const $$Dva = dva({
  initialState: {},
  models: Object.values(models),
  extraReducers: { router: AppContainerReducer },
	onError(e) {
		console.error('onError', e);
  },
  onAction: [ AppContainerRouterMiddleWare ]
})

const APP = $$Dva.start(<Router />)

export default APP
```

#### 页面中

在页面中，`react-navigation`为我们提供了多种\`actions\`\[3\]来配合我们使用`redux`。 使用过`thunk`的朋友们对这个方式一定不陌生。

```text
// src -> utils -> dva.js
export {
  NavigationActions,
  SwitchActions,
  StackActions,
  DrawerActions
} from 'react-navigation'
```

```text
// src -> pages -> home -> index.js
import {
  NavigationActions
} from '../../utils/dva'
...
const navigationTo = useCallback((payload) => {
    dispatch(NavigationActions.navigate({ routeName: payload }))
  }, [])
```

> 注: 我们主动变化页面栈的时候，需要配合`redux`和`actions`来达到效果，但如果是`react-navigation`给我们提供的本身就带有路由能力的组件时，中间件会为我们代劳一切。

[redux router dev](https://imgkr.cn-bj.ufileos.com/d772e729-9358-424d-969e-1c76540e79d1.gif)

![redux router dev](https://imgkr.cn-bj.ufileos.com/d772e729-9358-424d-969e-1c76540e79d1.gif)

> 注: 由于我今晚在微信公众平台上传图片素材一直 503 失败，所以本次文章的图片都采用了图壳来管理。望各位看官老爷切勿窃取我未加水印的图片，感谢~

以上就是对于状态方面的一些知识，当然你也可以直接使用`redux`而不去使用`Dva`。你可以配合`thunk`而不去使用`saga`。这都在于个人的开发习惯。更多的要配合自己的实际开发情况。下一篇我们会讲解关于我们 APP 的图标、启动屏以及版本号管理这些琐碎的配置，丰富我们完成一个完整的 APP。

#### 参考资料

 \[1\]

`Dva-opts`: _https://dvajs.com/api/\#app-dva-opts_ \[2\]

`react-navigation-redux-helpers`: _https://github.com/react-navigation/redux-helpers_ \[3\]

`actions`: _https://reactnavigation.org/docs/en/navigation-actions.html_

