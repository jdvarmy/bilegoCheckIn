import React from 'react';
import { inject } from 'mobx-react';
import { Layout } from '@ui-kitten/components';
import { StyleSheet, Image } from 'react-native';

export const LoadingScreen = inject('loginStore')(
  ({ loginStore:{validate}, navigation }) => {
    validate(navigation);

    return (
      <Layout style={style.center}>
        <Image source={require('../../assets/super-hero.png')} style={style.image} />
      </Layout>
    )
  });

const style = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center'
  },
});
