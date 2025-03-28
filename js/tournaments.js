document.addEventListener('DOMContentLoaded', function() {
    // Toggle registration form visibility
    const registrationToggles = document.querySelectorAll('.registration-toggle');
    const registrationForms = document.getElementById('registration-forms');
    const formContainers = document.querySelectorAll('.tournament-form-container');
    const closeBtns = document.querySelectorAll('.close-form');
    
    // Show the appropriate form when clicking on "Registration open"
    registrationToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const tournamentId = this.getAttribute('data-tournament');
            const formContainer = document.getElementById(`${tournamentId}-form`);
            
            // Hide all forms first
            formContainers.forEach(container => {
                container.style.display = 'none';
            });
            
            // Show the registration forms section
            registrationForms.style.display = 'block';
            
            // Show the specific form
            formContainer.style.display = 'block';
            
            // Scroll to the form
            registrationForms.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Close
})
