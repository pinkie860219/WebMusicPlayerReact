import React from "react";
import style from "./css/PageFooter.css";
import styled from "styled-components";
import {Item, Image, Header} from "semantic-ui-react";
import {Slider} from "./Slider.js";
import {VolumeSlider} from "./VolumeSlider.js";
import {TimeSlider} from "./TimeSlider.js";
import {CtrlBtn} from "./CtrlBtn.js";


const TimeSliderWidth = 300;
const VolumeSliderWidth = 200;

const TSlider = styled(TimeSlider)`
`;
const VSlider = styled(VolumeSlider)`
	width:${VolumeSliderWidth+"px"};
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
				<div className = {style.panel}>
					<div className = {style.item}>
							<div className = {style.image}>
							</div>
							<Header as='h3' className = {style.meta}>
								<Header.Content>
									{this.props.curSong}
									<Header.Subheader>
										音樂家
									</Header.Subheader>
								</Header.Content>
							</Header>
					</div>
					<CtrlBtn
						className = {style.CtrlBtn}
						playStatus = {this.props.playStatus}
						loopStatus = {this.props.loopStatus}
						setLoopStatus = {()=>this.props.setLoopStatus()}
						setSongURLtoNext = {() => this.props.setSongURLtoNext()}
						setSongURLtoPre = {() => this.props.setSongURLtoPre()}
						togglePlayStatus = {() => this.props.togglePlayStatus()}
					/>
				</div>
				<TSlider
					value={this.props.curTime}
					max={this.props.songTime}
					setCurTime = {(t)=>this.props.setCurTime(t)}
					className = {`${style.TSlider} ${this.props.className}`}
				/>
				<VSlider
					value={this.props.volume}
					max={100}
					setVolume = {(t)=>this.props.setVolume(t)}
					muteStatus = {this.props.muteStatus}
					toggleMute = {this.props.toggleMute}
					className = {`${style.VSlider} ${this.props.className}`}
				/>
			</div>
		);
	}
}
