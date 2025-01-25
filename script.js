document.addEventListener('DOMContentLoaded', () => {
    // Load header, navigation and footer
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        });

    fetch('navigation.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
            initializeMobileNav();
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});

function initializeMobileNav() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('.nav-list');

    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
}

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

function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const content = document.querySelector('.site-content');
            if (content) {
                content.innerHTML = html;
                window.history.pushState({}, '', url);
            }
        });
}