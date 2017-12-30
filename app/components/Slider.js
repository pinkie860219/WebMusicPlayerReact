import React from "react";
import style from "./css/Slider.css";
export class Slider extends React.Component {
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
			<div className = {style.container} style = {{width:this.props.widthValue}}>
				<input className={style.seek} type="range" value={this.props.value} max = {this.props.max} onChange = {(e)=>{this.handleChange(e)}}/>
			</div>
		);
	}
}
