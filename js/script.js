document.addEventListener('DOMContentLoaded', () => {
    // Load all components with proper error handling
    const loadComponent = (url, elementId) => {
        return fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                if (elementId === 'nav-placeholder') {
                    initializeMobileNav();
                }
            })
            .catch(error => {
                console.log(`Error loading ${url}:`, error);
            });
    };

    // Load all components concurrently
    Promise.all([
        loadComponent('header.html', 'header-placeholder'),
        loadComponent('navigation.html', 'nav-placeholder'),
        loadComponent('footer.html', 'footer-placeholder')
    ]).then(() => {
        console.log('All components loaded successfully');
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
document.addEventListener('DOMContentLoaded', function() {
    // Load navigation
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
        });
});$(function(){
    $("#nav-placeholder").load("nav.html");
});