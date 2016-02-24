'use strict';

module.exports = class CompanyComparator {
	constructor(core) {
		this.core = core;
	}

	getName() {
		return 'company';
	}

	compare(langName, stringA, stringB) {
		if(!stringA || !stringB) return 0;
		
		var lang = this.core.getLanguageInstance(langName);

		var companyA = this.core.removeMultipleWhiteSpaces(stringA.toLowerCase());
		var companyB = this.core.removeMultipleWhiteSpaces(stringB.toLowerCase());

		companyA = lang.splitWords(companyA);
		companyB = lang.splitWords(companyB);

		companyA = lang.filterWords(companyA);
		companyB = lang.filterWords(companyB);

		companyA = lang.getWordWeights(companyA);
		companyB = lang.getWordWeights(companyB);

		return this.core.classifiedPhraseDistance(companyA, companyB);
	}	
};
