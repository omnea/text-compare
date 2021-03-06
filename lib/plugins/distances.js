'use strict';

var DIFERENCE_PER_WORD = 0.1;
var Distance = require('damerau-levenshtein');

module.exports = class Text {
	constructor(core) {
		this.core = core;

		this.registerMethods();
	}

	registerMethods() {
		this.core.addMethod('stringDistance', this.stringDistance.bind(this));
		this.core.addMethod('phraseDistance', this.phraseDistance.bind(this));
		this.core.addMethod('unorderedWordsDistance', this.unorderedWordsDistance.bind(this));
		this.core.addMethod('classifiedPhraseDistance', this.phraseDistance.bind(this));
	}

	stringDistance (stringA, stringB) {
		if(!stringA || !stringB)
			return 0;

		return Distance(stringA.text, stringB.text).similarity;
	}

	/**
	Get the minimum distance displacing the smaller phrase one by one position over the grather phrase
	*/
	phraseDistance(wordsA, wordsB, distanceFunction) {
		var smallerPhrase = wordsA;
		var biggerPhrase = wordsB;
		if(wordsA.length > wordsB.length){
			smallerPhrase = wordsB;
			biggerPhrase = wordsA;
		}

		var difference = biggerPhrase.length - smallerPhrase.length;
		var maximumSimilitude = 0;

		for (let i = 0; i <= difference; i++) {
			let biggerSubPhrase = biggerPhrase.slice(i, i + smallerPhrase.length);
			let similitude = this.unorderedWordsDistance(smallerPhrase, biggerSubPhrase, 0, distanceFunction);
			if(similitude > maximumSimilitude) maximumSimilitude = similitude;
		}

		return maximumSimilitude - difference * DIFERENCE_PER_WORD;
	}

	/**
	Get the sum distance of the per word distances. If maximunDistance > 0, then get the minimun distance of the permutations of the word position +- maximunDistance
	*/
	unorderedWordsDistance(wordsA, wordsB, maximumDistance, distanceFunction) {
		var wordsQuantity = Math.min(wordsA.length, wordsB.length);
		maximumDistance = maximumDistance ? maximumDistance : 0;

		var similitude = 0;

		for (let i = wordsQuantity - 1; i >= 0; i--) {
			let start = i - maximumDistance;
			let end = i + maximumDistance;
			start = start >= 0 ? start : 0;
			end = (end < wordsQuantity) ? end : wordsQuantity - 1;

			let weight = wordsA[i].weight;

			wordsQuantity -= 1 - weight;

			let maximumSimilitude = this.getTheMaxSimilitude(wordsA[i], wordsB, start, end, distanceFunction);

			similitude += maximumSimilitude * weight;
		}

		return similitude / wordsQuantity;
	}

	getTheMaxSimilitude(word, wordList, start, end, distanceFunction){

		let maximumSimilitude = 0;

		for(let i = start; i <= end; i++){
			let similitude;
			
			if(distanceFunction)
				similitude = distanceFunction(word, wordList[i]);
			else
				similitude = this.stringDistance(word, wordList[i]);

			if(similitude > maximumSimilitude)
				maximumSimilitude = similitude;
		}

		return maximumSimilitude;
	}

	sumWordsInPhrase(words){
		var sum = 0;

		for(let word of words) {
			sum += word.length;
		}
	}
};
