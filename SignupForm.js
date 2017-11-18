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
import firebase from 'firebase';



export class SignupForm extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			loaded: true,
		};
		this.signup=this.signup.bind(this);
	}

	signup() {
		this.setState({
			loaded: false
		});

		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(function() {
				alert("Sign up successful!");
				// return to login page after sign up
				Actions.pop();				
			})
			.catch(function(error) {
			    // Handle Errors here.
			    var errorMessage = error.message;
			    alert(errorMessage);
			    this.setState({
			    	email: '',
			    	password: '',
			    });
			}.bind(this));

		/*
		app.createUser({
			'email': this.state.email,
			'password': this.state.password
		}, (error, userData) => {
			if(error) {
				switch(error.code) {
					case "EMAIL_TAKEN":
						alert("The new user account cannot be created because the email is already in use.");
						break;
					case "INVALID_EMAIL":
						alert("The specified email is not a valid email.");
          				break;
          			default:
          				alert("Error creating user:");
				}
			}
			else {
				alert('Your account was created!');
			}

			this.setState({
				email: '',
				password: '',
				loaded: true
			});
		});
		*/


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
						onPress={this.signup}
						>
						Signup
					</Text>
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