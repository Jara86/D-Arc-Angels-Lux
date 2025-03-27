document.addEventListener('DOMContentLoaded', function() {
    // Initialize LightGallery
    const galleryElement = document.getElementById('lightgallery');
    const lightGallery = lightGallery(galleryElement, {
        plugins: [lgZoom, lgThumbnail],
        speed: 500,
        download: false,
        counter: true,
        selector: '.gallery-item'
    });
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Optional: re-layout the grid after filtering
            // This is a simple approach - for more complex layouts you might need a library
            setTimeout(() => {
                const visibleItems = document.querySelectorAll('.gallery-item[style="display: block"]');
                if (visibleItems.length <= 3) {
                    visibleItems.forEach(item => {
                        item.style.gridColumn = 'auto';
                        item.style.gridRow = 'auto';
                    });
                }
            }, 100);
        });
    });
    
    // Optional: Add animation when items appear
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + Math.random() * 400);
    });
});