import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {Permissions, Location} from 'expo';
import MapView from 'react-native-maps';
import PopupDialog from 'react-native-popup-dialog';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Popup from './Popup.js';
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
    text: '',
    locationResultlong: null,
    mapRegion: {
      latitude: 32.8801,
      longitude: -117.2340,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
   markers: [],
  };


    //Gets user location and updates mapRegion in state
  _getLocationAsync = async () => {
    //grab user location and store it
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      locationResultlat: JSON.stringify(location.coords.latitude),
      locationResultlong: JSON.stringify(location.coords.longitude)
    });

    //update mapRegion with user location
    let prevState = this.state;
    this.setState({
      mapRegion: {
        latitude: Number(prevState.locationResultlat),
        longitude: Number(prevState.locationResultlong),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421

      },
    });
  };

    //calls getLocation method after map is rendered
  componentDidMount() {
    this._getLocationAsync();
  }


  //updates mapRegion object in state
  _handleMapRegionChange = mapRegion => {
      this.setState({ mapRegion });
  };

  //creates a marker on the map
  _createMarker(lat, long, desc, currId) {

    this._popup.show(lat, long);

    firebase.child('events').set({
      id: {
        coordinate: {lat, long},
        description: desc,
        key: id,
        title: desc
      }
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
      <View
        style={styles.container}
      >
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
        onLongPress={e => this._createMarker(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude, 'marker', id)
      }
      >

      {this.state.markers.map(marker => (
            <MapView.Marker
              key = {marker.key}
              title={marker.description}
              coordinate={marker.coordinate}
              description={marker.description}
              onPress={() => {
               this._popup.show();
              }}
            />
        ))}
      </MapView>
      <Popup ref={(popup) => {this._popup = popup;}}/>
      </View>
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
   textInput: {
      height: 40,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderColor: 'gray',
      borderWidth: 1,
      textAlign: 'center',
   }
});
