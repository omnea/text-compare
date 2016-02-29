exports.filter = [
];

exports.delete = [
	{
		searchExp: /^(a\.)([^ ])/gi,
		replacer: "$2"
	},{
		searchExp: /([^ ])(allee|allée|chaussee|chaussée|weg|steg|ufer|ring|höhe)$/gi,
		replacer: "$1"
	},{
		searchExp: /-?(strasse|straße|str|str\.|st\.|platz|pl\.)$/gi,
		replacer: ""
	},{
		searchExp: /^(EWIV|GbR|KG|oHG|PartG|eV|AG|eG|GmbH|mbH|KGaA|REIT-AG|SCE|SE|UG)$/gi,
		replacer: ""
	}
	
];

exports.replacements = [
	{
		searchExp: / ([\-&·]) /gi,
		replacer: '$2' 
	}
];