import React from "react";
import style from "./css/PageGrid.scss";
import fadeStyles from "./css/transition/FadeStyles.scss";
import styled from "styled-components";
import {DataItemWithSongInfo} from "./DataItem.js";
import { Loader, Icon, Header} from 'semantic-ui-react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

const NoFile = (props) => (
	<div className={style.noFile}>
		<i className="fas fa-coffee"></i>
		<div>
			Oops, nothing here.
		</div>
	</div>
)
export class PageGrid extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		let output = [];
		let containerStyle;
		if(this.props.curDisplayList.length != 0){
			output = this.props.curDisplayList.map( (item, index) => {
				let type=0;
				if(item.IsDir){
					//console.log("file");
					type=0;//is folder
					return(
						<CSSTransition
							key = {item.HashedCode}
							timeout={{ enter: 300, exit: 0 }}
							classNames={fadeStyles}>
							<DataItemWithSongInfo
								type={type}
								song = {item}
								onClick = {()=>this.props.setCurDir(item)}
							/>
						</CSSTransition>
					);
				}
				else {
					//console.log("music");
					type=1;//is music file
					return(
						<CSSTransition
							key = {item.HashedCode}
							timeout={300}
							classNames={fadeStyles}
							>
							<DataItemWithSongInfo
								type={type}
								song = {item}
								onClick = {()=>this.props.setCurSong(item)}
							/>
						</CSSTransition>
					);
				}
			}).reduce((sum, cur, index)=>{
				return sum===null?[cur]:[...sum,(
					<CSSTransition
            key={`hr_${index}`}
						timeout={300}
						classNames={fadeStyles}>
						<div className={style.hrLine}>
							<hr/>
						</div>
					</CSSTransition>
				),cur]
			},null);
		} else {
			output=[];
		}
		containerStyle = this.props.loading? [style.container, style.dim].join(' '):style.container;
		return(
			<div className = {style.container}>
				<CSSTransition
					in={this.props.loading}
					timeout={300}
					classNames={fadeStyles}
					className = {style.dimmer}>
					<Loader active={true} inverted size='large'>Preparing Files</Loader>
			  </CSSTransition>
				<TransitionGroup className = {containerStyle} exit={false}>
					{output}
				</TransitionGroup>
				<CSSTransition
					in={this.props.curDisplayList.length == 0}
					timeout={300}
					classNames={fadeStyles}>
					<NoFile/>
				</CSSTransition>
			</div>
		);

	}
}
