document.addEventListener('DOMContentLoaded', function() {
    let childCount = 1;
    const maxChildren = 5;
    
    // Add child form section
    document.getElementById('addChild').addEventListener('click', function() {
        childCount++;
        if (childCount <= maxChildren) {
            const childSection = document.createElement('div');
            childSection.className = 'child-section';
            childSection.id = `child-section-${childCount}`;
            
            childSection.innerHTML = `
                <div class="child-header">
                    <h3>Kind ${childCount}</h3>
                    <button type="button" class="remove-child" data-child="${childCount}">
                        <i class="fas fa-times"></i> Entfernen
                    </button>
                </div>
                <div class="form-group">
                    <input type="text" name="Kind${childCount}_Vorname" placeholder="Vorname" maxlength="100">
                    <input type="text" name="Kind${childCount}_Nachname" placeholder="Nachname" maxlength="100">
                </div>
                <div class="form-group">
                    <input type="date" name="Kind${childCount}_Geburtsdatum" max="2024-12-31" min="2010-01-01">
                </div>
                <div class="form-group">
                    <textarea name="Kind${childCount}_Allergien" placeholder="Allergien oder besondere Bedürfnisse" rows="2"></textarea>
                </div>
            `;
            
            document.getElementById('weitere-Kinder').appendChild(childSection);
            
            // Add event listener to the remove button
            childSection.querySelector('.remove-child').addEventListener('click', function() {
                const childId = this.getAttribute('data-child');
                removeChild(childId);
            });
        }
        
        if (childCount >= maxChildren) {
            document.getElementById('addChild').style.display = 'none';
        }
    });
    
    // Function to remove a child section
    function removeChild(childId) {
        const childSection = document.getElementById(`child-section-${childId}`);
        if (childSection) {
            childSection.remove();
            childCount--;
            document.getElementById('addChild').style.display = 'flex';
        }
    }
    
    // Event delegation for remove buttons
    document.getElementById('weitere-Kinder').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-child') || e.target.parentElement.classList.contains('remove-child')) {
            const button = e.target.classList.contains('remove-child') ? e.target : e.target.parentElement;
            const childId = button.getAttribute('data-child');
            removeChild(childId);
        }
    });
    
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
    
    // Handle form submission with AJAX
    const kidsCampForm = document.getElementById('kidscamp-form');
    if (kidsCampForm) {
        kidsCampForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Show loading indicator immediately
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
            
            // Add FormSubmit configuration
            formObject._subject = "KidsCamp Anmeldung 🏹";
            
            // Send data to FormSubmit
            $.ajax({
                url: "https://formsubmit.co/ajax/e1ac178ac36d6dc694765e53c76b9a45",
                method: "POST",
                data: formObject,
                dataType: "json",
                success: function(response) {
                    console.log("Form submitted successfully:", response);
                    // Show success message
                    alert("Vielen Dank für Ihre Anmeldung! Wir werden uns in Kürze bei Ihnen melden.");
                    
                    // Reset form
                    kidsCampForm.reset();
                    
                    // Remove additional children
                    const weitereKinderContainer = document.getElementById('weitere-Kinder');
                    if (weitereKinderContainer) {
                        weitereKinderContainer.innerHTML = '';
                    }
                    
                    // Reset child count
                    childCount = 1;
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    
                    // Show add child button if it was hidden
                    document.getElementById('addChild').style.display = 'flex';
                },
                error: function(error) {
                    console.error("Error submitting form:", error);
                    alert("Es gab ein Problem bei der Übermittlung des Formulars. Bitte versuchen Sie es später noch einmal oder kontaktieren Sie uns direkt.");
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            });
        });
    }
});
