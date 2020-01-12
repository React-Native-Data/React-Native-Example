import React from 'react'
import {
  connect,
  Provider
} from 'react-redux'
import {
  create
} from 'dva-core'

export {
  NavigationActions,
  SwitchActions,
  StackActions,
  DrawerActions
} from 'react-navigation'


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
