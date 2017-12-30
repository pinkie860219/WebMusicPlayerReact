import React from "react";
import style from "./css/PageFooter.css"
import {Item, Image, Header} from "semantic-ui-react"
import {Slider} from "./Slider.js"
export class PageFooter extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		}

	}

	render(){
		return(
			<div className = {style.footer}>
				<div className = {style.item}>
						<div className = {style.image}>
						</div>
						<Header as='h3' className = {style.meta}>
						    <Header.Content>
						      	三個歐吉桑
						      	<Header.Subheader>
						        	BUMP OF CHICKEN
						    	</Header.Subheader>
						    </Header.Content>
						</Header>
				</div>
				{/*(100% - 250 - 200)-100    margin 50 50*/}
				<Slider widthValue = {300} value={this.props.curTime} max={10000} setCurTime = {(t)=>this.props.setCurTime(t)} />
				<Slider widthValue = {100} value={this.props.curTime} max={10000} setCurTime = {(t)=>this.props.setCurTime(t)}/>
			</div>
		);
	}
}
