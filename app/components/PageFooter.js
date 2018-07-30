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

class PageFooter extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			curSong:{}, // 現在播放的音樂{Name:歌名, Url,網址 }
			playStatus:Sound.status.STOPPED, // 音樂的播放狀態
			loopStatus:0, // 預設不重複播放，1全部播放，2單曲播放
			curTime: 0, // 音樂的現在的播放時間
			songTime:0, // 音樂的全長
			volume:100, // 音量
			lastVolume:0,
			muteStatus:false,
			encodeSongUrl:"",//encode後的songurl
		}

	}
	componentDidUpdate(prevProps, prevState){
		////check curSongURL
		if(JSON.stringify(this.props.curSong) !== JSON.stringify(prevProps.curSong)){
			this.setState({
				encodeSongUrl:toolLib.playURL(this.props.curSong.Url),
				curTime:0,
				playStatus:Sound.status.PLAYING,
			});
		}
	}
	togglePlayStatus(){ // 暫停or播放音樂
		if(this.state.playStatus == Sound.status.PLAYING){
			this.setState({
				playStatus:Sound.status.PAUSED,
			});
		} else if(this.props.curSong.Url){
			this.setState({
				playStatus:Sound.status.PLAYING,
			});
		}
	}
	setCurTime(t){ // TSlider設定歌曲時間，curSong有的時候才有效
		if(this.props.curSong){
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
		for(let i in this.props.curPlayingList){
			const curUrl = decodeURIComponent(this.props.curSong.Url);
			const listUrl = decodeURIComponent(this.props.curPlayingList[i].Url)
			if(listUrl == curUrl){
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

		//this.setSongURL(this.state.curPlayingList[index]);
		this.props.setSongUrl({
			Name:this.props.curPlayingList[index].Name,
			Url:this.props.curPlayingList[index].Url,
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
		// console.log("setSongURLtoPre");
		//如果時間小於2秒，上一首，else，時間回到0
		let curIndex; // 目前的index
		for(let i in this.props.curPlayingList){
			const curUrl = decodeURIComponent(this.props.curSong.Url);
			const listUrl = decodeURIComponent(this.props.curPlayingList[i].Url)
			if(listUrl == curUrl){
				curIndex = i;
			}
		}
		curIndex = parseInt(curIndex);

		if(this.state.curTime / 1000 < 2 && curIndex > 0){
			let index = curIndex - 1 > 0 ? curIndex - 1 : 0;
			//this.setSongURL(this.state.curPlayingList[index]);
			this.props.setSongUrl({
				Name:this.props.curPlayingList[index].Name,
				Url:this.props.curPlayingList[index].Url,
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
	render(){
		return(
			<div className = {style.footer}>
				<Sound
					url = {this.state.encodeSongUrl}
					playStatus = {this.state.playStatus}
					volume = {this.state.volume}
					position = {this.state.curTime}
					onError = {(c,d)=>{
						console.log('!!!!'+d +'\n' + this.props.curSong.Name);
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
				<div className = {style.panel}>
					<div className = {style.item}>
							<div className = {style.meta}>
								<div className={style.songName}>{this.props.curSong.Name||'現在播放歌曲'}</div>
								<div className={style.subTitle}>音樂家</div>
							</div>
					</div>
					<CtrlBtn
						className = {style.CtrlBtn}
						playStatus = {this.state.playStatus}
						loopStatus = {this.state.loopStatus}
						setLoopStatus = {()=>this.setLoopStatus()}
						setSongURLtoNext = {() => this.setSongURLtoNext()}
						setSongURLtoPre = {() => this.setSongURLtoPre()}
						togglePlayStatus = {() => this.togglePlayStatus()}
					/>
				</div>
				<TimeSlider
					value={this.state.curTime}
					max={this.state.songTime}
					setCurTime = {(t)=>this.setCurTime(t)}
					className = {style.TSlider}
				/>
				<VolumeSlider
					value={this.state.volume}
					max={100}
					setVolume = {(t)=>this.setVolume(t)}
					muteStatus = {this.state.muteStatus}
					toggleMute = {this.toggleMute}
					className = {style.VSlider}
				/>
			</div>
		);
	}
}
export const FooterPlayer = withSongInfo(PageFooter);
