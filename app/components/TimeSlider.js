import React from "react";
import styled from "styled-components"
import {Slider} from "./Slider.js";
import {Icon, Header} from "semantic-ui-react";
import styles from './css/TimeSlider.scss';

export class TimeSlider extends React.Component {


	render(){

		return(
			<div className = {`${styles.container} ${this.props.className}`}>
				<Slider value={this.props.value} max={this.props.max} onChange = {(t)=>this.props.setCurTime(t)} type='time-track' />
			</div>
		);
	}
}
