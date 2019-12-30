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
