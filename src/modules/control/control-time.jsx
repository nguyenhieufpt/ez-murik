import React from 'react';

export default (props) => {
	let {currentTime, endTime} = props; 

	return (
		<div className="mb-time">
			<div className="mb-currentTime">currentTime</div>
			<div className="mb-endTime">endTime</div>
		</div>
	)
}