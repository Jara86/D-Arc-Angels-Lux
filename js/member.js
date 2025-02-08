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
        const memberId = Date.now();
        const memberDiv = document.createElement('div');
        memberDiv.className = 'member-card';
        memberDiv.dataset.id = memberId;
        memberDiv.innerHTML = `
            <h4>${isJunior ? 'Junior' : 'Adult'} Mitglied</h4>
            <div class="form-group">
                <input type="text" name="additional_member[${memberId}][name]" placeholder="Vorname" required>
                <input type="text" name="additional_member[${memberId}][lastname]" placeholder="Nachname" required>
                <input type="date" name="additional_member[${memberId}][birthdate]" required>
                <input type="email" name="additional_member[${memberId}][email]" placeholder="E-Mail-Adresse" required>
                <input type="tel" name="additional_member[${memberId}][phone]" placeholder="Handynummer" required>
                <input type="hidden" name="additional_member[${memberId}][type]" value="${isJunior ? 'Junior' : 'Adult'}">
            </div>
            <button type="button" class="remove-member">×</button>
        `;

        memberDiv.querySelector('.remove-member').addEventListener('click', function() {
            memberDiv.remove();
        });

        additionalMembersContainer.appendChild(memberDiv);
    }

    membershipForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Create a new FormData object
        const formData = new FormData(membershipForm);
        
        // Add form submission endpoint
        formData.append('_subject', 'New Membership Application');
        formData.append('_template', 'table');

        // Send the form
        fetch('https://formsubmit.co/ajax/jarouschka@gmail.com', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                membershipForm.reset();
                additionalMembersContainer.innerHTML = '';
                alert('Anmeldung erfolgreich eingereicht!');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
        });
    });
});