'use strict';
var Table = require('cli-table');

module.exports = function showLostLetters (companyFilteredNames, plotDivisor) {
	plotDivisor = plotDivisor ? plotDivisor : 60;
	var companyNamesQuantity = companyFilteredNames.length;

	var occurrences = new Array(2000).fill(0);

	for (let i = 0; i < companyNamesQuantity; i++) {
		let nameData = companyFilteredNames[i];
		occurrences[nameData.letters.lost]++;
	}

	var table = new Table({ head: ["Lost letters", "Percentage", "Plot", "Quantity"] });

	for (var i = occurrences.length - 1; i >= 0; i--) {
		if(occurrences[i] > 0)
			table.push([
				i,
				(occurrences[i] / companyNamesQuantity * 100).toFixed(2) + "%",
				new Array(Math.round(occurrences[i]/plotDivisor)).join("="),
				occurrences[i]
			]);
	}

	console.log(table.toString());
};
