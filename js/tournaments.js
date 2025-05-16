document.addEventListener('DOMContentLoaded', function() {
    // Toggle registration form visibility
    const registrationToggles = document.querySelectorAll('.registration-toggle');
    const registrationForms = document.getElementById('registration-forms');
    const formContainers = document.querySelectorAll('.tournament-form-container');
    const closeBtns = document.querySelectorAll('.close-form');
    
    // Registration counter and limit
    let registrationCount = 0;
    const registrationLimit = 25;
    
    // For testing purposes - simulate some existing registrations
    // Change this number as needed for testing
    const testRegistrations = 22; // This means only 3 spots left
    registrationCount = testRegistrations;
    
    // Update registration button text based on available spots
    function updateRegistrationStatus() {
        registrationToggles.forEach(toggle => {
            if (registrationCount >= registrationLimit) {
                toggle.textContent = "Registration closed - Fully booked";
                toggle.classList.add("registration-closed");
                toggle.disabled = true;
            } else {
                const spotsLeft = registrationLimit - registrationCount;
                toggle.textContent = `Registration open (${spotsLeft} spots left)`;
            }
        });
    }
    
    // Call initially to set the correct status
    updateRegistrationStatus();
    
    // Show the appropriate form when clicking on "Registration open"
    registrationToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Check if registration is still open
            if (registrationCount >= registrationLimit) {
                alert("Sorry, this tournament is fully booked.");
                return;
            }
            
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
    // Use the correct container ID that matches your HTML
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
                <div class="form-group">
                    <input type="text" name="Nationalität_${participantCount}" placeholder="Nationalität / Nationality" maxlength="100">
                </div>
                <div class="form-group radio-group">
                    <p class="radio-label">Ich bin / I am:</p>
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
                  <div class="form-group checkbox-group">
                <p class="checkbox-label">Ich möchte an folgenden Turnieren mitmachen / I'd like to participate in the following Styles:</p>
                <div class="checkbox-options">
                    <div class="checkbox-item">
                        <input type="checkbox" id="ungarisch_${participantCount}_1" name="Teilnahme_${participantCount}[]" value="Ungarisch nach Kassai Regeln am 1.08.25">
                        <label for="ungarisch_${participantCount}_1">Ungarisch nach Kassai Regeln am 1.08.25 / Hungarian Style according to Kassai Rules the 1.08.25</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="ungarisch_${participantCount}_2" name="Teilnahme_${participantCount}[]" value="Ungarisch nach Kassai Regeln am 2.08.25">
                        <label for="ungarisch_${participantCount}_2">Ungarisch nach Kassai Regeln am 2.08.25 / Hungarian Style according to Kassai Rules the 2.08.25</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="koreanisch_${participantCount}" name="Teilnahme_${participantCount}[]" value="Koreanisch nach IHAA Regeln am 3.8.25">
                        <label for="koreanisch_${participantCount}">Turnier nach IHAA (Five Demons) am 3.8.25 / Korean (Five Demons) according to IHAA Rules</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="beginner_${participantCount}" name="Teilnahme_${participantCount}[]" value="Beginner Competition am 3.8.2025">
                        <label for="beginner_${participantCount}">Beginner Competition nach IHAA am 3.8.2025</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="children_${participantCount}" name="Teilnahme_${participantCount}[]" value="Children Competition am 3.8.2025">
                        <label for="children_${participantCount}">Children Competition am 3.8.2025</label>
                    </div>
                </div>
            </div>
        </div>
    `;
            
            weitereTeilnehmerContainer.appendChild(additionalParticipant);
            
            // Scroll to the new participant section
            additionalParticipant.scrollIntoView({ behavior: 'smooth' });
            
            // Add event listener to remove button
            const removeBtn = additionalParticipant.querySelector('.remove-participant');
            removeBtn.addEventListener('click', function() {
                additionalParticipant.remove();
                participantCount--;
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
            
            // Check if registration is still open
            if (registrationCount >= registrationLimit) {
                alert("Sorry, this tournament is fully booked.");
                return;
            }
            
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
            
            // Update CC field with customer email
            if (formObject.Email) {
                formObject._cc = formObject.Email;
            }
            
            // Add FormSubmit configuration
            formObject._subject = "Tournament Limpach Open Registration 🎯";
            
            // Send data to FormSubmit
            $.ajax({
                url: "https://formsubmit.co/ajax/darcangelsletzebuerg@gmail.com",
                method: "POST",
                data: formObject,
                dataType: "json",
                success: function(response) {
                    console.log("Form submitted successfully:", response);
                    
                    // Check if the response indicates success
                    if (response.success === "true" || response.success === true) {
                        // Increment registration count
                        registrationCount += participantCount;
                        
                        // Update registration status
                        updateRegistrationStatus();
                        
                        // Show success message
                        alert("Vielen Dank für deine Anmeldung! / Thank you for your registration!");
                        
                        // Reset form
                        tournamentForm.reset();
                        
                        // Remove additional participants
                        const weitereTeilnehmerContainer = document.getElementById('weitere-Teilnehmer');
                        if (weitereTeilnehmerContainer) {
                            weitereTeilnehmerContainer.innerHTML = '';
                        }
                        
                        // Reset participant count
                        participantCount = 1;
                        
                        // Hide the form section
                        document.getElementById('registration-forms').style.display = 'none';
                    } else {
                        // Something went wrong with FormSubmit
                        console.error("FormSubmit response indicates failure:", response);
                        alert("Es gab ein Problem bei der Anmeldung. Bitte versuche es später noch einmal. / There was a problem with the registration. Please try again later.");
                    }
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                },
                error: function(error) {
                    console.error("Error submitting form:", error);
                    
                    // Try to log more details about the error
                    if (error.responseJSON) {
                        console.error("Response details:", error.responseJSON);
                    }
                    
                    alert("Es gab ein Problem bei der Anmeldung. Bitte versuche es später noch einmal. / There was a problem with the registration. Please try again later.");
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            });
        });
        
        // Add a fallback submit button to the form
        const fallbackBtn = document.createElement('button');
        fallbackBtn.type = 'submit';
        fallbackBtn.className = 'fallback-submit';
        fallbackBtn.style.display = 'none';
        fallbackBtn.textContent = 'Fallback Submit';
        tournamentForm.appendChild(fallbackBtn);
        
        // Set up the form for traditional submission as a fallback
        tournamentForm.setAttribute('action', 'https://formsubmit.co/darcangelsletzebuerg@gmail.com');
        tournamentForm.setAttribute('method', 'POST');
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
            
            // Add a visual indicator that the checkbox is
