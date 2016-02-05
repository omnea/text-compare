'use strict';

var stopWords = require('text-compare/languages_data/en_GB_stopWords.js');

module.exports = class es_ES {
	constructor(core) {
		this.core = core;
		this.stopWords = stopWords;
	}

	getName() {
		return 'en_GB';
	}

	getCountry() {
		return 'en';
	}

	getLanguage() {
		return 'GB';
	}

	getWordWeights (words) {
		var wordsWithWeigth = [];

		for(let word of words) {
			wordsWithWeigth.push({
	            text: word,
	            length: word.length,
	            weigth: 1,
	            type: 'unknow',
	            important: true
			});
		}

		return wordsWithWeigth;
	}

	filterWords (words) {
		var selectedRegExp;
		var filterFn = (word) => !selectedRegExp.test(word);
		var deleteFn = (word) => word.replace(selectedRegExp, '');

		if(this.stopWords.filter)
			for(selectedRegExp of this.stopWords.filter)
				words = words.filter(filterFn);

		if(this.stopWords.delete)
			for(selectedRegExp of this.stopWords.delete)
				words = words.map(deleteFn);

		return words;
	}

	splitWords (string) {
		return string.split(/ +/);
	}
};
