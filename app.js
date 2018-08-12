var express = require('express');
var cors = require('./modules/util/CORS');

var app = express();

// map .renderFile to ".html" files
app.engine('html', require('ejs').renderFile);

app.configure(function(){

	// Express settings
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');

	app.use(express.static(__dirname + '/public'));

	app.use(express.bodyParser());

	app.use(cors);

});

require('./routes')(app);

app.listen(8080);
console.log('Listening on port 8080');


console.log("visit codemoji at www.codemoji.com");
