var Generator = require('../modules/generator/Generator');
var View = require('../modules/view/View');

module.exports = function(app) {

	app.get('/password', getSimplePassword);
	app.get('/password/simple', getSimplePassword);
	app.get('/password/strong', getStrongPassword);
	app.get('/hasword', hasWord);

	function hasWord(req, res, next) {
		var word = req.query.word;
		var hasWord = word ? Generator.hasWord(word) : false;
		res.setHeader('Content-Type', 'text/plain');
		res.send(hasWord);
	}

	function getSimplePassword(req, res, next) {
		var n = +req.query.n || 1;
		n = n>1000 ? 1 : n;
		var passwords = [];
		for (var i=0; i<n; i++) {
			var password = Generator.generateSimplePassword();
			passwords.push(password)
		}
		res.setHeader('Content-Type', 'text/plain');
		res.send(passwords.join('\n'));
	}

	function getStrongPassword(req, res, next) {
		var n = +req.query.n || 1;
		n = n>1000 ? 1 : n;
		var passwords = [];
		for (var i=0; i<n; i++) {
			var password = Generator.generateStrongPassword();
			passwords.push(password)
		}
		res.setHeader('Content-Type', 'text/plain');
		res.send(passwords.join('\n'));
	}

};
