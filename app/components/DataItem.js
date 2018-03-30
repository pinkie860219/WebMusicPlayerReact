import React from "react";
import style from "./css/DataItem.css";
import styled from "styled-components";
import { Icon, Header, Button,  Input, } from 'semantic-ui-react';
import {Dropdown} from './Dropdown.js'
const CIcon = styled(Icon)`
	display: inline-flex !important;
	height: auto !important;
	margin: 0 10 0 0 !important;
	padding:2px 0 0 2px !important;
`;
const CDropdown = styled(Dropdown)`
	display: inline-flex !important;
	height: auto !important;
	margin: 0 0 0 0 !important;
`;
const Div = styled.div`
	display: inline-flex;
	align-items:center;
	height:100%;
`;
const Div1 = Div.extend`
	flex:1;
`;
const Div2 = Div.extend`
	justify-content: center;
	width:auto;
	border-radius: 0 5px 5px 0;
`;
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

		//console.log("construcor:"+icon_type);
		this.state={
			color:"grey",
			colorAdd:"grey",
			bkcolorIndex:0,
			icon_type:icon_type,
			dropdownSignal:false,
			visiblePlus:false,
			visibleDropdown:false,
			dropdownFlag:false,
			colorStyle_state:0,
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
		if(this.props.refreshSignal != nextProps.refreshSignal){
			this.refresh();
		}
		this.setState({
			icon_type:icon_type,
		});
	}
	componentDidMount(){
		this.refresh();
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
	mouseOver(){
		this.setState({
			color:"black",
			bkcolorIndex:1,
			visiblePlus: true,
		});
	}
	mouseOut(){
		this.setState({
			color:"grey",
			bkcolorIndex:0,
			visiblePlus: false,
		});
	}
	mouseOverAdd(){
		this.setState({
			colorAdd:"black",
		});
	}
	mouseOutAdd(){
		this.setState({
			colorAdd:"grey",
		});
	}
	setVisible(newVisible){
		this.setState({
			visibleDropdown:newVisible,
		});
	}
	distory(){
		console.log("distory");
		this.setState({
			colorStyle_state:1,
		});
		setTimeout(()=>{
			this.setState({
				colorStyle_state:2,
			})
		},400)
	}
	refresh(){
		console.log("refresh");
		this.setState({
			colorStyle_state:0,
		});
	}
	render(){
		let tail;
		switch (this.props.type) {
			case 0:
				break;
			case 1:
				tail = (<Div2

					onMouseEnter={()=>this.mouseOverAdd()}
					onMouseLeave={()=>this.mouseOutAdd()}>
					{
						(this.state.visiblePlus||this.state.visibleDropdown)?
						(<CIcon name='plus' size = 'large' color='black' link onClick={()=>this.toggleDropdown()} />):''
					}
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


				</Div2>);
				break;

		}
		let colorStyle;
		switch (this.state.colorStyle_state) {
			case 0:
				colorStyle = {
					backgroundColor:this.props.bkcolor[this.state.bkcolorIndex],
					display:"inline-flex",
				};
				break;
			case 1:
				colorStyle = {
					transition:" all 0.4s ease",
					backgroundColor:"rgb(255, 106, 106)",
					visibility: "hidden",
					opacity: 0,
				};
				break;
			case 2:
				colorStyle = {
					display:"none",
				};
				break;
			default:

		}
		return(
			<div
				className = {`${style.container} ${this.props.className}`} onMouseEnter={()=>this.mouseOver()}
				onMouseLeave={()=>this.mouseOut()}
				style={colorStyle}>
				<Div1 onClick = {()=>this.clickHandler()}>
					<Icon
						color={this.state.color}
						name={this.state.icon_type}
						className = {style.icon}
						size="large"
					/>
					<Header color={this.state.color} className = {style.header} >
						{this.props.song.Name}
					</Header>
				</Div1>
				{tail}
			</div>
		);
	}
}
