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

export class VolumeSlider extends React.Component {
	constructor(props){
		super(props);

	}
	render(){

		return(
			<div className = {`${this.props.className}`}>
				<Icon name='volume up' size='large'/>
				<VSlider value={this.props.value} max={this.props.max} onChange = {(t)=>this.props.setVolume(t)} />
			</div>
		);
	}
}
