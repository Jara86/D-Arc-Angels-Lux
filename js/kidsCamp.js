document.addEventListener('DOMContentLoaded', function() {
    // Add child functionality
    document.getElementById('addChild').addEventListener('click', function() {
        const childCount = document.querySelectorAll('.child-section').length + 1;
        
        const newChild = `
            <div class="child-section">
                <div class="child-header">
                    <h3>Kind ${childCount}</h3>
                    <button type="button" class="remove-child" onclick="removeChild(this)">
                        <i class="fas fa-times"></i> Entfernen
                    </button>
                </div>
                <div class="form-group">
                    <input type="text" name="Kind${childCount}_Vorname" placeholder="Vorname" required maxlength="100">
                    <input type="text" name="Kind${childCount}_Nachname" placeholder="Nachname" required maxlength="100">
                </div>
                <div class="form-group">
                    <input type="date" name="Kind${childCount}_Geburtsdatum" required max="2024-12-31" min="2010-01-01">
                </div>
                <div class="form-group">
                    <textarea name="Kind${childCount}_Allergien" placeholder="Allergien oder besondere Bedürfnisse" rows="2"></textarea>
                </div>
            </div>
        `;
        
        document.getElementById('weitere-Kinder').insertAdjacentHTML('beforeend', newChild);
    });

    // Remove child function
    window.removeChild = function(button) {
        button.closest('.child-section').remove();
    };

    // Update CC field when email changes
    const emailField = document.querySelector('input[name="Eltern_Email"]');
    if (emailField) {
        emailField.addEventListener('input', function() {
            const ccField = document.querySelector('input[name="_cc"]');
            if (ccField) {
                ccField.value = this.value;
            }
        });
    }

    // Handle rules checkbox validation
    const rulesCheckbox = document.getElementById('regeln');
    const rulesButton = document.querySelector('.text-link');
    if (rulesCheckbox && rulesButton) {
        // Initially disable the checkbox
        rulesCheckbox.disabled = true;
        
        // Add click event to the rules button
        rulesButton.addEventListener('click', function(e) {
            // Open the rules in a new window/tab
            window.open('docs/rules.html', '_blank');
            
            // Enable the checkbox
            rulesCheckbox.disabled = false;
            
            // Add a visual indicator that the checkbox is now available
            rulesCheckbox.parentElement.classList.add('rules-viewed');
        });
        
        // Add a warning if someone tries to check the box without viewing rules
        rulesCheckbox.addEventListener('click', function(e) {
            if (rulesCheckbox.disabled) {
                e.preventDefault();
                alert('Bitte lesen Sie zuerst die Regeln, indem Sie auf den Link klicken. / Please read the rules first by clicking on the link.');
            }
        });
    }

    // Handle form submission
    const kidsCampForm = document.getElementById('kidscamp-form');
    if (kidsCampForm) {
        kidsCampForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Show loading indicator
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            // Convert FormData to object for AJAX submission
            formData.forEach((value, key) => {
                // Handle checkboxes with same name (arrays)
                if (key.endsWith('[]')) {
                    const baseKey = key.slice(0, -2);
                    if (!formObject[baseKey]) {
                        formObject[baseKey] = [];
                    }
                    formObject[baseKey].push(value);
                } else {
                    formObject[key] = value;
                }
            });
            
            // Update CC field with parent email
            if (formObject.Eltern_Email) {
                formObject._cc = formObject.Eltern_Email;
            }
            
            // Send data to FormSubmit
            $.ajax({
                url: "https://formsubmit.co/ajax/itdarcangels@gmail.com", // Replace with your actual FormSubmit endpoint
                method: "POST",
                data: formObject,
                dataType: "json",
                success: function(response) {
                    console.log("Form submitted successfully:", response);
                    // Show success message
                    alert("Vielen Dank für deine Anmeldung! / Thank you for your registration!");
                    
                    // Reset form
                    kidsCampForm.reset();
                    
                    // Remove additional children
                    const weitereKinderContainer = document.getElementById('weitere-Kinder');
                    if (weitereKinderContainer) {
                        weitereKinderContainer.innerHTML = '';
                    }
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                },
                error: function(error) {
                    console.error("Error submitting form:", error);
                    alert("Es gab ein Problem bei der Anmeldung. Bitte versuche es später noch einmal. / There was a problem with the registration. Please try again later.");
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            });
        });
    }
});
