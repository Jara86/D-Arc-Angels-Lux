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
                } else {
                    pferdDetailsSection.style.display = 'block';
                }
            });
        });
        
        // Initialize display based on current selection
        const selectedRadio = document.querySelector('input[name="Pferde_Anzahl"]:checked');
        if (selectedRadio && selectedRadio.value === '0') {
            pferdDetailsSection.style.display = 'none';
        }
    }
    
    // Add participant functionality
    const addParticipantBtn = document.getElementById('addparticipant');
    const weitereTeilnehmerContainer = document.getElementById('weitere-Teilnehmer');
    
    // If the container doesn't exist, look for the alternative container
    let participantContainer = weitereTeilnehmerContainer;
    if (!participantContainer) {
        participantContainer = document.getElementById('weitere-Kinder');
    }
    
    let participantCount = 1;
    
    if (addParticipantBtn && participantContainer) {
        addParticipantBtn.addEventListener('click', function() {
            participantCount++;
            
            const newParticipant = document.createElement('div');
            newParticipant.className = 'participant-section';
            newParticipant.innerHTML = `
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
                    <p class="radio-label">Ich bin :</p>
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
            
            participantContainer.appendChild(newParticipant);
            
            // Add event listener to remove button
            const removeBtn = newParticipant.querySelector('.remove-participant');
            removeBtn.addEventListener('click', function() {
                newParticipant.remove();
            });
        });
    }
});