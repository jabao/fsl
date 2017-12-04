import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import {Login} from './Login';
import {Signup} from './Signup';
import {Forgot} from './Forgot';
import {Map} from './Map';
import {AccountPage} from './AccountPage';


export class Routes extends Component {
	render() {
		return (
			<Router>
				<Stack key="root" hideNavBar={true}>
					<Scene key="login" component={Login} title="Login"/>
			    	<Scene key="signup" component={Signup} title="Signup"/>
			    	<Scene key="forgot" component={Forgot} title="Forgot" />
			    	<Scene key="map" component={Map} title="Map"/>
			    	<Scene key="account" component={AccountPage} title="AccountPage"/>
			    </Stack>
			</Router>
		);
	}
}
