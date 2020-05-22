import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import { Login } from '../components/Login';

export const LoginScreen = (props) => {
  return (
    <Layout style={style.layout}>
      <Login {...props} />
    </Layout>
  )
};

const style = StyleSheet.create({
  layout: {
    flex: 1
  }
});
