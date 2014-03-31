var sites = new Array();
var visited = new Array();

sites[0] = "https://www.google.com";
sites[1] = "http://www.youtube.com";
sites[2] = "http://www.facebook.com";
sites[3] = "http://www.msn.com";
sites[4] = "http://www.yahoo.com";
sites[5] = "http://www.twitter.com";
sites[6] = "http://www.amazon.com";
sites[7] = "http://www.answers.com";
sites[8] = "http://www.microsoft.com";
sites[9] = "http://www.yelp.com";

// 9EA5928HA9
visited[0] = "9";
visited[1] = "E";
visited[2] = "A";
visited[3] = "6";
visited[4] = "9";
visited[5] = "2";
visited[6] = "8";
visited[7] = "H";
visited[8] = "A";
visited[9] = "9";

function populateTable() {
	var value = document.getElementById('text_box').value;//document.forms["submit_form"]["chars"].value;
  var tableContent = '';

  if(value.length != sites.length)
  	return;
  for (var i=0; i < sites.length; i++) {
  	tableContent += '<tr>';
    tableContent += '<td><a href="' + sites[i] + '">' + sites[i] + '</a></td>';
    console.log(value[i]);
    if(value[i] == visited[i]) {
    	tableContent += '<td>Yes</td>';
    }
    else {
    	tableContent += '<td>No</td>';
    }
    tableContent += '</tr>';
	}
	console.log(tableContent);

	// Inject the whole content string into our existing HTML table
  $('#css_table_sniff table tbody').html(tableContent);
}
