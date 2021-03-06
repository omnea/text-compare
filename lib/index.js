'use strict';

var glob = require( 'glob' );
var path = require( 'path' );

var Core = require('./core/core.js');
var Facade = require('./core/facade.js');

var core = new Core();

registerComponents('plugins', core.registerPlugin.bind(core));
registerComponents('languages', core.registerLanguage.bind(core));
registerComponents('comparators', core.registerComparator.bind(core));

var facade = new Facade(core);

module.exports = facade;

function registerComponents (type, registerMethod, callback) {
	var files = glob.sync(__dirname + '/' + type + '/*');
	files.forEach( (file) => {
		registerMethod( require( path.resolve(file) ) );
	});
}
