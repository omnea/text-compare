'use strict';

var defaultStopWords = require('text-compare/languages_data/en_US_stopWords.js');

module.exports = class en_US {
	constructor(core, stopWords) {
		this.core = core;
		this.stopWords = defaultStopWords || {};
		if(stopWords)
			this.addStopWords(stopWords);
	}

	getName() {
		return 'en_US';
	}

	getCountry() {
		return 'en';
	}

	getLanguage() {
		return 'US';
	}

	getWordWeights (words) {
		var wordsWithWeigth = [];

		for(let word of words) {
			let weight = 1;
			this.stopWords.weights.forEach((filter) => {
				if(filter.searchExp.test(word))
					weight = filter.weight;
			});

			wordsWithWeigth.push({
	            text: word,
	            length: word.length,
	            weight: weight,
	            type: 'unknow',
	            important: true
			});
		}

		return wordsWithWeigth;
	}

	filterWords (words) {

		if (this.stopWords.replacements) {
			for (let selectedRegExp of this.stopWords.replacements) {
				words = words.map((word) => word.replace(selectedRegExp.searchExp, selectedRegExp.replacer));
			}
		}

		if (this.stopWords.filter) {
			for (let selectedRegExp of this.stopWords.filter)
				words = words.filter((word) => { if(!selectedRegExp.test(word)) return word; else return ''; });
		}

		if (this.stopWords.delete) {
			for (let selectedRegExp of this.stopWords.delete) {
				words = words.map((word) => word.replace(selectedRegExp.searchExp, selectedRegExp.replacer));
			}
		}

		words = words.filter((word) => { return word; });
		return words;
	}

	splitWords (string) {
		return string.split(/ +/);
	}

	addStopWords(stopWords) {
		if(!this.stopWords.filter) this.stopWords.filter = [];
		if(stopWords.filter && stopWords.filter.length > 0)
			stopWords.filter.forEach((words) => this.stopWords.filter.push(words));

		if(!this.stopWords.delete) this.stopWords.delete = [];
		if(stopWords.delete && stopWords.delete.length > 0)
			stopWords.delete.forEach((words) => this.stopWords.delete.push(words));

		if(!this.stopWords.replacements) this.stopWords.replacements = [];
		if(stopWords.replacements && stopWords.replacements.length > 0)
			stopWords.replacements.forEach((words) => this.stopWords.replacements.push(words));
	}
};
