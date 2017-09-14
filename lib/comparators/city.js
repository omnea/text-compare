'use strict';

module.exports = class CityComparator {
	constructor(core) {
		this.core = core;
	}

	getName() {
		return 'city';
	}

	compare(langName, stringA, stringB) {
		if(!stringA || !stringB) return 0;
		
		var lang = this.core.getLanguageInstance(langName);

		var cityA = this.preprocessText(lang, stringA);
		var cityB = this.preprocessText(lang, stringB);

		return this.core.phraseDistance(cityA, cityB);
	}

	preprocessText(lang, text) {
		text = this.core.removeMultipleWhiteSpaces(text.toLowerCase());
		text = this.core.normalizeCharacters(lang.getName(), text);
		text = this.core.trimSpaces(text);
		text = lang.splitWords(text);
		text = lang.filterWords(text);
		return lang.getWordWeights(text);
	}	
};
