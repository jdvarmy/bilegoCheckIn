import React from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { arrowheadLeft } from '../../theme/icons';

import css from '../../theme/css';

const { width } = Dimensions.get('screen');

export const ScanData = inject('scannerStore', 'loginStore')(observer(
  ({ back, scannerStore:{error, scanned, setScanned, hasPermission, qrCurrent} }) => {
    const handlerPressBack = () => {
      back();
    };

    if (hasPermission === null || hasPermission === false) {
      return <Layout style={{...style.center, alignItems: 'flex-start'}}>
        <View style={{flex: 1}}>
          <Button
            style={style.buttonBack}
            onPress={handlerPressBack}
            accessoryLeft={arrowheadLeft}
            appearance='ghost'
          />
        </View>
      </Layout>;
    }

    const handlerButton = () => {
      setScanned(0)
    };

    const content = <>
      {qrCurrent.already_scan === true &&
        <Text style={{...style.textBold, paddingTop:0}} category="h6">Этот билет уже зарегистрирован</Text>
      }
      <Text style={{...style.text, marginBottom: css.sizes.md}} category="h6">
        {qrCurrent.event}
      </Text>
      {!qrCurrent.seat &&
        <View style={style.align}>
          <Text style={{...style.text, ...style.ticket}} category="h4">{qrCurrent.name}</Text>
        </View>
      }
      {qrCurrent.seat &&
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={style.align}>
            <Text style={style.s1} category="s1">Сектор</Text>
            <Text category="h4" style={style.ticket}>{qrCurrent.sector}</Text>
          </View>
          <View style={style.align}>
            <Text style={style.s1} category="s1">Ряд</Text>
            <Text category="h4" style={style.ticket}>{qrCurrent.row}</Text>
          </View>
          <View style={style.align}>
            <Text style={style.s1} category="s1">Место</Text>
            <Text category="h4" style={style.ticket}>{qrCurrent.seat}</Text>
          </View>
        </View>
      }
      <Text style={{...style.text, marginTop: css.sizes.md}} category="h6">email покупателя: {qrCurrent.email}</Text>
    </>;

    return (
      <Layout style={{...style.flex, width: width}}>
        <View style={style.flex}>
          <Button style={style.buttonBack} onPress={handlerPressBack} accessoryLeft={arrowheadLeft} appearance='ghost'/>
          <View style={style.container}>
            <View style={style.controlContainer}>
              <Button style={style.button} onPress={handlerButton} status={scanned === 1 ? 'success' : scanned === -1 ? 'primary' : 'basic'}/>
            </View>
          </View>
        </View>
        <ScrollView style={{flex: 1, marginBottom: 34}}>
          <View>
            {
              error !== ''
                ? <Text style={style.textBold} category="h4">{error.message}</Text>
                : qrCurrent
                  ? content
                  : <Text style={{...style.text, color: css.colors.grey}} category="h2">Информация о билете</Text>
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
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  align: {
    alignItems: 'center',
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
    color: css.colors.red,
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
    borderColor: css.colors.red,
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
