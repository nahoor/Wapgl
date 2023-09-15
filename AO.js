var setting = {
  exceptionurl: "1.bp.blogspot.com,2.bp.blogspot.com,3.bp.blogspot.com,4.bp.blogspot.com,5.bp.blogspot.com,6.bp.blogspot.com,whatsapp.com,twitter.com,facebook.com,instagram.com,disqus.com,pinterest.com,vk.com,dmca.com",
  path: "?go="
};

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

if (!setting.exceptionurl) {
  setting.exceptionurl = window.location.href;
} else {
  setting.exceptionurl += "," + window.location.href;
}
var exception = setting.exceptionurl.split(",");

function modifyExternalLinks(datajson) {
  const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
  const firstImage = document.querySelector('img');
  const encodedImageSrc = firstImage ? btoa(firstImage.src) : '';

  if (datajson && datajson.feed && datajson.feed.entry) {
    const matchingHrefs = [];
    datajson.feed.entry.forEach((entry) => {
      if (entry.link) {
        entry.link.forEach((link) => {
          if (link.rel === "alternate" && link.type === "text/html") {
            matchingHrefs.push(link.href);
          }
        });
      }
    });

    const randomIndex = Math.floor(Math.random() * matchingHrefs.length);
    const postLinkHref = matchingHrefs[randomIndex];

    externalLinks.forEach(link => {
      const encodedUrl = btoa(link.href);
      const currentPageTitle = document.title;
      const redirectUrl = postLinkHref + setting.path + encodedUrl + "&name=" + btoa(currentPageTitle) + "&image=" + encodedImageSrc;
      link.href = redirectUrl;
    });
  }
}

function fetchFeed() {
  const feedURL = "https://www.blogger.com/feeds/7505906645408828742/posts/summary?alt=json";

  fetch(feedURL)
    .then(response => response.json())
    .then(data => modifyExternalLinks(data))
    .catch(error => console.error("Error:", error));
}

window.addEventListener('load', fetchFeed);
