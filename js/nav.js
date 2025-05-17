document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the index page (navigation is directly in HTML)
    const isDirectNav = document.querySelector('nav') !== null;
    
    if (isDirectNav) {
        // We're on a page with direct navigation (like index.html)
        initializeNavigation();
    } else {
        // We're on a page that loads navigation via AJAX
        // The navigation will be initialized after it's loaded
        // (handled by the AJAX callback in the HTML)
        fetch('nav.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('nav-placeholder').innerHTML = data;
                
                // Initialize navigation functionality after loading
                initializeNavigation();
            })
            .catch(error => {
                console.error('Error loading navigation:', error);
            });
    }
});

function initializeNavigation() {
    const menuBtn = document.querySelector(".menu-icon span");
    const specialBtn = document.querySelector(".special-icon");
    const cancelBtn = document.querySelector(".cancel-icon");
    const items = document.querySelector(".nav-items");
    const specialSection = document.querySelector(".special-section");
    
    // Menu button click
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            items.classList.add("active");
            menuBtn.classList.add("hide");
            if (specialBtn) specialBtn.classList.add("hide");
            cancelBtn.classList.add("show");
            if (specialSection) specialSection.classList.add("active");
        });
    }
    
    // Cancel button click
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            items.classList.remove("active");
            menuBtn.classList.remove("hide");
            if (specialBtn) specialBtn.classList.remove("hide");
            cancelBtn.classList.remove("show");
            if (specialSection) specialSection.classList.remove("active");
        });
    }
    
    // Special button click (Fire Devils)
    if (specialBtn) {
        specialBtn.addEventListener('click', function() {
            if (specialSection) specialSection.classList.add("active");
            specialBtn.classList.add("hide");
            cancelBtn.classList.add("show");
        });
    }
    
    // Handle dropdown menus on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        if (link) {
            link.addEventListener('click', function(e) {
                // Only toggle dropdown on mobile
                if (window.innerWidth <= 1140) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            });
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1140) {
            const isNavClick = e.target.closest('nav');
            
            if (!isNavClick && items && items.classList.contains('active')) {
                items.classList.remove('active');
                if (menuBtn) menuBtn.classList.remove('hide');
                if (specialBtn) specialBtn.classList.remove('hide');
                if (cancelBtn) cancelBtn.classList.remove('show');
                if (specialSection) specialSection.classList.remove('active');
                
                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1140) {
            if (items) items.classList.remove('active');
            if (menuBtn) menuBtn.classList.remove('hide');
            if (specialBtn) specialBtn.classList.remove('hide');
            if (cancelBtn) cancelBtn.classList.remove('show');
            if (specialSection) specialSection.classList.remove('active');
            
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}
