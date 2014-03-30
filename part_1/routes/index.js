
/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log(req.headers);

	var fingerprint = "";

	fingerprint += req.headers['user-agent'] + " ";
	fingerprint += req.headers.accept + " ";
	fingerprint += req.headers['accept-encoding'] + " ";
	fingerprint += req.headers['accept-language'] + " ";

	console.log(fingerprint);

  res.render('index', 
  	{ title: 'No-privacy',
  		visits: 0
  	});
};