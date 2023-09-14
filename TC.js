// Function to check if a URL is external.
function isExternal(url) {
    const currentHostname = window.location.hostname;
    const urlHostname = new URL(url).hostname;
    return currentHostname !== urlHostname;
}

// Function to redirect external links through an intermediate page.
function redirectExternalLinks() {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        const href = link.getAttribute('href');

        if (isExternal(href)) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                window.location.href = `intermediate.html?url=${encodeURIComponent(href)}`;
            });
        }
    });
}

// Call the function when the page loads.
window.addEventListener('DOMContentLoaded', redirectExternalLinks);
