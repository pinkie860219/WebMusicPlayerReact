import React from "react";
import Sound from "react-sound"
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
			serverURL:'http://localhost:8024/dir?dir=/',
			musicURL:'http://localhost:8024/MusicServer/',
			visible: false,
			activeItem: 'album',

			playStatus:Sound.status.STOPPED,
			curTime: 0,
			songTime:500,
			volume:100,
			curSong:'',
			curSongURL:'',
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
		let response = await fetch(this.state.serverURL+d.join('/'));
		let data = await response.json();
		//console.log(data);

		this.setState({curDisplayList: data});
	}
	setCurDir(str){
		let d = this.state.curDir;
		d.push(str);
		this.setState({curDir:d});
		console.log('curDir:'+d.join('/'));
		this.fetchAsync(d)
	}
	setCurDirPop(index){
		// console.log(index);
		let d = this.state.curDir;
		d = d.slice(0, index);
		this.setState({curDir:d});
		console.log('curDir:'+d.join('/'));
		this.fetchAsync(d)
	}
	setCurSong(str){
		this.setState({
			curSong:str,
			curSongURL:this.state.musicURL + this.state.curDir.join('/') + '/'+str,
			playStatus:Sound.status.PLAYING,
		});
		console.log(str);
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
				<Sound
					url = {this.state.curSongURL}
					playStatus = {this.state.playStatus}
					volume = {this.state.volume}
					onError = {(c,d)=>{
						console.log('!!!!'+d +'\n' + this.state.curSong);
						this.setState({
							playStatus:Sound.status.STOPPED,
						});
					}}
					onLoading = {(o) => {
						console.log("song Loading");
						this.setState({
							songTime : Math.floor(o.duration/1000),
						});
					}}
					onPlaying = {(o)=>{
						console.log("song Playing");
						this.setState({
							curTime : Math.floor(o.position/1000),
						});
						console.log(o.position+'/'+o.duration);
					}}
				/>
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
