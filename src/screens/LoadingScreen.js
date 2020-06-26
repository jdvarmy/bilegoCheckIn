import React from 'react';
import { inject } from 'mobx-react';
import { StyleSheet, Image, View } from 'react-native';

export const LoadingScreen = inject('loginStore')(
  ({ loginStore:{validate}, navigation }) => {
    validate(navigation);

    return (
      <View style={style.center}>
        <Image source={require('../../assets/splash.png')} style={style.image} />
      </View>
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
    justifyContent: 'center',
  },
});
