import React from "react";
import Sound from "react-sound";
import style from "./css/CtrlBtn.css";
import styled from "styled-components";
import {Button, Icon} from "semantic-ui-react"
const CButton = styled(Button)`
	display:inline-flex !important;
`;
const LoopButton = styled.div`
	display:inline-flex;
	position:relative;
`;
const CIcon = styled(Icon)`
	display:inline-flex !important;
	margin:0 0 0 10px !important;
	padding: 0 !important;

	transition: all 0.1s ease !important;
`;
const FloatIcon = styled.div`
	display:${props => props.loopDisplay};
	color:white;
	background-color:rgb(255, 61, 61);
	border-radius:100%;
	height:1em;
	width:1em;
	font-size: 15px;
	line-height:15px;
	padding:0;
	margin:0 auto;
	justify-content: center;
	align-content: center;
	position: absolute;
	right:-5px;
	top:-5px;
	
`;
export class CtrlBtn extends React.Component {
	constructor(props){
		super(props);
		this.state={
			playIcon : "play",
			loopDisplay:"none",
			loopColor:"black",
		}

	}
	componentWillReceiveProps(nextProps){
		if(nextProps.playStatus == Sound.status.PLAYING){
			this.setState({
				playIcon : "pause",
			});
		} else {
			this.setState({
				playIcon : "play",
			});
		}
		switch (nextProps.loopStatus) {
			case 0:
				this.setState({
					loopDisplay:"none",
					loopColor:"black",
				});
				break;
			case 1:
				this.setState({
					loopDisplay:"none",
					loopColor:"green",
				});
				break;
			case 2:
				this.setState({
					loopDisplay:"inline-flex",
					loopColor:"green",
				});
				break;
		}

	}
	render(){
		return(
			<div className = {`${style.container} ${this.props.className}`}>
				<CButton circular color='black' basic icon='step backward'
					onClick = {() => this.props.setSongURLtoPre()}
				/>
				<CButton circular color='black' basic icon={this.state.playIcon}
					onClick = {() => this.props.togglePlayStatus()}
				/>
				<CButton circular color='black' basic icon='step forward'
					onClick = {() => this.props.setSongURLtoNext()}
				/>
				<LoopButton onClick = {()=>this.props.setLoopStatus()}>
					<CIcon name='retweet' link size='large' color={this.state.loopColor}/>
					<FloatIcon loopDisplay = {this.state.loopDisplay}>1</FloatIcon>
				</LoopButton>
			</div>
		);
	}
}
