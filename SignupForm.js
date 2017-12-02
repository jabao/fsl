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
		this.onSignUpPress=this.onSignUpPress.bind(this);
	}

	onSignUpPress() {
		// client side authentication
		var uname = this.state.email;
		var pw = this.state.password;

		// email not empty
		if(!uname.length) {
			alert("Please enter email!");
		    this.setState({
		    	email: '',
		    	password: '',
		    });			
			return;			
		}		

		// pw length
		if(pw.length < 6 || pw.length > 12) {
			alert("Invalid Password Length (6-12 characters)");
		    this.setState({
		    	password: '',
		    });			
			return;
		}

		// has upper/lower chars
		if(pw.toUpperCase() == pw || pw.toLowerCase() == pw) {
			alert("Invalid Password (must contain Uppercase and Lowercase letters)");
		    this.setState({
		    	password: '',
		    });				
			return;			
		}

		// contains special char
		var specialChars = "@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";

		var speicalCharCheck = function(pw) {
			for(i = 0; i < specialChars.length; i++) {
				if(pw.indexOf(specialChars[i]) > -1) {
					return true;
				}
			}
			return false;
		}

		if(!speicalCharCheck(pw)) {
			alert("Invalid Password (must contain one speical character)");
		    this.setState({
		    	password: '',
		    });				
			return;				
		}

		this.setState({
			loaded: false
		});

		firebase.auth().createUserWithEmailAndPassword(this.state.email, pw)
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

	}


	render() {
		return (
			<View style = {styles.container}>
			<StatusBar 
				barStyle="light-content"
				/>
				<TextInput 
					placeholder="Email"
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
					placeholder="Password"
					placeholderTextColor='rgba(255,255,255,0.7)'
					returnKeyType="go"
					secureTextEntry
					style={styles.input}
					onChangeText={(password) => this.setState({password})}
					value={this.state.password}
					ref={(input) => this.passwordInput = input}
					/>
				<Text style = {styles.hints}> 6-12 characters</Text>
				<Text style = {styles.hints}> Must contain one uppercase and lowercase letter</Text>
				<Text style = {styles.hints}> Must contain one special character from</Text>
				<Text style = {styles.hints}> @!#$%^&*()_+[]{}?:;|'"\,./~`-=</Text>
				<TouchableOpacity style={styles.buttonContainer}>
					<Text 
						style={styles.buttonText}
						onPress={this.onSignUpPress}
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
	},
	hints:{
		color: 'rgba(255,255,255,0.5)',		
		marginBottom: 10,
	}
});