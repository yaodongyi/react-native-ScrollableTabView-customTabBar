/*
 * @Date: 2020-01-06 11:17:47
 * @LastEditTime : 2020-01-06 11:46:41
 * @Description: 入口
 */
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
