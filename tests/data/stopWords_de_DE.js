exports.filter = [
	/^(EWIV|GbR|KG|oHG|PartG|eV|AG|eG|GmbH|mbH|KGaA|REIT-AG|SCE|SE|UG)$/gi,
	/^(dr|kg|co)$/gi,
];

exports.replacements = [
	{
		searchExp: /([^!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_{|}~])[/\-\\_\.]([^!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_{|}~])/gi,
		replacer: '$1 $2' 
	},{
		searchExp: /[!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_{|}~]/gi,
		replacer: '' 
	}
];