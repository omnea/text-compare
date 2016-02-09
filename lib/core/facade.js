'use strict';

module.exports = class TextCompareFacade {
	constructor(core, lang) {
		this.core = core;
		this.lang = lang ? lang : 'en_GB';

		this.exposeComparators();
	}

	inLang(lang) {
		if(!lang) return this;
		return new TextCompareFacade(this.core, lang);
	}

	exposeComparators() {
		var comparators = this.core.getComparators();
		
		for(var name in comparators){
			this[name] = comparators[name].bind(undefined, this.lang);
		}
	}

	addLanguageStopWords(lang, stopWords){
		this.core.addLanguageStopWords(lang, stopWords);
	}
};
