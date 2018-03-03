import React from "react";
import style from "./css/SideList.css";
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid, Label, Dropdown } from 'semantic-ui-react'
// const options = [
//   { key: 'a', value: 'a', text: 'Café with accent' },
//   { key: 'b', value: 'b', text: 'Cafe without accent' },
//   { key: 'c', value: 'c', text: 'Déjà vu' },
//   { key: 'd', value: 'd', text: 'Deja vu' },
//   { key: 'e', value: 'e', text: 'Scandinavian å ä æ ø ö' },
//   { key: 'f', value: 'f', text: 'Scandinavian a a ae o o' },
// ]

export class SideList extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
			visible: props.visible,
			options:[],
		};
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			visible: nextProps.visible,
		})
	}

	handleChange(e, data){
		this.props.handleItemClick({name:'songlist'});
		this.props.handleSongListChange(data.value);
		//console.log("handleChange value = " + data.value);

	}

	render(){
		const { searchQuery, value } = this.state;
		return(
			<Sidebar as={Menu} animation='uncover' width='wide' visible={this.state.visible} icon='labeled' vertical inverted >

			  	<Menu.Item name='back' onClick={() => this.props.toggleVisibility()} >
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
						className={style.dropdown}
			        	fluid
			        	onChange={(e, data) => this.handleChange(e, data)}
			        	placeholder='songlist'
						options={this.props.songLists}
			        	search
			        	selection
			        	value={value}
			    	/>
			  	</Menu.Item>
			</Sidebar>
		);
	}
}
