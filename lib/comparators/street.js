'use strict';

module.exports = class AddressComparator {
	constructor(core) {
		this.core = core;
	}

	getName() {
		return 'street';
	}

	/**
	addres: {street, city, zip, country}
	*/
	compare(langName, addressA, addressB) {
		var lang = this.core.getLanguageInstance(langName);

		addressA = this.prepareField(lang, addressA);
		addressB = this.prepareField(lang, addressB);

		if(!addressA || !addressB) return 0;

		return this.core.classifiedPhraseDistance(addressA, addressB);
	}

	prepareField(lang, string) {
		if(!string) return "";
		string += "";
		var field = this.core.removeMultipleWhiteSpaces(string.toLowerCase());
		field = this.core.normalizeCharacters(lang.getName(), field);
		field = lang.splitWords(field);
		field = lang.getWordWeights(field);
		return field;
	}
};
