import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

import theme from './theme/theme.json';

export default () => (
  <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category='h1'>HOME</Text>
    </Layout>
  </ApplicationProvider>
);
