import React from "react";
import style from "./css/PageGrid.css";
import styled from "styled-components";
import {DataItem} from "./DataItem.js"
export class PageGrid extends React.Component {
	constructor(props){
		super(props);
		this.state={
			output:[],
		}

	}
	componentWillReceiveProps(nextProps){
		let output = nextProps.curDisplayList.map( item => {
			let type=0;
			if(item.IsDir){
				type=0;//is folder
				return(
					<DataItem key = {item.Name} type={type} content = {item.Name} onClick = {()=>this.props.setCurDir(item.Name)}/>
				);
			}
			else {
				type=1;//is music file
				return(
					<DataItem key = {item.Name} type={type} content = {item.Name} onClick = {()=>this.props.setCurSong(item.Name)}/>
				);
			}

		});
		// console.log(output);
		this.setState({
			output:output,
		});
	}
	render(){
		return(
			<div className = {style.container}>
				{this.state.output}
			</div>
		);
	}
}
