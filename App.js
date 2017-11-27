import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, Picker } from 'react-native';
import {Permissions, Location} from 'expo';
import MapView from 'react-native-maps';
import PopupDialog from 'react-native-popup-dialog';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Popup from './Popup.js';
import firebase from 'firebase';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modal';

//import image files for markers
import veg from './images/veg.png';
import food from './images/food.png';
import gluten from './images/gluten.png';
import other from './images/other.png';


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
    this.state = {
      userRegion: {
        latitude: 32.8801,
        longitude: -117.2340,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      mapRegion: {
        latitude: 32.8801,
        longitude: -117.2340,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
     markers: [],
     filteredMarkers: [],
     renderedMarkers: [],
     showModal: false,
     eventModal: false,
     tag: 'none',
     selectedEvent: 'null'
    }
  }


    //Gets user location and updates mapRegion in state
  _getLocationAsync = async () => {
    //grab user location and store it
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      userRegion: {
        latitude:  Number(JSON.stringify(location.coords.latitude)),
        longitude: Number(JSON.stringify(location.coords.longitude)),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });

    //update mapRegion with user location
    this.setState({
      mapRegion: this.state.userRegion
    });
  };

  //toggle Filter Modal
  showFilterModal = () => this.setState({ filterModal: true })

  hideFilterModal = () => this.setState({ filterModal: false })

  //toggle Event Modal
  showEventModal = (marker) => this.setState({ eventModal: true, selectedEvent: marker })

  hideEventModal = () => this.setState({ eventModal: false })


  //calls getLocation method after map is rendered
  componentDidMount() {
    this._getLocationAsync();
  }


  //updates mapRegion object in state
  _handleMapRegionChange = mapRegion => {
      this.setState({ mapRegion });
  };

  //creates a marker on the map
  _createMarker(lat, long, desc) {
    this._popup.show(lat, long);
  };

  //sets image for MapMarker depending on event's tag
  _setMarkerImg(tag){
    switch(tag) {
      case 'veg':
        return veg;
        break;

      case 'gluten':
        return gluten;
        break;

      case 'food':
        return food;
        break;

      case 'other':
        return other;
        break;
        
      default:
        return null;
    }
  }

  componentWillMount() {
    let eventsRef = firebase.database().ref('events');
    eventsRef.on('value', function(data) {
      var items = [];
      data.forEach(function(dbevent) {
        var item = dbevent.val()
        // check if now is within event start and end dates
        let now = new Date();
        if (new Date(item.date.start) <= now &&
            now <= new Date(item.date.end)) {
          item['key'] = dbevent.key;
          items.push(item);
        }
      }.bind(this));
      this.setState({markers: items});
      this.setState({renderedMarkers: items});
    }.bind(this));
  }

  getFilteredResults() {
    if(this.state.tag == 'none'){
      this.setState({renderedMarkers: this.state.markers});
    }else{
      var items = [];
      this.state.markers.map(function (marker) {
        if(marker.tag == this.state.tag){
          items.push(marker);
        }
      }, this);
      this.setState({filteredMarkers: items});
      this.setState({renderedMarkers: items});
    }
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
        ref = {(mapView) => { _map = mapView; }}
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
        onLongPress={e => this._createMarker(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude, 'marker')
      }
      >
        {this.state.renderedMarkers.map(marker => (
            <MapView.Marker
              ref={marker => (this.marker = marker)}
              key={marker.key}
              image={this._setMarkerImg(marker.tag)}
              coordinate={marker.coordinate}
              onPress={() => {
               this.showEventModal(marker);
              }} />
        ))}      
      </MapView>
      <ActionButton buttonColor="rgba(231,76,60,1)" 
        style={styles.filterButton}
        buttonText="FLT"
        degrees={Number(0)}
        onPress= {this.showFilterModal}>
      </ActionButton>
      <ActionButton buttonColor="rgba(231,76,60,1)" 
        style={styles.centerButton}
        buttonText="CTR"
        degrees={Number(0)}
        onPress= {() =>_map.animateToRegion(this.state.userRegion, 500)}>>
      </ActionButton>
       <Modal isVisible={this.state.filterModal}
          onBackdropPress={this.hideFilterModal}
          onModalHide={this.getFilteredResults.bind(this)}>
          <View style={styles.modal}>
            <Text style={{textAlign:'center'}}>Choose Filter</Text>
            <Picker
              selectedValue={this.state.tag.toString()}
              onValueChange={(itemValue, itemIndex) => this.setState({tag: itemValue})}>
              <Picker.Item label="None" value="none" />
              <Picker.Item label="Food" value="food" />
              <Picker.Item label="Gluten Free" value="gluten" />
              <Picker.Item label="Vegetarian" value="veg" />   
              <Picker.Item label="Other" value="other" />       
            </Picker>
          </View>
        </Modal>
        <Modal isVisible={this.state.eventModal}
        onBackdropPress={this.hideEventModal}>
          <View style={styles.modal}>
            <Text>Event Name: {this.state.selectedEvent.title}</Text>
            <Text>Event Details: {this.state.selectedEvent.description}</Text>
          </View>
        </Modal>
      <Popup ref={(popup) => {this._popup = popup;}} db={firebase}/>
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
  },
  centerButton: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: '80%',
    left: '80%',
  },
  filterButton: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 10,
    left: '80%',
  },
  modal: {
     flex: .5, 
     backgroundColor: 
     '#fff',
  }
});
