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
        
        // Collect main member data
        const mainMemberData = {
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            birthdate: document.getElementById('birthdate').value,
            street: document.getElementById('street').value,
            postal_code: document.getElementById('postal_code').value,
            city: document.getElementById('city').value
        };
    
        // Collect all additional members
        const additionalMembersData = Array.from(document.querySelectorAll('.member-section')).map(section => ({
            type: section.classList.contains('junior') ? 'Jugendmitglied' : 'Erwachsenes Mitglied',
            name: section.querySelector('[name="additional_name[]"]').value,
            lastname: section.querySelector('[name="additional_lastname[]"]').value,
            birthdate: section.querySelector('[name="additional_birthdate[]"]').value,
            email: section.querySelector('[name="additional_email[]"]').value,
            phone: section.querySelector('[name="additional_phone[]"]').value
        }));
    
        // Prepare complete form data
        const completeFormData = {
            mainMember: mainMemberData,
            additionalMembers: additionalMembersData
        };
    
        // Send to FormSubmit
        fetch('https://formsubmit.co/ajax/jarouschka@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(completeFormData)
        })
        .then(response => {
            document.querySelector('.success-message').style.display = 'block';
            additionalMembersContainer.innerHTML = '';
            membershipForm.reset();
            window.scrollTo(0, 0);
        })
        .catch(error => {
            console.error('Submission error:', error);
            alert('Bitte versuchen Sie es erneut.');
        });
    });
});