import React from 'react';
import { connect } from 'react-redux';
import ActionType from 'common/action-type.js';

class PlayBtn extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        let { isPause, playSong } = this.props;

        let className = 'fa ';
        if (isPause) {
            className += 'fa-play';
        } else {
            className += 'fa-pause';
        }

        return (
            <li onClick={playSong}>
				<a className="mb-btn">
					<i className={className} />
				</a>
			</li>
        )
    }
}

const mapStateToProps = state => {
    return {
        isPause: state.isPause
    };
}

const mapDispatchToProps = dispatch => {
    return {
        playSong: () => dispatch({ type: ActionType.PLAY_SONG })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayBtn);
