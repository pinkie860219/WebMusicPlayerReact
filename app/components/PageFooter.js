import React from "react";
import style from "./css/PageFooter.css"
import styled from "styled-components"
import {Item, Image, Header} from "semantic-ui-react"
import {Slider} from "./Slider.js"


const VolumeSliderWidth = 100;
const TimeSliderWidth = 300;

const VolumeSlider = styled(Slider)`
	margin: 0 30px 0 30px;
	width:${VolumeSliderWidth+"px"};
`;
const TimeSlider = styled(Slider)`
	width:${TimeSliderWidth+"px"};
`;

export class PageFooter extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		}

	}

	render(){
		return(
			<div className = {style.footer}>
				<div className = {style.item}>
						<div className = {style.image}>
						</div>
						<Header as='h3' className = {style.meta}>
						    <Header.Content>
						      	三個歐吉桑
						      	<Header.Subheader>
						        	BUMP OF CHICKEN
						    	</Header.Subheader>
						    </Header.Content>
						</Header>
				</div>
				{/*(100% - 250 - 200)-100    margin 50 50*/}
				<TimeSlider widthValue = {300} value={this.props.curTime} max={10000} setCurTime = {(t)=>this.props.setCurTime(t)} />
				<VolumeSlider widthValue = {100} value={this.props.curTime} max={10000} setCurTime = {(t)=>this.props.setCurTime(t)} style={{margin:"0 30px 0 30px"}}/>
			</div>
		);
	}
}
