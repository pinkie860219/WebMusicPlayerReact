import React from 'react';
import styles from './css/OverflowDiv.scss';
const OverflowDiv = (props) => (
 <div className={`${styles.container} ${props.className}`}>
	 <div className={styles.inner}>
		 {props.children}
	 </div>
 </div>
);
export default OverflowDiv;
