var request = require('request');

exports.auth = function(req, res) {
	request({
	  uri: "https://api.instagram.com/oauth/authorize/?client_id=ef52537333bb4b31948821519a949d73&redirect_uri=http://localhost:3000/#/profile=code",
	  method: "GET"
	}, function(error, response, body) {
	  console.log('response',response);
	});
};