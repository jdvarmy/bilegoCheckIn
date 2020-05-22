import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const MainScreen = (props) => {
  return (
    <Layout style={style.center}>
      <Text>Main Screen</Text>
      <Button onPress={() => props.navigation.navigate('Login')}>Login</Button>
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
