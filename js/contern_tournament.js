// js/contern_tournament.js
document.addEventListener('DOMContentLoaded', () => {
  // Only Contern selectors and logic here
  const submitEmail = 'itdarcangels@gmail.com';
  const conternToggle = document.querySelector('.registration-toggle[data-tournament="tournament2-contern"]');
  const conternForm = document.getElementById('tournament2-form');
  const conternRegistrationForm = document.getElementById('tournament2-registration');

  let registrationCount = 0;
  const registrationLimit = 15; // Limit für Contern

  // Registrierungstoggle öffnen
  if (conternToggle) {
    conternToggle.addEventListener('click', () => {
      if (registrationCount >= registrationLimit) {
        alert("Sorry, this tournament is fully booked.");
        return;
      }
      if (conternForm) {
        conternForm.style.display = 'block';
        conternForm.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  function updateConternStatus() {
    const spotsLeft = registrationLimit - registrationCount;
    if (conternToggle) {
      conternToggle.textContent = spotsLeft > 0
        ? `Registration open (${spotsLeft} spots left)`
        : "Registration closed - Fully booked";
      conternToggle.disabled = spotsLeft <= 0;
      conternToggle.classList.toggle("registration-closed", spotsLeft <= 0);
    }
  }

  updateConternStatus();

  if (conternRegistrationForm) {
    conternRegistrationForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (registrationCount >= registrationLimit) {
        alert("Sorry, this tournament is fully booked.");
        return;
      }

      const submitBtn = conternRegistrationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      const formData = new FormData(conternRegistrationForm);
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${submitEmail}`, {
          method: "POST",
          body: formData
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          registrationCount++;
          updateConternStatus();
          alert("Vielen Dank für deine Anmeldung zum Contern-Turnier!");
          conternRegistrationForm.reset();
          conternForm.style.display = 'none';
        } else {
          throw new Error("Submission failed");
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  // Add participant logic
  const addParticipantBtn = document.getElementById('addparticipant-contern');
  const weitereTeilnehmerContainer = document.getElementById('weitere-Teilnehmer-contern');
  let participantCount = 1;

  if (addParticipantBtn && weitereTeilnehmerContainer) {
    addParticipantBtn.addEventListener('click', () => {
      participantCount++;
      const newParticipant = document.createElement('div');
      newParticipant.className = 'participant-section';
      newParticipant.innerHTML = `
        <h3>Teilnehmer ${participantCount}</h3>
        <div class="form-group">
          <input type="text" name="Vorname_${participantCount}" placeholder="Vorname / Name" required maxlength="100">
          <input type="text" name="Nachname_${participantCount}" placeholder="Nachname / Surname" required maxlength="100">
        </div>
        <div class="form-group geburtsdatum-group">
          <label for="geburtsdatum_tag_${participantCount}" style="display:block; margin-bottom:4px;">Geburtsdatum</label>
          <select id="geburtsdatum_tag_${participantCount}" name="Geburtsdatum_Tag_${participantCount}" required>
            <option value="">Tag</option>
            ${Array.from({length: 31}, (_, i) => `<option value="${(i+1).toString().padStart(2,'0')}">${i+1}</option>`).join('')}
          </select>
          <select name="Geburtsdatum_Monat_${participantCount}" id="geburtsdatum_monat_${participantCount}" required>
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
          <select id="geburtsdatum_jahr_${participantCount}" name="Geburtsdatum_Jahr_${participantCount}" required>
            <option value="">Jahr</option>
            ${(() => {
              const currentYear = new Date().getFullYear();
              let options = '';
              for (let y = currentYear - 5; y >= 1920; y--) {
                options += `<option value="${y}">${y}</option>`;
              }
              return options;
            })()}
          </select>
        </div>
        <div class="form-group radio-group">
          <p class="radio-label">Ich bin:</p>
          <div class="radio-options">
            <div class="radio-item">
              <input type="radio" id="linkshaender_${participantCount}" name="Haendigkeit_${participantCount}" value="Linkshänder" required>
              <label for="linkshaender_${participantCount}">Linkshänder / Left Handed</label>
            </div>
            <div class="radio-item">
              <input type="radio" id="rechtshaender_${participantCount}" name="Haendigkeit_${participantCount}" value="Rechtshänder" required>
              <label for="rechtshaender_${participantCount}">Rechtshänder / Right Handed</label>
            </div>
          </div>
          <p class="radio-label">Ich habe eine Licence:</p>
          <div class="radio-options">
            <div class="radio-item">
              <input type="radio" id="licence_yes_${participantCount}" name="Licence_${participantCount}" value="Yes" required>
              <label for="licence_yes_${participantCount}">Ja</label>
            </div>
            <div class="radio-item">
              <input type="radio" id="licence_no_${participantCount}" name="Licence_${participantCount}" value="No" required>
              <label for="licence_no_${participantCount}">Nein</label>
            </div>
          </div>
        </div>
      `;
      weitereTeilnehmerContainer.appendChild(newParticipant);
    });
  }
});



