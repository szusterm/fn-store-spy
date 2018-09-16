class Code {
	constructor() {
		this._availableChars = 'abcdefgijklmnopqrstuvwxyz0123456789';
	}

	_getRandomNumber(max) {
		return Math.round(Math.random()*max);
	}
}

module.exports = new Code();