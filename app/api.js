var request = require('request');
var twitter = require('ntwitter');
var Instagram = require('instagram-node-lib');

Instagram.set('client_id', 'ef52537333bb4b31948821519a949d73');
Instagram.set('client_secret', '77c55b495b4541a1840d63876edbf8d4')
Instagram.set('callback_url', 'http://127.0.0.1:3000/')
Instagram.set('access_token', '343278647.ef52537.1a18fdf815d54f07a81626da78cf8df9');
var twit = new twitter({
	consumer_key:'HCkaMI48YVbKDvhQWDr9g',
	consumer_secret: 'uF7o0Kgt5EktNmjdyiv8MXodYuPDhunH53SyKak32eM',
	access_token_key:'1453715065-8Bbv3gdROhro3C9AUCERvyWhrVPcYY5L3Bpmvxe',
	access_token_secret: 'KMlc8hFEQvRLDU61ncwjGZXdOgviVdONSj6apnDdhcf0r'
});

twit.verifyCredentials(function(err, data) {
	console.log(data.profile_image_url);
});
Instagram.users.search({
	q: 'body_smarts',
	complete: function(data) {
		var pic = data[0].profile_picture;
		twit.updateStatus('making an app with #webhooks #node #expressjs #angularjs during this #hackathon @hackreactor', function(err, data) {
			console.log('twitter',data);
		})
	}
});



var me ={"access_token":"343278647.ef52537.1a18fdf815d54f07a81626da78cf8df9","user":{"username":"body_smarts","bio":"Tell me, I won't judge you... \nSF, CA","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_343278647_75sq_1385442085.jpg","full_name":"Scott","id":"343278647"}};

exports.sendInsta = function(req, res) {
	request({
	  uri: "https://api.instagram.com/oauth/authorize/?client_id=ef52537333bb4b31948821519a949d73&redirect_uri=http://localhost:3000/#/profile=code",
	  method: "GET"
	}, function(error, response, body) {
	  console.log('res',response);
	  console.log('body')
	});
};