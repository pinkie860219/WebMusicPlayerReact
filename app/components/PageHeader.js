import React from "react";
import styles from './css/PageHeader.scss';

export class PageHeader extends React.Component {
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
				</button >

				<div className={styles.path}>
					{this.props.curDir?this.props.curDir.map((item, index)=>{
						return(
							<React.Fragment key={index}>
								<i className="fas fa-angle-right"></i>
								<span className={index === this.props.curDir.length - 1?styles.tailBread:''} onClick={()=>{this.props.setCurDir(item)}}>{item.Name}</span>
							</React.Fragment>
						);
					}):''}
				</div>
			</div>
		);
	}
}
