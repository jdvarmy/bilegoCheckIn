import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import {inject, observer} from "mobx-react";

export const MainScreen = inject('loginStore')(observer(
  ({navigation}) => {
    const handlerPress = () => {
      navigation.navigate('Scanner');
    };

  return (
    <Layout style={style.center}>
      <Button onPress={handlerPress}>Start scanning</Button>
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
