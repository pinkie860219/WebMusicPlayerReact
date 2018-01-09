import React from "react";
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid, Label } from 'semantic-ui-react';
import {SideList} from "./SideList.js";
import {PageHeader} from "./PageHeader.js";
import {PageFooter} from "./PageFooter.js";
import {PageGrid} from "./PageGrid.js";
import Master from "./css/Master.css"

export class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
			visible: false,
			activeItem: 'album',
			curTime: 0,
			songTime:500,
			volume:100,
			curSong:'',
			curDir:[],

			curDisplayList:[],
			curPlayingList:[],
		};
	}
	componentWillMount(){
		this.fetchAsync(this.state.curDir);
	}

	async fetchAsync(d){

		console.log("fetchhhhhhhh");
		let response = await fetch('http://localhost:8024/dir?dir=/'+d.join('/'));
		let data = await response.json();
		//console.log(data);

		this.setState({curDisplayList: data});
	}
	setCurDir(str){
		let d = this.state.curDir;
		d.push(str);
		this.setState({curDir:d});
		console.log(this.state.curDir);
		this.fetchAsync(d)
	}
	setCurDirPop(index){
		console.log(index);
		let d = this.state.curDir;
		d = d.slice(0, index);
		console.log(d);
		this.setState({curDir:d});
		// console.log(this.state.curDir);
		this.fetchAsync(d)
	}
	setCurSong(str){
		this.setState({curSong:str});
	}
	setCurTime(t){
		this.setState({curTime:t});
	}
	setVolume(t){
		this.setState({volume:t});
	}
	toggleVisibility(){
		this.setState({ visible: !this.state.visible });
		console.log("toggle!");
	}

	handleItemClick({name}){
		this.setState({ activeItem: name });
	}
	handleData(data){
		let input = JSON.parse(event.data);
	    //console.log(event);
	    //console.log(input);
	    if(input.Action === "list"){

	    }
	}
	render(){
		return(
			<div className={Master.page}>
				<Sidebar.Pushable as={Segment} className={Master.pushable}>
					<SideList visible = {this.state.visible} activeItem = {this.state.activeItem} toggleVisibility = {() => this.toggleVisibility()} handleItemClick = {({name}) =>  this.handleItemClick({name})}/>
					<Sidebar.Pusher as={"div"} className={Master.bk}>
					  	<PageHeader toggleVisibility = {() => this.toggleVisibility()} curDir={this.state.curDir} setCurDirPop = {(index)=>{this.setCurDirPop(index)}}/>
						<PageGrid curDisplayList = {this.state.curDisplayList} setCurDir = {(str)=>this.setCurDir(str)} setCurSong = {(str)=>this.setCurSong(str)}/>

						<PageFooter setCurTime = {(t)=>this.setCurTime(t)} curTime = {this.state.curTime} songTime = {this.state.songTime} volume = {this.state.volume} setVolume = {(t)=>this.setVolume(t)} />
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</div>
		);
	}

}
