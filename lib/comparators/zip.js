'use strict';

module.exports = class PhoneComparator {
	constructor(core) {
		this.core = core;
	}

	getName() {
		return 'zip';
	}

	compare(langName, zip1, zip2) {
		return zip1 == zip2;
	}	
};
