import React from 'react';

export default (props) => {
    let progress;
    let className = 'fa ';
    let { onClick, isActive, volume, changeVolume } = props;

    if (volume === 0) {
        className += 'fa-volume-off';
    } else if (volume === 1) {
        className += 'fa-volume-up';
    } else {
        className += 'fa-volume-down';
    }

    if (isActive) {
        progress = <progress 
						onClick={changeVolume}
						value={volume} 
						max="1" 
						className="progress progress-danger"/>
    }

    return (
        <li>
			<a className="mb-btn" id="volume" onClick={onClick}>
				<i className={className}/>
			</a>
			{progress}
		</li>
    )
}
