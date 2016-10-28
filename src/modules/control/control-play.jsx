import React from 'react';

export default (props) => {
	let className = 'fa ';
	if (props.isPause) {
		className += 'fa-play';
	} else {
		className += 'fa-pause';
	}

	return (
		<li onClick={props.onClick}>
			<a className="mb-btn">
				<i className={className} />
			</a>
		</li>
	)
}