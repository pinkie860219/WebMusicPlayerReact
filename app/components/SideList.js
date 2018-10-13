import React from "react";
import styles from "./css/SideList.scss";
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid, Label, Dropdown } from 'semantic-ui-react'
import {withSongList} from './context/SongListContext.js';
import { Link, withRouter} from 'react-router-dom';
import queryString from 'query-string';

class SideButton extends React.Component{
	render(){
		return(
			<div onClick = {this.props.onClick}
				className={`${styles.sideBtn} ${this.props.active?styles.active:''}`} >
				{this.props.icon}
				<div className={styles.title}>{this.props.children}</div>
			</div>
		);
	}
}
class DropdownItem extends React.Component{
	render(){
		return(
			<div className={`${styles.dropdownItem} ${this.props.active?styles.active:''}`} onClick = {()=>this.props.onClick(this.props)}>
				{this.props.icon}
				<div className={styles.title}>{this.props.children}</div>
			</div>
		);
	}
}
class SideDropdown extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			visible:true,
		}
	}
	toggleVisibility(){
		//console.log(`toggleVisibility`);
		this.setState({
			visible:!this.state.visible,
		})
	}
	render(){
		const dropdownStyle = this.state.visible?styles.dropdown:`${styles.dropdown} ${styles.dropdownHidden}`;
		const arrow = this.state.visible?<i className="fas fa-caret-down"></i>:<i className="fas fa-caret-right"></i>
		return(
			<div className={styles.sideDropdown}>
				<div className={`${styles.sideBtn} ${this.props.active?styles.active:''}`} onClick = {()=>this.toggleVisibility()}>
					<div className={styles.arrow}>{arrow}</div>
					{this.props.icon}
					<div className={styles.title}>{this.props.children}</div>
				</div>
				<div className={dropdownStyle}>
					{this.props.options.map((item, index)=>(
						<DropdownItem key = {index} active={this.props.activeItem === item.HashedCode}
								icon={<i className="fas fa-list-ol"></i>}
								onClick = {()=>{
									this.props.onChange(item.HashedCode);
								}}>
							{item.Name}
						</DropdownItem>
					))}
				</div>
			</div>
		);
	}
}
const SideDropdownWithRouter = withRouter(SideDropdown);
const Devider = (props) =>(
	<div className={styles.devider}/>
)
const ExitButton = (props) => (
	<div className={styles.exitBtn} onClick = {props.onClick}>
		<i className="fas fa-times"></i>
		<div>Close</div>
	</div>
);
export class SideList extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
			options:[],
		};
	}
	handleChange(value){
		this.props.handleSongListChange(value);
	}
	render(){
		const { searchQuery, value } = this.state;
		const queryParams = queryString.parse(this.props.location.search);
		return(
			<Sidebar animation='uncover' visible={this.props.visible}>
				<div className={styles.container}>
					<ExitButton onClick={()=>this.props.toggleVisibility()}/>
					<Devider/>
					<SideButton
						onClick={()=>{
							this.props.history.push({
								pathname: '/folder',
								search:this.props.location.search,
							});
						}}
						icon={<i className="fas fa-folder-open"></i>}
						active={this.props.activeItem === 'folder'}
						name='folder'>Folder</SideButton>
					<SideDropdownWithRouter icon={<i className="fas fa-list-ol"></i>}
						options={this.props.songLists}
						onChange={(value)=>this.handleChange(value)}
						activeItem={this.props.activeItem === 'songlist'? queryParams.s:''}>SongList</SideDropdownWithRouter>
				</div>
			</Sidebar>
		);
	}
}
export const SideListWithSongList = withRouter(withSongList(SideList));
