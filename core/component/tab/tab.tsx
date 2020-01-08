/*
 * @Date: 2020-01-07 17:38:24
 * @LastEditTime : 2020-01-08 12:07:33
 * @Description: 自定义tab切换
 */

import React from 'react';
import { View, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { Props, State } from './tab.interface';
import utils from '../../utils';

export default class Tab extends React.Component<Props, State> {
  springValue!: Animated.Value;
  allowChange: boolean = true;
  /** 初始化props */
  static defaultProps = {
    tabs: [],
    goToPage: () => {},
    activeTab: 0,
    scrollValue: Animated.Value,
    move: 0,
  };

  constructor(props: Props) {
    super(props);
    console.log(props);
    this.springValue = new Animated.Value(1);
  }

  shouldComponentUpdate = (nextProps: any, nextState: any) => {
    let status = this.change(nextProps, nextState);
    if (status) return status;
    if (this.props.activeTab === nextProps.activeTab) return false;
    this.set();
    // console.log('this.props.move', this.props.move / 0, this.props.activeTab, nextProps.activeTab, this.state);
    return true;
  };

  async componentDidUpdate() {
    // console.log('componentDidUpdate...', this.props);
  }

  componentWillUnmount() {}

  /** change Tab Animated */
  change(nextProps: any, nextState: any) {
    console.log('allowChange', this.allowChange);
    if (!this.allowChange) return false;
    // console.log(nextProps, nextProps.change, this.props.change);
    if (Math.abs(nextProps.move) >= 0.5 && nextProps.change === true && this.props.change === false) {
      this.springValue.setValue(1);
      Animated.timing(
        // 随时间变化而执行动画
        this.springValue, // 动画中的变量值
        {
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
          toValue: 0.6, // 透明度最终变为1，即完全不透明
          duration: 150, // 让动画持续一段时间
        },
      ).start();
      return true;
    } else if (nextProps.change === false && this.props.change === true) {
      this.springValue.setValue(1);
      return true;
    }
    return false;
  }

  /** set Animated */
  async set() {
    await this.springValue.setValue(0.7);
    Animated.timing(
      // 随时间变化而执行动画
      this.springValue, // 动画中的变量值
      {
        useNativeDriver: true,
        easing: Easing.inOut(Easing.sin),
        toValue: 1, // 透明度最终变为1，即完全不透明
        duration: 150, // 让动画持续一段时间
      },
    ).start(() => {
      this.allowChange = true;
    });
  }

  /** line */
  _renderUnderline() {
    const containerWidth: any = size(160);
    const numberOfTabs = this.props.tabs.length;
    const scale = this.props.tabUnderlineScaleX ? this.props.tabUnderlineScaleX : 3;
    const deLen = containerWidth / numberOfTabs / 1.75;

    const tabUnderlineStyle = {
      position: 'absolute',
      width: size(10),
      height: 4,
      borderRadius: 2,
      backgroundColor: this.props.activeColor,
      bottom: size(5),
      left: deLen,
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    });

    const scaleValue = (defaultScale: number) => {
      let arr = new Array(numberOfTabs * 2);
      return arr.fill(0).reduce(
        function(pre, cur, idx) {
          idx == 0 ? pre.inputRange.push(cur) : pre.inputRange.push(pre.inputRange[idx - 1] + 0.5);
          idx % 2 ? pre.outputRange.push(defaultScale) : pre.outputRange.push(1);
          return pre;
        },
        { inputRange: [], outputRange: [] },
      );
    };

    const scaleX = this.props.scrollValue.interpolate(scaleValue(scale));

    return (
      <Animated.View
        style={[
          tabUnderlineStyle,
          {
            transform: [{ translateX }, { scaleX }],
          },
        ]}
      />
    );
  }

  /** tab */
  _renderTab(tab: React.ReactNode, i: number, isTabActive: boolean) {
    return (
      <TouchableOpacity onPress={utils.throttle(() => this.handler(i, isTabActive), 100)} key={i} style={styles.tab}>
        <Animated.Text style={{ ...styles.tabText, fontWeight: isTabActive ? '500' : '400', transform: [{ scale: isTabActive ? this.springValue : new Animated.Value(0.6) }, { translateY: -5 }] }}>{tab}</Animated.Text>
      </TouchableOpacity>
    );
  }

  /** onPress tab */
  handler(i: number, isTabActive: boolean) {
    console.log('---------', isTabActive);
    if (isTabActive) return false;
    this.allowChange = false;
    this.props.goToPage(i);
  }

  render() {
    return (
      <View style={[styles.flex]}>
        {this.props.tabs.map((tab: React.ReactNode, i: number) => {
          const isTabActive = this.props.activeTab === i;
          return this._renderTab(tab, i, isTabActive);
        })}
        {this._renderUnderline()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    width: size(160),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tab: {
    width: size(160 / 3),
    paddingTop: size(10),
    paddingBottom: size(10),
    paddingLeft: size(10),
  },
  tabText: {
    width: size(160 / 3),
    fontSize: size(24),
    color: '#333333',
  },
});
