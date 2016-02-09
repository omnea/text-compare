'use strict';

var defaultStopWords = require('text-compare/languages_data/de_DE_stopWords.js');
var en_GB = require('text-compare/languages/en_GB.js');

module.exports = class de_DE extends en_GB {
	constructor(core, stopWords) {
		super(core);
		this.stopWords = defaultStopWords;
		if(stopWords)
			this.addStopWords(stopWords);
	}

	getName() {
		return 'de_DE';
	}

	getCountry() {
		return 'DE';
	}

	getLanguage() {
		return 'de';
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
};
