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

function showAllUrls() {
    var check = false;
    var no = 0;
    var exceptionlength = exception.length;
    var checklink = "";
    var checkexception = "";
    var linktag = document.getElementsByTagName("a");
    var links = new Array();

    var currentDomain = window.location.hostname.toLowerCase(); // Get the current domain

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
        var linkDomain = extractDomain(linktag[i].href).toLowerCase(); // Get the domain of the link

        // Check if the link's domain matches the current domain
        if (linkDomain !== currentDomain) {
            while (check == false && no < exceptionlength) {
                checklink = extractDomain(linktag[i].href);
                checkexception = extractDomain(exception[no]);
                if (checklink.match(checkexception)) {
                    check = true;
                }
                no++;
            }
            if (check == false) {
                // Here, we create a custom URL based on the feed data and encode it with base64
                var customURL = links[randindex] + setting.path + btoa(linktag[i].href) + '?name=' + btoa(currentPageTitle) + '&image=' + encodedImageSrc;
                linktag[i].href = customURL;
                linktag[i].rel = "nofollow";
                linktag[i].target = "_blank";
            }
        }
    }
}

// Get the current page's title using document.title
const currentPageTitle = document.title;
const encodedImageSrc = btoa(firstImage ? firstImage.src : '');

// Call the function to process all <a> tag URLs
showAllUrls();
