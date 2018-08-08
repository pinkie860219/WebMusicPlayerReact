import React from "react";
import style from "./css/Dropdown.scss";
import styled from "styled-components";
import {Button, Checkbox, Divider, Icon, Input, Segment } from 'semantic-ui-react';

class CheckItem extends React.Component{
	handleOnChange(e){
		this.props.onChange(e,{
			...this.props,
			checked:e.target.checked
		})
	}
	render(){
		return(
			<div className={style.checkItem}>
				<input type='checkbox' checked={this.props.checked} onChange={(e)=>this.handleOnChange(e)}/>
				<div>{this.props.children}</div>
			</div>
		);
	}
}
const CCheckbox = styled(Checkbox)`
	display: inline-flex !important;
	height: auto !important;
	margin: 3px 5px 3px 5px !important;
	padding: 0 !important;
`;
export class Dropdown extends React.Component {
	constructor(props){
		super(props);
		this.state={
			inputVisible:false,
			inputText:"",
			foundInSongListNames:[],
		}
		this.inputField = React.createRef();
		this.dropdown = React.createRef();
	}
	componentDidUpdate(pp,ps){
		if(this.props.visible && (this.props.visible != pp.visible)){
			this.dropdown.current.focus();
			this.fetchSongQuery();
		}
		if(this.state.inputVisible && (this.state.inputVisible != ps.inputVisible)){
			this.inputField.current.focus();
		}
	}
	handleOnChange({value, song, checked}){
		if(checked){
			this.props.handleAddToSongList(value, song);
			this.fetchSongQuery();
		} else {
			this.props.handleDeleteSong(value, song);
			this.fetchSongQuery();
			console.log("curlistname:")
			console.log(this.props.curDisplaySongListName);
			console.log("value:"+value);
			if(this.props.curDisplaySongListName == value){
				//this.props.distory();
				console.log('distory');
			}
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
	handleInputConfirm(){
		this.props.handleAddToSongList(this.state.inputText, this.props.song);
		this.fetchSongQuery();
	}
	handleInput(e){
		this.setState({
			inputText:e.target.value,
		});
	}
	async fetchSongQuery(){ // 查詢此歌存在於哪些歌單

		//console.log("fetchSongQuery");

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
			//console.log(data);
		});
	}
	render(){
		let display;
		if(this.props.visible){
			display = style.container;
		} else {
			display = `${style.container} ${style.containerHidden}`;
		}
		return(
			<div className = {display} onBlur={(e)=>this.onBlur(e)}
				onClick={(e)=>e.stopPropagation()} tabIndex={1} ref={this.dropdown}>
				<div className = {style.pointDiv}/>
				{
					!this.state.inputVisible?
					(<button className={style.newListBtn} onClick={()=>this.toggleInput()}>
						<i className="fas fa-plus-square"></i>新增歌單
					</button>):
					(<div className={style.inputBlock}>
						請輸入新歌單名稱
						<div>
							<input
								type='text'
								ref = {this.inputField}
								placeholder="List Name"
								onChange={(e)=>this.handleInput(e)}
							/>
							<button onClick={() => this.handleInputConfirm()}>
								<i className="far fa-save"></i>
							</button>
						</div>
					</div>)
				}
				<div className={style.hrLine}>
					<hr/>
				</div>
				{this.props.songLists.map((item,index)=>(
					<CheckItem
						key={index}
						value = {item.text}
						onChange={(e, {value, song, checked}) => this.handleOnChange( {value, song, checked})}
						song={this.props.song}
						checked={this.state.foundInSongListNames.indexOf(item.text)>=0?true:false}
						>{item.text}</CheckItem>
				))}
			</div>
		);
	}
}
