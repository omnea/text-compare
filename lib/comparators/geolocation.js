'use strict';

module.exports = class GeolocationComparator {
	constructor(core) {
		this.core = core;
	}

	getName() {
		return 'geolocation';
	}

	compare(langName, lat1, lon1, lat2, lon2, distance) {
		lat1 = this.toNumber(lat1);
		lon1 = this.toNumber(lon1);
		lat2 = this.toNumber(lat2);
		lon2 = this.toNumber(lon2);

		if(!this.checkNumbers(lat1, lon1, lat2, lon2)) return false;

		var kilometers = this.core.getGeodistanceKilometers(lat1, lon1, lat2, lon2);

		if(distance / 1000 >= kilometers)
			return true;

		return false;
	}

	toNumber(unit){
		var number = parseFloat(unit);

		if(isNaN(number) || !number && number !== 0) return null;

		return number;
	}

	checkNumbers(){
		for (var i = arguments.length - 1; i >= 0; i--) {
			if(typeof arguments[i] !== 'number')
				return false;
		}

		return true;
	}
};
