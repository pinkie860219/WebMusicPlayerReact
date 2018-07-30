import React from "react";
import style from "./css/Slider.scss";
import styled from "styled-components";
const Cinput = styled.input`
	--min: 0;
	--max: ${props => props.max};
	--val: ${props => props.value};
`;

export class Slider extends React.Component {
	handleChange(e){
		let v = e.target.value;
		this.props.onChange(v);
	}
	render(){

		return(
			<div className = {`${style.container} ${this.props.className}`}>
				<Cinput
					className={style.seek}
					type="range"
					value={this.props.value}
					max = {this.props.max}
					min={0}
					onChange = {(e)=>{this.handleChange(e)}}
				/>
			</div>
		);
	}
}
