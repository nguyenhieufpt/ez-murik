import React from 'react';
import { connect } from 'react-redux';
import Constant from 'common/constant.js';

class Audio extends React.Component {
    constructor(props) {
    	super(props);
    	this.props = props;
    }

    render() {
    	let {data, current} = this.props;
    	let song = data[current];
        let src = Constant.MUSIC_PATH + song.fileName + Constant.EXT;

        return (
            <audio className='mb-audio' ref="audio">
				Your browser does not support HTML5 Audio!
				<source src={src} type="audio/mp3"/>
			</audio>
        )
    }

    componentDidUpdate() {
        if (!this.props.isPause) {
            this.refs.audio.load();
            this.refs.audio.play();
        } else {
        	this.refs.audio.pause();
        }
    }
}

const mapStateToProps = state => {
    return {
        current: state.current,
        isPause: state.isPause,
        data: state.data
    };
}

const mapDispatchToProps = dispatch => {
    return {
    	
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Audio);
