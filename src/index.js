import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import axios from 'axios';
import { createStore } from 'redux';
import immutable from 'seamless-immutable';
import { Provider } from 'react-redux';
import reducer from 'modules/reducer/reducer.js';





axios.get('./data.json')
    .then(res => {
        const initState = immutable({
            current: 0,
            volume: 0.5,
            isVolumeActive: false,
            isPause: true,
            isLoop: false,
            currentTime: 0,
            data: res.data
        });

        const store = createStore(reducer, initState);

        ReactDOM.render(
            <Provider store={store}>
            	<App/>
            </Provider>,
            document.getElementById('root')
        );
    });
