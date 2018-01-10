import React from "react";
import style from "./css/Slider.css";
import styled from "styled-components"
import {Slider} from "./Slider.js";
import {Icon, Header} from "semantic-ui-react";

const TSlider = styled(Slider)`
	display:inline-flex;
	flex-shrink:1;
	width:100%;
	margin-left: 20px;
`;

export class TimeSlider extends React.Component {
	constructor(props){
		super(props);

	}
	HHMMSS(time){//time in second
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
			<div className = {`${this.props.className}`}>
				{output}
				<TSlider value={this.props.value} max={this.props.max} onChange = {(t)=>this.props.setCurTime(t)} />
			</div>
		);
	}
}
