import React from "react";
import style from "./css/Dropdown.css";
import styled from "styled-components";
import {Button, Checkbox, Divider, Icon, Input, Segment } from 'semantic-ui-react';
const CCheckbox = styled(Checkbox)`
	display: inline-flex !important;
	height: auto !important;
	margin: 3px 5px 3px 5px !important;
	padding: 0 !important;
`;
const CSegment = styled(Segment)`
	display: inline-flex !important;
	height: auto !important;
	margin: 0 !important;
`;
export class Dropdown extends React.Component {
	constructor(props){
		super(props);
		this.state={
			inputVisible:false,
			inputText:"",
			foundInSongListNames:[],
		}
	}
	componentDidMount(){
		//this.fetchSongQuery();
	}
	componentWillReceiveProps(nextProps){
		// if(nextProps.signal != this.props.signal){
		// 	const newVisible = !this.state.visible
		// 	if(newVisible){
		// 		this.fetchSongQuery();
		// 	}
		// 	this.setState({
		// 		visible: newVisible,
		// 	})
		// 	this.props.setVisible(newVisible);
		// // }
		// if(nextProps.visible){
        //
		// }
	}
	componentDidUpdate(pp,ps){

		if(this.props.visible && (this.props.visible != pp.visible)){
			this.dropdown.focus();
			this.fetchSongQuery();
		}
		if(this.state.inputVisible && (this.state.inputVisible != ps.inputVisible)){
			this.inputField.focus();
		}
	}
	handleOnChange({value, song, checked}){
		if(checked){
			this.props.handleAddToSongList(value, song);
			this.fetchSongQuery();
		}
	}
	onBlur(e) {
		console.log("blurRRRR");
		let currentTarget = e.currentTarget;
	    setTimeout(()=>{
			if (!currentTarget.contains(document.activeElement)) {

				this.setState({
					inputVisible:false,
			 	});
			 	this.props.setVisible(false);
			}

		}, 0);
	}
	toggleInput(){
		this.setState({
			inputVisible:!this.state.inputVisible,
		});
	}
	handleInputConfirm({song}){
		this.props.handleAddToSongList(this.state.inputText, song);
		this.fetchSongQuery();
	}
	handleInput(e, {value}){
		this.setState({
			inputText:value,
		});
	}
	async fetchSongQuery(){ // 查詢此歌存在於哪些歌單

		console.log("fetchSongQuery");

		let formData = new FormData();
		formData.append('url',this.props.song.Url);
		let response = await fetch(this.props.songQueryURL + this.props.song.Url,{
			method:'POST',
			body:formData,
		});
	//	let response = await fetch(this.props.songQueryURL + this.props.song.Url);
		let data = await response.json();
	//	console.log(data);
		data.forEach(item => {
			this.setState({
				foundInSongListNames:item.SongListNames,
			});
			//console.log(item.SongListNames);
			console.log(data);
		});
	}
	render(){
		let display;
		if(this.props.visible){
			display = `${style.container} ${this.props.className}`;
		} else {
			display = `${style.container2} ${this.props.className}`;
		}
		return(
			<div className = {display} onBlur={(e)=>this.onBlur(e)} tabIndex={0}
				ref = {(container) => {this.dropdown = container;}}>
				<div className = {style.pointDiv}/>
				{
					!this.state.inputVisible?
					(<CSegment basic compact as={Button} onClick={()=>this.toggleInput()}>
						<Icon name='add square'/>
						New List
					</CSegment>):
					(<div>
						名稱
						<br/>
						<Input
							ref = {(input) => {this.inputField = input;}}
							placeholder="List Name"
							onChange={(e,{value})=>this.handleInput(e,{value})}
							action={
								<Button
									song={this.props.song}
									onClick={(e,{song}) => this.handleInputConfirm({song})}
									icon="plus"
									primary
								/>
							}
						/>


					</div>)
				}
				<Divider />
				{this.props.songLists.map( (item, index) => {
					return(
						<CCheckbox
							key = {index}
							value = {item.text}
							onChange={(e, {value, song, checked}) => this.handleOnChange( {value, song, checked})}
							song={this.props.song}
							label={item.text}
							checked={this.state.foundInSongListNames.indexOf(item.text)>=0?true:false}
						/>

					);
				})}
			</div>
		);
	}
}
