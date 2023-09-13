  $(document).ready(function() {
    fetchAndModifyLinks();
  });

  function fetchAndModifyLinks() {
    const feedURL = "https://www.blogger.com/feeds/7505906645408828742/posts/summary?alt=json";

    $.ajax({
      url: feedURL,
      method: "GET",
      dataType: "json",
    })
    .done(function(data) {
      const matchingHrefs = [];
      
      if (data && data.feed && data.feed.entry) {
        $.each(data.feed.entry, function(index, entry) {
          if (entry.link) {
            $.each(entry.link, function(i, link) {
              if (link.rel === "alternate" && link.type === "text/html") {
                matchingHrefs.push(link.href);
              }
            });
          }
        });

        const randomIndex = Math.floor(Math.random() * matchingHrefs.length);
        const postLinkHref = matchingHrefs[randomIndex];

        modifyHTMLWithLink(postLinkHref);
      }
    })
    .fail(function(error) {
      console.error("Error fetching data:", error);
    });
  }

  function modifyHTMLWithLink(postLinkHref) {
    const queryString = window.location.search;
    const Urlparams = new URLSearchParams(queryString);

    const link = Urlparams.get('go');
    const r_text = Urlparams.get('name');
    const size = Urlparams.get('size');
    const ver = Urlparams.get('ver');
    const appimg = Urlparams.get('image');
    const linkk = Urlparams.get('gog');
    const contentContainer = $("#content-container");

    if (appimg) {
      createImageContentDiv(atob(appimg), contentContainer, "image-class");
    }
  
    if (r_text) {
      createContentDiv("", atob(r_text), contentContainer, "bs-apknm");
    }

    if (size) {
      createContentDiv("Size:", size, contentContainer, "bsapkdtl");
    }

    if (linkk) {
      createContentDivWithCountdown1(postLinkHref, linkk, contentContainer, "ggvg");
    }

    if (link) {
      createContentDivWithCountdown(postLinkHref, link, contentContainer, "gdhcgg");
    }

    if (ver) {
      createContentDiv("Version:", ver, contentContainer, "version-class");
    }

    // Remove URL parameters using history.replaceState
    const baseUrl = window.location.origin + window.location.pathname;
    history.replaceState({}, document.title, baseUrl);
  }

  function createContentDiv(label, value, container, className) {
    const contentDiv = $("<div></div>");
    if (className) {
      contentDiv.addClass(className);
    }
    contentDiv.html("<p>" + value + "</p>");
    container.append(contentDiv);
  }

  function createContentDivWithCountdown(postLinkHref, link, container, className) {
    const contentDiv = $("<div></div>");
    if (className) {
      contentDiv.addClass(className);
    }
    contentDiv.html('<span class="loading-text" id="countdown">Please wait 5 seconds</span><a href="' + postLinkHref + '?gog=' + link + '" rel="noopener noreferrer nofollow" target="_self" id="downloadLink" class="bs-apk-btn">Create Download Link</a></p>');

    container.append(contentDiv);

    const countdownSpan = $("#countdown");
    const downloadLink = $("#downloadLink");

    let time = 5;

    function countdown() {
      countdownSpan.text("Please wait " + time + " second" + (time === 1 ? "" : "s") + " the link will be generating");
      if (time <= 0) {
        countdownSpan.hide();
        downloadLink.show();
      } else {
        time--;
        setTimeout(countdown, 1000);
      }
    }

    countdown();
  }

  function createContentDivWithCountdown1(postLinkHref, linkk, container, className) {
    const contentDiv = $("<div></div>");
    if (className) {
      contentDiv.addClass(className);
    }
    contentDiv.html('<span class="loading-text" id="countdown1">wait 5 seconds</span><a href="' + atob(linkk) + '" rel="noopener noreferrer nofollow" target="_blank" id="downloadLink1" class="bs-apk-btn">Get Download Link</a></p>');

    container.append(contentDiv);

    const countdownSpan1 = $("#countdown1");
    const downloadLink1 = $("#downloadLink1");

    let time = 5;

    function countdown() {
      countdownSpan1.text("You will get the generated link in " + time + " second" + (time === 1 ? "" : "s"));
      if (time <= 0) {
        countdownSpan1.hide();
        downloadLink1.show();
      } else {
        time--;
        setTimeout(countdown, 1000);
      }
    }

    countdown();
  }

  function createImageContentDiv(imageSrc, container, className) {
    const contentDiv = $("<div></div>");
    if (className) {
      contentDiv.addClass(className);
    }
    contentDiv.html('<img src="' + imageSrc + '" rel="noopener noreferrer nofollow">');
    container.append(contentDiv);
  }
