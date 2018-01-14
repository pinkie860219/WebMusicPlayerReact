import React from "react";
import style from "./css/Slider.css";
import styled from "styled-components"
import {Slider} from "./Slider.js";
import {Icon, Header} from "semantic-ui-react";

const VSlider = styled(Slider)`
	display:inline-flex;
	flex-shrink:1;
	width:100%;
`;
const IconDiv = styled.div`
	display:inline-flex;

	justify-content: center;
	width:30px;
`;
const CIcon = styled(Icon)`
	width:100%;
	display:inline-flex;
`;

export class VolumeSlider extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			icon_name:"volume up",
		}

	}
	componentWillReceiveProps(nextProps){
		if(nextProps.muteStatus){
			this.setState({
				icon_name:"volume off",
			});
		} else if(nextProps.value < 50){
			this.setState({
				icon_name:"volume down",
			});
		} else {
			this.setState({
				icon_name:"volume up",
			});
		}
	}
	render(){

		return(
			<div className = {`${this.props.className}`}>
				<IconDiv>
					<CIcon name={this.state.icon_name} size='large' link onClick = {() => this.props.toggleMute()}/>
				</IconDiv>
				<VSlider value={this.props.value} max={this.props.max} onChange = {(t)=>this.props.setVolume(t)} />
			</div>
		);
	}
}
