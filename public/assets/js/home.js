$(function($) {

	var dino = {};

	dino.current = 0;
	dino.responses = [ {
		action : "pass",
		message : "Here's a password I made just for you!"
	}, {
		action : "pass",
		message : "Sure, no problem."
	}, {
		action : "pass",
		message : "Sure, here's another one."
	}, {
		action : "pass",
		message : "OK. Here you are!"
	}, {
		action : "pass",
		message : "Yep. Another one for you!"
	}, {
		action : "pass",
		message : "I love passwords!"
	}, {
		action : "pass",
		message : "Remember to keep your passwords safe."
	}, {
		action : "pass",
		message : "I still love passwords!"
	}, {
		action : "pass",
		message : "Passwords, passwords, passwords, here you go!"
	}, {
		action : "pass",
		message : "Sure, no problem."
	}, {
		action : "pass",
		message : "Yep, another one for you."
	}, {
		action : "pass",
		message : "OK."
	}, {
		action : "pass",
		message : "Alakazam! New password. Just like magic!"
	}, {
		action : "pass",
		message : "You can call me the 'Genie of the passwords!'"
	}, {
		action : "pass",
		message : "OK, another password."
	}, {
		action : "pass",
		message : "Alright, here you go."
	}, {
		action : "pass",
		message : "Yep, here you go."
	}, {
		action : "pass",
		message : "You want another one? You got it!"
	}, {
		action : "pass",
		message : "Really? Another one? OK."
	}, {
		action : "pass",
		message : "Shazaaam!"
	}, {
		action : "pass",
		message : "OK, haven't you made your choice yet?"
	}, {
		action : "pass",
		message : "You're not one of those fussy password people are you?"
	}, {
		action : "pass",
		message : "I bet you are."
	}, {
		action : "pass",
		message : "See, I am sure you are now."
	}, {
		action : "pass",
		message : "Come on, this one's a good one."
	}, {
		action : "pass",
		message : "Alright."
	}, {
		action : "pass",
		message : "Sheesh, pick a password already."
	}, {
		action : "pass",
		message : "Really, pick one."
	}, {
		action : "pass",
		message : "I think you should pick this one."
	}, {
		action : "pass",
		message : "Hmmm."
	}, {
		action : "pass",
		message : "OK."
	}, {
		action : "pass",
		message : "Fine."
	}, {
		action : "pass",
		message : "OK, now this is your last one."
	}, {
		action : "pass",
		message : "Fine. Now THIS one is your last one. Really."
	}, {
		action : "pass",
		message : "Alright, now THIS one is really your last one. I mean it!"
	}, {
		action : "skip",
		message : "Nope, that's it for you. No more."
	}, {
		action : "skip",
		message : "You are waaayyy too fussy."
	}, {
		action : "skip",
		message : "Nope. No more. That's all for you."
	}, {
		action : "skip",
		message : "Nope."
	}, {
		action : "skip",
		message : "No way."
	}, {
		action : "pass",
		message : "OK, fine. I'll give you ONE more."
	}, {
		action : "skip",
		message : "Now that's really all you're getting."
	}, {
		action : "pass",
		message : "Just kidding! I LOVE passwords!"
	}, {
		action : "pass",
		message : "Happy to make them for you all day!"
	} ];

	dino.nextResponse = function() {
		var response = dino.responses[dino.current];
		dino.current = (dino.current + 1) % dino.responses.length;
		return response;
	};

	var generator = {};

	generator.password = function(type, name) {

		var response = dino.nextResponse();
		
		if (response.action == 'pass') {
			
			$.ajax({
				url: '/password/' + type,
				cache: false,
				success: function(data){
					$('#password-panel-message').fadeOut(function() {
						$('#password-panel-message').html(response.message).fadeIn();
					});
					$('#password-input').fadeOut(function() {
						$('#password-input').val(data).fadeIn();
					});
				}
			});
			
//			$.get('/password/' + type, function(data) {
//				$('#password-panel-message').fadeOut(function() {
//					$('#password-panel-message').html(response.message).fadeIn();
//				});
//				$('#password-input').fadeOut(function() {
//					$('#password-input').val(data).fadeIn();
//				});
//			});
			
		}
		else {
			$('#password-panel-message').fadeOut(function() {
				$('#password-panel-message').html(response.message).fadeIn();
			});
			$('#password-input').fadeOut();
		}

	};

	generator.simple = function() {
		generator.password('simple', 'Simple');
	};

	generator.strong = function() {
		generator.password('strong', 'Strong');
	};

	$('#simple-button').click(function() {
		generator.simple();
		return false;
	});

	$('#strong-button').click(function() {
		generator.strong();
		return false;
	});

	generator.simple();

});
