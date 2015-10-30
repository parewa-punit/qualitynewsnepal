/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
	/**
	 * 1. Extract root domain and ending (e.g. google.com) by removing:
	 * 		- any protocol: http, https, ftp, ...
	 * 		- the 'www'
	 * 		- anything after the main domain: /..., ?..., #...
	 * 2. Get whois information for the domain
	 * @param {string} domain
	 */
	whois: function(req, res){
		var whois = require('whois');
		var data = req.body;
		console.log(data);
		var pageurl = data.pageurl;
		if (pageurl.indexOf('//') > -1)
			pageurl = pageurl.split('//')[1];
		pageurl = pageurl.replace('www.', '');
		var domain = pageurl.split(/[/?#]/)[0];
		console.log(domain);

		var lookupInfo = {};
		whois.lookup(domain, function (err, data) {
			res.send(data);
			// var fields = data.split(/\r?\n/g);
			// fields.forEach(function (field) {
			// 	if (field.indexOf(":") > -1) {
			// 		var keyValue = field.split(":");
			// 		var key = keyValue[0];
			// 		var value = keyValue[1];
			// 		lookupInfo[key] = value;
			// 	}
			// });
			// res.json(lookupInfo);
		});
	}
};