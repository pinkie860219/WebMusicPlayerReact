import React from "react";
import ReactDom from "react-dom";
import {App} from "./components/App";
import history from './components/history';
import {
	Router,
  	Route,
} from "react-router-dom";

ReactDom.render(
	<Router history={history} basename="ReactPlayerBeta">
		<Route path={'/'} component={App}/>
	</Router>
	,document.getElementById('app')
)
