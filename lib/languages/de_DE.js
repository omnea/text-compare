'use strict';

var stopWords = require('text-compare/languages_data/de_DE_stopWords.js');
var en_GB = require('text-compare/languages/en_GB.js');

module.exports = class de_DE extends en_GB {
	constructor(core) {
		super();
		this.core = core;
		this.stopWords = stopWords;
	}

	getName() {
		return 'de_DE';
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
