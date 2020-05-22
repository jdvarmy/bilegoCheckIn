import React from 'react';
import { Button, Input } from '@ui-kitten/components';
import { StyleSheet, Image, View, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { inject, observer } from 'mobx-react';

import css from '../../theme/css';

export const Login = inject('loginStore')(observer(
  ({loginStore:{isLogin, login}, navigation}) => {
    if(isLogin){
      navigation.replace('Home')
    }

    const passwordInput = React.useRef(null);
    return (
      <KeyboardAvoidingView behavior="padding" style={style.container}>
        <Image style={style.logo} source={require('./Bilego-logo_inverted.png')} />
        <View style={style.view}>
          <StatusBar barStyle="light-content"/>
          <Input
            placeholder='Логин'
            returnKeyType="next"
            onSubmitEditing={() => passwordInput.current.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={style.input}
          />
          <Input
            placeholder="Пароль"
            returnKeyType="go"
            secureTextEntry
            style={style.input}
            ref={passwordInput}
          />
          <TouchableOpacity>
            <Button style={style.button} onPress={() => login()}>ВОЙТИ</Button>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }));

const style = StyleSheet.create({
  container: {
    padding: css.sizes.lg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  view: {
    width: '100%'
  },
  input: {
    marginBottom: css.sizes.base,
  },
  logo: {
    width: 255,
    height: 62,
    marginBottom: css.sizes.md,
  },
  button: {
    marginTop: css.sizes.base
  }
});
