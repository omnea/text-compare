'use strict';

var Iconv = require('iconv').Iconv;

module.exports = class Text {
	constructor(core) {
		this.core = core;

		this.iconvInstances = {};

		this.registerMethods();
	}

	registerMethods() {
		this.core.addMethod('normalizeCharacters', this.normalizeCharacters.bind(this));
	}

	normalizeCharacters(lang, string) {
		var iconv = this.getIconvInstance(lang);
		return iconv.convert(string).toString();
	}

	getIconvInstance(lang) {
		if(!this.iconvInstances[lang]){
			let iconv = new Iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', lang + '.UTF-8');
			this.iconvInstances[lang] = iconv;
			return iconv; 
		}

		return this.iconvInstances[lang];
	}
};
