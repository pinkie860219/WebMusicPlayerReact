import React from "react";
import styles from "./css/SideList.scss";
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid, Label, Dropdown } from 'semantic-ui-react'
import {withSongList} from './context/SongListContext.js';

class SideButton extends React.Component{
	render(){
		return(
			<div className={`${styles.sideBtn} ${this.props.active?styles.active:''}`} onClick = {()=>this.props.onClick(this.props)}>
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
			visible:false,
		}
	}
	toggleVisibility(){
		console.log(`toggleVisibility`);
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
						<DropdownItem key = {index} active={this.props.activeItem === item.value}
								icon={<i className="fas fa-list-ol"></i>}
								onClick = {()=>this.props.onChange(item.value)}>
							{item.text}
						</DropdownItem>
					))}
				</div>
			</div>
		);
	}
}
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
		this.props.handleItemClick({name:'songlist'});
		this.props.handleSongListChange(value);
	}
	render(){
		const { searchQuery, value } = this.state;
		return(
			<Sidebar animation='uncover' visible={this.props.visible}>
				<div className={styles.container}>
					<ExitButton onClick={()=>this.props.toggleVisibility()}/>
					<Devider/>
					<SideButton icon={<i className="fas fa-folder-open"></i>}
						active={this.props.activeItem === 'folder'}
						name='folder'
						onClick={({name})=> this.props.handleItemClick({name})}>Folder</SideButton>
					{<SideDropdown icon={<i className="fas fa-list-ol"></i>}
						options={this.props.songLists}
						onChange={(value)=>this.handleChange(value)}
						activeItem={this.props.activeItem === 'songlist'? this.props.curSongListIndex:-1}>SongList</SideDropdown>}
				</div>
			  	{/*<Menu.Item name='back' onClick={() => this.props.toggleVisibility()} >
				  	<Segment textAlign='right' basic>
					 	<Icon name='remove' inverted size='big'/>
				  	</Segment>
			  	</Menu.Item>
			  	<Menu.Item name='album' active={this.props.activeItem === 'album'} onClick={(e,{name}) =>  this.props.handleItemClick({name})}>
					<Label color='teal'>1</Label>
					Album
			  	</Menu.Item>

			  	<Menu.Item name='folder' active={this.props.activeItem === 'folder'}  onClick={(e,{name}) => this.props.handleItemClick({name})}>
					<Label>51</Label>
					Folder
			  	</Menu.Item>
			  	<Menu.Item name='songlist' active={this.props.activeItem === 'songlist'} >
					<Label>1</Label>
					Song List
					<Dropdown
						className={styles.dropdown}
			        	fluid
			        	onChange={(e, data) => this.handleChange(e, data)}
			        	placeholder='songlist'
						options={this.props.songLists}
			        	search
			        	selection
			        	value={value}
			    	/>
			  	</Menu.Item>*/}
			</Sidebar>
		);
	}
}
export const SideListWithSongList = withSongList(SideList);
