import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {Permissions, Location} from 'expo';
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
          placeholder="Enter Event Name"
          onChangeText={(text) => this.setState({text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Enter Event Time"
          onChangeText={(text) => this.setState({text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Enter Event Date"
          onChangeText={(text) => this.setState({text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Enter Event Details"
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          title="Save"
          color="#32CD32"
          accessibilityLabel="Learn more about this purple button"
        />        
        <Button
          title="Cancel"
          color="#DC143C"
          accessibilityLabel="Learn more about this purple button"
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
