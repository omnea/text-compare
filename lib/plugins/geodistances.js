'use strict';

module.exports = class Text {
	constructor(core) {
		this.core = core;

		this.registerMethods();
	}

	registerMethods() {
		this.core.addMethod('getGeodistanceKilometers', this.getGeodistanceKilometers.bind(this));
	}

	getGeodistanceKilometers(lat1, lon1, lat2, lon2) {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		
		var theta = lon1 - lon2;
		var radtheta = Math.PI * theta/180;
		
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		
		dist = Math.acos(dist);
		dist *= 180/Math.PI;
		dist *= 60 * 1.1515;
		dist *= 1.609344;

		return dist;
	}
};
