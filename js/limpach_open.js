// ==================== TRANSLATIONS OBJECT ====================
const translations = {
  de: {
    title: "Anmeldeformular Limpach Open",
    main_participant: "Hauptteilnehmer",
    firstname_placeholder: "Vorname",
    lastname_placeholder: "Nachname",
    birthdate_label: "Geburtsdatum",
    gender_select_first_option: "Geschlecht",
    gender_male: "Männlich",
    gender_female: "Weiblich",
    gender_other: "Divers",
    nationality_placeholder: "Nationalität",
    email_placeholder: "E-Mail",
    phone_placeholder: "Telefonnummer",
    handedness_label: "Ich bin:",
    left_handed: "Linkshänder",
    right_handed: "Rechtshänder",
    participation_label: "Ich möchte an folgenden Turnieren mitmachen:",
    checkbox_hungarian: "Ungarisch nach Kassai Regeln am 18.7.2026",
    checkbox_korean: "Turnier nach IHAA (Five Demons) am 17.7.2026",
    checkbox_wheel: "Wheel Archery am 18.7.2026",
    checkbox_beginner: "Beginner Competition am 19.7.2026",
    checkbox_children: "Kinder Competition am 19.7.2026",
    qualification_label: "Ich möchte dass meine Ergebnisse anerkannt werden:",
    yes_radio: "Ja.",
    no_radio: "Nein.",
    arrival_label: "Ankunft:",
    horses_label: "Pferde Anzahl:",
    horse_one: "1",
    horse_two: "2",
    horse_none: "Kein eigenes Pferd",
    horse_gender_label: "Pferd Geschlecht:",
    mare: "Stute",
    gelding: "Wallach",
    stallion: "Hengst",
    horse_birthdate_label: "Pferd Geburtsdatum",
    horse_name_placeholder: "Pferdenamen (wie im Pass)",
    terms_label: "Terms and Conditions",
    checkbox_rules:
      "Teilnahme/Mitgliedschaftsregeln und Datenschutzbestimmungen akzeptiert",
    checkbox_nophotos: "Keine Fotos von mir veröffentlichen",
    add_participant_btn: "Weiteren Teilnehmer hinzufügen",
    read_rules_link: "Regeln lesen",
    register_btn: "Anmelden",
    cancel_btn: "Abbrechen",
  },
  en: {
    title: "Registration Form Limpach Open",
    main_participant: "Main Participant",
    firstname_placeholder: "First Name",
    lastname_placeholder: "Last Name",
    birthdate_label: "Date of Birth",
    gender_select_first_option: "Gender",
    gender_male: "Male",
    gender_female: "Female",
    gender_other: "Other",
    nationality_placeholder: "Nationality",
    email_placeholder: "Email",
    phone_placeholder: "Phone Number",
    handedness_label: "I am:",
    left_handed: "Left Handed",
    right_handed: "Right Handed",
    participation_label: "I'd like to participate in:",
    checkbox_hungarian: "Hungarian Style 18.7.2026",
    checkbox_korean: "Five Demons 17.7.2026",
    checkbox_wheel: "Wheel Archery 18.7.2026",
    checkbox_beginner: "Beginner Competition 19.7.2026",
    checkbox_children: "Children Competition 19.7.2026",
    qualification_label: "Results should be recognized:",
    yes_radio: "Yes.",
    no_radio: "No.",
    arrival_label: "Arrival:",
    horses_label: "Number of horses:",
    horse_one: "1",
    horse_two: "2",
    horse_none: "No own horse",
    horse_gender_label: "Horse Gender:",
    mare: "Mare",
    gelding: "Gelding",
    stallion: "Stallion",
    horse_birthdate_label: "Horse Birthday",
    horse_name_placeholder: "Horse(s) Name (like in Passport)",
    terms_label: "Terms and Conditions",
    checkbox_rules: "Participation/Membership Rules Accepted",
    checkbox_nophotos: "No photos published",
    add_participant_btn: "Add Another Participant",
    read_rules_link: "Read Rules",
    register_btn: "Register",
    cancel_btn: "Cancel",
  },
  fr: {
    title: "Formulaire d'inscription Limpach Open",
    main_participant: "Participant Principal",
    firstname_placeholder: "Prénom",
    lastname_placeholder: "Nom",
    birthdate_label: "Date de naissance",
    gender_select_first_option: "Sexe",
    gender_male: "Mâle",
    gender_female: "Femelle",
    gender_other: "Autre",
    nationality_placeholder: "Nationalité",
    email_placeholder: "Courriel",
    phone_placeholder: "Numéro de téléphone",
    handedness_label: "Je suis :",
    left_handed: "Gaucher",
    right_handed: "Droitier",
    participation_label: "Je souhaite participer à :",
    checkbox_hungarian: "Style hongrois 18.7.2026",
    checkbox_korean: "Cinq Démons 17.7.2026",
    checkbox_wheel: "Archère roue 18.7.2026",
    checkbox_beginner: "Débutants 19.7.2026",
    checkbox_children: "Enfants 19.7.2026",
    qualification_label: "Résultats reconnus :",
    yes_radio: "Oui.",
    no_radio: "Non.",
    arrival_label: "Arrivée :",
    horses_label: "Nombre de chevaux :",
    horse_one: "1",
    horse_two: "2",
    horse_none: "Pas mon propre cheval",
    horse_gender_label: "Sexe du cheval :",
    mare: "Jument",
    gelding: "Hongre",
    stallion: "Étalon",
    horse_birthdate_label: "Naissance du cheval",
    horse_name_placeholder: "Nom du/des cheval(x) (comme dans passeport)",
    terms_label: "Conditions générales",
    checkbox_rules: "Règles de participation/adhésion acceptées",
    checkbox_nophotos: "Pas de photos publiées",
    add_participant_btn: "Ajouter un autre participant",
    read_rules_link: "Lire les règles",
    register_btn: "S'inscrire",
    cancel_btn: "Annuler",
  },
};

// Global variables - USING SECURE HASH CODE
const isTestMode = window.location.search.includes("test=true");
const submitEmail = "e1ac178ac36d6dc694765e53c76b9a45";

document.addEventListener("DOMContentLoaded", () => {
  const registrationToggles = document.querySelectorAll(".registration-toggle");
  const registrationForms = document.getElementById("registration-forms");
  const formContainers = document.querySelectorAll(
    ".tournament-form-container",
  );
  const closeBtns = document.querySelectorAll(".close-form");
  const pferdAnzahlRadios = document.querySelectorAll(
    'input[name="Pferde_Anzahl"]',
  );
  const pferdDetailsSection = document.getElementById("pferd_details");
  const addParticipantBtn = document.getElementById("addparticipant");
  const weitereTeilnehmerContainer =
    document.getElementById("weitere-Teilnehmer");
  const tournamentForm = document.getElementById("tournament-registration");
  const emailField = document.querySelector('input[name="Email"]');
  const rulesCheckbox = document.getElementById("regeln");

  let registrationCount = 0;
  const registrationLimit = 25;
  let participantCount = 1;

  // Fill birthday dropdowns
  const fillBirthdayDropdowns = () => {
    const tagSelect = document.getElementById("geburtsdatum_tag");
    if (tagSelect) {
      for (let d = 1; d <= 31; d++) {
        const opt = document.createElement("option");
        opt.value = d.toString().padStart(2, "0");
        opt.textContent = d;
        tagSelect.appendChild(opt);
      }
    }
    const yearSelect = document.getElementById("geburtsdatum_jahr");
    if (yearSelect) {
      const currentYear = new Date().getFullYear();
      for (let y = currentYear - 5; y >= 1920; y--) {
        const opt = document.createElement("option");
        opt.value = y;
        opt.textContent = y;
        yearSelect.appendChild(opt);
      }
    }

    const pferdTag = document.getElementById("pferd_geburtsdatum_tag");
    if (pferdTag) {
      for (let d = 1; d <= 31; d++) {
        const opt = document.createElement("option");
        opt.value = d.toString().padStart(2, "0");
        opt.textContent = d;
        pferdTag.appendChild(opt);
      }
    }
    const pferdJahr = document.getElementById("pferd_geburtsdatum_jahr");
    if (pferdJahr) {
      const currentYear = new Date().getFullYear();
      for (let y = currentYear; y >= 1980; y--) {
        const opt = document.createElement("option");
        opt.value = y;
        opt.textContent = y;
        pferdJahr.appendChild(opt);
      }
    }
  };

  fillBirthdayDropdowns();

  // Initialize Language Switcher
  const initializeLanguageSwitcher = () => {
    const langSelector = document.getElementById("language-select");
    if (langSelector) {
      langSelector.value = "en";
      changeLanguage("en");

      langSelector.addEventListener("change", (e) => {
        changeLanguage(e.target.value);
      });
    }
  };

  initializeLanguageSwitcher();

  const updateRegistrationStatus = () => {
    registrationToggles.forEach((toggle) => {
      if (registrationCount >= registrationLimit) {
        toggle.textContent = "Registration closed - Fully booked";
        toggle.disabled = true;
        toggle.classList.add("registration-closed");
      } else {
        toggle.textContent = "Registration open";
        toggle.disabled = false;
        toggle.classList.remove("registration-closed");
      }
    });
  };

  updateRegistrationStatus();

  registrationToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      if (registrationCount >= registrationLimit) {
        alert("Sorry, this tournament is fully booked.");
        return;
      }
      const tournamentId = toggle.dataset.tournament;
      formContainers.forEach((container) => (container.style.display = "none"));
      const formToShow = document.getElementById(`${tournamentId}-form`);
      if (formToShow) {
        formToShow.style.display = "block";
        registrationForms.style.display = "block";
        setTimeout(() => {
          registrationForms.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      registrationForms.style.display = "none";
    });
  });

  if (pferdAnzahlRadios.length && pferdDetailsSection) {
    pferdAnzahlRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        const show = radio.value !== "0";
        pferdDetailsSection.style.display = show ? "block" : "none";
        pferdDetailsSection
          .querySelectorAll("input, select")
          .forEach((field) => {
            field.required = show;
          });
      });
    });
    const selectedRadio = document.querySelector(
      'input[name="Pferde_Anzahl"]:checked',
    );
    if (selectedRadio && selectedRadio.value === "0") {
      pferdDetailsSection.style.display = "none";
      pferdDetailsSection
        .querySelectorAll("input, select")
        .forEach((field) => (field.required = false));
    }
  }

  const createParticipant = () => {
    participantCount++;
    const div = document.createElement("div");
    div.className = "participant-section";
    div.innerHTML = `
      <div class="participant-header">
        <h3>Teilnehmer ${participantCount}</h3>
        <button type="button" class="remove-participant">Entfernen</button>
      </div>
      <div class="form-group">
        <input type="text" name="Vorname_${participantCount}" placeholder="Vorname">
        <input type="text" name="Nachname_${participantCount}" placeholder="Nachname">
      </div>
      <div class="form-group geburtsdatum-group">
        <label for="geburtsdatum_tag_${participantCount}">Geburtsdatum</label>
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
          <option value="">Geschlecht</option>
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
    div.scrollIntoView({ behavior: "smooth" });
    div.querySelector(".remove-participant").addEventListener("click", () => {
      div.remove();
      participantCount--;
    });

    const daySelect = div.querySelector(
      `#geburtsdatum_tag_${participantCount}`,
    );
    if (daySelect) {
      for (let d = 1; d <= 31; d++) {
        const opt = document.createElement("option");
        opt.value = d.toString().padStart(2, "0");
        opt.textContent = d;
        daySelect.appendChild(opt);
      }
    }

    const yearSelect = div.querySelector(
      `#geburtsdatum_jahr_${participantCount}`,
    );
    if (yearSelect) {
      const currentYear = new Date().getFullYear();
      for (let y = currentYear - 5; y >= 1920; y--) {
        const opt = document.createElement("option");
        opt.value = y;
        opt.textContent = y;
        yearSelect.appendChild(opt);
      }
    }
  };

  if (addParticipantBtn && weitereTeilnehmerContainer) {
    addParticipantBtn.addEventListener("click", createParticipant);
  }

  if (emailField) {
    emailField.addEventListener("input", () => {
      const ccField = document.querySelector('input[name="_cc"]');
      if (ccField) ccField.value = emailField.value;
    });
  }

  // RULES LINK HANDLER - Enabled after clicking "Read Rules" link
  if (rulesCheckbox) {
    rulesCheckbox.disabled = true;

    // Set up global function for popup to call
    window.rulesAccepted = function () {
      console.log("Rules acceptance confirmed from popup");
      if (rulesCheckbox) {
        rulesCheckbox.disabled = false;
      }
    };
  }

  if (tournamentForm) {
    tournamentForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const tag = document.getElementById("geburtsdatum_tag")?.value || "";
      const monat = document.getElementById("geburtsdatum_monat")?.value || "";
      const jahr = document.getElementById("geburtsdatum_jahr")?.value || "";
      let hidden = document.getElementById("geburtsdatum_hidden");
      if (!hidden) {
        hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.name = "Geburtsdatum";
        hidden.id = "geburtsdatum_hidden";
        tournamentForm.appendChild(hidden);
      }
      hidden.value = jahr && monat && tag ? `${jahr}-${monat}-${tag}` : "";

      if (registrationCount >= registrationLimit) {
        alert("Sorry, this tournament is fully booked.");
        return;
      }

      const submitBtn = tournamentForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Sending...";

      const formData = new FormData(tournamentForm);
      formData.append("_captcha", "false");
      formData.append("_template", "table");

      try {
        const response = await fetch(
          `https://formsubmit.co/ajax/${submitEmail}`,
          {
            method: "POST",
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          registrationCount += participantCount;
          updateRegistrationStatus();
          alert("Vielen Dank für deine Anmeldung!");
          tournamentForm.reset();
          weitereTeilnehmerContainer.innerHTML = "";
          participantCount = 1;
          registrationForms.style.display = "none";
        } else {
          throw new Error("Submission failed");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        alert("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
});

// ==================== LANGUAGE SWITCHER FUNCTION ====================
function changeLanguage(lang) {
  const t = translations[lang];

  // Update form title
  const formTitle = document.querySelector("#tournament1-form h2");
  if (formTitle) formTitle.textContent = t.title;

  // Update participant section heading
  const mainHeading = document.querySelector(".participant-section h3");
  if (mainHeading) mainHeading.textContent = t.main_participant;

  // Update first name placeholder
  const firstNameInput = document.getElementById("firstname-input");
  if (firstNameInput) firstNameInput.placeholder = t.firstname_placeholder;

  // Update last name placeholder
  const lastNameInput = document.getElementById("lastname-input");
  if (lastNameInput) lastNameInput.placeholder = t.lastname_placeholder;

  // Update birthdate label
  const birthdateLabel = document.getElementById("birthdate-label");
  if (birthdateLabel) birthdateLabel.textContent = t.birthdate_label;

  // Update gender select
  const genderSelect = document.getElementById("gender-select");
  if (genderSelect) {
    genderSelect.options[0].text = t.gender_select_first_option;
    genderSelect.options[1].text = t.gender_male;
    genderSelect.options[2].text = t.gender_female;
    genderSelect.options[3].text = t.gender_other;
  }

  // Update nationality placeholder
  const nationalityInput = document.getElementById("nationality-input");
  if (nationalityInput)
    nationalityInput.placeholder = t.nationality_placeholder;

  // Update email placeholder
  const emailInput = document.getElementById("email-input");
  if (emailInput) emailInput.placeholder = t.email_placeholder;

  // Update phone placeholder
  const phoneInput = document.getElementById("phone-input");
  if (phoneInput) phoneInput.placeholder = t.phone_placeholder;

  // Update handedness label
  const handednessLabel = document.getElementById("handedness-label");
  if (handednessLabel) handednessLabel.textContent = t.handedness_label;

  // Update left/right radio labels
  const leftRadio = document.getElementById("left-radio");
  if (leftRadio && leftRadio.labels[0])
    leftRadio.labels[0].textContent = t.left_handed;

  const rightRadio = document.getElementById("right-radio");
  if (rightRadio && rightRadio.labels[0])
    rightRadio.labels[0].textContent = t.right_handed;

  // Update participation label
  const participationLabel = document.getElementById("participation-label");
  if (participationLabel)
    participationLabel.textContent = t.participation_label;

  // Update checkbox labels
  const checkboxHungarian = document.getElementById("checkbox-hungarian");
  if (checkboxHungarian) checkboxHungarian.textContent = t.checkbox_hungarian;

  const checkboxKorean = document.getElementById("checkbox-korean");
  if (checkboxKorean) checkboxKorean.textContent = t.checkbox_korean;

  const checkboxWheel = document.getElementById("checkbox-wheel");
  if (checkboxWheel) checkboxWheel.textContent = t.checkbox_wheel;

  const checkboxBeginner = document.getElementById("checkbox-beginner");
  if (checkboxBeginner) checkboxBeginner.textContent = t.checkbox_beginner;

  const checkboxChildren = document.getElementById("checkbox-children");
  if (checkboxChildren) checkboxChildren.textContent = t.checkbox_children;

  // Update qualification label
  const qualificationLabel = document.getElementById("qualification-label");
  if (qualificationLabel)
    qualificationLabel.textContent = t.qualification_label;

  // Update yes/no radio labels
  const yesRadio = document.getElementById("yes-radio");
  if (yesRadio && yesRadio.labels[0])
    yesRadio.labels[0].textContent = t.yes_radio;

  const noRadio = document.getElementById("no-radio");
  if (noRadio && noRadio.labels[0]) noRadio.labels[0].textContent = t.no_radio;

  // Update arrival label
  const arrivalLabel = document.getElementById("arrival-label");
  if (arrivalLabel) arrivalLabel.textContent = t.arrival_label;

  // Update horses label
  const horsesLabel = document.getElementById("horses-label");
  if (horsesLabel) horsesLabel.textContent = t.horses_label;

  // Update horse number radio labels
  const horseOne = document.getElementById("horse-one");
  if (horseOne && horseOne.labels[0])
    horseOne.labels[0].textContent = t.horse_one;

  const horseTwo = document.getElementById("horse-two");
  if (horseTwo && horseTwo.labels[0])
    horseTwo.labels[0].textContent = t.horse_two;

  const horseNone = document.getElementById("horse-none");
  if (horseNone && horseNone.labels[0])
    horseNone.labels[0].textContent = t.horse_none;

  // Update horse name placeholder
  const horseNameInput = document.getElementById("horse-name-input");
  if (horseNameInput) horseNameInput.placeholder = t.horse_name_placeholder;

  // Update horse-related placeholders
  const horseOwner = document.querySelector('input[name="Pferdebesitzer"]');
  if (horseOwner) {
    horseOwner.placeholder =
      lang === "en"
        ? "Horse Owner"
        : lang === "fr"
          ? "Propriétaire du cheval"
          : "Pferdebesitzer";
  }

  const lifeNumber = document.querySelector('input[name="Lebensnummer"]');
  if (lifeNumber) {
    lifeNumber.placeholder =
      lang === "en"
        ? "Life Number (Equine Passport)"
        : lang === "fr"
          ? "Numéro de vie (Passeport équin)"
          : "Lebensnummer (Equidenpass)";
  }
  // Update horse gender label
  const horseGenderLabel = document.getElementById("horse-gender-label");
  if (horseGenderLabel) horseGenderLabel.textContent = t.horse_gender_label;

  // Update horse gender radio labels
  const mareRadio = document.getElementById("mare-radio");
  if (mareRadio && mareRadio.labels[0])
    mareRadio.labels[0].textContent = t.mare;

  const geldingRadio = document.getElementById("gelding-radio");
  if (geldingRadio && geldingRadio.labels[0])
    geldingRadio.labels[0].textContent = t.gelding;

  const stallionRadio = document.getElementById("stallion-radio");
  if (stallionRadio && stallionRadio.labels[0])
    stallionRadio.labels[0].textContent = t.stallion;

  // Update horse birthdate label
  const horseBirthdateLabel = document.getElementById("horse-birthdate-label");
  if (horseBirthdateLabel)
    horseBirthdateLabel.textContent = t.horse_birthdate_label;

  // Update terms label
  const termsLabel = document.getElementById("terms-label");
  if (termsLabel) termsLabel.textContent = t.terms_label;

  // Update terms checkbox label
  const checkboxRules = document.getElementById("checkbox-rules");
  if (checkboxRules) checkboxRules.textContent = t.checkbox_rules;

  // Update nophotos checkbox label
  const checkboxNophotos = document.getElementById("checkbox-nophotos");
  if (checkboxNophotos) checkboxNophotos.textContent = t.checkbox_nophotos;

  // Update add participant button
  const addParticipantBtnElement = document.getElementById("addparticipant");
  if (addParticipantBtnElement)
    addParticipantBtnElement.innerHTML = `<i class="fas fa-plus"></i> ${t.add_participant_btn}`;

  // Update rules link text
  const rulesLink = document.getElementById("rules-link-text");
  if (rulesLink) rulesLink.textContent = t.read_rules_link;

  // Update cancel button
  const cancelButton = document.getElementById("cancel-btn");
  if (cancelButton) cancelButton.textContent = t.cancel_btn;

  // Update submit button
  const submitButton = document.getElementById("submit-btn");
  if (submitButton) submitButton.textContent = t.register_btn;
}

// ==================== RULES POPUP HANDLER ====================
function handleRulesClick(e) {
  e.preventDefault();

  // Open regelspagina in nieuw venster
  window.open(
    this.href,
    "_blank",
    "width=900,height=700,scrollbars=yes,resizable=yes",
  );

  // Maakt checkbox beschikbaar na korte delay
  setTimeout(() => {
    const rulesCheckbox = document.getElementById("regeln");
    if (rulesCheckbox) {
      rulesCheckbox.disabled = false;
    }
  }, 100);
}
