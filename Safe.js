function extractDomain(url) {
	var hostname;
	if (url.indexOf("://") > -1) {
		hostname = url.split('/')[2];
	} else {
		hostname = url.split('/')[0];
	}
	hostname = hostname.split(':')[0];
	hostname = hostname.split('?')[0];
	return hostname;
}

function exception() {
	var exception = new Array();
	setting.exceptionurl = setting.exceptionurl;
	exception = setting.exceptionurl.split(",");
	return exception;
}

if (!setting.exceptionurl) {
	setting.exceptionurl = window.location.href;
} else {
	setting.exceptionurl += "," + window.location.href;
}
var exception = exception();

function showurl(datajson) {

	var check = false;
	var no = 0;
	var exceptionlength = exception.length;
	var checklink = "";
	var checkexception = "";
	var linktag = document.getElementsByTagName("a");
	var links = new Array();

	var semuaartikel = datajson.feed.openSearch$totalResults.$t;
	for (var i = 0; i < semuaartikel; i++) {
		var urlartikel;
		for (var s = 0; s < datajson.feed.entry[i].link.length; s++) {
			if (datajson.feed.entry[i].link[s].rel == 'alternate') {
				urlartikel = datajson.feed.entry[i].link[s].href;
				break;
			}
		}
		links[i] = urlartikel;
		var randindex = Math.random() * links.length;
		randindex = parseInt(randindex);
	}
	for (var i = 0; i < linktag.length; i++) {
		check = false;
		no = 0;
		while (check == false && no < exceptionlength) {
			checklink = extractDomain(linktag[i].href);
			checkexception = extractDomain(exception[no]);
			if (checklink.match(checkexception)) {
				check = true;
			}
			no++;
		}
		if (check == false) {
			linktag[i].href = links[randindex] + setting.path + btoa(convertstr(linktag[i].href));
			linktag[i].rel = "nofollow";
			linktag[i].target = "_blank";
		}
	}
}
