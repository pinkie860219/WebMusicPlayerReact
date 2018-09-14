import React from "react";
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid, Label } from 'semantic-ui-react';
import {SideList} from "./SideList.js";
import {PageHeader} from "./PageHeader.js";
import {FooterPlayer} from "./PageFooter.js";
import {PageGrid} from "./PageGrid.js";
import Master from "./css/Master.css";
import queryString from 'query-string';
import * as toolLib from './Util.js';
import {SongInfoContext} from './context/SongInfoContext.js';

export class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
			serverURL:'https://pinkiebala.nctu.me/MusicServer/dir?dir=', // 檔案路徑的API
			musicURL:'https://pinkiebala.nctu.me/MusicServer/file?m=', // serve音樂檔案的API
			songListURL:'https://pinkiebala.nctu.me/MusicServer/songlist',
			songQueryURL:'https://pinkiebala.nctu.me/MusicServer/songquery?url=',
			visible: false, // sideList的開關
			activeItem: 'folder', //sideList的選項

			curDirCode:'',//當前的瀏覽路徑的HashedCode
			curDir:[], // 當前的瀏覽路徑

			curDisplayList:[], // 當前的瀏覽路徑下的檔案{Name, Url, IsDir}
			curSongListIndex:-1,
			curDisplaySongListName:'',
			songLists:[],

			fileExist:true,
			loading:true,

			// for SongInfoContext usage
			songInfo:{
				curSong:{},
				curPlayingList:[], // 現在的播放清單，{Name, Url}
				setSongUrl:(song)=>this.setSongUrl(song),
			},
		};

	}
	componentDidMount(){ // 程式剛執行時更新頁面
		this.init();
	}
	componentDidUpdate(prevProps, prevState) {
		const prevCurDirCode = prevState.curDirCode
		const newCurDirCode = this.state.curDirCode
		if (this.state.activeItem != prevState.activeItem){
			switch(this.state.activeItem){
				case 'folder':
					this.fetchAsync(newCurDirCode);
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
			curDirCode:this.state.curDirCode,
			curSongListIndex:this.state.curSongListIndex,
			curSong:this.state.songInfo.curSong,
		};
		const prevSearch = {
			curDirCode:prevState.curDirCode,
			curSongListIndex:prevState.curSongListIndex,
			curSong:prevState.songInfo.curSong,
		};
		if(JSON.stringify(newSearch) !== JSON.stringify(prevSearch)){
			//console.log(toolLib.makeSearchString(newSearch));
			this.props.history.push({
				search:toolLib.makeSearchString(newSearch),
			});

			///
			////check curSongListIndex
			if((this.state.curSongListIndex !== prevState.curSongListIndex) && (this.state.curSongListIndex >= 0)){
				this.fetchSongListSongs(this.state.curSongListIndex);
			} else if(newCurDirCode != prevCurDirCode){/////check curDir
				this.fetchAsync(newCurDirCode);
				this.setState({
					curSongListIndex:-1,
				})
			}

			///

		}
		/////


	}
	setStateByURL(location){
		//console.log("setStateByURL:");
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
		let songInfo = {...this.state.songInfo};
		songInfo.curSong = {
			...decodedSong
		};
		this.setState({
			curDirCode: queryParams.dir,
			curSongListIndex:curSongListIndex,
			songInfo:songInfo,
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
	async fetchAsync(code){ // 更新瀏覽頁面
		this.setState({
			loading:true,
		});
		//console.log("fetchhhhhhhh");
		//console.log(d);
		//let encodeD = d.map(item => {return encodeURIComponent(item)});
		//let response = await fetch(this.state.serverURL+encodeD.join('/'));

		let response = await fetch(this.state.serverURL + code);
		let data = await response.json();
		//console.log(data);
		if(data){
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
		// console.log("fetchhhhhhhhsonglistsong");
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
		// console.log("handleAddToSongList");
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
		// console.log(output);
	}
	async handleDeleteSong(songList, song){
		// console.log("handleDeleteSong");
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
		// console.log(output);
	}
	setCurDir(item){ // 點擊資料夾，設定瀏覽位置
		let d = this.state.curDir.slice();
		d.push(item);
		this.setState({
		 	curDir:d,
			curDirCode:item.HashedCode,
			activeItem:'folder',
			curSongListIndex:-1
		});
	}
	setCurDirPop(index){ // 點擊麵包的路徑，設定瀏覽位置
		let d = this.state.curDir.slice();
		d = d.slice(0, index);
		this.setState({
			curDir:d,
			curDirCode:d[index-1]?d[index-1].HashedCode:'',
			activeItem:'folder',
			curSongListIndex:-1
		});
	}
	setCurSong(song){ //點音樂item切換音樂
		// console.log("setCurSong:");
		let songInfo = {...this.state.songInfo};
		songInfo.curSong = {
			Name:decodeURIComponent(song.Name),
			Url:decodeURIComponent(song.Url),
		};
		songInfo.curPlayingList = this.getCurPlayingListFromCurDisplayList();
		this.setState({songInfo});

		console.log("Now Playing~~ " + song.Name + "\nFrom : " + song.Url);

	}
	getCurPlayingListFromCurDisplayList(){
		//把displayList存進playingList
		let curPlayingList = [];
		for(let item of this.state.curDisplayList){
			if(item.IsDir != true){
				curPlayingList.push(item);
			}
		}
		return curPlayingList;
	}
	setSongUrl(song){

		this.setState(prevState => (
			{
				...prevState,
				songInfo:{
					...prevState.songInfo,
					curSong:{
						Name:decodeURIComponent(song.Name),
						Url:decodeURIComponent(song.Url),
					}
				}
			}
		));
		console.log("Now Playing~~ " + song.Name + "\nFrom : " + song.Url);
	}

	toggleVisibility(){ //開關sidelist
		this.setState({ visible: !this.state.visible });
		console.log("toggle!");
	}

	handleItemClick({name}){ // 發生在點sidelist的時候
		// console.log("name:"+name);
		switch (name) {
			case 'folder':
				this.setState({ activeItem: name });
				break;
			default:
				break;
		}
	}
	handleSongListChange(str){
		// console.log(`handleSongListChange: ${str}`);
		this.setState({
			curSongListIndex:parseInt(str),
			activeItem: 'songlist'
		});
	}
	render(){
		return(
			<SongInfoContext.Provider value={this.state.songInfo}>
			<div className={Master.page}>
				<Sidebar.Pushable as={Segment} className={Master.pushable}>
					<SideList
						visible = {this.state.visible}
						activeItem = {this.state.activeItem}
						toggleVisibility = {() => this.toggleVisibility()}
						handleItemClick = {({name}) =>  this.handleItemClick({name})}
						handleSongListChange = {(value) => this.handleSongListChange(value)}
						songLists = {this.state.songLists}
						curSongListIndex = {this.state.curSongListIndex}
					/>
					<Sidebar.Pusher as={"div"} className={Master.bk}>
					  	<PageHeader toggleVisibility = {() => this.toggleVisibility()} curDir={this.state.curDir} setCurDirPop = {(index)=>{this.setCurDirPop(index)}}/>

						<PageGrid
							curDisplayList = {this.state.curDisplayList}
							setCurDir = {(item)=>this.setCurDir(item)}
							setCurSong = {(item)=>this.setCurSong(item)}
							fileExist = {this.state.fileExist}
							loading = {this.state.loading}
							songLists = {this.state.songLists}
							handleAddToSongList = {(songList, song)=>this.handleAddToSongList(songList, song)}
							songQueryURL = {this.state.songQueryURL}
							handleDeleteSong = {(songList, song)=>this.handleDeleteSong(songList, song)}
							curDisplaySongListName = {this.state.curDisplaySongListName}
						/>

						<FooterPlayer/>
					</Sidebar.Pusher>
				</Sidebar.Pushable>

			</div>
			</SongInfoContext.Provider>
		);
	}

}
