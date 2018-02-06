import React from "react";
import style from "./css/DataItem.css";
import styled from "styled-components";
import { Icon, Header, Button} from 'semantic-ui-react';

const CIcon = styled(Icon)`
	display: inline-flex !important;
	height: auto !important;
	margin: 0 0 0 0 !important;
	padding:2px 0 0 2px !important;
`;
const Div = styled.div`
	display: inline-flex;
	align-items:center;
	height:100%;
`;
const Div1 = Div.extend`
	flex:1;
`;
const Div2 = Div.extend`
	justify-content: center;
	width:50px !important;
	border-radius: 0 5px 5px 0;
`;
export class DataItem extends React.Component {
	constructor(props){
		super(props);
		let icon_type;
		switch (this.props.type) {
			case 0:
				icon_type="folder";
				break;
			case 1:
				icon_type="video play outline";
				break;

		}
		this.state={
			color:"grey",
			colorAdd:"grey",
			bkcolorIndex:0,
			icon_type:icon_type,
		};
	}
	clickHandler(){
		this.props.onClick();
	}
	clickAddHandler(){
		console.log("plus");
	}
	mouseOver(){
		this.setState({
			color:"black",
			bkcolorIndex:1,
		});
	}
	mouseOut(){
		this.setState({
			color:"grey",
			bkcolorIndex:0,
		});
	}
	mouseOverAdd(){
		this.setState({
			colorAdd:"black",
		});
	}
	mouseOutAdd(){
		this.setState({
			colorAdd:"grey",
		});
	}
	render(){

		return(
			<div
				className = {`${style.container} ${this.props.className}`} onMouseOver={()=>this.mouseOver()}
				onMouseOut={()=>this.mouseOut()}
				style={{backgroundColor:this.props.bkcolor[this.state.bkcolorIndex]}}>
				<Div1 onClick = {()=>this.clickHandler()}>
					<Icon
						color={this.state.color}
						name={this.state.icon_type}
						className = {style.icon}
						size="large"
					/>
					<Header color={this.state.color} className = {style.header} >
						{this.props.content}
					</Header>
				</Div1>
				<Div2
					onClick = {()=>{this.clickAddHandler();}}
					onMouseOver={()=>this.mouseOverAdd()}
					onMouseOut={()=>this.mouseOutAdd()}>
					<CIcon name='plus' size = 'large' color={this.state.colorAdd}/>
				</Div2>
			</div>
		);
	}
}
