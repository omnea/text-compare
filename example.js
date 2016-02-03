var Compare = require('./lib/index.js');

var distance = Compare.inLang('de_DE').company('Company name A', 'Company b');

console.log(distance);

distance = Compare.address({
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

console.log(distance);