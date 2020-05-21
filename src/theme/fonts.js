import * as Font from 'expo-font';

export default async function fonts(){
  await Font.loadAsync({
    'din-pro': require('../../assets/fonts/DINPro.ttf'),
    'din-pro-light': require('../../assets/fonts/DINPro-Light.ttf'),
    'din-pro-bold': require('../../assets/fonts/DINPro-Bold.ttf'),
  })
}
