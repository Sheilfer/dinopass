module.exports = function(app) {
	
	require('./pages')(app);
	require('./api')(app);

};

