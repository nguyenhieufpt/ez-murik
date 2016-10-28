const Common = require('./common.js');

const status = Object.freeze({
	OK: '  [INFO]',
	ERROR: ' [ERROR]'
})

module.exports = class Logger {
	static info(message) {
		let time = Common.getCurrentTime();
		console.log(`${status.OK}[${time}] - ${message}`);
	}

	static error(message) {
		let time = Common.getCurrentTime();
		console.error(`${status.ERROR}[${time}] - ${message}`);
	}
}