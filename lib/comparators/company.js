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

		if (stringA.toLowerCase().indexOf(stringB.toLowerCase()) >= 0) {
			return 1;
		}

		var companyA = this.preprocessText(lang, stringA);
		var companyB = this.preprocessText(lang, stringB);

		return this.core.classifiedPhraseDistance(companyA, companyB);
	}

	preprocessText(lang, text) {
		text = this.core.removeMultipleWhiteSpaces(text.toLowerCase());
		text = this.core.normalizeCharacters(lang.getName(), text);
		text = lang.splitWords(text);
		text = lang.filterWords(text);
		return lang.getWordWeights(text);
	}
};
