// js/contern_tournament.js
document.addEventListener('DOMContentLoaded', () => {
  // Only Contern selectors and logic here
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
      `;
      weitereTeilnehmerContainer.appendChild(newParticipant);
    });
  }
});
