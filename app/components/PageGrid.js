import React from "react";
import style from "./css/PageGrid.css";
import styled from "styled-components";
import {DataItem} from "./DataItem.js"


export class PageGrid extends React.Component {
	constructor(props){
		super(props);
		this.state={
			output:[],
			pColor:['rgba(255, 250, 117, 0.54)','rgba(255, 251, 152, 0.54)'],
			nColor:['rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0.57)'],
		}

	}
	componentWillReceiveProps(nextProps){
		let output = nextProps.curDisplayList.map( item => {
			let type=0;
			if(item.IsDir){
				type=0;//is folder
				return(
					<DataItem key = {item.Name} type={type} content = {item.Name} onClick = {()=>this.props.setCurDir(item.Name)} bkcolor = {this.state.nColor}/>
				);
			}
			else {
				type=1;//is music file
				if(item.Name == this.props.curSong){
					return(
						<DataItem key = {item.Name} type={type} content = {item.Name} onClick = {()=>this.props.setCurSong(item.Name)} bkcolor = {this.state.pColor}/>
					);
				} else {
					return(
						<DataItem key = {item.Name} type={type} content = {item.Name} onClick = {()=>this.props.setCurSong(item.Name)} bkcolor = {this.state.nColor}/>
					);
				}
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
