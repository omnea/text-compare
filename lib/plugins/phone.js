'use strict';

var PhoneLibrary = require('google-libphonenumber');
var PhoneUtilities = PhoneLibrary.PhoneNumberUtil.getInstance();
var PNF = PhoneLibrary.PhoneNumberFormat;
var MatchTypes = PhoneLibrary.PhoneNumberUtil.MatchType;

module.exports = class Phone {
	constructor(core) {
		this.core = core;

		this.registerMethods();
	}

	registerMethods() {
		this.core.addMethod('isPhoneMatch', this.isPhoneMatch.bind(this));
		this.core.addMethod('getCountryCode', this.getCountryCode.bind(this));
		this.core.addMethod('filterCountryCodes', this.filterCountryCodes.bind(this));
		this.core.addMethod('isDisplacedPhoneMatch', this.isDisplacedPhoneMatch.bind(this));
	}

	filterCountryCodes(regionCode, string) {
		var number = PhoneUtilities.parseAndKeepRawInput(string, regionCode);
		return PhoneUtilities.format(number, PNF.NATIONAL).replace(/[^0-9]/g,'');
	}

	getCountryCode(regionCode, string) {
		var number = PhoneUtilities.parseAndKeepRawInput(string, regionCode);
		return number.country_code;
	}

	isPhoneMatch(phoneA, phoneB){
		var match = PhoneUtilities.isNumberMatch(phoneA, phoneB);
		if(match === MatchTypes.NSN_MATCH || match === MatchTypes.SHORT_NSN_MATCH || match === MatchTypes.EXACT_MATCH)
			return true;

		return false;
	}

	isDisplacedPhoneMatch(phoneA, phoneB) {
		var difference = Math.abs(phoneA.length - phoneB.length);
		var isPhoneALongerThanPhoneB = (phoneA.length > phoneB.length);
		var shortPhone = isPhoneALongerThanPhoneB ? phoneB : phoneA;
		var longPhone = isPhoneALongerThanPhoneB ? phoneA : phoneB;

		return this.serachDisplacedPhones(longPhone, shortPhone, difference);
	}

	serachDisplacedPhones(longPhone, shortPhone, difference) {
		var shortPhoneLength = shortPhone.length;
		for(let i = 0; i < difference; i++) {
			let longPhonePortion = longPhone.slice(i, i + shortPhoneLength);
			if(this.isPhoneMatch(shortPhone, longPhonePortion))
				return true;
		}

		return false;
	}
};
