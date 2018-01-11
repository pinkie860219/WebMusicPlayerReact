import React from "react";
import style from "./css/DataItem.css";
import styled from "styled-components";
import { Icon, Header} from 'semantic-ui-react';
export class DataItem extends React.Component {
	constructor(props){
		super(props);
		let icon_type;
		switch (this.props.type) {
			case 0:
				icon_type="folder";
				break;
			case 1:
				icon_type="video play outline";
				break;

		}
		this.state={
			color:"grey",
			bkcolorIndex:0,
			icon_type:icon_type,
		};
	}
	clickHandler(str){
		this.props.onClick();
	}
	mouseOver(){
		this.setState({
			color:"black",
			bkcolorIndex:1,
		});
	}
	mouseOut(){
		this.setState({
			color:"grey",
			bkcolorIndex:0,
		});
	}
	render(){

		return(
			<div
				className = {`${style.container} ${this.props.className}`} onMouseOver={()=>this.mouseOver()}
				onMouseOut={()=>this.mouseOut()}
				onClick = {()=>this.clickHandler()}
				style={{backgroundColor:this.props.bkcolor[this.state.bkcolorIndex]}}>
				<Icon
					color={this.state.color}
					name={this.state.icon_type}
					className = {style.icon}
					size="large"
				/>
				<Header color={this.state.color} className = {style.header} >
					{this.props.content}
				</Header>
			</div>
		);
	}
}
