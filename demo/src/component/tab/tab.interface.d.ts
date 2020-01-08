/*
 * @Date: 2020-01-06 16:43:41
 * @LastEditTime : 2020-01-08 11:34:39
 * @Description: custom tabBar interface
 */
import { Animated } from 'react-native';
export interface Props {
  /** TabBarProps */
  goToPage: (pageNumber: number) => void;
  tabs: JSX.Element[];
  activeTab: number;
  scrollValue: Animated.Value;
  /** TabBarProps end */
  /** customProps */
  containerWidth?: number;
  backgroundColor: string;
  tabUnderlineDefaultWidth: number; // default containerWidth / (numberOfTabs * 4)
  tabUnderlineScaleX: number; // default 3
  activeColor: string;
  inactiveColor: string;
  move: number;
  change: boolean;
}

export interface State {}
