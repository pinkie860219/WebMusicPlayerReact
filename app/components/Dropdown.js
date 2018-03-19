import React from "react";
import style from "./css/Dropdown.css";
import styled from "styled-components";
import {Button, Checkbox, Divider, Icon, Segment } from 'semantic-ui-react';
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
	handleClick(e, {value, song}){

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
				<CSegment basic compact as={Button}>
					<Icon name='add square'/>
					New List
				</CSegment>
				<Divider fitted/>
				{this.props.songLists.map( (item, index) => {
					return(
						<CCheckbox
							key = {index}
							value = {item.text}
							onClick={(e, {value, song}) => this.handleClick(e, {value, song})}
							song={{Name:this.props.content, Url:this.props.url}}
							label={item.text}/>

					);
				})}
			</div>
		);
	}
}
