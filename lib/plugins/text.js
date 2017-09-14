'use strict';

module.exports = class Text {
	constructor(core) {
		this.core = core;

		this.registerMethods();
	}

	registerMethods() {
		this.core.addMethod('removeMultipleWhiteSpaces', this.removeMultipleWhiteSpaces.bind(this));
		this.core.addMethod('removeWhiteSpaces', - this.removeWhiteSpaces.bind(this));
		this.core.addMethod('removeSymbols', this.removeSymbols.bind(this));
	}

	removeMultipleWhiteSpaces(string) {
		return string.replace(/[ ]{1,}/g, ' ');
	}

	trimSpaces(string) {
		return string.trim(string);
	}

	removeWhiteSpaces(string) {
		return string.replace(' ' , '');
	}

	removeSymbols(string) {
		return string.replace(/[!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_{|}~]+/g, '');
	}
};
