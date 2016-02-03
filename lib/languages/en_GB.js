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
		return words.filter((word) => !this.stopWords.test(word));
	}

	splitWords (string) {
		return string.split(/ +/);
	}
};
