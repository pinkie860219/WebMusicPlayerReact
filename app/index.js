import React from "react";
import ReactDom from "react-dom";
import {App} from "./components/App";
import {
	HashRouter as Router,
  Route,
	Switch
} from "react-router-dom";

ReactDom.render(
	<Router basename="/">
		<Switch>
			<Route path={'/songlist'} render={(props)=>(
					<App {...props} activeItem='songlist' />
				)}/>
			<Route render={(props)=>(
					<App {...props} activeItem='folder' />
				)}/>
		</Switch>
	</Router>
	,document.getElementById('app')
)
