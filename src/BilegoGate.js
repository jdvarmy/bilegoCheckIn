import React from 'react';
import { AppLoading } from 'expo';
import * as eva from '@eva-design/eva';
import { inject, observer, Provider as MobxProvider } from 'mobx-react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import * as stores from './stores';
import { AppNavigator } from './navigation/AppNavigator';

import _loadAssetsAsync from './theme/_loadAssetsAsync';
import theme from './theme/theme.json';

const FrontUi = inject('appStore', 'loginStore')(observer(
  ({appStore:{isReady, setIsReady}, loginStore:{setUserData}}) => {
    if(!isReady){
      return (
        <AppLoading
          startAsync={ async () => { await _loadAssetsAsync(); await setUserData();}}
          onFinish={() => setIsReady(true)}
          onError={err => console.log(err)}
        />
      );
    }

    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
          <AppNavigator />
        </ApplicationProvider>
      </>
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
