'use strict';

var CoreMethods = require('text-compare/core/coreMethods.js');

module.exports = class Core {

	constructor () {
		this.coreMethods = new CoreMethods();
		this.comparators = {};
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

		this.coreMethods.addLanguageInstance(languageName, language);
	}

	registerComparator (Comparator) {
		var comparator = new Comparator(this.coreMethods);
		var comparatorName = comparator.getName();

		this.comparators[comparatorName] = comparator.compare.bind(comparator);
	}
};
