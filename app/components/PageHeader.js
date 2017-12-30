import React from "react";
import {Header, Segment, Button, Icon, Grid, Breadcrumb} from 'semantic-ui-react';
import PageHeaderCss from './css/PageHeader.css';

export class PageHeader extends React.Component {
	constructor(props){
		super(props);

	}
	render(){
		return(
			<div className={PageHeaderCss.header}>
				<span className={PageHeaderCss.helper}></span>
				<Button basic compact icon className={PageHeaderCss.btn}  onClick={() => this.props.toggleVisibility()}>
					<Icon name='sidebar'/>
				</Button>
				<Icon name='music'size='large'/>
				<Header className={PageHeaderCss.h1}>
					MusicPlayer
				</Header>
				<Breadcrumb as={Segment} compact basic size='big' className={PageHeaderCss.path}>
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
