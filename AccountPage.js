import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert
} from 'react-native';
import {Permissions, Location, Font} from 'expo';
import firebase from 'firebase';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';


export class AccountPage extends Component {

	constructor(props) {
		super(props);
		this.goback = this.goback.bind(this);
	}

	// user log out confirm
	logout() {
	Alert.alert(
	  "Are you sure you wish to logout?", 
	  "We would miss you!",
	  [
	    {text: 'Cancel'},
	    {text: 'Yes', onPress: () => {
	      firebase.auth().signOut().then(function() {
	        Alert.alert('Signed Out');
	        Actions.pop();
	        Actions.pop();
	      }, function(error) {
	        Alert.alert('Sign Out Error', error);
	      });
	    }},
	  ],
	);
	}

	goback() {
		console.log("goback");
		Actions.pop();
	}

	// load font after render the page
	async componentDidMount() {
		await Font.loadAsync({
		  fontAwesome: require('./fonts/font-awesome-4.7.0/fonts/fontawesome-webfont.ttf'),
		});
		this.setState({ fontLoaded: true });
	}

	render() {
		return (
			<KeyboardAvoidingView 
				behavior="padding"
				style = {styles.container}
				>
		      <ActionButton buttonColor="rgba(231,76,60,1)" 
		        style={styles.backButton}
		        icon={(
		          <Text style={{ fontFamily: 'fontAwesome', fontSize: 25, color: '#fff' }}>
		            {Icons.backward}
		          </Text>
		        )}
		        degrees={Number(0)}
		        onPress= {this.goback}>>
		      </ActionButton>				
				<View style = {styles.logoContainer}>
					<Image 
						style = {styles.logo}
						source = {require('./logo.png')}
						/>
					<Text style={styles.title}>Free Food Locator</Text>
				</View>
				<TouchableOpacity style={styles.buttonContainer}>
				<Text 
					style={styles.buttonText}
					onPress={this.logout}
					>Logout</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>	
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3498db',
	},
	backButton: {
		position: 'absolute',
		width: 20,
		height: 20,
		top: 10,
		left: '10%',
	},
	logo: {
		width: 100,
		height: 100,
	},
	logoContainer: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center',
	},
	title: {
		color: "#FFF",
		marginTop: 10,
		textAlign: 'center',
		opacity: 0.9,
	},		
	buttonContainer: {
		backgroundColor: '#2980b9',
		paddingVertical: 15,
	},
	buttonText: {
		textAlign: 'center',
		color: '#FFFFFF',
		fontWeight: '700'
	}
});