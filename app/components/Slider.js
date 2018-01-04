import React from "react";
import style from "./css/Slider.css";
import styled from "styled-components";
export class Slider extends React.Component {
	constructor(props){
		super(props);
		this.state={
			value:this.props.value,
		}

	}
	handleChange(e){
		this.setState({
			value:e.target.value
		});
		this.props.onChange(this.state.value);
	}
	render(){

		return(
			<div className = {`${style.container} ${this.props.className}`}>
				<input className={style.seek} type="range" value={this.props.value} max = {this.props.max} onChange = {(e)=>{this.handleChange(e)}}/>
			</div>
		);
	}
}
