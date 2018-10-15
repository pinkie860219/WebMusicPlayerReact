import React from "react";
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid, Label } from 'semantic-ui-react';
import {SideListWithSongList as SideList} from "./SideList.js";
import {PageHeader} from "./PageHeader.js";
import {FooterPlayer} from "./PageFooter.js";
import {PageGrid} from "./PageGrid.js";
import Master from "./css/Master.css";
import queryString from 'query-string';
import * as toolLib from './Util.js';
import {SongInfoContext} from './context/SongInfoContext.js';
import {SongListContext} from './context/SongListContext.js';
import {serverApi} from './other/Api.js';

export class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			visible: false, // sideList的開關

			curDir:[], // 當前的瀏覽路徑

			curDisplayList:[], // 當前的瀏覽路徑下的檔案{Name, Url, IsDir}
			curDisplayList_songList:[],

			fileExist:true,
			loading:true,

			// for SongInfoContext usage
			songInfo:{
				curPlayingList:[], // 現在的播放清單，{Name, Url}
				setSongUrl:(item)=>this.setSongUrl(item),
			},
			// for SongListContext usage
			songListValue:{
				songLists:[],
				handleAddToSongList:(value, hashed)=>this.handleAddToSongList(value, hashed),
				handleDeleteSong:(value, hashed)=>this.handleDeleteSong(value, hashed),
				fetchSongListSongs:(hashed)=>this.fetchSongListSongs(hashed)
			}
		};

	}
	componentDidMount(){ // 程式剛執行時更新頁面
		this.fetchSongLists();
		const queryParams = queryString.parse(this.props.location.search);
		let listCode = queryParams.s?queryParams.s:'';
		let dirCode = queryParams.dir?queryParams.dir:''
		this.fetchSongListSongs(listCode)
		this.fetchAsync(dirCode);
	}
	componentDidUpdate(prevProps, prevState) {
		//url change state
		////////IMPORTANT//////
		if(this.props.location !== prevProps.location){

			const queryParams = queryString.parse(this.props.location.search);
			let listCode = queryParams.s?queryParams.s:'';
			let dirCode = queryParams.dir?queryParams.dir:''

			const prevParams = queryString.parse(prevProps.location.search);
			let prevListCode = prevParams.s?prevParams.s:'';
			let prevDirCode = prevParams.dir?prevParams.dir:''

			const curPath = this.props.location.pathname;
			const prevPath = prevProps.location.pathname;
			const changeToList = (curPath != prevPath) && (curPath == '/songlist');
			const changeToFolder = (curPath != prevPath) && (curPath == '/folder');
			if (listCode != prevListCode || changeToList){
				this.fetchSongListSongs(listCode)
			}
			if (dirCode != prevDirCode || changeToFolder){
				this.fetchAsync(dirCode);
			}
		}
	}


	async fetchAsync(code){ // 更新瀏覽頁面
		this.setState({
			loading:true,
		});
		//console.log("fetchhhhhhhh");
		code = code?code:'';
		let response = await fetch(serverApi.dirURL + code);
		let data = await response.json();

		this.setState({
			curDisplayList: data.DirFiles?data.DirFiles:[],
			curDir:data.DirArray?data.DirArray:[],
			loading:false,
		});
	}
	setSongLists(data){
		this.setState({
			songListValue:{
				...this.state.songListValue,
				songLists:data,
			}
		});
	}
	async fetchSongLists(){

		//console.log("fetchhhhhhhhsonglists");
		let response = await fetch(serverApi.songListURL);
		let data = await response.json();

		this.setSongLists(data);
		//console.log(output);
	}
	async fetchSongListSongs(hashed){
		this.setState({
			loading:true,
		});
		// console.log("fetchhhhhhhhsonglistsong");
		const targetURL = serverApi.songListURL + '/' + hashed;
		let response = await fetch(targetURL);
		//console.log(targetURL);

		let data = await response.json();
		this.setState({
			curDisplayList_songList: data?data:[],
			loading:false,
		});
	}
	async handleAddToSongList(value, hashed){
		// console.log("handleAddToSongList");
		const targetURL = serverApi.songListURL;

		let formData = new FormData();
		formData.append('songlist',value);
		formData.append('hashed',hashed);

		let response = await fetch(targetURL,{
			method:'POST',
			body:formData,
		});
		let data = await response.json();

		this.setSongLists(data);
		// console.log(output);
	}
	async handleDeleteSong(value, hashed){
		// console.log("handleDeleteSong");
		const targetURL = serverApi.songListURL;

		let formData = new FormData();
		formData.append('songlist',value);
		formData.append('hashed',hashed);

		let response = await fetch(targetURL,{
			method:'DELETE',
			body:formData,
		});
		let data = await response.json();

		this.setSongLists(data);
		// console.log(output);
	}
	setCurDir(item){ // 點擊資料夾，設定瀏覽位置

		const queryParams = queryString.parse(this.props.location.search);
		const stringified = queryString.stringify({
			...queryParams,
			dir:item.HashedCode
		});
		this.props.history.push({
			pathname: '/folder',
			search:stringified
		});
	}

	setCurSong(item){ //點音樂item切換音樂
		let songInfo = {...this.state.songInfo};
		const queryParams = queryString.parse(this.props.location.search);
		const stringified = queryString.stringify({
			...queryParams,
			m:item.HashedCode
		});
		this.props.history.push({
			pathname: '/folder',
			search:stringified
		});
		songInfo.curPlayingList = this.getCurPlayingListFromCurDisplayList();
		this.setState({songInfo});

		console.log("Now Playing~~ " + item.Name + "\nFrom : " + serverApi.musicURL+item.HashedCode);

	}

	getCurPlayingListFromCurDisplayList(hashed){
		//把displayList存進playingList
		let found = true;
		if(hashed){
			found = false;
			for(let item of this.state.curDisplayList){
				if(item.HashedCode == hashed){
					found = true;
				}
			}
		}
		let curPlayingList = [];
		if(found){
			for(let item of this.state.curDisplayList){
				if(item.IsDir != true){
					curPlayingList.push(item);
				}
			}
		}
		return curPlayingList;
	}
	setSongUrl(item){
		if (item == undefined){
			item = {
				HashedCode:''
			}
		}
		const queryParams = queryString.parse(this.props.location.search);
		const stringified = queryString.stringify({
			...queryParams,
			m:item.HashedCode
		});
		this.props.history.push({
			search:stringified
		});
		console.log("Now Playing~~ " + item.Name + "\nFrom : " +serverApi.musicURL+item.HashedCode);
	}

	toggleVisibility(){ //開關sidelist
		this.setState({ visible: !this.state.visible });
		//console.log("toggle!");
	}

	handleSongListChange(hashed){
		const queryParams = queryString.parse(this.props.location.search);
		const stringified = queryString.stringify({
			...queryParams,
			s:hashed
		});
		this.props.history.push({
			pathname: '/songlist',
			search:stringified
		});
	}
	render(){
		let DisplayList = this.props.activeItem == 'folder'?
		this.state.curDisplayList:this.state.curDisplayList_songList
		return(
			<SongListContext.Provider value={this.state.songListValue}>
			<SongInfoContext.Provider value={this.state.songInfo}>
			<div className={Master.page}>
				<Sidebar.Pushable as={Segment} className={Master.pushable}>
					<SideList
						visible = {this.state.visible}
						activeItem = {this.props.activeItem}
						toggleVisibility = {() => this.toggleVisibility()}
						handleSongListChange = {(value) => this.handleSongListChange(value)}
					/>
					<Sidebar.Pusher as={"div"} className={Master.bk}>
					  <PageHeader toggleVisibility = {() => this.toggleVisibility()}
							curDir={this.state.curDir}
							setCurDir = {(item)=>this.setCurDir(item)}
							activeItem = {this.props.activeItem}/>
						<PageGrid
							curDisplayList = {DisplayList}
							setCurDir = {(item)=>this.setCurDir(item)}
							setCurSong = {(item)=>this.setCurSong(item)}
							fileExist = {this.state.fileExist}
							loading = {this.state.loading}
						/>
						<FooterPlayer/>
					</Sidebar.Pusher>
				</Sidebar.Pushable>

			</div>
			</SongInfoContext.Provider>
			</SongListContext.Provider>
		);
	}

}
