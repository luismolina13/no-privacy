// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
  // populateTable();    

  // Add User button click
  $('#btnFingerprint').on('click', postPlugins);

});


// var markers = [{ "position": "128.3657142857143", "markerPosition": "7" },
//                { "position": "235.1944023323615", "markerPosition": "19" },
//                { "position": "42.5978231292517", "markerPosition": "-3" }];

var postPlugins = function() {	
	userAgent_str = "<p>Browser CodeName: " + navigator.appCodeName + "</p>";
	userAgent_str+= "<p>Browser Name: " + navigator.appName + "</p>";
	userAgent_str+= "<p>Browser Version: " + navigator.appVersion + "</p>";
	userAgent_str+= "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
	userAgent_str+= "<p>Browser Language: " + navigator.language + "</p>";
	userAgent_str+= "<p>Browser Online: " + navigator.onLine + "</p>";
	userAgent_str+= "<p>Platform: " + navigator.platform + "</p>";
	userAgent_str+= "<p>User-agent header: " + navigator.userAgent + "</p>";
	userAgent_str+= "<p>User-agent language: " + navigator.systemLanguage + "</p>";


	var plugins = navigator.plugins;
	var plugin_data = {};
	console.log(plugins);
	for(var i = 0; i < plugins.length; i++) {
		var temp = 'plugin' + i;
		plugin_data[temp] = "" + plugins[i].name + " " + plugins[i].description;
		userAgent_str+= "<p>Plugin " + i + ": " + plugin_data[temp] + "</p>";
	}

	// document.getElementById("example").innerHTML=userAgent_str;
	console.log(plugin_data);

	$.ajax({
	    type: "POST",
	    url: "/plugins",
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: plugin_data,
	    // contentType: "application/json; charset=utf-8",
	    dataType: "JSON",
	    success: function(data){alert(data);},
	    failure: function(errMsg) {
	        alert(errMsg);
	    }
	});

};