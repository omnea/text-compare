'use strict';

var CoreMethods = require('./coreMethods.js');

module.exports = class Core {

	constructor () {
		this.coreMethods = new CoreMethods();
		this.comparators = {};
		this.languagesInstances = {};
	}

	getComparators () {
		return this.comparators;
	}

	registerPlugin (Plugin) {
		var plugin = new Plugin(this.coreMethods);
	}

	registerLanguage (Language) {
		var language = new Language(this.coreMethods);
		var languageName = language.getName();
		this.languagesInstances[languageName] = language;

		this.coreMethods.addLanguageInstance(languageName, language);
	}

	registerComparator (Comparator) {
		var comparator = new Comparator(this.coreMethods);
		var comparatorName = comparator.getName();

		this.comparators[comparatorName] = comparator.compare.bind(comparator);
	}

	addLanguageStopWords(lang, stopWords) {
		if(!this.languagesInstances[lang]) return false;
		
		var languageInstance = this.languagesInstances[lang];

		languageInstance.addStopWords(stopWords);

		return true;
	}
};
