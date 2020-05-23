import React from 'react';
import { inject, observer } from 'mobx-react';
import { StyleSheet, Image, View, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';

import css from '../../theme/css';
import { LoadingIndicator, person } from '../../theme/icons';

export const Login = inject('loginStore')(observer(
  ({loginStore:{isLoading, login, loginInputValue, passInputValue, setInputLogin, setInputPass}, navigation}) => {

    const passwordInput = React.useRef(null);
    return (
      <KeyboardAvoidingView behavior="padding" style={style.container}>
        <Image style={style.logo} source={require('./Bilego-logo-slogan_inverted.png')} />
        <View style={style.view}>
          <StatusBar barStyle="light-content"/>
          <Input
            placeholder='email'
            returnKeyType="next"
            onSubmitEditing={() => passwordInput.current.focus()}
            onChangeText={text => setInputLogin(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={style.input}
            value={loginInputValue}
            textStyle={style.fontFamily}
          />
          <Input
            placeholder="пароль"
            returnKeyType="go"
            onChangeText={text => setInputPass(text)}
            secureTextEntry
            style={style.input}
            ref={passwordInput}
            value={passInputValue}
            textStyle={style.fontFamily}
          />
          <TouchableOpacity>
            <Button
              style={style.button}
              onPress={() => login(navigation)}
              accessoryLeft={isLoading ? LoadingIndicator : person}
            >
              <Text style={style.text}>ВОЙТИ</Text>
            </Button>
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
    height: 89,
    marginBottom: css.sizes.xxxl,
  },
  button: {
    marginTop: css.sizes.base
  },
  fontFamily: {
    fontFamily: 'din-pro',
    fontSize: 18
  },
  text: {
    fontFamily: 'din-pro-bold',
  },
});
