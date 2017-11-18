import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';
import MapView from 'react-native-maps';
import PopupDialog from 'react-native-popup-dialog';

let id = 0;

export default class App extends Component {
  state = {
    locationResultlat: null,
    text: '',
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

  this.popupDialog.show();

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
    return (
      <View
        style={styles.container}
      >
      <MapView
        provider = "google"
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
               this.popupDialog.show();
              }}
            />
        ))}
      </MapView>
      <PopupDialog
        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
      >
        <View>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
        </View>
      </PopupDialog>
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
  }
});
