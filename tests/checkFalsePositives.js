'use strict';
var Table = require('cli-table');

module.exports = function checkFalsePositives (compare, companyNames, plotDivisor, subiterations) {
	plotDivisor = plotDivisor ? plotDivisor : 60;
	var companyNamesQuantity = companyNames.length;
	subiterations = subiterations ? subiterations : 10;
	subiterations = Math.min(companyNamesQuantity, subiterations);
	subiterations = Math.min(subiterations, companyNamesQuantity - 1);

	var similitudeOcurrences = new Array(20).fill(0);
	
	var startTime = Date.now();

	for (let i = companyNamesQuantity - 1; i >= 0; i--) {
		let companyA = companyNames[i];
		let elapsedTime = (Date.now() - startTime) / 1000;
		var remainingTime = seconds2Str((elapsedTime / (companyNamesQuantity - i)) * i);
		process.stdout.write("ET: " + remainingTime + " - Calculating false positives " + (companyNamesQuantity - i) + "/" + companyNamesQuantity + "                         \r");
		for (let j = subiterations - 1; j >= 0; j--) {
			let n = j;
			if(subiterations !== companyNamesQuantity) n = Math.floor(Math.random() * companyNamesQuantity);
			let companyB = companyNames[n];
			if(companyA === companyB) continue;

			var similitude = compare.company(companyA, companyB);
			if(similitude < 0) similitude = 0;
			if(similitude > 1) similitude = 1;

			similitudeOcurrences[Math.round(similitude * 100 / 5)]++;
		}
	}

	var table = new Table({ head: ["Similitude", "Quantity", "Percentage", "Plot"] });

	for (var i = similitudeOcurrences.length - 1; i >= 0; i--) {
		if(similitudeOcurrences[i] <= 0) continue;
		table.push([
			(i * 5) + "-" + (i * 5 + 5) + "%",
			similitudeOcurrences[i],
			(similitudeOcurrences[i] / (companyNamesQuantity * subiterations) * 100).toFixed(2) + "%",
			new Array(Math.round(similitudeOcurrences[i]/plotDivisor)).join("="),
		]);
	}
	console.log("Statistical result: ");
	console.log(table.toString());
};

function seconds2Str (time) {
	return Math.floor(time / 60)  + " minutes";
}
