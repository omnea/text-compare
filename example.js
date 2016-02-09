'use strict';

var Compare = require('./lib/index.js');

var time = Date.now();

var compare = Compare.inLang('de_DE');

var time = Date.now();

var distance = compare.company('Generali Versicherung AG', 'Generali Versicherung: Filialdirektion');

console.log(distance, Date.now() - time);

time = Date.now();

distance = compare.address({
	street: "meyerbeerstr. 113",
	city: "Berlin",
	zip: "13088",
	country: "Germany"
},{
	street: "meyerbeerstrasse 113",
	city: "Berlin",
	zip: "13088",
	country: "Germany"
});

console.log(distance, Date.now() - time);


time = Date.now();

var distance = compare.phone('(+49) 030.5770-432', '(+49) 030/5770/432(10)');

console.log(distance, Date.now() - time);