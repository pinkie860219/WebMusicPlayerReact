import React from "react";
import style from "./css/PageGrid.css";
import styled from "styled-components";
import {DataItem} from "./DataItem.js"
export class PageGrid extends React.Component {
	constructor(props){
		super(props);
		this.state={
		}

	}
	render(){
		return(
			<div className = {style.container}>
				<DataItem type={0} content = "foooolder"/>
				<DataItem type={1} content = "Muuuuusic"/>
				<DataItem type={0} content = "foooolder"/>
				<DataItem type={1} content = "Muuuuusic"/>
				<DataItem type={0} content = "foooolder"/>
				<DataItem type={1} content = "Muuuuusic"/>
				<DataItem type={0} content = "foooolder"/>
				<DataItem type={1} content = "Muuuuusic"/>
				<DataItem type={0} content = "foooolder"/>
				<DataItem type={1} content = "Muuuuusic"/>
				<DataItem type={0} content = "foooolder"/>
				<DataItem type={1} content = "Muuuuusic"/>
				<DataItem type={0} content = "foooolder"/>
				<DataItem type={1} content = "Muuuuusic"/>
				<DataItem type={0} content = "foooolder"/>
				<DataItem type={1} content = "Muuuuusic"/>
			</div>
		);
	}
}
