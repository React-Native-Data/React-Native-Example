import React, {
  useCallback
} from 'react'
import { connect } from '../../utils/dva'

import {
  SafeAreaView,
  Text,
  Button
} from 'react-native'

import {
  NavigationActions
} from '../../utils/dva'

import styles from '../helloWorld/index.style'

const Home = ({
  navigation,
  dispatch,
  count
}) => {
  const navigationTo = useCallback((payload) => {
    dispatch(NavigationActions.navigate({ routeName: payload }))
  }, [])

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

export default connect(state => ({
  count: state.counter.count
}))(Home)
