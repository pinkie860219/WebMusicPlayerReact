import React from "react";
import {Header, Segment, Button, Icon, Grid, Breadcrumb} from 'semantic-ui-react';
import PageHeaderCss from './css/PageHeader.css';

export class PageHeader extends React.Component {
	constructor(props){
		super(props);
		this.state={
			path:[],
		}

	}
	componentDidUpdate(prevProps, prevState){
		console.log(`HeaderPropsChanged:${!(JSON.stringify(this.props)===JSON.stringify(prevProps))}`);
		console.log(`HeaderStateChanged:${!(JSON.stringify(this.state)===JSON.stringify(prevState))}`);
	}
	componentWillReceiveProps(nextProps){
		let output=[];
		output.push(
			<Breadcrumb.Section link key = {0} onClick={()=>{this.props.setCurDirPop(0)}} >
				<Icon name='home'/>
			</Breadcrumb.Section>
		);
		for(let i =0; i< nextProps.curDir.length; i++){
			output.push(<Breadcrumb.Divider icon='right angle' key = {(i+1)+'_divider'}/>);
			output.push(<Breadcrumb.Section link key = {(i+1)}  onClick={()=>{this.props.setCurDirPop((i+1))}}>{nextProps.curDir[i]}</Breadcrumb.Section>);
		}
		this.setState({
			path:output,
		});
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
					{this.state.path}
				</Breadcrumb>
			</div>
		);
	}
}
