import React from 'react';
import { AppLoading } from 'expo';
import * as eva from '@eva-design/eva';
import {inject, observer, Provider as MobxProvider} from 'mobx-react';
import { ApplicationProvider } from '@ui-kitten/components';

import * as stores from './stores';
import { AppNavigator } from './navigation/AppNavigator';

import fonts from './theme/fonts';
import theme from './theme/theme.json';

const FrontUi = inject('appStore')(observer(
  ({appStore:{isReady, setIsReady}}) => {
    if(!isReady){
      return (
        <AppLoading
          startAsync={fonts}
          onFinish={() => setIsReady(true)}
          onError={err => console.log(err)}
        />
      );
    }

    return (
      <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
        <AppNavigator />
      </ApplicationProvider>
    )
  }
));

export default function BilegoGate(){
  return(
    <MobxProvider {...stores}>
      <FrontUi />
    </MobxProvider>
  );
}
