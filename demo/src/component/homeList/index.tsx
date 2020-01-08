import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Data, State } from './index.interface';
import Cell from '../cell/cell';

export default class List extends React.Component<Data, State> {
  refreshing: any;
  constructor(props: Data) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }
  _renderItem() {
    return <Cell name="123213" />;
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000);
  };
  render() {
    return (
      <View>
        <View style={{ shadowColor: '#888', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.8, shadowRadius: 6, elevation: 10, borderTopColor: '#fff', borderTopWidth: 0.5 }}></View>
        <FlatList
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}
          data={['1', '2', '3']}
          extraData={this.state}
          keyExtractor={(item: any, index: any) => item}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}
