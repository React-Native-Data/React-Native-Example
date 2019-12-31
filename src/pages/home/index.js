import React, {
  useCallback
} from 'react'

import {
  SafeAreaView,
  Text,
  Button
} from 'react-native'

import styles from '../helloWorld/index.style'

const Home = ({
  navigation
}) => {

  const navigationTo = useCallback((payload) => {
    navigation.navigate(payload)
  }, [])

  return (
    <SafeAreaView style={ styles.flexContainer }>
      <Text style={ styles.flexText }>Home</Text>
      <Button onPress={ () => navigationTo('User') } title='go to user' />
      <Button onPress={ () => navigationTo('HelloWorld') } title='go to helloworld' />
      <Button onPress={ () => navigationTo('LoginNavigator') } title='go to login' />
      <Button onPress={ () => navigation.openDrawer() } title='打开抽屉' />
    </SafeAreaView>
  )
}

// class Home extends React.Component {
//   static navigationOptions = {
//     title: '这是一个标题'
//   }

//   navigationTo = () => {
//     this.props.navigation.navigate('User')
//   }

//   render() {
//     return (
//       <SafeAreaView style={ styles.flexContainer }>
//         <Text style={ styles.flexText }>Home</Text>
//         <Button onPress={ this.navigationTo.bind(this) } title='go to user' />
//       </SafeAreaView>
//     )
    
//   }
// }

export default Home
