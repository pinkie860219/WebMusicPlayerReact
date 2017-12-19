import React from "react";
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid, Label } from 'semantic-ui-react'

export class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
			visible: true,
			activeItem: 'album',
		};
	}

	toggleVisibility(){
		this.setState({ visible: !this.state.visible });
	}

	handleItemClick({name}){
		this.setState({ activeItem: name });
	}

	render(){
		return(
			<div style={{height:"100%"}}>
				<Sidebar.Pushable as={Segment}>
				  <Sidebar as={Menu} animation='overlay' width='wide' visible={this.state.visible} icon='labeled' vertical inverted >

					<Menu.Item name='back' onClick={() => this.toggleVisibility()} >
						<Segment textAlign='right' basic>

							<Icon name='remove' inverted size='big'/>
						</Segment>
			        </Menu.Item>
			        <Menu.Item name='album' active={this.state.activeItem === 'album'} onClick={(e,{name}) => this.handleItemClick({name})}>
			          <Label color='teal'>1</Label>
			          Album
			        </Menu.Item>

			        <Menu.Item name='folder' active={this.state.activeItem === 'folder'}  onClick={(e,{name}) => this.handleItemClick({name})}>
			          <Label>51</Label>
			          Folder
			        </Menu.Item>
			        <Menu.Item name='song list' active={this.state.activeItem === 'song list'}  onClick={(e,{name}) => this.handleItemClick({name})}>
			          <Label>1</Label>
			          Song List
			        </Menu.Item>
				  </Sidebar>
				  <Sidebar.Pusher>
				  	<Button onClick={() => this.toggleVisibility()}>toggle</Button>
					<Segment basic>
					  <Header as='h3'>Application Content</Header>
					  <Image src='/assets/images/wireframe/paragraph.png' />
					</Segment>
				  </Sidebar.Pusher>
				</Sidebar.Pushable>
			</div>
		);
	}

}
