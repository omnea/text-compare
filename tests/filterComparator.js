'use strict';

module.exports = class FilterComparator {
	constructor(core) {
		this.core = core;
	}

	getName() {
		return 'filter';
	}

	compare(langName, stringA) {
		var lang = this.core.getLanguageInstance(langName);

		var companyA = this.core.removeMultipleWhiteSpaces(stringA.toLowerCase());
		var lettersBefore = companyA.length;
		companyA = lang.splitWords(companyA);
		var wordCountbefore = companyA.length;
		companyA = lang.filterWords(companyA);

		return {
			words: {
				after: companyA.length,
				before: wordCountbefore,
				lost: wordCountbefore - companyA.length
			},
			letters: {
				after: companyA.join(' ').length,
				before: lettersBefore,
				lost: lettersBefore - companyA.join(' ').length
			},
			result: companyA,
			originalName: stringA
		};
	}
};