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
		searchExp: /-?(strasse|straße|str\.?|st\.|platz|pl\.)$/gi,
		replacer: ""
	},{
		searchExp: /^(Einzelunternehmen|e\.?K\.?|e\.?Kfm\.?|e\.?Kfr\.?|Partenreederei|e\.?G\.?|e\.?V\.?|GbR|Innengesellschaft|OHG|KG|Co\.?|AG|GmBH|PartG|KGaA|GmbH|mbH)$/gi,
		replacer: ""
	}
	
];

exports.replacements = [
	{
		searchExp: / ([\-&·]) /gi,
		replacer: '$2' 
	}
];