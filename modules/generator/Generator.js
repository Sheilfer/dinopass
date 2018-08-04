var WordCollection = require('./WordCollection');
var Leet = require('./Leet');

var adjectives = WordCollection('../../data/adjectives.txt');
var nouns = WordCollection('../../data/nouns.txt');

function randomInt(from,to) {
	var num = Math.floor(Math.random()*(to-from+1)+from);
    if (num === 69) { // Bad num :)
    	num = 99;
    }
    return num;
}

function generateSimplePassword() {

	var adjective = adjectives.randomWord();
	var noun = nouns.randomWord();
	var number = randomInt(10,99);

	var pw = adjective + noun + number;
	return pw;
}

function generateStrongPassword() {

	var adjective = adjectives.randomWord();
	var noun = nouns.randomWord();
	var number = randomInt(10,99);

	noun = noun.charAt(0).toUpperCase() + noun.slice(1);
	var pw = adjective + noun + number;
	pw = Leet.replaceOneRandomLetterWithLeet(pw);
	return pw;
}

function hasWord(word) {
	return nouns.hasWord(word) || adjectives.hasWord(word);
}

module.exports = {
	generateSimplePassword: generateSimplePassword,
	generateStrongPassword: generateStrongPassword,
	hasWord: hasWord
};
