import React from 'react';

export default class Common {
    static formatDuration(duration) {
        let hour = Math.floor(duration / 3600);
        let minute = Math.floor((duration - hour * 3600) / 60);
        let second = Math.floor(duration - hour * 3600 - minute * 60);
        let result = this.addZero(minute) + ':' + this.addZero(second);
        if (hour > 0) {
            result = this.addZero(hour) + ':' + result;
        }
        return result;
    }

    static addZero(num) {
        if (num < 10) return '0' + num;
        return num;
    }

    static playSong(song) {
        
    }
}
