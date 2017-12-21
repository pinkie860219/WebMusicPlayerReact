import React from "react";
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid, Label } from 'semantic-ui-react'

export class SideList extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
			visible: props.visible,
			activeItem: props.activeItem,
		};
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			visible: nextProps.visible,
			activeItem: nextProps.activeItem,
		})
	}

	render(){
		return(
			<Sidebar as={Menu} animation='overlay' width='wide' visible={this.state.visible} icon='labeled' vertical inverted >

			  <Menu.Item name='back' onClick={() => this.props.toggleVisibility()} >
				  <Segment textAlign='right' basic>

					  <Icon name='remove' inverted size='big'/>
				  </Segment>
			  </Menu.Item>
			  <Menu.Item name='album' active={this.state.activeItem === 'album'} onClick={(e,{name}) =>  this.props.handleItemClick({name})}>
				<Label color='teal'>1</Label>
				Album
			  </Menu.Item>

			  <Menu.Item name='folder' active={this.state.activeItem === 'folder'}  onClick={(e,{name}) => this.props.handleItemClick({name})}>
				<Label>51</Label>
				Folder
			  </Menu.Item>
			  <Menu.Item name='song list' active={this.state.activeItem === 'song list'}  onClick={(e,{name}) => this.props.handleItemClick({name})}>
				<Label>1</Label>
				Song List
			  </Menu.Item>
			</Sidebar>
		);
	}
}
