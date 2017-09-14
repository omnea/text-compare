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

		var companyA = this.preprocessText(lang, stringA);
		var companyB = this.preprocessText(lang, stringB);

		return this.core.classifiedPhraseDistance(companyA, companyB);
	}

	preprocessText(lang, text) {
		text = text.toLowerCase();
		text = this.core.removeMultipleWhiteSpaces(text);
		text = this.core.trimSpaces(text);
		text = this.core.normalizeCharacters(lang.getName(), text);
		text = lang.splitWords(text);

		return lang.getWordWeights(text);
	}
};
