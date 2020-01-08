import React from 'react';
import { Text, View } from 'react-native';
import { Data } from './cell-interface';

export default class Cell extends React.Component<Data> {
  constructor(props: Data) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          height: size(50),
          width: size(375),
          borderBottomWidth: size(0.5),
          borderColor: '#e3e3e3',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>{this.props.name}</Text>
      </View>
    );
  }
}
