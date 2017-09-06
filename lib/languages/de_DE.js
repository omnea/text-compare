'use strict';

var defaultStopWords = require('text-compare/languages_data/de_DE_stopWords.js');
var en_US = require('text-compare/languages/en_US.js');

module.exports = class de_DE extends en_US {
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
};
