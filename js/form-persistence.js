document.addEventListener('DOMContentLoaded', function() {
    // Save form data when clicking on rules link
    const rulesLinks = document.querySelectorAll('button[onclick*="rules.html"]');
    
    rulesLinks.forEach(link => {
        link.addEventListener('click', function() {
            saveFormData();
        });
    });
    
    // Save form data function
    function saveFormData() {
        const form = document.querySelector('.tournament-form');
        if (!form) return;
        
        const formId = 'tournament-form-data';
        const formData = {};
        
        // Get all form inputs
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Skip submit buttons
            if (input.type === 'submit') return;
            
            // Handle different input types
            if (input.type === 'checkbox' || input.type === 'radio') {
                if (input.checked) {
                    formData[input.name] = input.value;
                }
            } else {
                formData[input.name] = input.value;
            }
        });
        
        // Save to localStorage
        localStorage.setItem(formId, JSON.stringify(formData));
        localStorage.setItem('formPage', window.location.pathname);
    }
    
    // Restore form data when page loads
    function restoreFormData() {
        const formId = 'tournament-form-data';
        const savedFormData = localStorage.getItem(formId);
        const savedPage = localStorage.getItem('formPage');
        
        // Only restore if we're on the same page as when data was saved
        if (savedFormData && savedPage === window.location.pathname) {
            const formData = JSON.parse(savedFormData);
            
            // Get the form
            const form = document.querySelector('.tournament-form');
            if (!form) return;
            
            const inputs = form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                // Skip submit buttons
                if (input.type === 'submit') return;
                
                // Restore value based on input type
                if (input.name in formData) {
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        if (input.value === formData[input.name]) {
                            input.checked = true;
                        }
                    } else {
                        input.value = formData[input.name];
                    }
                }
            });
        }
    }
    
    // Call restore function when page loads
    restoreFormData();
});