document.addEventListener('DOMContentLoaded', function() {
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
            specialBtn.classList.add("hide");
            cancelBtn.classList.add("show");
        });
    }
    
    // Cancel button click
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            items.classList.remove("active");
            menuBtn.classList.remove("hide");
            specialBtn.classList.remove("hide");
            cancelBtn.classList.remove("show");
            specialSection.classList.remove("active");
        });
    }
    
    // Special button click (Fire Devils)
    if (specialBtn) {
        specialBtn.addEventListener('click', function() {
            specialSection.classList.add("active");
            specialBtn.classList.add("hide");
            cancelBtn.classList.add("show");
        });
    }
    
    // Handle dropdown menus on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
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
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1140) {
            const isNavClick = e.target.closest('nav');
            
            if (!isNavClick && items.classList.contains('active')) {
                items.classList.remove('active');
                menuBtn.classList.remove('hide');
                specialBtn.classList.remove('hide');
                cancelBtn.classList.remove('show');
                specialSection.classList.remove('active');
                
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
            items.classList.remove('active');
            menuBtn.classList.remove('hide');
            specialBtn.classList.remove('hide');
            cancelBtn.classList.remove('show');
            specialSection.classList.remove('active');
            
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});
