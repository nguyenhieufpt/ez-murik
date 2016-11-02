import React from 'react'
import ProgressHandle from './progress-handle.jsx';

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            progress: 20
        };
        this.changeProgress = this.changeProgress.bind(this);
    }

    render() {
        return (
            <ProgressHandle 
            changeProgress={this.changeProgress}
            progress={this.state.progress}/>
        )
    }

    changeProgress(e) {
        let target = e.target;
        let x = e.pageX - target.offsetLeft;
        let clickedValue = x / target.offsetWidth;
        this.setState({ progress: clickedValue * 100 });
    }
}
