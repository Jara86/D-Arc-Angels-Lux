// contern.js
const isTestMode = window.location.search.includes('test=true');
const submitEmail = 'itdarcangels@gmail.com';

document.addEventListener('DOMContentLoaded', () => {
  const registrationToggles = document.querySelectorAll('.registration-toggle');
  const registrationForms = document.getElementById('registration-forms');
  const formContainers = document.querySelectorAll('.tournament-form-container');
  const closeBtns = document.querySelectorAll('.close-form');

  let registrationCount = 0;
  const registrationLimit = 15; // Limit für Contern
  let participantCount = 1;

  // Registrierungstoggle öffnen
  registrationToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (registrationCount >= registrationLimit) {
        alert("Sorry, this tournament is fully booked.");
        return;
      }
      const tournamentId = toggle.dataset.tournament;
      formContainers.forEach(container => container.style.display = 'none');
      document.getElementById(`${tournamentId}-form`).style.display = 'block';
      registrationForms.style.display = 'block';
      registrationForms.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Close buttons
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      registrationForms.style.display = 'none';
    });
  });

  // --- Formular für Contern (tournament2) ---
  const conternToggle = document.querySelector('.registration-toggle[data-tournament="tournament2"]');
  const conternForm = document.getElementById('tournament2-form');
  const conternRegistrationForm = document.getElementById('tournament2-registration');

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
});
