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
