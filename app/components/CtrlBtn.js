import React from "react";
import Sound from "react-sound";
import style from "./css/CtrlBtn.scss";
import styled from "styled-components";
import {Button, Icon} from "semantic-ui-react"

const PlayButton = (props) => {
	return(
		<button className={`${style.btn} ${style.playBtn} ${props.play?style.playing:style.paused}`} onClick={props.onClick}>
			{props.play?<i className="fas fa-pause"></i>:<i className="fas fa-play"></i>}
		</button>
	)
}
const NextButton = (props) => (
	<button className={`${style.btn} ${style.nextBtn}`} onClick={props.onClick}>
		{props.icon}
	</button>
);
const LoopButton = (props) =>{
	let loopStyle = ''
	switch (props.loopStatus) {
		case 0:
			loopStyle = style.loopStatus_0;
			break;
		case 1:
			loopStyle = style.loopStatus_1;
			break;
		case 2:
			loopStyle = style.loopStatus_2;
			break;
		default:

	}
	return (<button className={`${style.btn} ${style.loopBtn} ${loopStyle}`} onClick={props.onClick}>
		<i className="fas fa-retweet"></i>
		<div className={style.pocket}><div className={style.floatIcon}>1</div></div>

	</button>)
}
export class CtrlBtn extends React.Component {
	constructor(props){
		super(props);
		this.state={
			loopDisplay:"none",
			loopColor:"black",
		}
	}
	render(){
		return(
			<div className = {`${style.container} ${this.props.className}`}>
				<NextButton
					icon={<i className="fas fa-step-backward"></i>}
					onClick = {() => this.props.setSongURLtoPre()}/>
				<PlayButton
					play={this.props.playStatus == Sound.status.PLAYING}
					onClick = {() => this.props.togglePlayStatus()}/>
				<NextButton
					icon={<i className="fas fa-step-forward"></i>}
					onClick = {() => this.props.setSongURLtoNext()}/>
				<LoopButton onClick = {()=>this.props.setLoopStatus()} loopStatus = {this.props.loopStatus}/>
			</div>
		);
	}
}
