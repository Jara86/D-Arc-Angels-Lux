const isTestMode = window.location.search.includes('test=true');
const submitEmail = isTestMode ? 'your-test-email@gmail.com' : 'darcangelsletzebuerg@gmail.com';

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

  let registrationCount = 0;
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
      <div class="form-group geburtsdatum-group">
        <label for="geburtsdatum_tag_${participantCount}" style="display:block; margin-bottom:4px;">Geburtsdatum</label>
        <select name="Geburtsdatum_Tag_${participantCount}" id="geburtsdatum_tag_${participantCount}" required>
          <option value="">Tag</option>
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
        <select name="Geburtsdatum_Jahr_${participantCount}" id="geburtsdatum_jahr_${participantCount}" required>
          <option value="">Jahr</option>
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
      <!-- Checkbox options here (abgekürzt zur Übersicht) -->
    `;
    weitereTeilnehmerContainer.appendChild(div);
    div.scrollIntoView({ behavior: 'smooth' });
    div.querySelector('.remove-participant').addEventListener('click', () => {
      div.remove();
      participantCount--;
    });

    // Fill day dropdown
    const daySelect = div.querySelector(`#geburtsdatum_tag_${participantCount}`);
    if (daySelect) {
        for (let d = 1; d <= 31; d++) {
            const opt = document.createElement('option');
            opt.value = d.toString().padStart(2, '0');
            opt.textContent = d;
            daySelect.appendChild(opt);
        }
    }

    // Fill year dropdown (e.g. 1920–2015)
    const yearSelect = div.querySelector(`#geburtsdatum_jahr_${participantCount}`);
    if (yearSelect) {
        const currentYear = new Date().getFullYear();
        for (let y = currentYear - 5; y >= 1920; y--) {
            const opt = document.createElement('option');
            opt.value = y;
            opt.textContent = y;
            yearSelect.appendChild(opt);
        }
    }
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

        // Use FormData instead of JSON (better mobile compatibility)
        const formData = new FormData(tournamentForm);
        formData.append('_captcha', 'false');
        formData.append('_template', 'table');

        try {
            // Use submitEmail variable here
            const response = await fetch(`https://formsubmit.co/ajax/${submitEmail}`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

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
            console.error('Form submission error:', error);
            alert("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
  }

  const form = document.getElementById('tournament-registration');
  if (form) {
      form.addEventListener('submit', function(e) {
          const tag = document.getElementById('geburtsdatum_tag').value;
          const monat = document.getElementById('geburtsdatum_monat').value;
          const jahr = document.getElementById('geburtsdatum_jahr').value;
          let hidden = document.getElementById('geburtsdatum_hidden');
          if (!hidden) {
              hidden = document.createElement('input');
              hidden.type = 'hidden';
              hidden.name = 'Geburtsdatum';
              hidden.id = 'geburtsdatum_hidden';
              form.appendChild(hidden);
          }
          hidden.value = jahr && monat && tag ? `${jahr}-${monat}-${tag}` : '';
      });
  }

  // Pferd Geburtsdatum Tag (Day)
  const pferdTag = document.getElementById('pferd_geburtsdatum_tag');
  if (pferdTag) {
      for (let d = 1; d <= 31; d++) {
          const opt = document.createElement('option');
          opt.value = d.toString().padStart(2, '0');
          opt.textContent = d;
          pferdTag.appendChild(opt);
      }
  }

  // Pferd Geburtsdatum Jahr (Year)
  const pferdJahr = document.getElementById('pferd_geburtsdatum_jahr');
  if (pferdJahr) {
      const currentYear = new Date().getFullYear();
      for (let y = currentYear; y >= 1980; y--) {
          const opt = document.createElement('option');
          opt.value = y;
          opt.textContent = y;
          pferdJahr.appendChild(opt);
      }
  }
});