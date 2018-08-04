
// See See http://en.wikipedia.org/wiki/Leet

var leet = {};
leet['a'] = '@';
leet['c'] = '(';
leet['d'] = ')';
leet['e'] = '3';
leet['f'] = '=';
leet['i'] = '!';
leet['j'] = ']';
leet['k'] = '<';
leet['s'] = '$';
leet['t'] = '+';
leet['z'] = '2';

var unleet = {};
for (leetChar in leet) {
	var alphaChar = leet[leetChar];
	unleet[leetChar] = alphaChar;
}

module.exports = {

	isLeetable: function(char) {
		return leet.hasOwnProperty(char);
	},
	
	isLeet: function(char) {
		return unleet.hasOwnProperty(char);
	},
	
    get: function(char) {
   		return this.isLeetable(char) ? leet[char] : char;
    },
    
    replaceOneRandomLetterWithLeet: function(word) {
    	var leetableChars = [];
    	var newWord = word;
    	for (var i in word) {
    		var c = word[i];
    		if (this.isLeetable(c)) {
    			leetableChars.push(c);
    		}
    	}
    	if (leetableChars.length) {
    		var c = leetableChars[Math.floor(Math.random() * leetableChars.length)];
    		newWord = newWord.replace(c, this.get(c));
    	}
    	return newWord;
    },
    
    revertWord: function(word) {
    	var revertedWord = word;
    	for (var i in word) {
    		var c = word[i];
    		if (this.isLeet(c)) {
    			revertedWord = revertedWord.split(c).join(this.unleet[c]);
    		}
    	}
    	return revertedWord;
    }

};
