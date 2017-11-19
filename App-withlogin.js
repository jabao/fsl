/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'firebase';

import { Login } from './Login';
import { Signup } from './Signup';
import { Routes } from './Routes';



var config = {
  apiKey: "AIzaSyBPgko3WSh-2rgjK1a7kSz9w8kClYwVvgo",
  authDomain: "mijmffl.firebaseapp.com",
  databaseURL: "https://mijmffl.firebaseio.com",
  projectId: "mijmffl",
  storageBucket: "mijmffl.appspot.com",
  messagingSenderId: "485467070702"
};
if(!firebase.apps.length) {
  const app = firebase.initializeApp(config);
}

export default class App extends Component<{}> {
  
  render() {
    return (
      <Routes />
    );
  }

}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  callout: {
    height: 20,
    width: 20,
    backgroundColor: 'white',
  }
});
