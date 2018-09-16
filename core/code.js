class Code {
	constructor() {
		this._availableChars = 'abcdefgijklmnopqrstuvwxyz0123456789';
	}

	_getRandomChar() {
		const lastCharIndex = this._availableChars.length - 1;
		const randomCharIndex = this._getRandomNumber(lastCharIndex);

		return this._availableChars.charAt(randomCharIndex);
	}

	_getRandomNumber(max) {
		return Math.round(Math.random()*max);
	}
}

module.exports = new Code();