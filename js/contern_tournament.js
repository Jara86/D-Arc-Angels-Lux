// contern.js
const isTestMode = window.location.search.includes('test=true');
const submitEmail = 'itdarcangels@gmail.com';

document.addEventListener('DOMContentLoaded', () => {
  const registrationToggles = document.querySelectorAll('.registration-toggle-contern');
  const registrationForms = document.getElementById('registration-forms-contern');
  const formContainers = document.querySelectorAll('.tournament-form-container-contern');
  const closeBtns = document.querySelectorAll('.close-form-contern');
  const pferdAnzahlRadios = document.querySelectorAll('input[name="Pferde_Anzahl_Contern"]');
  const pferdDetailsSection = document.getElementById('pferd_details_contern');
  const addParticipantBtn = document.getElementById('addparticipant'); // was 'addparticipant-contern'
  const weitereTeilnehmerContainer = document.getElementById('weitere-Teilnehmer'); // was 'weitere-Teilnehmer-contern'
  const tournamentForm = document.getElementById('tournament-registration-contern');
  const emailField = document.querySelector('input[name="Email_Contern"]');
  // Enable rules checkbox only after reading
  const rulesCheckbox = document.getElementById('regeln');
  const rulesButton = document.getElementById('read-rules-btn');
  if (rulesCheckbox && rulesButton) {
    rulesCheckbox.disabled = true;
    rulesButton.addEventListener('click', () => {
      window.open('rules.html', '_blank'); // Use your rules.html file
      rulesCheckbox.disabled = false;
    });
  }

  let registrationCount = 0;
  const registrationLimit = 25; // Limit für Contern
  let participantCount = 1;

  // Dropdowns für Geburtsdatum Hauptteilnehmer
  const tagSelect = document.getElementById('geburtsdatum_tag_contern');
  if (tagSelect) {
      for (let d = 1; d <= 31; d++) {
          const opt = document.createElement('option');
          opt.value = d.toString().padStart(2, '0');
          opt.textContent = d;
          tagSelect.appendChild(opt);
      }
  }
  const yearSelect = document.getElementById('geburtsdatum_jahr_contern');
  if (yearSelect) {
      const currentYear = new Date().getFullYear();
      for (let y = currentYear - 5; y >= 1920; y--) {
          const opt = document.createElement('option');
          opt.value = y;
          opt.textContent = y;
          yearSelect.appendChild(opt);
      }
  }

  // Pferd Geburtstag
  const pferdTag = document.getElementById('pferd_geburtsdatum_tag_contern');
  if (pferdTag) {
      for (let d = 1; d <= 31; d++) {
          const opt = document.createElement('option');
          opt.value = d.toString().padStart(2, '0');
          opt.textContent = d;
          pferdTag.appendChild(opt);
      }
  }
  const pferdJahr = document.getElementById('pferd_geburtsdatum_jahr_contern');
  if (pferdJahr) {
      const currentYear = new Date().getFullYear();
      for (let y = currentYear; y >= 1980; y--) {
          const opt = document.createElement('option');
          opt.value = y;
          opt.textContent = y;
          pferdJahr.appendChild(opt);
      }
  }

  const updateRegistrationStatus = () => {
    registrationToggles.forEach(toggle => {
      toggle.textContent = "Registration closed - Fully booked";
      toggle.disabled = true;
      toggle.classList.add("registration-closed");
    });
  };

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

  // Pferd-Details zeigen/verstecken
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
  }

  // Teilnehmer hinzufügen
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
        <input type="text" name="Vorname_${participantCount}_Contern" placeholder="Vorname / Name">
        <input type="text" name="Nachname_${participantCount}_Contern" placeholder="Nachname / Surname">
      </div>
      <div class="form-group geburtsdatum-group">
        <label for="geburtsdatum_tag_${participantCount}_contern">Geburtsdatum</label>
        <select name="Geburtsdatum_Tag_${participantCount}_Contern" id="geburtsdatum_tag_${participantCount}_contern" required>
          <option value="">Tag</option>
        </select>
        <select name="Geburtsdatum_Monat_${participantCount}_Contern" id="geburtsdatum_monat_${participantCount}_contern" required>
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
        <select name="Geburtsdatum_Jahr_${participantCount}_Contern" id="geburtsdatum_jahr_${participantCount}_contern" required>
          <option value="">Jahr</option>
        </select>
      </div>
    `;
    weitereTeilnehmerContainer.appendChild(div);

    // Dropdowns füllen
    const daySelect = div.querySelector(`#geburtsdatum_tag_${participantCount}_contern`);
    if (daySelect) {
        for (let d = 1; d <= 31; d++) {
            const opt = document.createElement('option');
            opt.value = d.toString().padStart(2, '0');
            opt.textContent = d;
            daySelect.appendChild(opt);
        }
    }
    const yearSelect = div.querySelector(`#geburtsdatum_jahr_${participantCount}_contern`);
    if (yearSelect) {
        const currentYear = new Date().getFullYear();
        for (let y = currentYear - 5; y >= 1920; y--) {
            const opt = document.createElement('option');
            opt.value = y;
            opt.textContent = y;
            yearSelect.appendChild(opt);
        }
    }

    div.querySelector('.remove-participant').addEventListener('click', () => {
      div.remove();
      participantCount--;
    });
  };

  if (addParticipantBtn && weitereTeilnehmerContainer) {
    addParticipantBtn.addEventListener('click', createParticipant);
  }

  // Email auto-cc
  if (emailField) {
    emailField.addEventListener('input', () => {
      const ccField = document.querySelector('input[name="_cc_Contern"]');
      if (ccField) ccField.value = emailField.value;
    });
  }

  // Submit
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
                registrationCount += participantCount;
                updateRegistrationStatus();
                alert("Vielen Dank für deine Anmeldung zum Contern-Turnier!");
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

  const conternToggle = document.querySelector('.registration-toggle[data-tournament="tournament2"]');
  const conternForm = document.getElementById('tournament2-form');
  let registrationCount2 = 0;
  const registrationLimit2 = 15; // Set your actual limit

  function updateConternStatus() {
    const spotsLeft = registrationLimit2 - registrationCount2;
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
      if (registrationCount2 >= registrationLimit2) {
        alert("Sorry, this tournament is fully booked.");
        return;
      }
      if (conternForm) {
        conternForm.style.display = 'block';
        conternForm.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Example: Increment registrationCount after successful form submission
  const conternRegistrationForm = document.getElementById('tournament2-registration');
  if (conternRegistrationForm) {
    conternRegistrationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // ... your form submission logic ...
      registrationCount2++;
      updateConternStatus();
      alert("Vielen Dank für deine Anmeldung!");
      conternRegistrationForm.reset();
      conternForm.style.display = 'none';
    });
  }
});
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("conternForm");

  const limits = {
    box_innen: 7,
    box_aussen: 4,
    gruppenbox: 5 // 5x 2er Gruppen
  };

  const counts = {};
  Object.keys(limits).forEach(k => counts[k] = 0);

  function updateSlots() {
    const options = form.querySelectorAll("input[name=unterbringung]");
    options.forEach(opt => {
      const type = opt.value;
      const frei = limits[type] - counts[type];
      opt.nextSibling.textContent = ` ${type} (${frei} frei)`;
      opt.disabled = frei <= 0;
    });
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const selected = form.querySelector("input[name=unterbringung]:checked");
    if (selected) {
      counts[selected.value]++;
      updateSlots();
      alert("Anmeldung für Contern gespeichert!");
      form.reset();
    }
  });

  updateSlots();
});

