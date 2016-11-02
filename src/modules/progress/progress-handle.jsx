import React from 'react';

export default (props) => {
    let { progress, changeProgress } = props;

    return (
        <progress 
			className="progress progress-danger" 
			value={progress} 
			onClick={changeProgress} 
			max="100"/>
    )
}
