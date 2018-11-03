import React from "react";
import styles from './css/PageHeader.scss';
import OverflowDiv from './OverflowDiv.js';

export class PageHeader extends React.Component {
	constructor(props){
		super(props);
		this.tailBread = React.createRef();
	}
	componentDidUpdate(prevProps, prevState){
		if(prevProps.curDir.length !== this.props.curDir.length){
			if(this.tailBread.current)
				this.tailBread.current.scrollIntoView({behavior: "smooth"})
		}
	}
	render(){
		return(
			<div className={styles.header}>
				<button className={`${styles.btn} ${styles.menuBtn}`} onClick={() => this.props.toggleVisibility()}>
					<i className="fas fa-bars"></i>
				</button>
				<button className={`${styles.btn} ${styles.titleBtn}`}
				 onClick={()=>{this.props.setCurDir({Name:'', HashedCode:''})}}>
					<i className="fas fa-kiwi-bird"></i>
					<h3>KiwiPlayer</h3>
				</button>

				<OverflowDiv>
					<div className={styles.path}>
						{this.props.curDir?this.props.curDir.map((item, index)=>{
							return(
								<React.Fragment key={index}>
									<i className="fas fa-angle-right"></i>
									<span
										className={index === this.props.curDir.length - 1?styles.tailBread:''}
										onClick={()=>{this.props.setCurDir(item)}}
										ref={index === this.props.curDir.length - 1?this.tailBread:null}>
										{item.Name}
									</span>
								</React.Fragment>
							);
						}):''}
						{/* <span ref={this.tailBread} className={styles.scrollTarget}>.</span> */}
					</div>
				</OverflowDiv>

			</div>
		);
	}
}
