import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';

var config = {
	apiKey: "AIzaSyBPgko3WSh-2rgjK1a7kSz9w8kClYwVvgo",
	authDomain: "mijmffl.firebaseapp.com",
	databaseURL: "https://mijmffl.firebaseio.com",
	projectId: "mijmffl",
	storageBucket: "mijmffl.appspot.com",
	messagingSenderId: "485467070702"
};

const app = firebase.initializeApp(config);


export class LoginForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
		this.entermap=this.entermap.bind(this);
	}

	entermap() {
		// authenticate email and password here
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(function() {
				// if authenticated, enter the map page
				this.setState({
					email: '',
					password: '',
					loaded: false,
				});				
				Actions.map();
			}.bind(this))
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				if (errorCode === 'auth/wrong-password') {
					alert('Wrong password.');
				} 
				else {
					alert(errorMessage);
				}	
				this.setState({
					password: '',
					loaded: false,
				});			
			}.bind(this));

	}

	render() {
		return (
			<View style = {styles.container}>
			<StatusBar 
				barStyle="light-content"
				/>
				<TextInput 
					placeholder="username or email"
					placeholderTextColor='rgba(255,255,255,0.7)'
					returnKeyType="next"
					onSubmitEditing={() => this.passwordInput.focus()}
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
					style={styles.input}
					onChangeText={(email) => this.setState({email})}
					value={this.state.email}
					/>
				<TextInput
					placeholder="password"
					placeholderTextColor='rgba(255,255,255,0.7)'
					returnKeyType="go"
					secureTextEntry
					style={styles.input}
					onChangeText={(password) => this.setState({password})}
					value={this.state.password}
					ref={(input) => this.passwordInput = input}
					/>
				<TouchableOpacity style={styles.buttonContainer}>
					<Text 
						style={styles.buttonText}
						onPress={this.entermap}
						>Login</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	input: {
		height: 40,
		backgroundColor: 'rgba(255,255,255,0.2)',
		marginBottom: 10,
		color: '#FFF',
		paddingHorizontal: 10,
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