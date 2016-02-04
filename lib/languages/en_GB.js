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
		var fn = (word) => !list.test(word);

		for(var list of this.stopWords)
			words = words.filter(fn);

		return words;
	}

	splitWords (string) {
		return string.split(/ +/);
	}
};
