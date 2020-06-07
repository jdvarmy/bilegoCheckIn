import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, ImageBackground } from 'react-native';
import { inject, observer } from 'mobx-react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Layout, Text, Icon } from '@ui-kitten/components';

const { width } = Dimensions.get('screen');

export const Scanner = inject('scannerStore', 'loginStore')(observer(
  ({ scannerStore:{hasPermission, setHasPermission, ticketCheck}, loginStore:{user} }) => {

    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
      let args = {};
      data.toString().split('&').map( couple => {
        const two = couple.split('=');
        args[two[0]] = two[1]
      });
      args.user = user;

      ticketCheck(args)
    };

    if (hasPermission === null) {
      return <Layout style={{...style.center, width: width}}>
        <Text category="h1" style={style.textBold}>Запрашиваем доступ к камере</Text>
        <Text category="s1" style={style.text}>Будем сканировать билетики?</Text>
      </Layout>;
    }
    if (hasPermission === false) {
      return <Layout style={{...style.center, width: width}}>
        <Text category="h1" style={{...style.textBold, color: '#f6255a'}}>Нет доступа к камере</Text>
        <Icon
          style={style.icon}
          fill='#f6255a'
          name='alert-triangle-outline'
        />
      </Layout>;
    }

    return (
      <View style={{...style.center, width: width}}>
        {/*<BarCodeScanner*/}
        {/*  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}*/}
        {/*  style={StyleSheet.absoluteFillObject}*/}
        {/*/>*/}
        <View style={style.center}>
          <ImageBackground source={require('../../../assets/fotogr.png') }
                           style={{...style.center, backgroundRepeat: 'no-repeat', resizeMode: 'cover'}}>
            <View style={style.camWrap}>
              <View style={style.row}>
                <View style={{...style.border, borderRightWidth: 1}}/>
                <View style={{flex:1}}/>
                <View style={{...style.border, borderLeftWidth: 1}}/>
              </View>
              <View style={style.row}>
                <View style={{...style.border, borderTopWidth: 1, borderBottomWidth: 1}}/>
                <View style={{...style.border, borderWidth: 1}}/>
                <View style={{...style.border, borderTopWidth: 1, borderBottomWidth: 1}}/>
              </View>
              <View style={style.row}>
                <View style={{...style.border, borderRightWidth: 1}}/>
                <View style={{flex:1}}/>
                <View style={{...style.border, borderLeftWidth: 1}}/>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
));

const style = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flex:1,
    flexDirection: 'row',
  },
  border: {
    flex:1,
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,0.18)',
  },
  textBold: {
    fontFamily: 'din-pro-bold',
    padding: 20,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'din-pro-bold',
    textAlign: 'center',
  },
  icon: {
    width: 62,
    height: 62,
  },
  camWrap: {
    width: Dimensions.get('screen').width * 0.6,
    height: Dimensions.get('screen').width * 0.6,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.28)',
    overflow: 'hidden',
    borderRadius: 60,
    alignSelf: 'flex-start'
  },
});
