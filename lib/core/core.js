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
		var methods = plugin.getMethodNames();
		methods.forEach((method) => {
			this.coreMethods.addMethod(method, plugin[method].bind(plugin));
		});
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
