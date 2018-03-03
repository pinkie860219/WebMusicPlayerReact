import React from "react";
import style from "./css/PageGrid.css";
import styled from "styled-components";
import {DataItem} from "./DataItem.js"
import { Icon, Header} from 'semantic-ui-react';

export class PageGrid extends React.Component {
	constructor(props){
		super(props);
		this.state={
			output:[],
			pColor:['rgba(255, 250, 117, 0.54)','rgba(255, 251, 152, 0.54)'],
			nColor:['rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0.57)'],
			containerStyle: style.container,
		}

	}
	componentWillReceiveProps(nextProps){
		if(nextProps.curDisplayList.length != 0){
			let output = [];
			output = nextProps.curDisplayList.map( (item, index) => {
				let type=0;
				if(item.IsDir){
					console.log("file");
					type=0;//is folder
					return(
						<DataItem key = {index} type={type} content = {item.Name} onClick = {()=>this.props.setCurDir(item.Name)} bkcolor = {this.state.nColor}/>
					);
				}
				else {
					console.log("music");
					type=1;//is music file
					if(item.Name == this.props.curSong){
						return(
							<DataItem key = {index} type={type} content = {item.Name} onClick = {()=>this.props.setCurSong(item.Name)} bkcolor = {this.state.pColor}/>
						);
					} else {
						return(
							<DataItem key = {index} type={type} content = {item.Name} onClick = {()=>this.props.setCurSong(item.Name)} bkcolor = {this.state.nColor}/>
						);
					}
				}

			});
			// console.log("nextprops:");
			// console.log(nextProps);
			// console.log("Grid:");
			// console.log(output);
			this.setState({
				output:output,
				containerStyle: style.container,
			});
		} else {
			let output = (
				<Header as='h2' icon>
					<Icon name='bug' />
						Files not found.
						<Header.Subheader>
							{"Oops, looks like there's no file exists."}
						</Header.Subheader>
				</Header>
			);
			this.setState({
				output:output,
				containerStyle: style.container2,
			});
		}


	}
	render(){
		return(
			<div className = {this.state.containerStyle}>
				{this.state.output}
			</div>
		);

	}
}
