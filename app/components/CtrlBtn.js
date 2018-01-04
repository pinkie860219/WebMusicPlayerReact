import React from "react";
import style from "./css/CtrlBtn.css";
import styled from "styled-components";
import {Button, Icon} from "semantic-ui-react"
const CButton = styled(Button)`
	display:inline-flex !important;
`;
const CIcon = styled(Icon)`
	display:inline-flex !important;
	margin:0 0 0 10px !important;
	padding: 0 !important;
`;
export class CtrlBtn extends React.Component {
	constructor(props){
		super(props);
		this.state={
		}

	}
	render(){

		return(
			<div className = {`${style.container} ${this.props.className}`}>
				<CButton circular color='black' basic icon='step backward' />
				<CButton circular color='black' basic icon='play' />
				<CButton circular color='black' basic icon='step forward' />
				<CIcon name='retweet' link size='large'/>
			</div>
		);
	}
}
