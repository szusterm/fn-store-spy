const getRandomNumber = require('../helpers/getRandomNumber')
const config = require('../config');
const {codeLength, codePrefix} = config.ordering;

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
		const randomCharIndex = getRandomNumber(lastCharIndex);

		return this._availableChars.charAt(randomCharIndex);
	}

	removePrefix(code) {
		const findPrefixTemplate = new RegExp('^(fn)', 'g');
		const lowerCaseCode = code.toLowerCase();

		return lowerCaseCode.replace(findPrefixTemplate, '');
	}

	isCode(message)  {
		const codeTemplate = new RegExp(`\\b(${codePrefix})([a-z0-9]{${codeLength}})\\b`);
		const lowerCaseMessage = message.toLowerCase();

		return codeTemplate.test(lowerCaseMessage);
	}
}

module.exports = new Code();