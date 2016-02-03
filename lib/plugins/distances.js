'use strict';

var DIFERENCE_PER_WORD = 0.05;
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
		this.core.addMethod('classifiedPhraseDistance', this.classifiedPhraseDistance.bind(this));
	}

	stringDistance (stringA, stringB) {
		return Distance(stringA, stringB).similarity;
	}

	weigthWordDistance (wordA, wordB) {
		var distance = Distance(wordA.text, wordB.text);

		var weigth = (wordA.weigth + wordB.weigth) / 2;

		distance.similarity *= weigth;

		return distance.similarity;
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

		var diference = biggerPhrase.length - smallerPhrase.length;
		var maximumSimilitude = 0;

		for (let i = 0; i <= diference; i++) {
			let biggerSubPhrase = biggerPhrase.slice(i, i + smallerPhrase.length);
			let similitude = this.unorderedWordsDistance(smallerPhrase, biggerSubPhrase, 1, distanceFunction);
			if(similitude > maximumSimilitude) maximumSimilitude = similitude;
		}

		return maximumSimilitude - diference * DIFERENCE_PER_WORD;
	}

	/**
	Get the sum distance of the per word distances. If maximunDistance > 0, then get the minimun distance of the permutations of the word position +- maximunDistance
	*/
	unorderedWordsDistance(wordsA, wordsB, maximumDistance, distanceFunction) {
		var wordsQuantity = Math.min(wordsA.length, wordsB.length);
		maximumDistance = maximumDistance ? maximumDistance : 1;

		var similitude = 0;

		for (let i = wordsQuantity - 1; i >= 0; i--) {
			let start = i - maximumDistance;
			let end = i + maximumDistance;
			start = start >= 0 ? start : 0;
			end = end < wordsQuantity ? end : wordsQuantity - 1;

			let maximumSimilitude = 0;

			for(let j = start; j <= end; j++){
				let similitude;
				
				if(distanceFunction)
					similitude = distanceFunction(wordsA[i], wordsB[j]);
				else
					similitude = this.stringDistance(wordsA[i], wordsB[j]);
				
				if(similitude > maximumSimilitude)
					maximumSimilitude = similitude;
			}

			similitude += maximumSimilitude;
		}

		return similitude / wordsQuantity;
	}

	classifiedPhraseDistance (wordsA, wordsB) {
		return this.phraseDistance(wordsA, wordsB, this.weigthWordDistance.bind(this));
	}

	sumWordsInPhrase(words){
		var sum = 0;

		for(let word of words) {
			sum += word.length;
		}
	}
};