import React from 'react';
import PlayBtn from './control-play.jsx';
import VolumeBtn from './control-volume.jsx';
import LoopBtn from './control-loop.jsx';
import NextBtn from './control-next.jsx';
import PrevBtn from './control-prev.jsx';
import { connect } from 'react-redux';
import ActionType from 'common/action-type.js';
import Constant from 'common/constant.js';

class Control extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        let { data, current, playSong } = this.props;
        let song = data[current];

        let style = {
            backgroundImage: `url(${Constant.IMG_PATH + song.picture})`
        };

        return (
            <div className="mb-control" style={style}>
                <div className="mb-mainControl">
                    <div className="mb-songInfo">
                        <div className="mb-songName">{song.title}</div>
                        <div className="mb-artist">{song.artist}</div>
                    </div>
                    <div className="mb-btnControl">
                        <ul>
                            <PlayBtn/>
                            <NextBtn/>
                        </ul>
                    </div>
                    <div className="mb-time">
                        <div className="mb-currentTime">00:00</div>
                        <div className="mb-endTime">00:00</div>
                    </div>
                </div>
            </div>
        )
    }

    changeVolume(e) {
        let target = e.target;
        let x = e.pageX - target.offsetLeft;
        let clickedValue = x / target.offsetWidth;
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
        playSong: () => dispatch({type: ActionType.PLAY_SONG})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Control);
