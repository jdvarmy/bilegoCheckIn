import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { inject, observer } from 'mobx-react';

import { MainScreen } from '../screens/MainScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ScanScreen } from '../screens/ScanScreen';
import { EventScreen } from '../screens/EventScreen';

const { Navigator, Screen } = createStackNavigator();

export const AppNavigator = inject('loginStore')(observer(
  ({loginStore:{isLogin}}) => {

    return <NavigationContainer>
      <Navigator headerMode='none'>
        {!isLogin && <Screen name='Login' component={LoginScreen}/>}
        <Screen name='Home' component={MainScreen}/>
        <Screen name='Scanner' component={ScanScreen}/>
        <Screen name='Event' component={EventScreen}/>
      </Navigator>
    </NavigationContainer>
  }));
