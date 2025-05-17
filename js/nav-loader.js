document.addEventListener('DOMContentLoaded', function() {
    // Load the navigation
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
});

function initializeNavigation() {
    const menuBtn = document.querySelector(".menu-icon span");
    const cancelBtn = document.querySelector(".cancel-icon");
    const items = document.querySelector(".nav-items");
    const specialSection = document.querySelector(".special-section");
    
    // Mobile menu toggle
    if (menuBtn) {
        menuBtn.onclick = () => {
            items.classList.add("active");
            menuBtn.classList.add("hide");
            cancelBtn.classList.add("show");
            if (specialSection) {
                specialSection.classList.add("active");
            }
        };
    }
    
    // Close menu
    if (cancelBtn) {
        cancelBtn.onclick = () => {
            items.classList.remove("active");
            menuBtn.classList.remove("hide");
            cancelBtn.classList.remove("show");
            if (specialSection) {
                specialSection.classList.remove("active");
            }
        };
    }
    
    // Handle dropdowns on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    if (window.innerWidth <= 1140) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                if (e.target.tagName === 'A' && e.target.nextElementSibling && e.target.nextElementSibling.classList.contains('dropdown-content')) {
                    e.preventDefault();
                    this.classList.toggle('active');
                }
            });
        });
    }
}
