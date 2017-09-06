'use strict';

var SegfaultHandler = require('segfault-handler');

SegfaultHandler.registerHandler("crash.log");


var Compare = require('./lib/index.js');

var time = Date.now();

var compare = Compare.inLang('de_DE');

var time = Date.now();

var distance = compare.company('Generali Versicherung AG', 'Generali Versicherung');

console.log('company: ', distance, Date.now() - time);

var time = Date.now();

var distance = compare.company('Generali Versicherung Zuenhöpenlaugen', 'Generali Versicherung');

console.log('company different length: ', distance, Date.now() - time);

time = Date.now();

var distance = compare.company('Generali Versicherung GmbH', 'Generali Versicherung Gbh');

console.log('company GmbH: ', distance, Date.now() - time);

time = Date.now();

var distance = compare.company('Generali Versicherung', 'Versicherung Generali');

console.log('company order: ', distance, Date.now() - time);

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

console.log('address: ', distance, Date.now() - time);


time = Date.now();

var distance = compare.phone('(+49) 030.5770-432', '(+49) 030/5770/432(10)');

console.log('phone: ', distance, Date.now() - time);


time = Date.now();

var distance = compare.city('New York', 'York');

console.log('city: ', distance, Date.now() - time);


time = Date.now();

var distance = compare.zip(12472, '12472');

console.log('zip: ', distance, Date.now() - time);


time = Date.now();

var distance = compare.geolocation(53, 43, 52.0001, 43.0001, 112000);

console.log('geolocation: ', distance, Date.now() - time);


time = Date.now();

var distance = compare.street('Monbijouplatz 5', 'Monbijoustrasse 5');

console.log('street: ', distance, Date.now() - time);
