import React from "react";
import style from "./css/Slider.css";
import styled from "styled-components"
import {Slider} from "./Slider.js";
import {Icon, Header} from "semantic-ui-react";

const Cspan = styled.span`
	display: inline-flex;
	flex:0 0 auto;
`;
const TSlider = styled(Slider)`
	display:inline-flex;
	width:100%;
	flex-shrink:1;
	margin-left: 20px;
`;

export class TimeSlider extends React.Component {
	constructor(props){
		super(props);

	}
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
			<div className = {`${this.props.className}`}>
				<Cspan>
					{output}
				</Cspan>
				<TSlider value={this.props.value} max={this.props.max} onChange = {(t)=>this.props.setCurTime(t)} />
			</div>
		);
	}
}
