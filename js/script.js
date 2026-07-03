// Clean, defensive loader for header/nav/footer placeholders.
// This avoids getElementById null errors by checking for elements before using them.
document.addEventListener('DOMContentLoaded', async () => {
    async function safeLoad(url, elementId) {
        const el = document.getElementById(elementId);
        if (!el) return;
        try {
            const res = await fetch(url);
            if (!res.ok) {
                console.warn(`Failed to load ${url}: ${res.status}`);
                return;
            }
            el.innerHTML = await res.text();
        } catch (err) {
            console.error(`Error loading ${url}:`, err);
        }
    }

    // Load only placeholders that exist on the page
    await Promise.all([
        safeLoad('nav.html', 'nav-placeholder'),
        safeLoad('header.html', 'header-placeholder'),
        safeLoad('footer.html', 'footer-placeholder')
    ]);

    // If a navigation initialization function exists (from nav-loader.js), call it.
    if (typeof initializeNavigation === 'function') {
        try { initializeNavigation(); } catch (e) { console.warn('initializeNavigation error', e); }
    }

    // Small utility: attach click logger for impressum links if present
    const impressumLinks = document.querySelectorAll('a[href*="impressum.html"]');
    if (impressumLinks.length) {
        impressumLinks.forEach(link => link.addEventListener('click', () => console.log('Impressum link clicked')));
    }
});