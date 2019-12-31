import React from 'react'

import {
  SafeAreaView,
  Text,
  Button
} from 'react-native'

import styles from '../helloWorld/index.style'

export default ({
  navigation
}) => (
  <SafeAreaView style={ styles.flexContainer }>
    <Text style={ styles.flexText }>Login</Text>
    <Button title='回到首页' onPress={ () => navigation.navigate('AppNavigator') }/>
  </SafeAreaView>
)