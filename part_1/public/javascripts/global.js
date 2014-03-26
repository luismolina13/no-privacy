var a_el = document.createElement('a');
a_el.href = "https://www.facebook.com/";
var t=document.createTextNode("FB");
a_el.appendChild(t);

document.body.appendChild(a_el);

// var r1 = 'a {color:green;}';
// var r2 = 'a:visited {color:red;}';

// document.styleSheets[0].insertRule(r1,0);
// document.styleSheets[0].insertRule(r2,1);

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
  // populateTable();    

  // Add User button click
  $('#btnCheck').on('click', check_visited);

});

// Fill table with data
function populateTable() {

	// TODO: Get links from db and start putting them in the screen to try and 
	// get informaiton from the user. 
	$('body').append($('<a href="http://www.google.com" id="a_elt">Google2</a>'));
	// check_visited();
};

function check_visited() {
		var elm = document.getElementById("a_elt");
		var computedStyle;
		// console.log("HERE");
    if (typeof elm.currentStyle != "undefined") {
    		// console.log("HERE");
        computedStyle = elm.currentStyle;
    }
    else {
        computedStyle = document.defaultView.getComputedStyle(elm, null);
    }
    alert(test(elm));
}

prep = function() {
	stylesheet = "<style> \
		a.csshistory {color: #00ff00; display: none;} \
		a.csshistory:visited {color: #ff0000; display: inline;} \
		div.csshistory a { display: none;} \
		div.csshistory a:visited { display: inline; } \
	</style>"
	// document.body.appendChild(stylesheet);
	console.log("HERE");
};


function test(link) {
	// Version 2 - modified from AttackAPI
	if (link.currentStyle) // IE
	    return link.currentStyle['display'] == 'inline';
  else
		return document.defaultView.getComputedStyle(link, null).getPropertyValue('display') == 'inline';
};
