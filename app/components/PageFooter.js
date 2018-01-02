import React from "react";
import style from "./css/PageFooter.css";
import styled from "styled-components";
import {Item, Image, Header} from "semantic-ui-react";
import {Slider} from "./Slider.js";
import {VolumeSlider} from "./VolumeSlider.js";


const TimeSliderWidth = 300;
const VolumeSliderWidth = 200;


const TimeSlider = styled(Slider)`
	display:block;
	margin: 0 30px 0 30px;
	overflow: auto;
	height:50px;
		border: 2px solid rgb(187, 88, 2);
  display: flex;
  align-items: center;
`;
const VSlider = styled(VolumeSlider)`
	width:${VolumeSliderWidth+"px"};
	margin: 0 30px 0 30px;
	float:right;
	height:50px;
		border: 2px solid rgb(138, 8, 63);
  display: flex;
  align-items: center;
`;

export class PageFooter extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			widthValue:0,
		}

	}
	componentDidMount () {
        this.setState({widthValue:this.myInput.offsetWidth})
    }
	render(){
		return(
			<div className = {style.footer} ref={input => {this.myInput = input}}>
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
				<VSlider value={this.props.curTime} max={10000} setCurTime = {(t)=>this.props.setCurTime(t)} style={{margin:"0 30px 0 30px"}}/>
				<TimeSlider value={this.props.curTime} max={10000} setCurTime = {(t)=>this.props.setCurTime(t)} />
			</div>
		);
	}
}
