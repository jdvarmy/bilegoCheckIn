import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import {inject, observer} from "mobx-react";

export const MainScreen = inject('loginStore')(observer(
  ({loginStore}) => {
    const handlerPress = () => {
      console.log(loginStore)
    };

  return (
    <Layout style={style.center}>
      <Text>Main Screen</Text>
      <Button onPress={handlerPress}>Login</Button>
      <Button onPress={handlerPress}>Login</Button>
    </Layout>
  )
}));

const style = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
