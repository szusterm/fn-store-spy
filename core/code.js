const config = require('../config');
const {codeLength} = config.ordering;

class Code {
	constructor() {
		this._availableChars = 'abcdefgijklmnopqrstuvwxyz0123456789';
	}

	generate() {
		let code = '';

		for (let i = 1; i <= codeLength; i++) {
			code += this._getRandomChar();
		}

		return code;
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