import React from "react";
import styled from "styled-components"
import {Slider} from "./Slider.js";
import styles from './css/VolumeSlider.scss';

export class VolumeSlider extends React.Component {
	render(){
		let iconName;
		if(this.props.muteStatus){
			iconName = "fas fa-volume-off";
		} else if(this.props.value < 50){
			iconName = "fas fa-volume-down";
		} else {
			iconName = "fas fa-volume-up";
		}
		return(
			<div className = {`${this.props.className}`}>
				<div className={styles.iconDiv}>
					<i className={`${iconName} ${styles.icon}`} onClick = {() => this.props.toggleMute()}></i>
				</div>

				<Slider value={this.props.value} max={this.props.max} onChange = {(t)=>this.props.setVolume(t)} />
			</div>
		);
	}
}
