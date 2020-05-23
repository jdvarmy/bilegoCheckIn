import * as Font from 'expo-font';
import { Image } from 'react-native';
import { Asset } from 'expo-asset';

export default async function _loadAssetsAsync(){

  const imageAssets = cacheImages([
    'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    require('../components/Login/Bilego-logo-slogan_inverted.png'),
  ]);

  const fontAssets = cacheFonts([
    {
      'din-pro': require('../../assets/fonts/DINPro.ttf'),
      'din-pro-light': require('../../assets/fonts/DINPro-Light.ttf'),
      'din-pro-bold': require('../../assets/fonts/DINPro-Bold.ttf'),
    }
  ]);

  await Promise.all([...imageAssets, ...fontAssets]);
}

const cacheImages = (images) => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}
