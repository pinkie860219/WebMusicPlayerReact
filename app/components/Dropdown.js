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
			visible:false,
			inputVisible:false,
			inputText:"",
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.signal != this.props.signal){
			const newVisible = !this.state.visible
			this.setState({
				visible: newVisible,
			})
			this.props.setVisible(newVisible);
		}
	}
	componentDidUpdate(pp,ps){
		if(this.state.visible){
			this.dropdown.focus();
		}
	}
	handleOnChange({value, song, checked}){
		if(checked){
			this.props.handleAddToSongList(value, song);
		}
	}
	onBlur(e) {
		console.log("blurRRRR");
		let currentTarget = e.currentTarget;
	    setTimeout(()=>{
			if (!currentTarget.contains(document.activeElement)) {
				this.setState({
				 	visible:false,
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
	}
	handleInput(e, {value}){
		this.setState({
			inputText:value,
		});
	}
	render(){
		let display;
		if(this.state.visible){
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
							label={item.text}/>

					);
				})}
			</div>
		);
	}
}
