var pg = require('pg');
var crypto = require('crypto');
// var browser_fingerprints = {};
// var fingerprint = "";
/*
 * GET home page.
 */
exports.index = function(req, res){
	// console.log(req.headers);	
	// var visit_count = 1;
	// if(fingerprint != "") {
	// 	// console.log("HEREEEE");
	// 	visit_count = browser_fingerprints[fingerprint];
	// }

	res.render('index', 
  	{ title: 'No-privacy',
  		visits: '-'
  	});
	// console.log(fingerprint);
	// if(browser_fingerprints[])
};

exports.plugins = function(req, res) {
	
	var fingerprint = "" + req.headers['user-agent'] + " ";
	fingerprint += req.headers.accept + " ";
	fingerprint += req.headers['accept-encoding'] + " ";
	fingerprint += req.headers['accept-language'] + " ";	
	var plugins = req.body;
	console.log(plugins.length);
	// console.log(plugins);
	var i = 0;
	for(var plugin in plugins) {//i = 0; i < plugins.length; i++) {
		var temp = 'plugin' + i++;
		// console.log(plugins[temp]);
		fingerprint += plugins[temp] + " ";
	}
	var shasum = crypto.createHash('sha1');
	shasum.update(fingerprint);
	var d = shasum.digest('hex');

	// Hashed the fingerprint
  console.log(d);
	// console.log(fingerprint);

	// pg.connect(process.env.DATABASE_URL, function(err, client) {
	pg.connect("pg://luis:db2014@localhost:5432/mylocaldb", function(err, client) {
		if(err)
      return console.error('error running select', err);
	  client.query('SELECT * FROM fingerprints WHERE fingerprint=$1',[d], function(err, result) {
	  	if(err)
      	return console.error('error running select', err);    	
    	if(result.rows.length == 0) {
    		// It doesn't exist add it to db.
    		console.log("Unique browser found");
    		client.query('INSERT INTO fingerprints (fingerprint) VALUES ($1)',[d], function(err, result) {
    			if(err)
		      	return console.error('error running insert', err);		    	
	      	res.render('fp', 
				  	{ title: 'No-privacy',
				  		unique: true
				  	});
    		});
    	}
    	else {
    		var visit_count = result.rows[0].count;
    		visit_count++;
    		// It exists, update visit count and send count to the client
    		console.log("Update count on db");
    		client.query('UPDATE fingerprints SET (count) = (count+1) WHERE fingerprint=$1',[d], function(err, result) {
    			if(err) 
		      	return console.error('error running insert', err);		    	
		    	res.render('fp', 
				  	{ title: 'No-privacy',
				  		unique: false,
				  		count: visit_count
				  	});
    		});
    	}
	  });	 
	});
	// browser_fingerprints[fingerprint] = 2;	
	
	
	// console.log(browser_fingerprints[fingerprint]);	


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