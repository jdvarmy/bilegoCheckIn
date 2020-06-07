import React from 'react';
import { inject, observer } from 'mobx-react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

import { Layout, Text, Modal } from '@ui-kitten/components';
import Svg, { Circle } from 'react-native-svg';
import { Scanner } from '../components/Scanner/Scanner';
import { ScanData } from '../components/Scanner/ScanData';

import css from '../theme/css';

const { width, height } = Dimensions.get('screen');
const { Value, event, block, cond, eq, set, Clock, startClock, stopClock, timing, clockRunning } = Animated;

const run = () =>{
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 900,
    toValue: new Value(0),
    easing: Easing.in(Easing.bezier(.25, -.2, .35, 1))
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, 1),
      set(state.frameTime, 0),
      set(config.toValue, 20),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, [
      set(config.toValue, 1),
      stopClock(clock)
    ]),
    state.position
  ]);
};

@inject('scannerStore')
class MainScreen extends React.Component{
  constructor(props){
    super(props);
    this.scale = new Value(1);

    this.onStateChange = event([
      {nativeEvent: ({state})=>block([
        cond(
          eq(state, State.END),
          set(this.scale, run())
        ),
      ])}
    ]);

    this.back = () => {
      this._config = {
        duration: 400,
        toValue: 1,
        easing: Easing.inOut(Easing.ease),
      };
      this._anim = timing(this.scale, this._config);
      this._anim.start();
    }
  }

  handler = () => {
    this.timeout = setTimeout(() => {
      const {handlerShow} = this.props.scannerStore;
      handlerShow(true)
      // this.props.navigation.navigate('Scanner');

    }, 900)
  };

  componentWillUnmount(){
    clearTimeout(this.timeout);
  };

  render(){
    return (
      <Layout style={style.layout}>
        <TapGestureHandler onHandlerStateChange={this.onStateChange}>
          <Animated.View style={{...style.container, transform: [{scale: this.scale}]}}>
              <Svg height="50%" width="50%" viewBox="0 0 100 100" onPress={this.handler}>
                <Circle cx="50" cy="50" r="35" stroke={css.colors.red} strokeWidth="15.5" fill="transparent" />
                <Circle cx="50" cy="50" r="14" fill={css.colors.white} />
              </Svg>
          </Animated.View>
        </TapGestureHandler>
        <Text style={style.textBold} category="h1">BILEGO</Text>
        <Text style={{...style.text, color: 'rgba(255,255,255,0.4)'}} category="s1">Тапните по лого, что бы начать сканировать</Text>
        <ModalView back={this.back} />
      </Layout>
    )
  }
}

const ModalView = inject('scannerStore')(observer(
  ({ back, scannerStore:{ show } }) => {

    return(
      <Modal style={style.modal} visible={show}>
        <View style={{...style.view, flex: 3}}>
          <AnimatedTop />
        </View>
        <View style={{...style.view, flex: 4}}>
          <AnimatedBottom back={back}/>
        </View>
      </Modal>
    )
  }
));


class AnimatedTop extends React.Component{
  constructor(props){
    super(props);
    this._transY = new Value(-height);

    this._config = {
      duration: 300,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };
    this._anim = timing(this._transY, this._config);
  }

  componentDidMount() {
    this._anim.start();
  }

  render(){
    return (
      <Animated.View style={{...style.view, transform: [{ translateY: this._transY }]}}>
        <Scanner />
      </Animated.View>
    )
  }
}

@inject('scannerStore')
class AnimatedBottom extends React.Component{
  constructor(props){
    super(props);
    this._transY = new Value(height);

    this._config = {
      duration: 300,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };
    this._anim = timing(this._transY, this._config);
  }

  componentDidMount() {
    this._anim.start();
  }

  back = () => {
    const { back, scannerStore:{ handlerShow } } = this.props;

    handlerShow(false);
    back();
  };

  render(){
    return (
      <Animated.View style={{...style.view, transform: [{ translateY: this._transY }]}}>
        <ScanData back={this.back} />
      </Animated.View>
    )
  }
}


const style = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'din-pro',
  },
  textBold: {
    fontFamily: 'din-pro-bold',
  },
  outer: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: 100,
    backgroundColor: css.colors.red,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  view: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen
