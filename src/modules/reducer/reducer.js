import ActionType from 'common/action-type.js';

export default (state, action) => {
    switch (action.type) {
        case ActionType.PLAY_SONG:
            if (typeof action.data !== 'undefined') {
            	return state.merge({
            		current: action.data,
            		isPause: false
            	});
            }
            return state.set('isPause', !state.isPause);
        default:
            return state;
    }
}
