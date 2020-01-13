# 《React-Native 从入门到放弃》 \(一\) ———— 初始篇

### 前言

写这个系列文章的契机是由于我前期接触了一个混合开发的项目，当时有考虑`RN`和`flutter`, 但是迫于当时的一个项目周期以及对语言的熟练度，当时选择了前者。 在使用过程中也有碰到一些困惑和问题，希望在这里记录下来，也可以为后来准备使用这个框架的小伙伴铺垫一下，让你们少走一些弯路~

> 声明: 本系列是不定时更新，而且会分为教程、插件、常见错误集等等~

### 环境安装及配置

其实很多小伙伴在接触`RN`的时候，都会因为它的环境配置而被劝退。 相比`flutter`来说， `RN`的环境配置要相对负责一些。好在官网现在的环境配置还是很详细的，我这里只对一些问题做一下单独的说明，并不会全盘抄写，大家还是要自行移步到`RN`的官网。\`RN官网配置教程\`\[1\]

* 个人比较推荐使用`Mac`来进行开发，`windows`系统无法安装`Xcode`导致无法调试`IOS`终端，当然`Expo`开发用户可以当我没说~
* 第二个建议: 不推荐使用国内一些改变源的形式来安装部分三方依赖，作为一个 coder，科学上网大家应该都是可以的~ 在科学上网的环境下，其实一些依赖还是很方便就可以下载下来的。
* 作为最大的一个坎，个人认为失败率也比较高的，可能就是`Android`里的`Gradle`和`IOS`的`CocoaPods`。 他们都作为类似于我们`npm`的一个存在来管理我们安卓和`IOS`的一些三方包\(当然他们的作用不止于此，但是我用到的也就这些，如果有说错的，请不要喷我，憋回去。\)， 这当中安装`CocoaPods`的时候一定要保证有一个稳定的科学上网环境。 否则失败率高到让你绝望。
* 由于安卓的执行环境是需要`java`来加持的，所以在安装步骤中`jdk`也是必要安装的。 官网中推荐使用`homebrew`来安装`brew cask install adoptopenjdk8`, 但是就我个人而言，我环境个人觉得很稳定，但是这个真的是失败率很高，所以我推荐去`java`的官网去下载安装包来手动安装，效果是一样的，附赠传送门\[2\]。
* 在首次使用`npx react-native init yourproject`的时候，`cli`会根据你当时的环境给你一些提示， 比如你使用的是`MacOS`，那么在初始化完毕之后，会检测你是否安装`CocoaPods`并给出对应的提示，若未安装这过程中会有一段时间你的`shell`会没有进度提示，这个时候不要着急，丢在一遍去看会动漫，煲会剧打会豆豆默默等他帮你安装完成即可~ 若时间过长还是没有动静，这个时候可以选择手动关闭，然后手动安装`CocoaPods`, 命令`sudo gem install cocoapods`。\(多嘴一句，这里推荐大家使用`0.60.x`的`rn-cli`的版本，因为个人使用`61`版本的时候`pods`经常出问题，会很头疼，当然没有问题的可以略过\)

以上为我个人在环境配置过程中遇到的一些问题，其他根据官网的教程进行安装和配置即可，只要拥有一个稳定的科学上网环境，基本一次性都可以安装成功。 如果碰到其他的问题，可以来我的\`issue\`\[3\]里提一下，大家一起解决。

> 如果以上均顺利完成的话，那么以`IOS`为例, 首次启动之后为以下的样子

![IOS &#x5B98;&#x65B9;demo](https://mmbiz.qpic.cn/mmbiz_png/ELZpPficmGibjgu1icoD0J3BN4nIPHFuMXaJWwibvhwTRWoKy6Lv6wSgDTa8vYeZVLrDlVQjbCWTia8vrCXEYja7HfQ/0?wx_fmt=png)

### `hello world`

嘛~ 老生常谈，我们就先建立我们第一个`hello world`  
 当然， 目录规划每个人都有自己的一套规则和习惯，这里我只是作为普遍的规划方式来创建目录格式~

* 根目录建立`src -> pages -> helloWorld -> index.js && index.style.js`

```text
# index.js
import React from 'react'

import {
  SafeAreaView,
  Text
} from 'react-native'

import styles from './index.style'

export default () => (
  <SafeAreaView style={ styles.flexContainer }>
    <Text style={ styles.flexText }>Hello World</Text>
  </SafeAreaView>
)
# 这里需要注意的是: rn里面的每个文本节点都必须使用Text组件来包裹起来

# index.style.js
import {
  StyleSheet
} from 'react-native'

export default StyleSheet.create({
  flexContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  flexText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
# 在rn中，我们基本上使用的都是flex布局。但不是所有的属性都支持，在文章的最下方我会放一个所有属性支持的网址，大家可以在做的过程中参考。我也会在后面单独针对样式来写一篇教程。
```

* 页面制作完毕之后我们需要让他呈现在我们的界面上，这时，我们找到根目录中的`index.js`这个入口文件，更改我们的入口参数。

```text
# index.js
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
+ import HelloWorld from './src/pages/helloWorld'
import {name as appName} from './app.json';

- AppRegistry.registerComponent(appName, () => App);
+ AppRegistry.registerComponent(appName, () => HelloWorld);
```

* 成品如下:  

![hello world](https://mmbiz.qpic.cn/mmbiz_png/ELZpPficmGibjgu1icoD0J3BN4nIPHFuMXaYDZJgazUXl3mrhRpmOq6BTGU44y7jYFibnoU1hhWIh1j9sFXgDia6oyA/0?wx_fmt=png)

### 让页面动起来

我们知道，我们的业务场景是需要多个页面来回切换来丰富我们的 APP 的, 这样都写在一个页面中当然是远远不够的，我们知道在`react`中我们可以使用`react-router`, 当然`react-native`也是可以使用这个库的，但是今天我们要使用的不是这个库，是官方推荐，也是大家用的最多的另一个路由管理的库——\`react-navigation\`\[4\]

* 首先安装`react-navigation`依赖

```text
yarn add react-navigation react-native-reanimated react-native-gesture-handler react-native-screens react-navigation-stack
```

* 安装之后, 进入`ios`文件夹，`link`三方依赖

```text
# ios
cd ios
pod install
```

```text
# android
## android -> app -> build.gradle
implementation 'androidx.appcompat:appcompat:1.1.0-rc01'
implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02'
## android -> app -> src -> main -> MainActivity.java
package com.reactnativeexample;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ReactNativeExample";
    }

+    @Override
+    protected ReactActivityDelegate createReactActivityDelegate() {
+        return new ReactActivityDelegate(this, getMainComponentName()) {
+            @Override
+            protected ReactRootView createRootView() {
+                return new RNGestureHandlerEnabledRootView(MainActivity.this);
+                }
+            };
+    }
}
```

![android gradle](https://mmbiz.qpic.cn/mmbiz_png/ELZpPficmGibjgu1icoD0J3BN4nIPHFuMXaoHbNz7kfZZvzu52dicUaobXHzjw7Hm0yv0vzhDL7njCmCl23GR6WzzA/0?wx_fmt=png)

![pod install](https://mmbiz.qpic.cn/mmbiz_png/ELZpPficmGibhibxepFOg9yq5hHBiaIMNricQslFud6yvDsaFkZQUwn3E5ib4uFxInEjjibhiciahEfosznrDBVafRbe9XA/0?wx_fmt=png)

* `yourproject -> src -> pages -> home`

```text
# index.js
import React, {
  useCallback
} from 'react'

import {
  SafeAreaView,
  Text,
  Button
} from 'react-native'

import styles from '../helloWorld/index.style'

export default ({
  navigation
}) => {

  const navigationTo = useCallback(() => {
    navigation.navigate('User')
  }, [])

  return (
    <SafeAreaView style={ styles.flexContainer }>
      <Text style={ styles.flexText }>Home</Text>
      <Button onPress={ navigationTo } title='go to user' />
    </SafeAreaView>
  )
}
```

* `yourproject -> src -> pages -> user`

```text
# index.js
import React from 'react'

import {
  SafeAreaView,
  Text
} from 'react-native'

import styles from '../helloWorld/index.style'

export default () => (
  <SafeAreaView style={ styles.flexContainer }>
    <Text style={ styles.flexText }>User</Text>
  </SafeAreaView>
)
```

* `yourproject -> src -> router.js`

```text
# router.js
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
```

* `yourproject -> index.js`

```text
/**
 * @format
 */
+ import 'react-native-gesture-handler'

import {AppRegistry} from 'react-native';
- import App from './App';
+ import AppContainer from './src/router'

import {name as appName} from './app.json';

+ AppRegistry.registerComponent(appName, () => AppContainer);
```

* 结果  

![with react-navigation](https://mmbiz.qpic.cn/mmbiz_gif/ELZpPficmGibhibxepFOg9yq5hHBiaIMNricQyuic3gz2uU6bVicIXlibrclXGSkudY0szib40OkeuTiawWic7juV9nVgexqw/0?wx_fmt=gif)

### 小结

有些小伙伴会说， 你巴拉巴拉的贴了代码但是啥也不说， 怎么能好好地使用这个`react-navigation`的库呢~  
 嘛~ 今天算是带大家初步的建立一个`RN`的架子，其实根据这个架子，再加上大家的开发经验，就可以进行`APP`的开发了。 当然， 我们还需要更多的路由配置, 更好的状态管理, 更好的资源管理, 优雅的网络请求, 三方库的使用等等~  


#### 参考资料

 \[1\]

`RN官网配置教程`: _http://facebook.github.io/react-native/docs/getting-started_ \[2\]

传送门: _https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html_ \[3\]

`issue`: _https://github.com/React-Native-Data/React-Native-Example/issues/1_ \[4\]

`react-navigation`: _https://reactnavigation.org/_

