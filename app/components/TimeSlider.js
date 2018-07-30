import React from "react";
import styled from "styled-components"
import {Slider} from "./Slider.js";
import {Icon, Header} from "semantic-ui-react";
import styles from './css/TimeSlider.scss';

const TSlider = styled(Slider)`
	margin-left: 20px;
`;

export class TimeSlider extends React.Component {

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
				<span className = {styles.time}>
					{output}
				</span>
				<TSlider value={this.props.value} max={this.props.max} onChange = {(t)=>this.props.setCurTime(t)} />
			</div>
		);
	}
}
