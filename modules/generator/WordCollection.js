var FS = require('fs');
var Path = require('path');

module.exports = function(path) {

	path = Path.normalize(__dirname + '/' + path);

	var wordData = FS.readFileSync(path, 'utf-8');
	var wordDataArr = wordData.split('\n');

	var wordArr = [];
	wordDataArr.forEach(function(word){
		word = word.toLowerCase();
		word = word.trim();
		if (word.length) {
			wordArr.push(word);
		}
	});

	var WordCollection = {

		words: wordArr,

		randomWord: function() {
			var word = this.words[Math.floor(Math.random() * this.words.length)];
			return word;
		},

		hasWord: function(word) {
			for (var i=0; i<this.words.length; i++) {
				if (this.words[i] === word) {
					return true;
				}
			}
			return false;
		}

	};

	return WordCollection;
	
};
