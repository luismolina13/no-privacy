var browser_fingerprints = {};
var fingerprint = "";
/*
 * GET home page.
 */
exports.index = function(req, res){
	// console.log(req.headers);	
	var visit_count = 1;
	if(fingerprint != "") {
		// console.log("HEREEEE");
		visit_count = browser_fingerprints[fingerprint];
	}

	res.render('index', 
  	{ title: 'No-privacy',
  		visits: visit_count
  	});
	// console.log(fingerprint);
	// if(browser_fingerprints[])
};

exports.plugins = function(req, res) {
	if(fingerprint == "") {
		fingerprint += req.headers['user-agent'] + " ";
		fingerprint += req.headers.accept + " ";
		fingerprint += req.headers['accept-encoding'] + " ";
		fingerprint += req.headers['accept-language'] + " ";	
		var plugins = req.body;
		console.log(plugins.length);
		console.log(plugins);
		var i = 0;
		for(var plugin in plugins) {//i = 0; i < plugins.length; i++) {
			var temp = 'plugin' + i++;
			// console.log(plugins[temp]);
			fingerprint += plugins[temp] + " ";
		}
		browser_fingerprints[fingerprint] = 2;	
	}
	else {
		browser_fingerprints[fingerprint]++;
	}
	
	console.log(browser_fingerprints[fingerprint]);	
	
	console.log(fingerprint);

  // res.render('index', 
  // 	{ title: 'No-privacy',
  // 		visits: browser_fingerprints[fingerprint]
  // 	});
	// if(browser_fingerprints[fingerprint]) {
	// 	browser_fingerprints[fingerprint]++;
	// }
	// else {
	// }
};