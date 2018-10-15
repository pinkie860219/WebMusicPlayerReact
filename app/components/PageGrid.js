import React from "react";
import style from "./css/PageGrid.scss";
import styled from "styled-components";
import {DataItemWithSongInfo} from "./DataItem.js"
import { Loader, Icon, Header} from 'semantic-ui-react';

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
		const dimmerStyle = this.props.loading? [style.dimmer, style.dimmer_active].join(' '):style.dimmer;
		let output = [];
		let containerStyle;
		if(this.props.curDisplayList.length != 0){
			output = this.props.curDisplayList.map( (item, index) => {
				let type=0;
				if(item.IsDir){
					//console.log("file");
					type=0;//is folder
					return(
						<DataItemWithSongInfo
							key = {item.HashedCode} type={type}
							song = {item}
							onClick = {()=>this.props.setCurDir(item)}
						/>
					);
				}
				else {
					//console.log("music");
					type=1;//is music file
					return(
						<DataItemWithSongInfo
							key = {item.HashedCode} type={type}
							song = {item}
							onClick = {()=>this.props.setCurSong(item)}
						/>
					);
				}
			});
			output = output.map((item, index)=>(
				<React.Fragment key={`hr_${index}`}>
					{item}
					<div className={style.hrLine}>
						<hr/>
					</div>
				</React.Fragment>
			));
			containerStyle = this.props.loading? [style.container, style.dim].join(' '):style.container;
		} else {
			output = (
				<NoFile/>
			);
			containerStyle = this.props.loading? [style.container2, style.dim].join(' '):style.container2;
		}

		return(
			<div className = {style.container}>
				<div className = {dimmerStyle}>
					<Loader active={this.props.loading} inverted size='large'>Preparing Files</Loader>
				</div>

				<div className = {containerStyle}>
					{output}
				</div>
			</div>
		);

	}
}
