'use strict';

var SegfaultHandler = require('segfault-handler');
SegfaultHandler.registerHandler("crash.log");


var Compare = require('./lib/index.js');
var compare = Compare.inLang('de_DE');

function getNow(){
	var hrTime = process.hrtime();
	return (hrTime[0] * 1000000 + hrTime[1] / 1000).toFixed(0);
}


var time = getNow();

var distance = compare.company('pontgarten', 'weinhaus');

console.log('company: ', distance, getNow() - time);



var time = getNow();

var distance = compare.company('Generali Versicherung AG', 'Generali Versicherung AG');

console.log('company: ', distance, getNow() - time);



var time = getNow();

var distance = compare.company('Generali-Versicherung GmbH', 'Generali-Versicherung GmbH ');

console.log('company space last: ', distance, getNow() - time);



var time = getNow();

var distance = compare.company('Generali Versicherung Zuenhöpenlaugen', 'Generali Versicherung');

console.log('company different length: ', distance, getNow() - time);



time = getNow();

var distance = compare.company('Generali Versicherung GmbH', 'Generali Versicherung Gbh');

console.log('company GmbH: ', distance, getNow() - time);



time = getNow();

var distance = compare.company('Generali Versicherung', 'Versicherung Generali');

console.log('company order: ', distance, getNow() - time);



time = getNow();

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

console.log('address: ', distance, getNow() - time);



time = getNow();

distance = compare.street("meyerbeerstrasse 113 ","meyerbeerstrasse 113");

console.log('street space last: ', distance, getNow() - time);



time = getNow();

var distance = compare.phone('(+49) 030.5770-432', '(+49) 030/5770/432(10)');

console.log('phone: ', distance, getNow() - time);



time = getNow();

var distance = compare.city('New York', 'York');

console.log('city: ', distance, getNow() - time);



time = getNow();

var distance = compare.zip(12472, '12472');

console.log('zip: ', distance, getNow() - time);



time = getNow();

var distance = compare.geolocation(53, 43, 52.0001, 43.0001, 112000);

console.log('geolocation: ', distance, getNow() - time);



time = getNow();

var distance = compare.street('Monbijouplatz 5', 'Monbijoustrasse 5');

console.log('street: ', distance, getNow() - time);
