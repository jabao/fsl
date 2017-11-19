import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Permissions, Location} from 'expo';

import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import Popup from './Popup';

let id = 0;


export class Map extends Component {

  logout() {
    firebase.auth().signOut().then(function() {
      alert('Signed Out');
      Actions.pop();
    }, function(error) {
      alert('Sign Out Error', error);
    });
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

    let dbRef = firebase.database().ref('events');
    dbRef.push({
      coordinate: {latitude: lat, longitude: long},
      description: desc,
      key: id,
      title: desc
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
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={this.logout}
          >
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',    
  },
  map: {
    height: "100%",
    width: "100%",
    flex: 1,
    zIndex: 1,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#202646',
    borderRadius: 10,
  },

  logoutText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '700'
  }
});
