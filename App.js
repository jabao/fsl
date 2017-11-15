import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends Component {
  render() {
    return (
      <MapView
      	style={styles.container}
        showUserLocation={true}
        initialRegion = {{
          latitude: 32.8801,
          longitude: -117.2340,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0221
        }}
        showsUserLocation={true}
      >
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});
