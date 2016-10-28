import React from 'react';

export default (props) => {
	let className = "fa fa-repeat ";
    let { isLoop, onClick } = props;

    if (isLoop) {
    	className += "mb-repeat";
    }

    return (
        <li>
			<a className="mb-btn" onClick={onClick}>
				<i className={className}/>
			</a>
		</li>
    )
}
