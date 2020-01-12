/**
 * @format
 */
import 'react-native-gesture-handler'

import {AppRegistry} from 'react-native';
import App from './App';
// import AppContainer from './src/router'
import AppContainer from './src'

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppContainer);
