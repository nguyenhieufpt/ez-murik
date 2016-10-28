module.exports = class Common {
	static addZero(num) {
		if (num < 10) return '0' + num;
		return num;
	}

	static getCurrentTime() {
		let d = new Date();
		let year = d.getFullYear();
		let month = this.addZero(d.getMonth());
		let date = this.addZero(d.getDate());
		let hour = this.addZero(d.getHours());
		let minute = this.addZero(d.getMinutes());
		let second = this.addZero(d.getSeconds());
		return `${year}/${month}/${date} ${hour}:${minute}:${second}`;
	}
}