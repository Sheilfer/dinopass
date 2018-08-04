var Validator = require('validator');
var NodeMailer = require('nodemailer');

var View = require('../modules/view/View');

module.exports = function(app) {

	app.get('/', showHome);
	app.get('/about', showAbout);
	app.get('/api', showAPI);

	app.get('/contact', contactForm);
	app.post('/contact', contactSend);

	function showHome(req, res, next) {
		var data = {
			scripts: ['/assets/js/home.js']
		};
		View.render(req, res, next, 'Home', data);
	}

	function showAbout(req, res, next) {
		View.render(req, res, next, 'About');
	}

	function showAPI(req, res, next) {
		View.render(req, res, next, 'API');
	}

	function contactForm(req, res, next) {
		var data = {
			errorMessage: null,
			name: '',
			email: '',
			message: ''
		};
		View.render(req, res, next, 'Contact', data);
	}

	function contactSend(req, res, next) {

		var personName = req.body.name.trim();
		var personEmail = req.body.email.trim();
		var personMessage = req.body.message.trim();

		var isValid = personName.length > 0
					&& personEmail.length > 0
					&& personMessage.length > 0;

		// Check email
		if (isValid) {
			try {
				Validator.check(personEmail).isEmail();
			}
			catch (e) {
				isValid = false;
			}
		}

		var data = {};
		data.name = personName;
		data.email = personEmail;
		data.message = personMessage;
		data.errorMessage = '';

		if (!isValid) {
			data.errorMessage = 'All fields are required and please check that your email address is correct';
			return View.render(req, res, next, 'Contact', data);
		}

		var body = 'Name: ' + personName + '\n' + 'Email: ' + personEmail + '\n\n' + personMessage;

		// create reusable transport method (opens pool of SMTP connections)
		var smtpTransport = NodeMailer.createTransport("SMTP",{
			host: "",
			port: "",
			name: "",
	    auth: {
				user: "",
				pass: ""
	    }
		});

		var mailOptions = {
			to: "",
			from: personEmail,
			subject: "DinoPass",
			text: body
		};

		// send mail with defined transport object
		smtpTransport.sendMail(mailOptions, function(err, response){

			if (err) {
				return next(err);
			}

		    // if you don't want to use this transport object anymore, uncomment following line
		    smtpTransport.close(); // shut down the connection pool, no more messages

			View.render(req, res, next, 'Thanks');

		});

	};

};
