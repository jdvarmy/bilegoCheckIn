import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import {inject} from "mobx-react";

export const LoadingScreen = inject('loginStore')(
  ({ loginStore:{validate}, navigation }) => {
    validate(navigation);

    return (
      <Layout style={style.center}>
        <Text>Loading</Text>
      </Layout>
    )
  });

const style = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
