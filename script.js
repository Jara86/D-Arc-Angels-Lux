document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('.nav-list');

    mobileToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Handle page transitions
    const pageLinks = document.querySelectorAll('a[href]');
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.hostname === window.location.hostname) {
                loadPage(link.href);
                e.preventDefault();
            }
        });
    });
});

// Smooth page loading
function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const content = document.querySelector('.site-content');
            content.innerHTML = html;
            window.history.pushState({}, '', url);
        });
}