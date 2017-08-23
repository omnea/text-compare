'use strict';

var IS_SIMILAR_CITY_BARRIER = 0.9;
var IS_SIMILAR_ADDRESS_BARRIER = 0.9;
var IS_SIMILAR_COUNTRY_BARRIER = 0.9;
var IS_SIMILAR_ZIP_BARRIER = 1;

module.exports = class AddressComparator {
	constructor(core) {
		this.core = core;
	}

	getName() {
		return 'address';
	}

	/**
	addres: {street, city, zip, country}
	*/
	compare(langName, addressA, addressB) {
		var lang = this.core.getLanguageInstance(langName);

		addressA = this.prepareAddressFields(lang, addressA);
		addressB = this.prepareAddressFields(lang, addressB);

		var hasStreet = this.allAddressHasStreet(addressA, addressB);
		var hasZip = this.allAddressHasZip(addressA, addressB);
		var hasCity = this.allAddressHasCity(addressA, addressB);
		var hasCountry = this.allAddressHasCountry(addressA, addressB);
		var similarCountry = this.similarCountry(addressA, addressB);
		var similarStreet = this.similarStreet(addressA, addressB);
		var similarCity = this.similarCity(addressA, addressB);
		var similarZip = this.similarZip(addressA, addressB);
		var areComplete = hasStreet && hasZip && hasCity && hasCountry;
		var presentFieldsSimilar = this.presentFieldsSimilar(hasStreet, hasZip, hasCity, hasCountry, similarCountry, similarStreet, similarCity, similarZip);

		return this.compareDataLogic(hasStreet, hasZip, hasCity, hasCountry, areComplete, similarStreet, similarCity, similarZip, presentFieldsSimilar, similarCountry);
	}

	compareDataLogic(hasStreet, hasZip, hasCity, hasCountry, areComplete, similarStreet, similarCity, similarZip, presentFieldsSimilar, similarCountry) {
		var goodAddress = hasStreet && ( hasZip || hasCity );

		if(hasCountry && !similarCountry) return false;
		
		if(goodAddress && presentFieldsSimilar) return true;
		if(hasCountry && goodAddress && similarStreet && (similarCity || similarZip)) return true;
		if(!hasCountry && goodAddress && similarStreet && similarCity && similarZip) return true;

		return false;
	}

	prepareAddressFields(lang, address){
		address.street = address.street ? address.street = this.prepareField(lang, address.street) : "";
		address.city = address.city ? this.prepareField(lang, address.city) : "";
		address.zip = address.zip ? this.prepareField(lang, address.zip) : "";
		address.country = address.country ? this.prepareField(lang, address.country) : "";
		return address;
	}

	prepareField(lang, string) {
		if(!string) return "";
		string += "";
		var field = this.core.removeMultipleWhiteSpaces(string.toLowerCase());
		field = this.core.normalizeCharacters(lang.getName(), field);
		field = lang.splitWords(field);
		field = lang.filterWords(field);
		field = lang.getWordWeights(field);
		return field;
	}

	allAddressHasStreet () {
		return this.checkAddressFields('street', arguments);
	}

	allAddressHasZip () {
		return this.checkAddressFields('zip', arguments);
	}

	allAddressHasCity () {
		return this.checkAddressFields('city', arguments);
	}

	allAddressHasCountry () {
		return this.checkAddressFields('country', arguments);
	}

	similarCountry (addressA, addressB) {
		if(this.core.classifiedPhraseDistance(addressA.country, addressB.country) >= IS_SIMILAR_CITY_BARRIER)
			return true;
		return false;
	}

	similarStreet (addressA, addressB) {
		if(this.core.classifiedPhraseDistance(addressA.street, addressB.street) >= IS_SIMILAR_ADDRESS_BARRIER)
			return true;
		return false;
	}

	similarCity (addressA, addressB) {
		if(this.core.classifiedPhraseDistance(addressA.city, addressB.city) >= IS_SIMILAR_COUNTRY_BARRIER)
			return true;
		return false;
	}

	similarZip (addressA, addressB) {
		if(this.core.classifiedPhraseDistance(addressA.zip, addressB.zip) >= IS_SIMILAR_ZIP_BARRIER)
			return true;
		return false;
	}

	presentFieldsSimilar(hasStreet, hasZip, hasCity, hasCountry, similarCountry, similarStreet, similarCity, similarZip) {
		if(hasStreet && !similarStreet) return false;
		if(hasZip && !similarZip) return false;
		if(hasCity && !similarCity) return false;
		if(hasCountry && !similarCountry) return false;

		return true;
	}

	checkAddressFields(field, addresses) {
		for (var i = addresses.length - 1; i >= 0; i--) {
			if(!addresses[i][field]) return false;	
		}

		return true;
	}

};
