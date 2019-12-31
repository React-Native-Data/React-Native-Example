import React from 'react'

import {
  SafeAreaView,
  Text
} from 'react-native'

import styles from './index.style'

const HelloWorld = () => (
  <SafeAreaView style={ styles.flexContainer }>
    <Text style={ styles.flexText }>Hello World</Text>
  </SafeAreaView>
)

HelloWorld.navigationOptions = {
  title: 'HelloWorld'
}

export default HelloWorld