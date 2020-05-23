import React from 'react';
import { AsyncStorage } from 'react-native';

export default {
  set: (key, item) => {
    try {
      AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      alert(error)
    }
  },
  get: async key => {
    try {
      const storedItem = await AsyncStorage.getItem(key);
      if(storedItem){
        return JSON.parse(storedItem);
      }
    } catch (error) {
      alert(error)
    }
  },
  remove: key => {
    try {
      AsyncStorage.removeItem(key)
    } catch (error) {
      alert(error)
    }
  },
};
