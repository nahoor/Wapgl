// Function to fetch JSON feed and modify external links
function fetchAndModifyLinks() {
  const feedURL = "https://up2read.blogspot.com/feeds/posts/summary?alt=json";

  // Send a GET request to the feed URL
  fetch(feedURL)
    .then((response) => {
      // Check if the request was successful
      if (response.status === 200) {
        return response.json();
      } else {
        console.error(`Failed to fetch data. Status code: ${response.status}`);
        return null; // Return null to handle the error gracefully
      }
    })
    .then((data) => {
      // Extract the 'href' values that meet the criteria and store them in an array
      const matchingHrefs = [];
      if (data && data.feed && data.feed.entry) {
        data.feed.entry.forEach((entry) => {
          if (entry.link) {
            entry.link.forEach((link) => {
              if (link.rel === "alternate" && link.type === "text/html") {
                matchingHrefs.push(link.href);
              }
            });
          }
        });

        // Select a random 'href' from the matchingHrefs array
        const randomIndex = Math.floor(Math.random() * matchingHrefs.length);
        const postLinkHref = matchingHrefs[randomIndex];

        // Process postLinkHref as needed
        console.log(postLinkHref);

        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');

        // Get the first image element in the document
        const firstImage = document.querySelector('img');

        externalLinks.forEach(link => {
          // Encode the entire link.href in Base64
          const encodedUrl = btoa(link.href);

          // Get the current page's title using document.title
          const currentPageTitle = document.title;
          const encodedImageSrc = btoa(firstImage ? firstImage.src : '');

          // Construct the redirect URL with the 'go' parameter and parameters 'name' and 'image'
          const redirectUrl = postLinkHref + '?' + 'go=' + encodedUrl + '&name=' + btoa(currentPageTitle)  + '&image=' + encodedImageSrc;

          // Set the link's href attribute to the modified URL
          link.href = redirectUrl;
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Execute the function after the page loads
window.addEventListener('load', fetchAndModifyLinks);
