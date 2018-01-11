import React from "react";
import Sound from "react-sound";
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
			serverURL:'https://pinkiebala.nctu.me/MusicServer-dir?dir=/', // 檔案路徑的API
			musicURL:'https://pinkiebala.nctu.me/MusicServer/', // serve音樂檔案的API
			visible: false, // sideList的開關
			activeItem: 'album', //sideList的選項

			playStatus:Sound.status.STOPPED, // 音樂的播放狀態
			curTime: 0, // 音樂的現在的播放時間
			songTime:0, // 音樂的全長
			volume:100, // 音量
			curSong:'', // 現在播放的音樂名稱
			curSongURL:'', // 現在播放音樂的網址
			curDir:[], // 當前的瀏覽路徑

			curDisplayList:[], // 當前的瀏覽路徑下的檔案
			curPlayingURLList:[], // 現在的播放清單，存的是url
			curPlayingList:[], // 現在的播放清單，存的是名稱
		};
	}
	componentWillMount(){ // 程式剛執行時更新頁面
		this.fetchAsync(this.state.curDir);
	}

	async fetchAsync(d){ // 更新瀏覽頁面

		console.log("fetchhhhhhhh");
		let encodeD = d.map(item => {return encodeURIComponent(item)});
		let response = await fetch(this.state.serverURL+encodeD.join('/'));
		let data = await response.json();
		//console.log(data);

		this.setState({curDisplayList: data});
	}
	setCurDir(str){ // 點擊資料夾，設定瀏覽位置
		let d = this.state.curDir;
		d.push(str);
		this.setState({curDir:d});
		console.log('curDir:'+d.join('/'));
		this.fetchAsync(d)
	}
	setCurDirPop(index){ // 點擊麵包的路徑，設定瀏覽位置
		// console.log(index);
		let d = this.state.curDir;
		d = d.slice(0, index);
		this.setState({curDir:d});
		console.log('curDir:'+d.join('/'));
		this.fetchAsync(d)
	}
	setCurSong(songName){ //點音樂item切換音樂
		//設定音樂URL
		let encodeD = this.state.curDir.map(item => {return encodeURIComponent(item)});
		this.setSongURL(this.state.musicURL + encodeD.join('/') + '/'+ encodeURIComponent(songName));
		//播放音樂
		this.setState({
			playStatus:Sound.status.PLAYING,
		});

		//把displayList存近playingList
		let curPlayingURLList = this.state.curDisplayList.map(item => {
			if(item.IsDir != true){
				return this.state.musicURL + encodeD.join('/') + '/'+ encodeURIComponent(item.Name);
			}
		});
		console.log(curPlayingURLList);
		this.setState({
			curPlayingURLList: curPlayingURLList,
		});
	}
	setSongURL(url){//setState切換音樂url
		let sName = url.substr(url.lastIndexOf('/') - url.length + 1);
		let songName = decodeURIComponent(sName)
		console.log(songName);
		this.setState({
			curSong:songName,
			curSongURL:url,
			curTime:0,
		});
		console.log("Now Playing~~ " + songName + "\nFrom : " + url);
	}
	setSongURLtoNext(){// 下一首
		console.log("setSongURLtoNext");
		let index = this.state.curPlayingURLList.indexOf(this.state.curSongURL)+1 < this.state.curPlayingURLList.length ? this.state.curPlayingURLList.indexOf(this.state.curSongURL)+1 :
		0;
		let url = this.state.curPlayingURLList[index];
		this.setSongURL(url);
		if(index){
			this.setState({
				playStatus:Sound.status.PLAYING,
			});
		} else{
			this.setState({
				playStatus:Sound.status.STOPPED,
			});
		}
	}
	setSongURLtoPre(){ // 上一首
		console.log("setSongURLtoPre");
		//如果時間小於2秒，上一首，else，時間回到0
		let curIndex = this.state.curPlayingURLList.indexOf(this.state.curSongURL);
		if(this.state.curTime / 1000 < 2 && curIndex > 0){
			let index = curIndex - 1 > 0 ? curIndex - 1 : 0;
			let url = this.state.curPlayingURLList[index];
			this.setSongURL(url);
			this.setState({
				curTime : 0,
			});
		} else{
			this.setState({
				curTime : 0,
			});
		}
	}
	togglePlayStatus(){ // 暫停or播放音樂
		if(this.state.playStatus == Sound.status.PLAYING){
			this.setState({
				playStatus:Sound.status.PAUSED,
			});
		} else if(this.state.curSongURL){
			this.setState({
				playStatus:Sound.status.PLAYING,
			});
		}
	}
	setCurTime(t){ // TSlider設定歌曲時間，curSong有的時候才有效
		if(this.state.curSong){
			this.setState({curTime:t});
		}
	}
	setVolume(t){ //slider設定音量
		this.setState({volume:t});
	}
	toggleVisibility(){ //開關sidelist
		this.setState({ visible: !this.state.visible });
		console.log("toggle!");
	}

	handleItemClick({name}){ // 發生在點sidelist的時候
		this.setState({ activeItem: name });
	}
	render(){
		return(
			<div className={Master.page}>
				<Sound
					url = {this.state.curSongURL}
					playStatus = {this.state.playStatus}
					volume = {this.state.volume}
					position = {this.state.curTime}
					onError = {(c,d)=>{
						console.log('!!!!'+d +'\n' + this.state.curSong);
						this.setState({
							playStatus:Sound.status.STOPPED,
						});
					}}
					onLoading = {(o) => {
						//console.log("song Loading");
						this.setState({
							songTime : o.duration,
						});
					}}
					onPlaying = {(o)=>{
						//console.log("song Playing");
						this.setState({
							curTime : o.position,
						});
					//	console.log(o.position+'/'+o.duration);
					}}
					onFinishedPlaying = {()=>{
						this.setSongURLtoNext();
					}}
				/>
				<Sidebar.Pushable as={Segment} className={Master.pushable}>
					<SideList visible = {this.state.visible} activeItem = {this.state.activeItem} toggleVisibility = {() => this.toggleVisibility()} handleItemClick = {({name}) =>  this.handleItemClick({name})}/>
					<Sidebar.Pusher as={"div"} className={Master.bk}>
					  	<PageHeader toggleVisibility = {() => this.toggleVisibility()} curDir={this.state.curDir} setCurDirPop = {(index)=>{this.setCurDirPop(index)}}/>

						<PageGrid curDisplayList = {this.state.curDisplayList} setCurDir = {(str)=>this.setCurDir(str)} setCurSong = {(str)=>this.setCurSong(str)}/>

						<PageFooter
							curSong = {this.state.curSong}
							playStatus = {this.state.playStatus}
							setCurTime = {(t)=>this.setCurTime(t)}
							curTime = {this.state.curTime}
							songTime = {this.state.songTime}
							volume = {this.state.volume}
							setVolume = {(t)=>this.setVolume(t)}
							setSongURLtoNext = {() => this.setSongURLtoNext()}
							setSongURLtoPre = {() => this.setSongURLtoPre()}
							togglePlayStatus = {() => this.togglePlayStatus()}
						/>
					</Sidebar.Pusher>
				</Sidebar.Pushable>

			</div>
		);
	}

}
