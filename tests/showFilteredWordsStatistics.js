'use strict';
var Table = require('cli-table');

module.exports = function showFilteredWordsStatistics (companyFilteredNames, plotDivisor) {
	plotDivisor = plotDivisor ? plotDivisor : 20;
	var companyNamesQuantity = companyFilteredNames.length;
	
	var lengths = new Array(2000).fill(0);
	var wordsExamples = new Array(2000).fill(0).map(() => []);

	for (let i = 0; i < companyNamesQuantity; i++) {
		let nameData = companyFilteredNames[i];
		lengths[nameData.letters.after]++;

		wordsExamples[nameData.letters.after].push(nameData);
	}



	var table = new Table({ head: ["Final letters", "Quantity", "Percentage", "Plot", "Original -> Result"] });

	for (let i = lengths.length - 1; i >= 0; i--) {
		if(lengths[i] <= 0) continue;

		let randomWord = wordsExamples[i][Math.floor(Math.random() * wordsExamples[i].length)];
		if(randomWord.originalName.length < 50)
			randomWord = "'" + randomWord.originalName + "' -> '" + randomWord.result.join(' ') + "'" ;
		else
			randomWord = randomWord.result.join(' ');

		table.push([
			i,
			lengths[i],
			(lengths[i] / companyNamesQuantity * 100).toFixed(2) + "%",
			new Array(Math.round(lengths[i]/plotDivisor)).join("="),
			randomWord,
		]);
	}

	console.log(table.toString());
};
