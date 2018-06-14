import React from "react";
import Sound from "react-sound";
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid, Label } from 'semantic-ui-react';
import {SideList} from "./SideList.js";
import {PageHeader} from "./PageHeader.js";
import {PageFooter} from "./PageFooter.js";
import {PageGrid} from "./PageGrid.js";
import Master from "./css/Master.css";
import queryString from 'query-string';
import * as toolLib from './Util.js';

export class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
			serverURL:'https://pinkiebala.nctu.me/MusicServer/dir?dir=/', // 檔案路徑的API
			musicURL:'https://pinkiebala.nctu.me/MusicServer/file/', // serve音樂檔案的API
			songListURL:'https://pinkiebala.nctu.me/MusicServer/songlist',
			songQueryURL:'https://pinkiebala.nctu.me/MusicServer/songquery?url=',
			visible: false, // sideList的開關
			activeItem: 'folder', //sideList的選項

			playStatus:Sound.status.STOPPED, // 音樂的播放狀態
			loopStatus:0, // 預設不重複播放，1全部播放，2單曲播放
			curTime: 0, // 音樂的現在的播放時間
			songTime:0, // 音樂的全長
			volume:100, // 音量
			lastVolume:0,
			muteStatus:false,

			curSong:{}, // 現在播放的音樂{Name:歌名, Url,網址 }
			curDir:[], // 當前的瀏覽路徑

			curDisplayList:[], // 當前的瀏覽路徑下的檔案{Name, Url, IsDir}
		//	curPlayingURLList:[], // 現在的播放清單，存的是url
			curSongListIndex:-1,
			curPlayingList:[], // 現在的播放清單，{Name, Url, IsDir}
			curDisplaySongListName:'',
			songLists:[],

			fileExist:true,
			loading:true,
			encodeSongUrl:"",//encode後的songurl
		};

	}
	componentDidMount(){ // 程式剛執行時更新頁面
		this.init();
	}
	componentDidUpdate(prevProps, prevState) {
		const prevCurDir = prevState.curDir.map(item => {return encodeURIComponent(item)}).join('/');
		const newCurDir = this.state.curDir.map(item => {return encodeURIComponent(item)}).join('/');
		if (this.state.activeItem != prevState.activeItem){
			switch(this.state.activeItem){
				case 'folder':
					this.fetchAsync(newCurDir);
					break;
				case 'songlist':
					break;
			}
		}


		//url change state
		if(this.props.location !== prevProps.location){
			this.setStateByURL(this.props.location);
		}

		//state change url
		const newSearch = {
			curDir:this.state.curDir,
			curSongListIndex:this.state.curSongListIndex,
			curSong:this.state.curSong,
		};
		const prevSearch = {
			curDir:prevState.curDir,
			curSongListIndex:prevState.curSongListIndex,
			curSong:prevState.curSong,
		};
		if(JSON.stringify(newSearch) !== JSON.stringify(prevSearch)){
			console.log(toolLib.makeSearchString(newSearch));
			this.props.history.push({
				search:toolLib.makeSearchString(newSearch),
			});

			///
			////check curSongListIndex
			if((this.state.curSongListIndex !== prevState.curSongListIndex) && (this.state.curSongListIndex >= 0)){
				this.fetchSongListSongs(this.state.curSongListIndex);
			} else if(newCurDir != prevCurDir){/////check curDir
				this.fetchAsync(newCurDir);
				this.setState({
					curSongListIndex:-1,
				})
			}

			///
			////check curSongURL
			if(JSON.stringify(this.state.curSong) !== JSON.stringify(prevState.curSong)){
				this.setState({
					encodeSongUrl:toolLib.playURL(this.state.curSong.Url),
				});
			}
		}
		/////



	}
	setStateByURL(location){
		console.log("setStateByURL:");
	  // location is an object like window.location
	  	const queryParams = queryString.parse(location.search);

		let curSongListIndex
		if(queryParams.songList){
			curSongListIndex = parseInt(queryParams.songList);
		} else {
			curSongListIndex = -1;
		}
		let encodedSong ;
		let decodedSong = {};
		if(queryParams.song !== '{}' && queryParams.song){
			encodedSong = JSON.parse(queryParams.song);
			decodedSong = toolLib.decodedSong(encodedSong);
		}

		this.setState({
			curDir:toolLib.URLtoArray(queryParams.dir),
			curSongListIndex:curSongListIndex,
			curSong:decodedSong,
			activeItem:(queryParams.songList)?'songlist':'folder',
		});

	}
	async init(){
		await this.fetchSongLists();
		this.setStateByURL(this.props.location);
		const queryParams = queryString.parse(this.props.location.search);

		//沒有指定歌單和路徑
		if(parseInt(queryParams.songList) >= 0){
			await this.fetchSongListSongs(parseInt(queryParams.songList));
		} else if(!queryParams.songList && !queryParams.dir){
			await this.fetchAsync("");
		} else if(queryParams.dir){
			await this.fetchAsync(queryParams.dir);
		}
		// this.setStateByURL(this.props.location);

		if(queryParams.song !== '{}' && queryParams.song){
			const encodedSong = JSON.parse(queryParams.song);
			const decodedSong = toolLib.decodedSong(encodedSong);
			this.setCurPlayingList(decodedSong);
			this.setState({
				playStatus:Sound.status.PLAYING,
			});
		}
	}
	async fetchAsync(d){ // 更新瀏覽頁面
		this.setState({
			loading:true,
		});
		console.log("fetchhhhhhhh");
		//console.log(d);
		//let encodeD = d.map(item => {return encodeURIComponent(item)});
		//let response = await fetch(this.state.serverURL+encodeD.join('/'));

		let response = await fetch(this.state.serverURL + d);
		let data = await response.json();
		//console.log(data);
		if(data){
			data.forEach(item => {
				if(item.IsDir){
					item.Url = this.state.serverURL + d + '/'+ encodeURIComponent(item.Name);
				} else {
					item.Url = this.state.musicURL + d + '/'+ encodeURIComponent(item.Name);
				}
			});
		} else {
			data = [];
		}

		this.setState({
			curDisplayList: data,
			curDisplaySongListName:'',
			loading:false,
		});
	}

	async fetchSongLists(){

		//console.log("fetchhhhhhhhsonglists");
		let response = await fetch(this.state.songListURL);
		let data = await response.json();
		let output = [];
		data.forEach( item => {
			let foundindex = item.SongListNames.length
			for(let i in item.SongListNames){
				if(item.SongListNames[i] == "system.indexes"){
					foundindex = i;
				} else {
					if(i < foundindex){
						output.push({ key: i, value: i, text: item.SongListNames[i] });
					} else {
						output.push({ key: i-1, value: i-1, text: item.SongListNames[i] });
					}
				}

			}
		});

		this.setState({songLists: output});
		//console.log(output);
	}
	async fetchSongListSongs(value){
		this.setState({
			loading:true,
		});
		console.log("fetchhhhhhhhsonglistsong");
		const targetURL = this.state.songListURL + '/' + this.state.songLists[value].text;
		let response = await fetch(targetURL);
		//console.log(targetURL);

		let data = await response.json();
		if(data){
			data.forEach(item => {
				item.IsDir = false;
			});
		} else {
			data = [];
		}
		// let output = data.map(item => {
		// 	let newItem = Object.assign({},item);
		// 	newItem.IsDir = false;
		// 	return newItem;
		// });
		//console.log(output);
		this.setState({
			curDisplayList: data,
			curDisplaySongListName: this.state.songLists[value].text,
			loading:false,
		});
	}
	async handleAddToSongList(songList, song){
		console.log("handleAddToSongList");
		const targetURL = this.state.songListURL;

		let formData = new FormData();
		formData.append('songlist',songList);
		formData.append('name',song.Name);
		formData.append('url',song.Url);
		let response = await fetch(targetURL,{
			method:'POST',
			body:formData,
		});
		let data = await response.json();
		let output = [];
		data.forEach( item => {
			let foundindex = item.SongListNames.length
			for(var i in item.SongListNames){
				if(item.SongListNames[i] == "system.indexes"){
					foundindex = i;
				} else {
					if(i < foundindex){
						output.push({ key: i, value: i, text: item.SongListNames[i] });
					} else {
						output.push({ key: i-1, value: i-1, text: item.SongListNames[i] });
					}
				}

			}
		});
		this.setState({songLists: output});
		console.log(output);
	}
	async handleDeleteSong(songList, song){
		console.log("handleDeleteSong");
		const targetURL = this.state.songListURL;

		let formData = new FormData();
		formData.append('songlist',songList);
		formData.append('name',song.Name);
		formData.append('url',song.Url);
		let response = await fetch(targetURL,{
			method:'DELETE',
			body:formData,
		});
		let data = await response.json();
		let output = [];
		data.forEach( item => {
			let foundindex = item.SongListNames.length
			for(var i in item.SongListNames){
				if(item.SongListNames[i] == "system.indexes"){
					foundindex = i;
				} else {
					if(i < foundindex){
						output.push({ key: i, value: i, text: item.SongListNames[i] });
					} else {
						output.push({ key: i-1, value: i-1, text: item.SongListNames[i] });
					}
				}

			}
		});
		this.setState({songLists: output});
		console.log(output);
	}
	setCurDir(str){ // 點擊資料夾，設定瀏覽位置
		let d = this.state.curDir.slice();
		d.push(str);
		this.setState({
		 	curDir:d,
			activeItem:'folder',
			curSongListIndex:-1
		});

		// this.setQueryParams({
		// 	dir:this.arrayToURL(d),
		// });
	}
	setCurDirPop(index){ // 點擊麵包的路徑，設定瀏覽位置
		// console.log(index);
		let d = this.state.curDir.slice();
		d = d.slice(0, index);
		this.setState({
			curDir:d,
			activeItem:'folder',
			curSongListIndex:-1
		});
		// this.setQueryParams({
		// 	dir:this.arrayToURL(d),
		// });
	}
	setCurSong(song){ //點音樂item切換音樂
		console.log("setCurSong:");
		//設定音樂URL
		this.setSongURL(song);
		//播放音樂
		this.setState({
			playStatus:Sound.status.PLAYING,
		});
		this.setCurPlayingList(song);

	}
	setCurPlayingList(song){
		//把displayList存進playingList
		let curPlayingList = [];
		for(let item of this.state.curDisplayList){
			if(item.IsDir != true){
				curPlayingList.push(item);
			}
		}
		//console.log(curPlayingList);
		this.setState({
			curPlayingList: curPlayingList,
		});
	}
	setSongURL(song){//setState切換音樂url

		//如果有song就設定網址
		//
		//

		console.log("setSongURL");
		//console.log(song);
		this.setState({
			curSong:{
				Name:decodeURIComponent(song.Name),
				Url:decodeURIComponent(song.Url),
			},
			curTime:0,
		});
		console.log("Now Playing~~ " + song.Name + "\nFrom : " + song.Url);
	}
	setSongURLtoNext(){// 下一首
		console.log("setSongURLtoNext");
		let index = 5; // 下一首的index
		let curIndex = 0; // 目前的index
		for(let i in this.state.curPlayingList){
			const curUrl = decodeURIComponent(this.state.curSong.Url);
			const listUrl = decodeURIComponent(this.state.curPlayingList[i].Url)
			if(listUrl == curUrl){
				curIndex = i;
			}
		}
		curIndex = parseInt(curIndex);
		console.log(curIndex);
		//正常狀況，播完清單即停止

		switch (this.state.loopStatus) {
			case 0:
				index = (curIndex + 1) < this.state.curPlayingList.length ? (curIndex + 1) : 0;
				break;
			case 1:
				index = (curIndex + 1) % this.state.curPlayingList.length;
				break;
			case 2:
				index = curIndex;
				break;
		}

		//this.setSongURL(this.state.curPlayingList[index]);
		this.setCurSong({
			Name:this.state.curPlayingList[index].Name,
			Url:this.state.curPlayingList[index].Url,
		});
		if(index || this.state.loopStatus){
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
		let curIndex; // 目前的index
		for(let i in this.state.curPlayingList){
			const curUrl = decodeURIComponent(this.state.curSong.Url);
			const listUrl = decodeURIComponent(this.state.curPlayingList[i].Url)
			if(listUrl == curUrl){
				curIndex = i;
			}
		}
		curIndex = parseInt(curIndex);

		if(this.state.curTime / 1000 < 2 && curIndex > 0){
			let index = curIndex - 1 > 0 ? curIndex - 1 : 0;
			//this.setSongURL(this.state.curPlayingList[index]);
			this.setCurSong({
				Name:this.state.curPlayingList[index].Name,
				Url:this.state.curPlayingList[index].Url,
			});
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
		} else if(this.state.curSong.Url){
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
		if(t==0){
			this.setState({
				muteStatus:true,
			});
		} else {
			this.setState({
				muteStatus:false,
			});
		}
	}
	toggleMute(){
		if(this.state.muteStatus){
			this.setState({
				muteStatus:false,
				volume: this.state.lastVolume,
			});
		} else {
			this.setState({
				muteStatus:true,
				lastVolume:this.state.volume,
				volume: 0,
			});

		}

	}
	toggleVisibility(){ //開關sidelist
		this.setState({ visible: !this.state.visible });
		console.log("toggle!");
	}

	handleItemClick({name}){ // 發生在點sidelist的時候
		console.log("name:"+name);
		switch (name) {
			case 'folder':
				this.setState({ activeItem: name });
				break;
			default:
				break;
		}
	}
	handleSongListChange(str){
		console.log(`handleSongListChange: ${str}`);
		this.setState({
			curSongListIndex:parseInt(str),
			activeItem: 'songlist'
		});
	}
	setLoopStatus(){
		let  c = (this.state.loopStatus + 1) % 3;
		this.setState({
			loopStatus: c,
		});
	}
	render(){
		return(
			<div className={Master.page}>
				<Sound
					url = {this.state.encodeSongUrl}
					playStatus = {this.state.playStatus}
					volume = {this.state.volume}
					position = {this.state.curTime}
					onError = {(c,d)=>{
						console.log('!!!!'+d +'\n' + this.state.curSong.Name);
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
					<SideList
						visible = {this.state.visible}
						activeItem = {this.state.activeItem}
						toggleVisibility = {() => this.toggleVisibility()}
						handleItemClick = {({name}) =>  this.handleItemClick({name})}
						handleSongListChange = {(value) => this.handleSongListChange(value)}
						handleAddSongList = {(value) => this.handleAddSongList(value)}
						songLists = {this.state.songLists}
					/>
					<Sidebar.Pusher as={"div"} className={Master.bk}>
					  	<PageHeader toggleVisibility = {() => this.toggleVisibility()} curDir={this.state.curDir} setCurDirPop = {(index)=>{this.setCurDirPop(index)}}/>

						<PageGrid
							curDisplayList = {this.state.curDisplayList}
							setCurDir = {(str)=>this.setCurDir(str)}
							setCurSong = {(song)=>this.setCurSong({
								Name:song.Name,
								Url:song.Url,
							})}
							curSongURL = {this.state.curSong.Url}
							fileExist = {this.state.fileExist}
							loading = {this.state.loading}
							songLists = {this.state.songLists}
							handleAddToSongList = {(songList, song)=>this.handleAddToSongList(songList, song)}
							songQueryURL = {this.state.songQueryURL}
							handleDeleteSong = {(songList, song)=>this.handleDeleteSong(songList, song)}
							curDisplaySongListName = {this.state.curDisplaySongListName}
						/>

						<PageFooter
							curSong = {this.state.curSong.Name}
							playStatus = {this.state.playStatus}
							loopStatus = {this.state.loopStatus}
							setLoopStatus = {()=>this.setLoopStatus()}
							setCurTime = {(t)=>this.setCurTime(t)}
							curTime = {this.state.curTime}
							songTime = {this.state.songTime}
							volume = {this.state.volume}
							setVolume = {(t)=>this.setVolume(t)}
							setSongURLtoNext = {() => this.setSongURLtoNext()}
							setSongURLtoPre = {() => this.setSongURLtoPre()}
							togglePlayStatus = {() => this.togglePlayStatus()}
							muteStatus = {this.state.muteStatus}
							toggleMute = {() => this.toggleMute()}
						/>
					</Sidebar.Pusher>
				</Sidebar.Pushable>

			</div>
		);
	}

}
