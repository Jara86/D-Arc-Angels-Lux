document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the index page (navigation is directly in HTML)
    const isDirectNav = document.querySelector('nav') !== null;
    
    if (isDirectNav) {
        // We're on a page with direct navigation (like index.html)
        initializeNavigation();
    } else {
        // We're on a page that loads navigation via AJAX
        fetch('nav.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('nav-placeholder').innerHTML = data;
                
                // Initialize navigation functionality after loading
                setTimeout(initializeNavigation, 100);
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
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        // Add a toggle button for mobile
        if (link && dropdownContent && window.innerWidth <= 1140) {
            // Create a toggle button if it doesn't exist yet
            if (!dropdown.querySelector('.dropdown-toggle')) {
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'dropdown-toggle';
                toggleBtn.innerHTML = '<span>▼</span>';
                toggleBtn.setAttribute('aria-label', 'Toggle dropdown menu');
                
                // Insert the toggle button after the link
                link.parentNode.insertBefore(toggleBtn, link.nextSibling);
                
                // Toggle button click handler
                toggleBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                });
            }
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
                // Remove toggle buttons when resizing to desktop
                const toggleBtn = dropdown.querySelector('.dropdown-toggle');
                if (toggleBtn) {
                    toggleBtn.remove();
                }
            });
        } else {
            // Re-add toggle buttons when resizing to mobile
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('a');
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                
                if (link && dropdownContent && !dropdown.querySelector('.dropdown-toggle')) {
                    const toggleBtn = document.createElement('button');
                    toggleBtn.className = 'dropdown-toggle';
                    toggleBtn.innerHTML = '<span>▼</span>';
                    toggleBtn.setAttribute('aria-label', 'Toggle dropdown menu');
                    
                    link.parentNode.insertBefore(toggleBtn, link.nextSibling);
                    
                    toggleBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        dropdown.classList.toggle('active');
                        
                        dropdowns.forEach(otherDropdown => {
                            if (otherDropdown !== dropdown) {
                                otherDropdown.classList.remove('active');
                            }
                        });
                    });
                }
            });
        }
    });
}
