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

function encodeBase64(str) {
    return btoa(str);
}

function decodeBase64(str) {
    return atob(str);
}

function showurl(datajson) {
    var linktag = document.getElementsByTagName("a");
    var links = [];

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
    }

    for (var i = 0; i < linktag.length; i++) {
        linktag[i].href = encodeBase64(links[i % links.length]);
        linktag[i].rel = "nofollow";
        linktag[i].target = "_blank";
    }
}
