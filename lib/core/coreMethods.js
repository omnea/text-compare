'use strict';

var LANG_METHODS = require('text-compare/statics/languagesAPI.js').methods;

module.exports = class CoreMethods  {
	constructors () {		
		this.languages = {};
		this._createLanguageMethods();
	}

	addMethod (name, fn) {
		this[name] = fn;
	}

	addLanguageInstance (name, language) {
		if(!name) throw new Error('no language name');
		if(!language) throw new Error('no language instance provided');

		this.languages[name] = language;
		
		LANG_METHODS.forEach((methodName) => {
			if(!language[methodName]) throw new Error('language not implement method: ' + methodName);
		});
	}

	getLanguageInstance(name) {
		if(!this.languages[name]) return null;
		return this.languages[name];
	}

	_createLanguageMethods() {
		LANG_METHODS.forEach((methodName) => {
			this[methodName] = (languageName) => {
				var languageInstance = this.languages[languageName];
				if(!languageInstance) return false;

				var args = Array.prototype.slice.call(arguments, 1);

				languageInstance[methodName].apply(languageInstance, args);
			};
		});
	}
};
