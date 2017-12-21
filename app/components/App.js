import React from "react";
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid, Label } from 'semantic-ui-react';
import {SideList} from "./SideList.js";
import {PageFolder} from "./PageFolder.js";
import {MasterCss} from "./css/MasterCss.js"

export class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
			visible: false,
			activeItem: 'album',
		};
	}

	toggleVisibility(){
		this.setState({ visible: !this.state.visible });
		console.log("toggle!");
	}

	handleItemClick({name}){
		this.setState({ activeItem: name });
	}

	render(){
		return(
			<div style={MasterCss.page}>
				<Sidebar.Pushable as={Segment}>
					<SideList visible = {this.state.visible} activeItem = {this.state.activeItem} toggleVisibility = {() => this.toggleVisibility()} handleItemClick = {({name}) =>  this.handleItemClick({name})}/>
				  <Sidebar.Pusher>
				  	<PageFolder toggleVisibility = {() => this.toggleVisibility()}/>

				  </Sidebar.Pusher>
				</Sidebar.Pushable>
			</div>
		);
	}

}
