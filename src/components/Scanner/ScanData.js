import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { inject, observer } from 'mobx-react';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { arrowheadLeft } from '../../theme/icons';

import css from '../../theme/css';

const { width } = Dimensions.get('screen');

export const ScanData = inject('scannerStore', 'loginStore')(observer(
  ({ back, scannerStore:{error, scanned, setScanned, hasPermission, setHasPermission, ticketCheck, qrCurrent, qrStatus}, loginStore:{user} }) => {
    const handlerPressBack = () => {
      back();
    };

    if (hasPermission === null || hasPermission === false) {
      return <Layout style={{...style.center, alignItems: 'flex-start'}}>
        <View style={{flex: 1, }}>
          <Button
            style={style.buttonBack}
            onPress={handlerPressBack}
            accessoryLeft={arrowheadLeft}
            appearance='ghost'
          />
        </View>
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
      <Layout style={{...style.flex, width: width}}>
        <View style={style.flex}>
          <Button
            style={style.buttonBack}
            onPress={handlerPressBack}
            accessoryLeft={arrowheadLeft}
            appearance='ghost'
          />
          <View style={style.container}>
            <View style={style.controlContainer}>
              <Button style={style.button} onPress={() => setScanned(0)} status={scanned === 1 ? 'success' : scanned === -1 ? 'primary' : 'basic'}/>
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
    );
  }
));

const style = StyleSheet.create({
  flex: {
    flex: 1
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
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
  button: {
    width: 84,
    height: 84,
    borderRadius: 200
  },
  buttonBack: {
    width: 62,
    height: 62
  },
  container: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 40,
  },
  controlContainer: {
    overflow: 'hidden',
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 110,
    borderStyle: 'solid',
    borderColor: css.colors.white,
    borderWidth: css.sizes.base
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
