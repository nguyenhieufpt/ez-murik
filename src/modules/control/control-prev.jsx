import React from 'react';

export default (props) => {
    let { prevSong } = props;
    return (
		<li>
			<a className="mb-btn"><i className="fa fa-step-backward" onClick={prevSong}/></a>
		</li>
    )
}
