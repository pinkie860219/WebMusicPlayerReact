import React from "react";
import style from "./css/PageFooter.scss";
import {Item, Image, Header} from "semantic-ui-react";
import {Slider} from "./Slider.js";
import {VolumeSlider} from "./VolumeSlider.js";
import {TimeSlider} from "./TimeSlider.js";
import {CtrlBtn} from "./CtrlBtn.js";
import Sound from "react-sound";
import * as toolLib from './Util.js';
import {withSongInfo} from './context/SongInfoContext.js';
import {serverApi} from './other/Api.js';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';

class SongClock extends React.Component{
	HHMMSS(ms){//time in ms
		let time = Math.floor(ms/1000);
		let hr = Math.floor(time/3600);
		let min = Math.floor((time - hr * 3600) / 60);
		let sec = time - hr*3600 - min * 60;
		let rt = [];
		if(hr){
			rt.push(hr);
			if(min<10){min = "0"+min;}
		}
		rt.push(min);
		if(sec<10){sec = "0"+sec;}
		rt.push(sec);
		return rt.join(":");
	}
	render(){
		const output = this.HHMMSS(this.props.value)+"/"+this.HHMMSS(this.props.max)
		return(
			<span className = {style.time}>
				{output}
			</span>
		);
	}
}
class PageFooter extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			//curSong:{}, // 現在播放的音樂{Name:歌名, Url,網址 }
			curSongName:'',
			playStatus:Sound.status.STOPPED, // 音樂的播放狀態
			loopStatus:0, // 預設不重複播放，1全部播放，2單曲播放
			curTime: 0, // 音樂的現在的播放時間
			songTime:0, // 音樂的全長
			volume:70, // 音量
			lastVolume:0,
			muteStatus:false,
			SongUrl:"",//encode後的songurl
		}

	}
	componentDidUpdate(prevProps, prevState){
		////check curSongURL
		const queryParams = queryString.parse(this.props.location.search);
		let curSongCode = queryParams.m?queryParams.m:''
		const prevParams = queryString.parse(prevProps.location.search);
		let prevSongCode = prevParams.m?prevParams.m:''

		if(curSongCode !== prevSongCode){
			this.fetchSongName(curSongCode);
			this.setState({
				SongUrl:serverApi.musicURL + curSongCode,
				curTime:0,
				playStatus:Sound.status.PLAYING,
			});
		}
	}
	async fetchSongName(hashed){
		let response = await fetch(serverApi.songNameURL+hashed);
		let songName = await response.text();
		console.log(songName);
		this.setState({
			curSongName:songName
		})
	}
	togglePlayStatus(){ // 暫停or播放音樂
		const queryParams = queryString.parse(this.props.location.search);
		let curSongCode = queryParams.m?queryParams.m:''
		if(this.state.playStatus == Sound.status.PLAYING){
			this.setState({
				playStatus:Sound.status.PAUSED,
			});
		} else if(curSongCode){
			this.setState({
				playStatus:Sound.status.PLAYING,
			});
		}
	}
	setCurTime(t){ // TSlider設定歌曲時間，curSong有的時候才有效
		const queryParams = queryString.parse(this.props.location.search);
		let curSongCode = queryParams.m?queryParams.m:''
		if(curSongCode){
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
	setLoopStatus(){
		let  c = (this.state.loopStatus + 1) % 3;
		this.setState({
			loopStatus: c,
		});
	}
	setSongURLtoNext(){// 下一首
		// console.log("setSongURLtoNext");
		let index = 5; // 下一首的index
		let curIndex = 0; // 目前的index
		// console.log(`curPlayingList:`);
		// console.log(this.props.curPlayingList);
		const queryParams = queryString.parse(this.props.location.search);
		let curSongCode = queryParams.m?queryParams.m:''

		for(let i in this.props.curPlayingList){
			const curHashed = curSongCode;
			const listHashed = this.props.curPlayingList[i].HashedCode;
			if(listHashed == curHashed){
				curIndex = i;
			}
		}
		curIndex = parseInt(curIndex);
		// console.log(`curIndex:${curIndex}`);
		//正常狀況，播完清單即停止

		switch (this.state.loopStatus) {
			case 0:
				index = (curIndex + 1) < this.props.curPlayingList.length ? (curIndex + 1) : 0;
				break;
			case 1:
				index = (curIndex + 1) % this.props.curPlayingList.length;
				break;
			case 2:
				index = curIndex;
				break;
		}

		this.props.setSongUrl(this.props.curPlayingList[index]);
		if(index || this.state.loopStatus){
			this.setState({
				curTime : 0,
			});
		} else{
			this.setState({
				playStatus:Sound.status.STOPPED,
				curTime : 0,
			});
		}
	}
	setSongURLtoPre(){ // 上一首
		// console.log("setSongURLtoPre");
		//如果時間小於2秒，上一首，else，時間回到0
		let curIndex; // 目前的index
		const queryParams = queryString.parse(this.props.location.search);
		let curSongCode = queryParams.m?queryParams.m:''

		for(let i in this.props.curPlayingList){
			const curHashed = curSongCode;
			const listHashed = this.props.curPlayingList[i].HashedCode;
			if(listHashed == curHashed){
				curIndex = i;
			}
		}
		curIndex = parseInt(curIndex);

		if(this.state.curTime / 1000 < 2 && curIndex > 0){
			let index = curIndex - 1 > 0 ? curIndex - 1 : 0;
			//this.setSongURL(this.state.curPlayingList[index]);
			this.props.setSongUrl(this.props.curPlayingList[index]);
			this.setState({
				curTime : 0,
			});
		} else{
			this.setState({
				curTime : 0,
			});
		}
	}
	render(){
		return(
			<div className = {style.footer}>
				<Sound
					url = {this.state.SongUrl}
					playStatus = {this.state.playStatus}
					volume = {this.state.volume}
					position = {this.state.curTime}
					onError = {(c,d)=>{
						console.log('!!!!'+d +'\n' + this.state.curSongName);
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
				<TimeSlider
					value={this.state.curTime}
					max={this.state.songTime}
					setCurTime = {(t)=>this.setCurTime(t)}
					className = {style.TSlider}
				/>
				<div>
					<div className = {style.panel}>
						<div className = {style.item}>
								<div className = {style.meta}>
									<div className={style.songName}>{this.state.curSongName||'現在播放歌曲'}</div>
									<div className={style.subTitle}>音樂家</div>
								</div>
						</div>
						<div className={style.ctrlAndTime}>
							<CtrlBtn
								className = {style.CtrlBtn}
								playStatus = {this.state.playStatus}
								loopStatus = {this.state.loopStatus}
								setLoopStatus = {()=>this.setLoopStatus()}
								setSongURLtoNext = {() => this.setSongURLtoNext()}
								setSongURLtoPre = {() => this.setSongURLtoPre()}
								togglePlayStatus = {() => this.togglePlayStatus()}
								/>
							<SongClock
								value={this.state.curTime}
								max={this.state.songTime}/>
						</div>



						<VolumeSlider
							value={this.state.volume}
							max={100}
							setVolume = {(t)=>this.setVolume(t)}
							muteStatus = {this.state.muteStatus}
							toggleMute = {()=>this.toggleMute()}
							className = {style.VSlider}
						/>
					</div>

				</div>

			</div>
		);
	}
}
export const FooterPlayer = withRouter(withSongInfo(PageFooter));
