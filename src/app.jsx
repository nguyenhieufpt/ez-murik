import React from 'react';
import Control from 'modules/control/control.jsx';
import Playlist from 'modules/playlist/playlist.jsx';
import Progress from 'modules/progress/progress.jsx';
import Audio from 'modules/audio/audio.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div>
				<Audio/>
				<Control/>
				<Playlist/>
			</div>
        )
    }
}