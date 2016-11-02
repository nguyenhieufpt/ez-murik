import React from 'react';
import { connect } from 'react-redux';
import ActionType from 'common/action-type.js';

class NextBtn extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.playSong = this.playSong.bind(this);
    }

    render() {
        return (
            <li>
				<a className="mb-btn"><i className="fa fa-step-forward" onClick={this.playSong}/></a>
			</li>
        )
    }

    playSong() {
        let { current, length, playSong } = this.props;
        let newIdx = current + 1;

        if (newIdx >= length) {
            newIdx = 0;
        }

        playSong(newIdx);
    }

}

const mapStateToProps = state => {
    return {
        current: state.current,
        length: state.data.length
    };
}

const mapDispatchToProps = dispatch => {
    return {
        playSong: (idx) => dispatch({ type: ActionType.PLAY_SONG, data: idx })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NextBtn);
