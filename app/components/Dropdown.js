import React from "react";
import style from "./css/Dropdown.scss";
import styled from "styled-components";
import {Button, Checkbox, Divider, Icon, Input, Segment } from 'semantic-ui-react';
import {withSongList} from './context/SongListContext.js';
import {serverApi} from './other/Api.js';
import queryString from 'query-string';
import { withRouter} from 'react-router-dom';

class CheckItem extends React.Component{
	handleOnChange(e){
		this.props.onChange(e.target.checked)
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
class Dropdown extends React.Component {
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
	handleOnCheck(value, checked){
		if(checked){
			this.props.handleAddToSongList(value, this.props.song.HashedCode);
			this.fetchSongQuery();
		} else {
			this.props.handleDeleteSong(value, this.props.song.HashedCode);
			this.fetchSongQuery();

			const queryParams = queryString.parse(this.props.location.search);
			let curDisplaySongListName = ''
			this.props.songLists.forEach( v =>{
				if(v.HashedCode == queryParams.s){
					curDisplaySongListName = v.Name;
				}
			})
			if(curDisplaySongListName == value){
				//this.props.distory();
				console.log('distory');
			}
		}
	}
	onBlur(e) {
		// console.log("blurRRRR");
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
		this.setState({
			inputVisible:false,
		});
		this.props.handleAddToSongList(this.state.inputText, this.props.song.HashedCode);
		this.fetchSongQuery();
	}
	handleInput(e){
		this.setState({
			inputText:e.target.value,
		});
	}
	async fetchSongQuery(){ // 查詢此歌存在於哪些歌單
		console.log("songuery!");
		let response = await fetch(serverApi.songQueryURL+this.props.song.HashedCode);

		let data = await response.json();

		this.setState({
			foundInSongListNames:data
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
						<form onSubmit={() => this.handleInputConfirm()}>
							<input
								type='text'
								ref = {this.inputField}
								placeholder="List Name"
								onChange={(e)=>this.handleInput(e)}
							/>
							<button type="submit">
									{/*<i className="far fa-save"></i>*/}
									建立
							</button>
						</form>
					</div>)
				}
				<div className={style.hrLine}>
					<hr/>
				</div>
				{this.props.songLists.map((item,index)=>(
					<CheckItem
						key={index}
						value = {item.HashedCode}
						onChange={(checked) => this.handleOnCheck(item.Name, checked)}
						checked={this.state.foundInSongListNames.indexOf(item.Name)>=0}
						>{item.Name}</CheckItem>
				))}
			</div>
		);
	}
}
export const DropdownWithSongList =  withRouter(withSongList(Dropdown));
