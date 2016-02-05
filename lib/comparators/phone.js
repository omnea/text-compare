'use strict';

module.exports = class PhoneComparator {
	constructor(core) {
		this.core = core;
	}

	getName() {
		return 'phone';
	}

	compare(langName, stringA, stringB) {
		var lang = this.core.getLanguageInstance(langName);
		var phoneA = this.core.filterCountryCodes(lang.getCountry(), stringA);
		var phoneB = this.core.filterCountryCodes(lang.getCountry(), stringB);

		if(phoneA.length === phoneB.length)
			return this.core.isPhoneMatch(phoneA, phoneB);

		var difference = Math.abs(phoneA.length - phoneB.length);

		if(difference > 3) return false;

		return this.core.isDisplacedPhoneMatch(phoneA, phoneB);
	}	
};
