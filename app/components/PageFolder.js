import React from "react";
import {Header, Segment, Button, Icon, Grid, Breadcrumb} from 'semantic-ui-react'
import {PageFolderCss} from './css/PageFolderCss.js'

export class PageFolder extends React.Component {
	constructor(props){
		super(props);

	}
	render(){
		return(
			<div style={PageFolderCss.header}>
				<span style={PageFolderCss.helper}></span>
				<Button basic compact icon style={PageFolderCss.btn}  onClick={() => this.props.toggleVisibility()}>
					<Icon name='sidebar'/>
				</Button>
				<Icon name='music'size='large'/>
				<Header style={PageFolderCss.h1}>
					MusicPlayer
				</Header>
				<Breadcrumb as={Segment} compact basic size='big' style={PageFolderCss.path}>
					<Breadcrumb.Section link>Home</Breadcrumb.Section>
				    <Breadcrumb.Divider icon='right angle' />
				    <Breadcrumb.Section link>Store</Breadcrumb.Section>
				    <Breadcrumb.Divider icon='right angle' />
				    <Breadcrumb.Section active>T-Shirt</Breadcrumb.Section>
				</Breadcrumb>
			</div>
		);
	}
}
