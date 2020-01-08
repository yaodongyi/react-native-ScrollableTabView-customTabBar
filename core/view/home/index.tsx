import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Props, State } from './home';
import ScrollableTabView, { ChangeTabProperties } from 'react-native-scrollable-tab-view';
import Cell from '../../component/cell/cell';
import Tab from '../../component/tab/tab';
import utils from '../../utils';
export default class HomeScreen extends React.Component<Props, State> {
  // 初始化state
  state: State = {
    curTab: 0,
    move: 0,
    change: false,
  };

  constructor(props: Props) {
    super(props);
  }

  /** 更新 当前tab位置 */
  onChangeTab = (val: ChangeTabProperties): void => {
    this.setState({ curTab: val.i });
  };

  /** 传递移动位置，是否需要改变tab位置 */
  onScroll = utils.throttle((val: any) => {
    let move = val[0].toFixed(2) - this.state.curTab;
    this.setState({ move: move, change: Math.abs(move) > 0.5 });
    // console.log('0-----------------onScroll---------------', move, this.state.change);
  }, 100);

  render() {
    // console.log('navigator', this.props.navigation);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollableTabView
          onChangeTab={this.onChangeTab}
          onScroll={this.onScroll}
          renderTabBar={() => (
            <Tab
              {...this.props}
              move={this.state.move}
              change={this.state.change}
              backgroundColor={'#f4f4f4'}
              tabUnderlineDefaultWidth={20} // default containerWidth / (numberOfTabs * 4)
              tabUnderlineScaleX={3} // default 3
              activeColor={'rgba(255,210,30,1)'}
              inactiveColor={'#333'}
            />
          )}
        >
          <Cell tabLabel="动态" name="动态" />
          <Cell tabLabel="推荐" name="推荐" />
          <Cell tabLabel="话题" name="话题" />
        </ScrollableTabView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  font: {
    fontSize: size(30),
  },
});
