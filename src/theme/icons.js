import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Spinner } from '@ui-kitten/components';

export const person = p => <Icon name="person-outline" {...p} />;

export const LoadingIndicator = (p) => (
  <View style={[p.style, style.indicator]}>
    <Spinner status="control" size='small'/>
  </View>
);

const style = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
