import React from 'react';
import axios from 'axios';
import Common from 'common/common.js';
import Constant from 'common/constant.js';
import { connect } from 'react-redux';
import ActionType from 'common/action-type.js';

class Playlist extends React.Component {
	constructor(props) {
		super(props);
        this.props = props;
	}

	render() {
	    let { data, current, playSong } = this.props;

	    let row = [];
	    data.forEach((song, index) => {
	        row.push(
	            <li className="mb-playListArea_ul_li" key={song.fileName} onClick={() => playSong(index)}>
			        <div className="mb-songCover">
			        	<img src={Constant.IMG_PATH + song.picture} width="50" height="50"/>
			        </div>
			        <div className="mb-songContent">
				        <div className="mb-songTitle">{song.title}</div>
				        <div className="mb-songArtist">{song.artist} | {song.album} | {Common.formatDuration(song.duration)}</div>
			        </div>
		        </li>
	        );
	    });

		return (
	        <div className="mb-playListArea">
		    	<ul className="mb-playListArea_ul">
		    		{row}
		    	</ul>
	    	</div>
	    )
	}
}

const mapStateToProps = state => {
    return {
        data: state.data,
        current: state.current
    };
}

const mapDispatchToProps = dispatch => {
    return {
        playSong: (idx) => dispatch({ type: ActionType.PLAY_SONG, data: idx })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
