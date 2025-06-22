// Test version of tournaments.js for safe testing
// This file is identical to tournaments.js but uses test email

// TEST CONFIGURATION
const isTestMode = true; // Always true in this file
const submitEmail = 'itdarcangels@gmail.com'; // Test email
const registrationLimit = 25; // Keep same limit for testing

// Add test banner
document.addEventListener('DOMContentLoaded', () => {
    const testBanner = document.createElement('div');
    testBanner.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; 
        background: #ff9800; color: white; text-align: center; 
        padding: 10px; z-index: 9999; font-weight: bold;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    `;
    testBanner.innerHTML = '🧪 TEST MODE - Using tournaments-test.js - Emails go to itdarcangels@gmail.com';
    document.body.prepend(testBanner);
    document.body.style.paddingTop = '60px';
});

// COPY ALL YOUR EXISTING tournaments.js CODE BELOW THIS LINE
document.addEventListener('DOMContentLoaded', () => {
    const registrationToggles = document.querySelectorAll('.registration-toggle');
    const registrationForms = document.getElementById('registration-forms');
    const formContainers = document.querySelectorAll('.tournament-form-container');
    const closeBtns = document.querySelectorAll('.close-form');
    const pferdAnzahlRadios = document.querySelectorAll('input[name="Pferde_Anzahl"]');
    const pferdDetailsSection = document.getElementById('pferd_details');
    const addParticipantBtn = document.getElementById('addparticipant');
    const weitereTeilnehmerContainer = document.getElementById('weitere-Teilnehmer');
    const tournamentForm = document.getElementById('tournament-registration');
    const emailField = document.querySelector('input[name="Email"]');
    const rulesCheckbox = document.getElementById('regeln');
    const rulesButton = document.querySelector('.text-link');
    
    let registrationCount = 0; // Reset for testing
    let participantCount = 1;

    const updateRegistrationStatus = () => {
        const spotsLeft = registrationLimit - registrationCount;
        registrationToggles.forEach(toggle => {
            toggle.textContent = `🧪 TEST: ${spotsLeft} spots left (Count: ${registrationCount}/${registrationLimit})`;
            toggle.disabled = false; // Always allow registration in test mode
            toggle.classList.remove("registration-closed");
        });
    };

    updateRegistrationStatus();

    registrationToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            if (registrationCount >= registrationLimit) {
                alert("TEST: Sorry, this tournament is fully booked.");
                return;
            }
            const tournamentId = toggle.dataset.tournament;
            formContainers.forEach(container => container.style.display = 'none');
            document.getElementById(`${tournamentId}-form`).style.display = 'block';
            registrationForms.style.display = 'block';
            registrationForms.scrollIntoView({ behavior: 'smooth' });
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            registrationForms.style.display = 'none';
        });
    });

    if (pferdAnzahlRadios.length && pferdDetailsSection) {
        pferdAnzahlRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                const show = radio.value !== '0';
                pferdDetailsSection.style.display = show ? 'block' : 'none';
                pferdDetailsSection.querySelectorAll('input, select').forEach(field => {
                    field.required = show;
                });
            });
        });
        const selectedRadio = document.querySelector('input[name="Pferde_Anzahl"]:checked');
        if (selectedRadio && selectedRadio.value === '0') {
            pferdDetailsSection.style.display = 'none';
            pferdDetailsSection.querySelectorAll('input, select').forEach(field => field.required = false);
        }
    }

    const createParticipant = () => {
        participantCount++;
        const div = document.createElement('div');
        div.className = 'participant-section';
        div.innerHTML = `
            <div class="participant-header">
                <h3>Teilnehmer ${participantCount}</h3>
                <button type="button" class="remove-participant">Entfernen</button>
            </div>
            <div class="form-group">
                <input type="text" name="Vorname_${participantCount}" placeholder="Vorname / Name">
                <input type="text" name="Nachname_${participantCount}" placeholder="Nachname / Surname">
            </div>
            <div class="form-group geburtsdatum-group">
                <select name="Geburtsdatum_Tag" id="geburtsdatum_tag" required>
                    <option value="">Tag</option>
                    <!-- 1-31 will be filled by JS -->
                </select>
                <select name="Geburtsdatum_Monat" id="geburtsdatum_monat" required>
                    <option value="">Monat</option>
                    <option value="01">Januar</option>
                    <option value="02">Februar</option>
                    <option value="03">März</option>
                    <option value="04">April</option>
                    <option value="05">Mai</option>
                    <option value="06">Juni</option>
                    <option value="07">Juli</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">Oktober</option>
                    <option value="11">November</option>
                    <option value="12">Dezember</option>
                </select>
                <select name="Geburtsdatum_Jahr" id="geburtsdatum_jahr" required>
                    <option value="">Jahr</option>
                    <!-- Years will be filled by JS -->
                </select>
            </div>
            <div class="form-group">
                <select name="Geschlecht_${participantCount}">
                    <option value="">Geschlecht / Gender</option>
                    <option value="männlich">Männlich</option>
                    <option value="weiblich">Weiblich</option>
                    <option value="divers">Divers</option>
                </select>
            </div>
            <div class="form-group">
                <input type="text" name="Nationalität_${participantCount}" placeholder="Nationalität">
            </div>
        `;
        weitereTeilnehmerContainer.appendChild(div);
        div.scrollIntoView({ behavior: 'smooth' });
        div.querySelector('.remove-participant').addEventListener('click', () => {
            div.remove();
            participantCount--;
        });
    };

    if (addParticipantBtn && weitereTeilnehmerContainer) {
        addParticipantBtn.addEventListener('click', createParticipant);
    }

    // Keep email handler for CC functionality
    if (emailField) {
        emailField.addEventListener('input', () => {
            const ccField = document.querySelector('input[name="_cc"]');
            if (ccField) ccField.value = emailField.value;
        });
    }

    if (rulesCheckbox && rulesButton) {
        rulesCheckbox.disabled = true;
        rulesButton.addEventListener('click', () => {
            window.open('docs/rules.html', '_blank');
            rulesCheckbox.disabled = false;
        });
    }

    // FIXED FORM SUBMISSION FOR TESTING
    if (tournamentForm) {
        tournamentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (registrationCount >= registrationLimit) {
                alert("TEST: Sorry, this tournament is fully booked.");
                return;
            }

            const submitBtn = tournamentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '🧪 Testing...';

            // Use FormData for better mobile compatibility
            const formData = new FormData(tournamentForm);
            formData.append('_captcha', 'false');
            formData.append('_template', 'table');
            formData.append('_subject', 'TEST: Tournament Registration 🧪');

            try {
                console.log('TEST: Submitting to', submitEmail);
                
                const response = await fetch(`https://formsubmit.co/ajax/${submitEmail}`, {
                    method: "POST",
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('TEST: Form submission result:', result);
                
                if (result.success) {
                    // Don't count registrations in test mode
                    alert("🧪 TEST SUCCESS: Form submitted to itdarcangels@gmail.com! Check your email.");
                    tournamentForm.reset();
                    weitereTeilnehmerContainer.innerHTML = '';
                    participantCount = 1;
                    registrationForms.style.display = 'none';
                } else {
                    throw new Error(result.message || "Submission failed");
                }
            } catch (error) {
                console.error('TEST: Form submission error:', error);
                alert("🧪 TEST ERROR: " + error.message);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }
});


