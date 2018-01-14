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
	componentWillReceiveProps(nextProps){
		this.setState({
			value:nextProps.value,
		});
	}
	handleChange(e){
		let v = e.target.value;
		this.setState({
			value:v
		});
		this.props.onChange(v);
	}
	render(){

		return(
			<div className = {`${style.container} ${this.props.className}`}>
				<input className={style.seek} type="range" value={this.state.value} max = {this.props.max} onChange = {(e)=>{this.handleChange(e)}}/>
			</div>
		);
	}
}
