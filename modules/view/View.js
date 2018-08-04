var Environment = require('../util/Environment');

var environment = Environment.getEnvironment();
var isProduction = environment === 'production'; 

var globalScripts = {
};

module.exports = {

	render: function(req, res, next, view, data) {
		
		data = data || {};
		data.environment = environment;
		data.isProduction = isProduction;
		
		data.title = data.title || 'DinoPass - Simple password generator for kids',
		
		data.scripts = data.scripts || [];
		
		for (var i=0; i<data.scripts.length; i++) {
			var script = data.scripts[i];
			data.scripts[i] = globalScripts[script] || script;
		}
		
		res.render(view, data, function(err, html){
			if (err) {
				return next(err);
			}
			res.render('Layout',{
				environment: environment,  
				isProduction: isProduction,  
				title: data.title,
				body: html,
				scripts: data.scripts
			});
		});
		
	}

};
