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

  let registrationCount = 22;
  const registrationLimit = 25;
  let participantCount = 1;

  const updateRegistrationStatus = () => {
    const spotsLeft = registrationLimit - registrationCount;
    registrationToggles.forEach(toggle => {
      toggle.textContent = spotsLeft > 0
        ? `Registration open (${spotsLeft} spots left)`
        : "Registration closed - Fully booked";
      toggle.disabled = spotsLeft <= 0;
      toggle.classList.toggle("registration-closed", spotsLeft <= 0);
    });
  };

  updateRegistrationStatus();

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
      <div class="form-group">
        <input type="date" name="Geburtsdatum_${participantCount}">
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
      <!-- Checkbox options here (abgekürzt zur Übersicht) -->
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

  if (tournamentForm) {
    tournamentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (registrationCount >= registrationLimit) {
        alert("Sorry, this tournament is fully booked.");
        return;
      }

      const submitBtn = tournamentForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      const formData = new FormData(tournamentForm);
      const data = {};
      formData.forEach((value, key) => {
        if (key.endsWith('[]')) {
          const name = key.slice(0, -2);
          if (!data[name]) data[name] = [];
          data[name].push(value);
        } else {
          data[key] = value;
        }
      });
      data._subject = "Tournament Limpach Open Registration 🎯";
      if (data.Email) data._cc = data.Email;

      try {
        const response = await fetch("https://formsubmit.co/ajax/darcangelsletzebuerg@gmail.com", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await response.json();

        if (result.success) {
          registrationCount += participantCount;
          updateRegistrationStatus();
          alert("Vielen Dank für deine Anmeldung!");
          tournamentForm.reset();
          weitereTeilnehmerContainer.innerHTML = '';
          participantCount = 1;
          registrationForms.style.display = 'none';
        } else {
          throw new Error("Submission failed");
        }
      } catch (error) {
        alert("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
        console.error(error);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
});