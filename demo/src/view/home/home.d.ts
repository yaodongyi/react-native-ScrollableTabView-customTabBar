import { NavigationNavigator } from 'react-navigation';

/*
 * @Date: 2020-01-06 15:42:10
 * @LastEditTime : 2020-01-08 11:30:56
 */
export interface Props {
  navigation: NavigationNavigator;
}

export interface State {
  curTab: number /** 当前tab位置 */;
  move: number /** 位移位置 */;
  change: boolean /** 是否需要切换tab */;
}
