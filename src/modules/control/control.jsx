import React from 'react';
import PlayBtn from './control-play.jsx';
import VolumeBtn from './control-volume.jsx';
import LoopBtn from './control-loop.jsx';

export default class Control extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			isPause: true,
			isVolumeActive: false,
			volume: 0.2,
			isLoop: false
		};

		this.togglePlay = this.togglePlay.bind(this);
		this.toggleVolume = this.toggleVolume.bind(this);
		this.changeVolume = this.changeVolume.bind(this);
		this.toggleLoop = this.toggleLoop.bind(this);
	}

    render() {
    	console.log(this.state);
        return (
			<div className="mb-control">
			    <div className="mb-mainControl">
			        <div className="mb-songInfo">
			            <div className="mb-songName"></div>
			            <div className="mb-artist"></div>
			        </div>
			        <div className="mb-btnControl">
			            <ul>
			                <VolumeBtn
			                	volume={this.state.volume}
			                	changeVolume={this.changeVolume}
				                isActive={this.state.isVolumeActive} 
				                onClick={this.toggleVolume}/>
			                <li>
			                    <a className="mb-btn" id="prev"><i className="fa fa-step-backward" aria-hidden="true"></i></a>
			                </li>
			                <PlayBtn 
				                isPause={this.state.isPause}
				                onClick={this.togglePlay} />
			                <li>
			                    <a className="mb-btn" id="next"><i className="fa fa-step-forward" aria-hidden="true"></i></a>
			                </li>
			                <LoopBtn 
			                	onClick={this.toggleLoop}
			                	isLoop={this.state.isLoop}/>
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

    togglePlay() {
    	this.setState({isPause: !this.state.isPause});
    }

    toggleVolume() {
    	this.setState({isVolumeActive: !this.state.isVolumeActive});
    }

    changeVolume(e) {
    	let target = e.target;
    	let x = e.pageX - target.offsetLeft;
    	let clickedValue = x / target.offsetWidth;
    	this.setState({ volume: clickedValue});
    }

    toggleLoop() {
    	this.setState({isLoop: !this.state.isLoop});
    }
}
