import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
let id = 0;

export default class App extends Component {
  state = {
    locationResultlat: null,
    locationResultlong: null,
    mapRegion: { 
      latitude: 23, 
      longitude: 32, 
      latitudeDelta: 0.0922, 
      longitudeDelta: 0.0421 
    },
   markers: [],
  };

  _createMarker(lat, long, desc, currId) {
  console.log("hi")
  this.setState({
    markers: [
      ...this.state.markers,
      {
        coordinate: {
          latitude: lat,
          longitude: long
        },
        description: desc,
        key: currId
      },
    ]
  });
  id++;
  };

  render() {
    console.log("yo")
    return (
      <MapView
        provider = "google"
        style={styles.container}
        showUserLocation={true}
        initialRegion = {{
          latitude: 32.8801,
          longitude: -117.2340,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0221
        }}
        showsUserLocation={true}
        onLongPress={e => this._createMarker(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude, 'marker', id)}
      >
      {this.state.markers.map(marker => (
            <MapView.Marker
              key = {marker.key}
              title={marker.description}
              coordinate={marker.coordinate}
              description={marker.description}
            />
        ))}
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