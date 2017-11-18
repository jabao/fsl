import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import firebase from 'firebase';

let id = 0;

export default class App extends Component {
  // Initialize Firebase
  constructor(props) {
    super(props);

    var config = {
      apiKey: "AIzaSyA7jvpayAPe8W7mnUSY2utM9puTkScziZc",
      authDomain: "mijmfsl.firebaseapp.com",
      databaseURL: "https://mijmfsl.firebaseio.com",
      projectId: "mijmfsl",
      storageBucket: "",
      messagingSenderId: "57827792969"
    };
    firebase.initializeApp(config);
  }

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

  //updates mapRegion object in state
  _handleMapRegionChange = mapRegion => {
      this.setState({ mapRegion });
  };

  //creates a marker on the map
  _createMarker(lat, long, desc, currId) {
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

  componentWillMount() {
    let eventsRef = firebase.database().ref('events');
    eventsRef.on('value', function(data) {
      var items = [];
      data.forEach(function(dbevent) {
        var item = dbevent.val()
        item['.key'] = dbevent.key;
        items.push(item);
      }.bind(this));
      this.setState({markers: items});
    }.bind(this));
  }

  componentWillUnmount() {
    firebase.off();
  }

  render() {
    return (
      <MapView
        style={styles.container}
        onRegionChange={this._handleMapRegionChange}
        region={this.state.mapRegion}
        showUserLocation={true}
        initialRegion = {{
          latitude: 32.8801,
          longitude: -117.2340,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0221
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
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
