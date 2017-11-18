import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';

export class Map extends Component {
	/*
	constructor(props) {
	    super(props);
	    this.state = {
	    	region: {
		        latitude: 32.8801,
		        longitude: -117.2340,
		        latitudeDelta: 0.0422,
		        longitudeDelta: 0.0221,
	    	},
	    };
    }
    */
  /*this is control region as a state
  render() {
    return (
      <MapView
        provider = { PROVIDER_GOOGLE }
        style = { styles.container }
        region={this.state.region}
        onRegionChangeComplete={(region) => {
          this.setState({region: region});
        }}
      />
    );
  }
  */ 
  logout() {
    firebase.auth().signOut().then(function() {
      alert('Signed Out');
      Actions.pop();
    }, function(error) {
      alert('Sign Out Error', error);
    });
  }
    //this is show default location UCSD
    render() {
	    return (
        <View style={styles.container}>
  	      <MapView
  	        provider = { PROVIDER_GOOGLE }
  	        style = { styles.map }
  	        initialRegion = {{
  	          latitude: 32.8801,
  	          longitude: -117.2340,
  	          latitudeDelta: 0.0422,
  	          longitudeDelta: 0.0221,
  	        }}
  	      >
  	      </MapView>
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

/*
  logoutButton: {
   width: 75,
   height: 75,
   borderRadius: 85/2,
   backgroundColor: 'rgba(252, 253, 253, 0.9)',
   justifyContent: 'center',
   alignItems: 'center',
   shadowColor: 'black',
   shadowRadius: 8,
   shadowOpacity: 0.12,
   opacity: .6,
   zIndex: 10,
  },
*/