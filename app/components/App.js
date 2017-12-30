import React from "react";
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid, Label } from 'semantic-ui-react';
import {SideList} from "./SideList.js";
import {PageHeader} from "./PageHeader.js";
import {PageFooter} from "./PageFooter.js";
import Master from "./css/Master.css"

export class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
			visible: false,
			activeItem: 'album',
			curTime: 0,
		};
	}

	setCurTime(t){
		this.setState({curTime:t});
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
			<div className={Master.page}>
				<Sidebar.Pushable as={Segment}>
					<SideList visible = {this.state.visible} activeItem = {this.state.activeItem} toggleVisibility = {() => this.toggleVisibility()} handleItemClick = {({name}) =>  this.handleItemClick({name})}/>
				  <Sidebar.Pusher as={"div"} className={Master.bk}>
				  	<PageHeader toggleVisibility = {() => this.toggleVisibility()}/>
					<h1 className={Master.bk}>{this.state.curTime}</h1>
					<PageFooter setCurTime = {(t)=>this.setCurTime(t)} curTime = {this.state.curTime}/>
				  </Sidebar.Pusher>
				</Sidebar.Pushable>
			</div>
		);
	}

}
