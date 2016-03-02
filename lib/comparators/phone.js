'use strict';

module.exports = class PhoneComparator {
	constructor(core) {
		this.core = core;
	}

	getName() {
		return 'phone';
	}

	compare(langName, stringA, stringB) {
		if(!stringA || !stringB) return false;
		
		var lang = this.core.getLanguageInstance(langName);
		
		var phoneA, phoneB;

		try{
			phoneA = this.core.filterCountryCodes(lang.getCountry(), stringA);
			phoneB = this.core.filterCountryCodes(lang.getCountry(), stringB);
		}catch(error){
			return false;
		}

		if(!stringA || !stringB) return false;

		if(phoneA.length === phoneB.length)
			return this.core.isPhoneMatch(phoneA, phoneB);

		var difference = Math.abs(phoneA.length - phoneB.length);

		if(difference > 3) return false;

		return this.core.isDisplacedPhoneMatch(phoneA, phoneB);
	}	
};
