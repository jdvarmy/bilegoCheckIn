import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { inject, observer } from 'mobx-react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { arrowheadLeft } from '../theme/icons';

export const ScanScreen = inject('scannerStore', 'loginStore')(observer(
  ({ scannerStore:{error, scanned, setScanned, hasPermission, setHasPermission, ticketCheck, qrCurrent, qrStatus}, loginStore:{user}, navigation }) => {
    const handlerPressBack = () => {
      navigation.goBack();
    };

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
      return <Layout style={style.center}>
        <Text category="h1" style={style.textBold}>Запрашиваем доступ к камере</Text>
        <Text category="s1" style={style.text}>Будем сканировать билетики?</Text>
      </Layout>;
    }
    if (hasPermission === false) {
      return <Layout style={style.center}>
        <Text category="h1" style={{...style.textBold, color: '#f6255a'}}>Нет доступа к камере</Text>
        <Icon
          style={style.icon}
          fill='#f6255a'
          name='alert-triangle-outline'
        />
      </Layout>;
    }

    const colors = {
      basic: [
        ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)'],
        ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.3)'],
        ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.6)']
      ],
      alert: [
        ['rgba(239,86,126,0.2)', 'rgba(246,37,90,0.2)'],
        ['rgba(239,86,126,0.5)', 'rgba(246,37,90,0.5)'],
        ['rgba(239,86,126,0.8)', 'rgba(246,37,90,0.8)']
      ],
      success: [
        ['rgba(94,191,82,0.2)', 'rgba(68,191,32,0.2)'],
        ['rgba(94,191,82,0.5)', 'rgba(68,191,32,0.5)'],
        ['rgba(94,191,82,0.8)', 'rgba(68,191,32,0.8)']
      ]
    };

    const content = <>
      {qrCurrent.already_scan === true && <Text style={{...style.textBold, color:'#f6255a', paddingTop:0}} category="h6">Этот билет уже зарегистрирован</Text>}
      <Text style={{...style.text,marginBottom:16}} category="h6">{qrCurrent.event}</Text>
      {!qrCurrent.seat && <View style={{alignItems:'center'}}>
        <Text style={{...style.text, ...style.ticket}} category="h5">{qrCurrent.name}</Text>
      </View>}
      {qrCurrent.seat &&
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View style={{alignItems:'center'}}>
          <Text style={style.s1} category="s1">Сектор</Text>
          <Text category="h6" style={style.ticket}>{qrCurrent.sector}</Text>
        </View>
        <View style={{alignItems:'center'}}>
          <Text style={style.s1} category="s1">Ряд</Text>
          <Text category="h6" style={style.ticket}>{qrCurrent.row}</Text>
        </View>
        <View style={{alignItems:'center'}}>
          <Text style={style.s1} category="s1">Место</Text>
          <Text category="h6" style={style.ticket}>{qrCurrent.seat}</Text>
        </View>
      </View>
      }
      <Text style={{...style.text, marginTop:16}} category="c1">email покупателя: {qrCurrent.email}</Text>
    </>;

    return (
      <View style={{flex: 1}}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={style.center}>
          <ImageBackground source={require('../../assets/fotogr.png') }
                           style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundRepeat: 'no-repeat', resizeMode: 'cover'}}>
            <View style={style.camWrap}>
              <View style={{flex:1, flexDirection: 'row'}}>
                <View style={{flex:1, borderStyle: 'solid',borderRightWidth: 1,borderColor: 'rgba(0,0,0,0.18)'}}/>
                <View style={{flex:1}}/>
                <View style={{flex:1, borderStyle: 'solid',borderLeftWidth: 1,borderColor: 'rgba(0,0,0,0.18)'}}/>
              </View>
              <View style={{flex:1, flexDirection: 'row'}}>
                <View style={{flex:1, borderStyle: 'solid',borderTopWidth: 1, borderBottomWidth: 1,borderColor: 'rgba(0,0,0,0.18)'}}/>
                <View style={{flex:1, borderStyle: 'solid',borderWidth: 1,borderColor: 'rgba(0,0,0,0.18)'}}/>
                <View style={{flex:1, borderStyle: 'solid',borderTopWidth: 1, borderBottomWidth: 1,borderColor: 'rgba(0,0,0,0.18)'}}/>
              </View>
              <View style={{flex:1, flexDirection: 'row'}}>
                <View style={{flex:1, borderStyle: 'solid',borderRightWidth: 1,borderColor: 'rgba(0,0,0,0.18)'}}/>
                <View style={{flex:1}}/>
                <View style={{flex:1, borderStyle: 'solid',borderLeftWidth: 1,borderColor: 'rgba(0,0,0,0.18)'}}/>
              </View>
            </View>
          </ImageBackground>
        </View>
        <Layout style={{flex: 4, borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: 'hidden'}}>
          <View style={{flex: 1}}>
            <Button
              style={{width: 62, height: 62}}
              onPress={handlerPressBack}
              accessoryLeft={arrowheadLeft}
              appearance='ghost'
            />
            <View style={{flexDirection: 'row-reverse',justifyContent: 'center',marginRight: 10,marginLeft: 40}}>
                <View style={{...style.controlContainer, width: 136, height: 136}}>
                  <View style={{...style.controlContainer, width: 110, height: 110}}>
                    <LinearGradient colors={scanned === 1 ? colors.success[2] : scanned === -1 ? colors.alert : colors.basic} style={{ padding: 25}}>
                      <Button style={style.button} onPress={() => setScanned(0)} status={scanned === 1 ? 'success' : scanned === -1 ? 'primary' : 'basic'}/>
                    </LinearGradient>
                  </View>
              </View>
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                {qrStatus.slice().reverse().slice(0, 4).map( t =>
                  <Text style={{marginVertical:4}} category="h6" key={t.ticket_id}>
                  {t.seat ? `${t.sector} / ${t.row} / ${t.seat}` : t.name}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <ScrollView style={{flex:1,marginBottom: 34}}>
            <View>
            {
              error !== ''
              ? <Text style={{...style.textBold, color:'#f6255a'}} category="h4">{error.message}</Text>
              : qrCurrent
                ? content
                : <Text style={style.text} category="h2">Начните сканировать билеты и здесь появится информация</Text>
            }
            </View>
          </ScrollView>
        </Layout>
      </View>
    );
  }
));

const style = StyleSheet.create({
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    width: 84,
    height: 84,
    borderRadius: 200
  },
  controlContainer: {
    overflow: 'hidden',
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradient:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  ticket: {
    paddingHorizontal:16,
    paddingVertical:8,
    borderColor:'#f6255a',
    borderWidth:2,
    borderStyle:'solid',
    borderRadius: 4,
    fontFamily:'din-pro-bold'
  },
  s1: {
    fontFamily:'din-pro',
    marginBottom:4
  }
});
