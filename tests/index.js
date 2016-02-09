'use strict';
//This test plot some data about the words losts when we filter company names and streets

var FilterComparator = require('./filterComparator.js'); 
var process = require('process');
var companyNames = require('./data/companyName.js').companyNames;
var companyStreets = require('./data/companyStreet.js').streets;
var stopWords = require('./data/stopWords_de_DE.js');
var showFilteredWordsStatistics = require('./showFilteredWordsStatistics.js');
var showLostLetters = require('./showLostLetters.js');
var checkFalsePositives = require('./checkFalsePositives.js');

var Compare = require('../').inLang('de_DE');
Compare.addLanguageStopWords('de_DE', stopWords);

Compare.core.registerComparator(FilterComparator);
Compare.exposeComparators();


var companyFilteredNames = filterCompanyNames(companyNames);

checkFalsePositives(Compare, companyNames, 500, 10);
showLostLetters(companyFilteredNames, 100);
showFilteredWordsStatistics(companyFilteredNames, 20);



function filterCompanyNames (companyNames) {
	var companyNamesQuantity = companyNames.length;
	var companyFilteredNames = [];

	for (let i = 0; i < companyNamesQuantity; i++) {
		let filteredName = Compare.filter(companyNames[i]);
		companyFilteredNames.push(filteredName);
	}

	return companyFilteredNames;
}