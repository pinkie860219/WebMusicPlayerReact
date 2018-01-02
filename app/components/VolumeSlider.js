import React from "react";
import style from "./css/Slider.css";
import styled from "styled-components"
import {Slider} from "./Slider.js";

const Div = styled.div`
	display: inline-block;
	padding: 0;
	border:2px solid rgb(231, 40, 244);
`;
const VSlider = styled(Slider)`
	width:auto;
`;

export class VolumeSlider extends React.Component {
	constructor(props){
		super(props);

	}
	handleChange(e){
		this.setState({
			value:e.target.value
		});
		this.props.setCurTime(this.state.value);
	}
	render(){

		return(
			<div className = {`${style.container} ${this.props.className}`}>
				<Slider value={this.props.value} max={this.props.max} setCurTime = {(t)=>this.props.setCurTime(t)} />
			</div>
		);
	}
}
