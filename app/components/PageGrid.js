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
	updatePage(nextProps){
		console.log("updatePage");
		if(nextProps.curDisplayList.length != 0){
			let output = [];
			output = nextProps.curDisplayList.map( (item, index) => {
				let type=0;
				if(item.IsDir){
					//console.log("file");
					type=0;//is folder
					return(
						<DataItem
							key = {index} type={type} content = {item.Name}
							onClick = {()=>nextProps.setCurDir(item.Name)}
							bkcolor = {this.state.nColor}
							songLists = {nextProps.songLists}
							url = {item.Url}
							handleAddToSongList = {(songList, song)=>this.props.handleAddToSongList(songList, song)}
						/>
					);
				}
				else {
					//console.log("music");
					type=1;//is music file
					if(item.Name == nextProps.curSong){
						return(
							<DataItem
								key = {index} type={type} content = {item.Name}
								onClick = {()=>nextProps.setCurSong(item)}
								bkcolor = {this.state.pColor}
								songLists = {nextProps.songLists}
								url = {item.Url}
								handleAddToSongList = {(songList, song)=>this.props.handleAddToSongList(songList, song)}
							/>
						);
					} else {
						return(
							<DataItem
								key = {index} type={type} content = {item.Name}
								onClick = {()=>nextProps.setCurSong(item)}
								bkcolor = {this.state.nColor}
								songLists = {nextProps.songLists}
								url = {item.Url}
								handleAddToSongList = {(songList, song)=>this.props.handleAddToSongList(songList, song)}
							/>
						);
					}
				}

			});
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
	componentWillReceiveProps(nextProps){
		if(
			JSON.stringify(nextProps.curDisplayList) !== JSON.stringify(this.props.curDisplayList) ||
			JSON.stringify(nextProps.songLists) !==
			JSON.stringify(this.props.songLists)
		){
			this.updatePage(nextProps);
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
