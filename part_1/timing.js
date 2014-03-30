var sites_t = new Array();

sites_t[0] = "https://www.google.com";
sites_t[1] = "http://www.youtube.com";
sites_t[2] = "http://www.facebook.com";
sites_t[3] = "http://www.msn.com";
sites_t[4] = "http://www.microsoft.com";
sites_t[5] = "http://www.nytimes.com"

var sites_t_msg = "";
var numsites_t = 6;
var thresh = 0;
var img_names = ['h1_pre','h2_pre','h1','h2','m1','m2',
                'google','youtube','fb','msn','msft','nyt'];
var img_times = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var img_addrs = [
    'http://www.nytimes.com/bad1.jpg',
    'http://www.nytimes.com/bad2.jpg',
    'http://www.nytimes.com/bad1.jpg',
    'http://www.nytimes.com/bad2.jpg',
    'http://www.nytimes.com/miss1.jpg',
    'http://www.nytimes.com/miss2.jpg',
    'https://www.google.com/images/srpr/logo11w.png',
    'https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif',
    'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.2365-6/851565_602269956474188_918638970_n.png',
    'http://col.stb00.s-msn.com/i/80/53CAC6A10B6248682CF221B24A92.gif',
    'http://c.s-microsoft.com/en-us/CMSImages/mslogo.png?version=856673f8-e6be-0476-6669-d5bf2300391d',
    'http://i1.nyt.com/images/misc/nytlogo379x64.gif']

loadImage(0);

function checksites_t() {
    var thresh = (Math.max(img_times[2], img_times[3]) +
        Math.min(img_times[4], img_times[5])) / 2;

    var msgstr = "";
    for(var i = 0; i < img_names.length; i++) {
        msgstr += img_names[i] + "|" + img_times[i] + "\n";
    }
    alert(msgstr + "thresh: " + thresh);

    var tableContent = '';
    for(var i = 6; i < img_names.length; i++) {
        var index = i - 6;
        tableContent += '<tr>';
        tableContent += '<td><a href="' + sites_t[index] + '">' +
            sites_t[index] + '</a></td>';
        if(img_times[i] <= 10) {
            tableContent += '<td>Yes</td>';
        } else {
            tableContent += '<td>No</td>';
        }
        tableContent += '</tr>';
    }
    console.log(tableContent);

    $('#css_table_timing table tbody').html(tableContent);
}

// load images sequentially. once all are loaed, check timings
function loadImage(counter) {
    //Break out if no more images and check results
    if(counter == img_names.length) {
        checksites_t();
        return;
    }

    //Grab an image obj
    var I = document.getElementById(img_names[counter]);
    if (I == null) {
        alert(img_names[counter]);
    }

    //Monitor load or error events, moving on to next image in either case
    var start = new Date();
    I.onload = I.onerror = function() {
        var end = new Date();
        img_times[counter] = (end - start);
        loadImage(++counter);
    }

    //Change source (then wait for event)
    I.src = img_addrs[counter];
}