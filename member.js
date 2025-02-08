document.addEventListener('DOMContentLoaded', function() {
    const addAdultButton = document.getElementById('addAdultMember');
    const addJuniorButton = document.getElementById('addJuniorMember');
    const membershipForm = document.getElementById('membershipForm');
    const additionalMembersContainer = document.getElementById('additional-members');

    let allMembers = [];

    addAdultButton.addEventListener('click', () => addMember(false));
    addJuniorButton.addEventListener('click', () => addMember(true));

    function addMember(isJunior) {
        const memberForm = createMemberForm(isJunior);
        memberForm.style.opacity = '0';
        additionalMembersContainer.appendChild(memberForm);
        
        requestAnimationFrame(() => {
            memberForm.style.transition = 'opacity 0.3s ease-in';
            memberForm.style.opacity = '1';
        });

        const memberData = {
            type: isJunior ? 'Junior' : 'Adult',
            id: Date.now(),
            name: '',
            lastname: '',
            email: '',
            phone: '',
            birthdate: '',
            street: '',
            postal_code: '',
            city: ''
        };

        allMembers.push(memberData);
    }

    function createMemberForm(isJunior) {
        const memberDiv = document.createElement('div');
        memberDiv.className = `member-section ${isJunior ? 'junior' : 'adult'}`;
        memberDiv.dataset.id = Date.now();
        memberDiv.innerHTML = `
            <div class="member-header">
                <h3>${isJunior ? 'Jugendmitglied' : 'Erwachsenes Mitglied'}</h3>
                <button type="button" class="remove-member" title="Entfernen">×</button>
            </div>
            <div class="form-group">
                <input type="text" name="additional_name[]" placeholder="Vorname" required>
                <input type="text" name="additional_lastname[]" placeholder="Nachname" required>
            </div>
            <div class="form-group">
                <input type="date" name="additional_birthdate[]" required>
            </div>
            <div class="form-group">
                <input type="email" name="additional_email[]" placeholder="E-Mail-Adresse" required>
            </div>
            <div class="form-group">
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
        
        const formData = {
            mainMember: {
                name: document.getElementById('name').value,
                lastname: document.getElementById('lastname').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                birthdate: document.getElementById('birthdate').value,
                street: document.getElementById('street').value,
                postal_code: document.getElementById('postal_code').value,
                city: document.getElementById('city').value
            },
            additionalMembers: allMembers
        };

        fetch('https://formsubmit.co/jarouschka@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector('.success-message').style.display = 'block';
            allMembers = [];
            additionalMembersContainer.innerHTML = '';
            this.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
        });
    });
});