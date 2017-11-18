import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import {Login} from './Login';
import {Signup} from './Signup';
import {Map} from './Map';


export class Routes extends Component {
	render() {
		return (
			<Router>
				<Stack key="root" hideNavBar={true}>
					<Scene key="login" component={Login} title="Login"/>
			    	<Scene key="signup" component={Signup} title="Signup"/>
			    	<Scene key="map" component={Map} title="Map"/>
			    </Stack>
			</Router>
		);
	}
}
