document.addEventListener('DOMContentLoaded', function() {
    const addAdultButton = document.getElementById('addAdultMember');
    const addJuniorButton = document.getElementById('addJuniorMember');
    const membershipForm = document.getElementById('membershipForm');
    const additionalMembersContainer = document.getElementById('additional-members');
    let allMembers = [];

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

        const removeButton = memberDiv.querySelector('.remove-member');
        removeButton.addEventListener('click', () => {
            memberDiv.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            memberDiv.style.opacity = '0';
            memberDiv.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                memberDiv.remove();
                allMembers = allMembers.filter(member => member.id !== parseInt(memberDiv.dataset.id));
            }, 300);
        });

        return memberDiv;
    }

    membershipForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const mainMemberData = {
            name: this.querySelector('[name="name"]').value,
            lastname: this.querySelector('[name="lastname"]').value,
            email: this.querySelector('[name="email"]').value,
            phone: this.querySelector('[name="phone"]').value,
            birthdate: this.querySelector('[name="birthdate"]').value,
            street: this.querySelector('[name="street"]').value,
            postal_code: this.querySelector('[name="postal_code"]').value,
            city: this.querySelector('[name="city"]').value
        };

        const additionalMembersData = Array.from(document.querySelectorAll('.member-section')).map(section => ({
            type: section.classList.contains('junior') ? 'Junior' : 'Adult',
            name: section.querySelector('[name="additional_name[]"]').value,
            lastname: section.querySelector('[name="additional_lastname[]"]').value,
            birthdate: section.querySelector('[name="additional_birthdate[]"]').value,
            email: section.querySelector('[name="additional_email[]"]').value,
            phone: section.querySelector('[name="additional_phone[]"]').value
        }));

        const formData = new FormData();
        formData.append('_subject', 'Neue Mitgliedschaft - D\'Arc Angels');
        formData.append('mainMember', JSON.stringify(mainMemberData));
        formData.append('additionalMembers', JSON.stringify(additionalMembersData));

        fetch('https://formsubmit.co/jarouschka@gmail.com', {
            method: 'POST',
            body: formData
        })
        .then(() => {
            document.querySelector('.success-message').style.display = 'block';
            additionalMembersContainer.innerHTML = '';
            membershipForm.reset();
        });
    });
});