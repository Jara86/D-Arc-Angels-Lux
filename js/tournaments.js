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
    
    // Close form when clicking on close button
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            registrationForms.style.display = 'none';
        });
    });
    
    // Handle conditional sections
    const pferdAnzahlRadios = document.querySelectorAll('input[name="Pferde_Anzahl"]');
    const pferdDetailsSection = document.getElementById('pferd_details');
    
    if (pferdAnzahlRadios.length > 0 && pferdDetailsSection) {
        pferdAnzahlRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === '0') {
                    pferdDetailsSection.style.display = 'none';
                    // Remove required attribute from horse fields when not showing
                    pferdDetailsSection.querySelectorAll('input, select').forEach(field => {
                        field.required = false;
                    });
                } else {
                    pferdDetailsSection.style.display = 'block';
                    // Make horse name required when showing horse section
                    const pferdeName = pferdDetailsSection.querySelector('input[name="Pferdename"]');
                    if (pferdeName) pferdeName.required = true;
                }
            });
        });
        
        // Initialize display based on current selection
        const selectedRadio = document.querySelector('input[name="Pferde_Anzahl"]:checked');
        if (selectedRadio && selectedRadio.value === '0') {
            pferdDetailsSection.style.display = 'none';
            // Remove required attribute from horse fields
            pferdDetailsSection.querySelectorAll('input, select').forEach(field => {
                field.required = false;
            });
        }
    }
    
    // Add participant functionality
    const addParticipantBtn = document.getElementById('addparticipant');
    const weitereTeilnehmerContainer = document.getElementById('weitere-Teilnehmer');
    
    let participantCount = 1;
    
    if (addParticipantBtn && weitereTeilnehmerContainer) {
        addParticipantBtn.addEventListener('click', function() {
            participantCount++;
            
            const additionalParticipant = document.createElement('div');
            additionalParticipant.className = 'participant-section';
            additionalParticipant.innerHTML = `
                <div class="participant-header">
                    <h3>Teilnehmer ${participantCount}</h3>
                    <button type="button" class="remove-participant">Entfernen</button>
                </div>
                <div class="form-group">
                    <input type="text" name="Vorname_${participantCount}" placeholder="Vorname / Name" maxlength="100">
                    <input type="text" name="Nachname_${participantCount}" placeholder="Nachname / Surname" maxlength="100">
                </div>
                <div class="form-group">
                    <input type="date" name="Geburtsdatum_${participantCount}" placeholder="Geburtsdatum / Birthday" max="2050-12-31" min="1900-01-01">
                </div>
                <div class="form-group">
                    <select name="Geschlecht_${participantCount}">
                        <option value="">Geschlecht / Gender</option>
                        <option value="männlich">Männlich / Male</option>
                        <option value="weiblich">Weiblich / Female</option>
                        <option value="divers">Divers / Other</option>
                    </select>
                </div>
                <div class="form-group radio-group">
                    <p class="radio-label">Ich bin:</p>
                    <div class="radio-options">
                        <div class="radio-item">
                            <input type="radio" id="linkshänder_${participantCount}" name="Händigkeit_${participantCount}" value="Linkshänder">
                            <label for="linkshänder_${participantCount}">Linkshänder / Left Handed</label>
                        </div>
                        <div class="radio-item">
                            <input type="radio" id="rechtshänder_${participantCount}" name="Händigkeit_${participantCount}" value="Rechtshänder">
                            <label for="rechtshänder_${participantCount}">Rechtshänder / Right Handed</label>
                        </div>
                    </div>
                </div>
            `;
            
            weitereTeilnehmerContainer.appendChild(additionalParticipant);
            
            // Add event listener to remove button
            const removeBtn = additionalParticipant.querySelector('.remove-participant');
            removeBtn.addEventListener('click', function() {
                additionalParticipant.remove();
            });
        });
    }
    
    // Update CC field when email changes
    const emailField = document.querySelector('input[name="Email"]');
    if (emailField) {
        emailField.addEventListener('input', function() {
            const ccField = document.querySelector('input[name="_cc"]');
            if (ccField) {
                ccField.value = this.value;
            }
        });
    }
    
    // Handle form submission with AJAX
    const tournamentForm = document.getElementById('tournament-registration');
    if (tournamentForm) {
        tournamentForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Check if the form is valid
            if (!this.checkValidity()) {
                // If not valid, trigger browser's validation UI
                return false;
            }
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            // Convert FormData to object
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
            
            // Update CC field with customer email
            if (formObject.Email) {
                formObject._cc = formObject.Email;
            }
            
            // Add subject
            formObject._subject = "Tournament Limpach Open Registration 🎯";
            
            // Show loading indicator
            const submitBtn = tournamentForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Send data to FormSubmit
            $.ajax({
                url: "https://formsubmit.co/ajax/jarouschka@gmail.com",
                method: "POST",
                data: formObject,
                dataType: "json",
                success: function(response) {
                    console.log("Form submitted successfully:", response);
                    // Show success message
                    alert("Vielen Dank für deine Anmeldung! / Thank you for your registration!");
                    
                    // Reset form
                    tournamentForm.reset();
                    
                    // Remove additional participants
                    weitereTeilnehmerContainer.innerHTML = '';
                    participantCount = 1;
                    
                    // Hide the form section
                    document.getElementById('registration-forms').style.display = 'none';
                    
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
