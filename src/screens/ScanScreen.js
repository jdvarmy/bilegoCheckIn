import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const ScanScreen = () => {
  return (
    <Layout style={style.center}>
      <Text>Scan Screen</Text>
    </Layout>
  )
};

const style = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
