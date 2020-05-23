import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { inject, observer } from 'mobx-react';

import { MainScreen } from '../screens/MainScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ScanScreen } from '../screens/ScanScreen';
import { EventScreen } from '../screens/EventScreen';
import { LoadingScreen } from '../screens/LoadingScreen';

const { Navigator, Screen } = createStackNavigator();

export const AppNavigator = inject('loginStore')(observer(
  ({loginStore:{token}}) => {

    return <NavigationContainer>
      <Navigator headerMode="none">
        {!token ? <Screen name="Login" component={LoginScreen}/> : <Screen name="Loading" component={LoadingScreen}/>}
        <Screen name="Home" component={MainScreen}/>
        <Screen name="Scanner" component={ScanScreen}/>
        <Screen name="Event" component={EventScreen}/>
        {token && <Screen name="Login" component={LoginScreen}/>}
      </Navigator>
    </NavigationContainer>
  }));
