document.addEventListener('DOMContentLoaded', function () {
    const addAdultButton = document.getElementById('addAdultMember');
    const addJuniorButton = document.getElementById('addJuniorMember');
    const membershipForm = document.getElementById('membershipForm');
    const additionalMembersContainer = document.getElementById('additional-members');

    if (addAdultButton && addJuniorButton) {
        addAdultButton.addEventListener('click', () => addMember(false));
        addJuniorButton.addEventListener('click', () => addMember(true));
    }

    function addMember(isJunior) {
        const memberForm = createMemberForm(isJunior);
        additionalMembersContainer.appendChild(memberForm);
    }

    function createMemberForm(isJunior) {
        const memberDiv = document.createElement('div');
        memberDiv.className = `member-section ${isJunior ? 'junior' : 'adult'}`;
        memberDiv.dataset.id = Date.now();
        memberDiv.innerHTML = `
            <h3>${isJunior ? 'Jugendmitglied' : 'Erwachsenes Mitglied'}</h3>
            <button type="button" class="remove-member">×</button>
            <div class="form-group">
                <input type="text" name="additional_name[]" placeholder="Vorname" required>
                <input type="text" name="additional_lastname[]" placeholder="Nachname" required>
                <input type="date" name="additional_birthdate[]" required>
                <input type="email" name="additional_email[]" placeholder="E-Mail-Adresse" required>
                <input type="tel" name="additional_phone[]" placeholder="Handynummer" required>
            </div>
        `;

        memberDiv.querySelector('.remove-member').addEventListener('click', () => {
            memberDiv.style.opacity = '0';
            memberDiv.style.transform = 'translateX(20px)';
            setTimeout(() => memberDiv.remove(), 300);
        });

        return memberDiv;
    }

    membershipForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Hauptmitglied Daten sammeln
        const mainMemberData = {
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            birthdate: document.getElementById('Geburtsdatum').value,
            street: document.getElementById('street').value,
            postal_code: document.getElementById('postal_code').value,
            city: document.getElementById('city').value
        };

        // Zusätzliche Mitglieder sammeln
        const additionalMembersData = Array.from(document.querySelectorAll('.member-section'))
            .filter(section => section.classList.contains('junior') || section.classList.contains('adult'))
            .map(section => ({
                type: section.classList.contains('junior') ? 'Jugendmitglied' : 'Erwachsenes Mitglied',
                name: section.querySelector('[name="additional_name[]"]').value,
                lastname: section.querySelector('[name="additional_lastname[]"]').value,
                birthdate: section.querySelector('[name="additional_birthdate[]"]').value,
                email: section.querySelector('[name="additional_email[]"]').value,
                phone: section.querySelector('[name="additional_phone[]"]').value
            }));

        // Hidden-Input für zusätzliche Mitglieder setzen
        document.getElementById('additional_members_data').value = JSON.stringify(additionalMembersData);

        // Formulardaten vorbereiten und senden
        const formData = new FormData(membershipForm);

        fetch('https://formsubmit.co/jarouschka@gmail.com', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    document.querySelector('.success-message').style.display = 'block';
                    additionalMembersContainer.innerHTML = '';
                    membershipForm.reset();
                    window.scrollTo(0, 0);
                } else {
                    throw new Error('Fehler beim Absenden des Formulars');
                }
            })
            .catch(error => {
                console.error('Submission error:', error);
                alert('Bitte versuchen Sie es erneut.');
            });
    });
});
