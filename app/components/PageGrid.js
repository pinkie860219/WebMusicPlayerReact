import React from "react";
import style from "./css/PageGrid.css";
import styled from "styled-components";
import {DataItem} from "./DataItem.js"
import { Loader, Icon, Header} from 'semantic-ui-react';
import * as toolLib from './Util.js';

export class PageGrid extends React.Component {
	constructor(props){
		super(props);
		this.state={
			pColor:['rgba(255, 250, 117, 0.54)','rgba(255, 251, 152, 0.54)'],
			nColor:['rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0.57)'],
		}
	}
	render(){
		const dimmerStyle = this.props.loading? [style.dimmer, style.dimmer_active].join(' '):style.dimmer;
		let output = [];
		let containerStyle;
		if(this.props.curDisplayList.length != 0){
			output = this.props.curDisplayList.map( (item, index) => {
				let type=0;
				if(item.IsDir){
					//console.log("file");
					type=0;//is folder
					return(
						<DataItem
							key = {toolLib.uniqueKey(JSON.stringify(item))} type={type}
							song = {{Name:item.Name, Url:item.Url}}
							onClick = {()=>this.props.setCurDir(item.Name)}
							bkcolor = {this.state.nColor}
							songLists = {this.props.songLists}
							handleAddToSongList = {(songList, song)=>this.props.handleAddToSongList(songList, song)}
							songQueryURL = {this.props.songQueryURL}
							handleDeleteSong = {(songList, song)=>this.props.handleDeleteSong(songList, song)}
							curDisplaySongListName = {this.props.curDisplaySongListName}
						/>
					);
				}
				else {
					//console.log("music");
					type=1;//is music file
					if(decodeURIComponent(item.Url) == decodeURIComponent(this.props.curSongURL)){
						return(
							<DataItem
								key = {toolLib.uniqueKey(JSON.stringify(item))} type={type}
								song = {{Name:item.Name, Url:item.Url}}
								onClick = {()=>this.props.setCurSong(item)}
								bkcolor = {this.state.pColor}
								songLists = {this.props.songLists}
								handleAddToSongList = {(songList, song)=>this.props.handleAddToSongList(songList, song)}
								songQueryURL = {this.props.songQueryURL}
								handleDeleteSong = {(songList, song)=>this.props.handleDeleteSong(songList, song)}
								curDisplaySongListName = {this.props.curDisplaySongListName}
							/>
						);
					} else {
						return(
							<DataItem
								key = {toolLib.uniqueKey(JSON.stringify(item))} type={type}
								song = {{Name:item.Name, Url:item.Url}}
								onClick = {()=>this.props.setCurSong(item)}
								bkcolor = {this.state.nColor}
								songLists = {this.props.songLists}
								handleAddToSongList = {(songList, song)=>nextProps.handleAddToSongList(songList, song)}
								songQueryURL = {this.props.songQueryURL}
								handleDeleteSong = {(songList, song)=>this.props.handleDeleteSong(songList, song)}
								curDisplaySongListName = {this.props.curDisplaySongListName}
							/>
						);
					}
				}
			});
			containerStyle = this.props.loading? [style.container, style.dim].join(' '):style.container;
		} else {
			output = (
				<Header as='h2' icon>
					<Icon name='bug' />
						Files not found.
						<Header.Subheader>
							{"Oops, looks like there's no file exists."}
						</Header.Subheader>
				</Header>
			);
			containerStyle = this.props.loading? [style.container2, style.dim].join(' '):style.container2;
		}

		return(
			<div className = {style.container}>
				<div className = {dimmerStyle}>
					<Loader active={this.props.loading} size='large'>Preparing Files</Loader>
				</div>

				<div className = {containerStyle}>
					{output}
				</div>
			</div>
		);

	}
}
