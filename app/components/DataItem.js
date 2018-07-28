import React from "react";
import styles from "./css/DataItem.scss";
import styled from "styled-components";
import { Icon, Header, Button,  Input, } from 'semantic-ui-react';
import {Dropdown} from './Dropdown.js';
import {withSongInfo} from './context/SongInfoContext.js';

const CDropdown = styled(Dropdown)`
	display: inline-flex !important;
	height: auto !important;
	margin: 0 0 0 0 !important;
`;
class DataItem extends React.Component {
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

		//console.log("construcor:"+icon_type);
		this.state={
			icon_type:icon_type,
			dropdownSignal:false,
			visiblePlus:false,
			visibleDropdown:false,
			dropdownFlag:false,
		};
	}
	componentWillReceiveProps(nextProps){
		let icon_type;
		switch (nextProps.type) {
			case 0:
				icon_type="folder";
				break;
			case 1:
				icon_type="video play outline";
				break;

		}
		this.setState({
			icon_type:icon_type,
		});
	}
	clickHandler(){
		this.props.onClick();
	}
	toggleDropdown(){
		if(!this.state.dropdownFlag){
			this.setState({
				visibleDropdown: !this.state.visibleDropdown,
			});
		}
	}
	setVisible(newVisible){
		this.setState({
			visibleDropdown:newVisible,
		});
	}
	render(){
		//console.log(`dataitem render ${this.props.key}`);
		let tail, icon;
		switch (this.props.type) {
			case 0:
				icon = (<i className={`fas fa-folder ${styles.icon}`}></i>);
				break;
			case 1:
				const plusStyle = this.state.visibleDropdown?styles.plusVisible:styles.plusHidden;
				icon = (<i className={`far fa-play-circle ${styles.icon}`}></i>);
				tail = (<div
					className={`${styles.tail}  ${plusStyle}`}
					onClick={()=>this.toggleDropdown()}>
					<i className={`fas fa-plus`}></i>
					<Dropdown
						songLists={this.props.songLists}
						signal={this.state.dropdownSignal}
						visible={this.state.visibleDropdown}
						setVisible = {(t)=>this.setVisible(t)}
						song={this.props.song}
						handleAddToSongList = {(songList, song)=>this.props.handleAddToSongList(songList, song)}
						songQueryURL = {this.props.songQueryURL}
						handleDeleteSong = {(songList, song)=>this.props.handleDeleteSong(songList, song)}
						curDisplaySongListName = {this.props.curDisplaySongListName}
						distory = {()=>this.distory()}/>
					</div>);
				break;

		}

		let colorStyle;
		if(decodeURIComponent(this.props.song.Url) == decodeURIComponent(this.props.curSong.Url)){
			colorStyle = styles.playing;
		} else {
			colorStyle = styles.notPlaying;
		}
		return(
			<div
				className = {`${styles.container} ${colorStyle}`}>
				<div className={styles.head} onClick = {()=>this.clickHandler()}>
					{icon}
					<div className = {styles.header} >
						{this.props.song.Name}
					</div>
				</div>
				{tail}
			</div>
		);
	}
}
export const DataItemWithSongInfo = withSongInfo(DataItem);
