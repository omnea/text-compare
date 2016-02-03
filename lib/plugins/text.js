'use strict';

module.exports = class Text {
	constructor(core) {
		this.core = core;
	}

	getMethodNames() {
		return [
			'removeMultipleWhiteSpaces',
			'removeWhiteSpaces',
			'removeSymbols'
		];
	}

	removeMultipleWhiteSpaces(string) {
		return string.replace(/[ ]{1,}/g, ' ');
	}

	removeWhiteSpaces(string) {
		return string.replace(' ' , '');
	}

	removeSymbols(string) { // ![a-zA-Z0-9]
		return string.replace(/[^a-zA-Z0-9 ]/, '');
	}
};
