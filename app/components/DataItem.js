import React from "react";
import style from "./css/DataItem.css";
import styled from "styled-components";
import { Icon, Header, Button,  Input, } from 'semantic-ui-react';
import {Dropdown} from './Dropdown.js'
const CIcon = styled(Icon)`
	display: inline-flex !important;
	height: auto !important;
	margin: 0 10 0 0 !important;
	padding:2px 0 0 2px !important;
`;
const CDropdown = styled(Dropdown)`
	display: inline-flex !important;
	height: auto !important;
	margin: 0 0 0 0 !important;
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
	width:auto;
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

		//console.log("construcor:"+icon_type);
		this.state={
			color:"grey",
			colorAdd:"grey",
			bkcolorIndex:0,
			icon_type:icon_type,
			dropdownSignal:false,
			visiblePlus:false,
			visibleDropdown:false,
		};
	}
	componentWillReceiveProps(nextProps){
		let icon_type;
		switch (nextProps.type) {
			case 0:
				icon_type="folder";
				break;
			case 1:
				icon_type="video play outline";
				break;

		}
		this.setState({
			icon_type:icon_type,
		});
	}
	clickHandler(){
		this.props.onClick();
	}
	toggleDropdown(){
		console.log("plus");
		this.setState({
			dropdownSignal: !this.state.dropdownSignal
		});
	}
	mouseOver(){
		this.setState({
			color:"black",
			bkcolorIndex:1,
			visiblePlus: true,
		});
	}
	mouseOut(){
		this.setState({
			color:"grey",
			bkcolorIndex:0,
			visiblePlus: false,
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
	setVisible(newVisible){
		this.setState({
			visibleDropdown:newVisible,
		});
	}
	render(){
		let tail;
		switch (this.props.type) {
			case 0:
				break;
			case 1:
				tail = (<Div2

					onMouseEnter={()=>this.mouseOverAdd()}
					onMouseLeave={()=>this.mouseOutAdd()}>
					{
						(this.state.visiblePlus||this.state.visibleDropdown)?(<CIcon name='plus' size = 'large' color='black' link onClick={()=>this.toggleDropdown()}/>):''
					}
					<Dropdown
						songLists={this.props.songLists}
						signal={this.state.dropdownSignal}
						setVisible = {(t)=>this.setVisible(t)}
						song={{Name:this.props.content, Url:this.props.url}}
						handleAddToSongList = {(songList, song)=>this.props.handleAddToSongList(songList, song)}/>
					{/*<CDropdown
						trigger={(<CIcon name='plus' size = 'large' color='black' link/>)}
						pointing='top right'
						direction='right'
						icon={null}
					>
						<Dropdown.Menu >
							<Popup hoverable
					          	trigger={
								  	<Dropdown.Item icon="add square" content="New List"	/>
								}
					          	position='left center'
					        >
								<Input
									placeholder="List Name"
									onChange={(e,{value})=>this.handleInput(e,{value})}
								>
									<input/>
									<Button
										song={{Name:this.props.content, Url:this.props.url}}
										onClick={(e,{song}) => this.handleInputConfirm(e,{song})}
										icon="plus"
									/>
								</Input>
							</Popup>

      						<Dropdown.Divider />
							{this.props.songLists.map( (item, index) => {
								return(
									<Dropdown.Item
										key = {index}
										value = {item.text}
										onClick={(e, {value, song}) => this.handleClick(e, {value, song})}
										song={{Name:this.props.content, Url:this.props.url}}>
										{item.text}
									</Dropdown.Item>
								);
							})}
						</Dropdown.Menu>
					</CDropdown>*/}

				</Div2>);
				break;

		}
		return(
			<div
				className = {`${style.container} ${this.props.className}`} onMouseEnter={()=>this.mouseOver()}
				onMouseLeave={()=>this.mouseOut()}
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
				{tail}
			</div>
		);
	}
}
