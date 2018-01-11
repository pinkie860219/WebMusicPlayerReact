import React from "react";
import Sound from "react-sound";
import style from "./css/CtrlBtn.css";
import styled from "styled-components";
import {Button, Icon} from "semantic-ui-react"
const CButton = styled(Button)`
	display:inline-flex !important;
`;
const CIcon = styled(Icon)`
	display:inline-flex !important;
	margin:0 0 0 10px !important;
	padding: 0 !important;
`;
export class CtrlBtn extends React.Component {
	constructor(props){
		super(props);
		this.state={
			playIcon : "play",
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
				<CIcon name='retweet' link size='large'/>
			</div>
		);
	}
}
