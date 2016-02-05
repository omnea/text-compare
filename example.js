'use strict';

var Compare = require('./lib/index.js');

var time = Date.now();

var distance = Compare.inLang('de_DE').company('Generali Versicherung AG', 'Generali Versicherung: Filialdirektion');

console.log(distance, Date.now() - time);

time = Date.now();

distance = Compare.inLang('en_GB').address({
	street: "meyersbeerstrasse 113",
	city: "Berlin",
	zip: "13088",
	country: "Germany"
},{
	street: "meyersbeerstrasse 113",
	city: "Berlin",
	zip: "13088",
	country: "Germany"
});

console.log(distance, Date.now() - time);
