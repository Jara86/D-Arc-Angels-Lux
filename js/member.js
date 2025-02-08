document.addEventListener('DOMContentLoaded', function () {
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
        const memberId = Date.now();
        const memberDiv = document.createElement('div');
        memberDiv.className = `member-card`;
        memberDiv.dataset.id = memberId;
        memberDiv.innerHTML = `
            <h4>${isJunior ? 'Junior' : 'Adult'} Mitglied</h4>
            <div class="form-group">
                <input type="text" name="member_name_${memberId}" placeholder="Vorname" required>
                <input type="text" name="member_lastname_${memberId}" placeholder="Nachname" required>
                <input type="date" name="member_birthdate_${memberId}" required>
                <input type="email" name="member_email_${memberId}" placeholder="E-Mail-Adresse" required>
                <input type="tel" name="member_phone_${memberId}" placeholder="Handynummer" required>
            </div>
            <button type="button" class="remove-member">×</button>
        `;

        memberDiv.querySelector('.remove-member').addEventListener('click', function () {
            memberDiv.style.opacity = '0';
            memberDiv.style.transform = 'translateX(20px)';
            setTimeout(() => {
                memberDiv.remove();
            }, 300);
        });

        additionalMembersContainer.appendChild(memberDiv);
    }

    membershipForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(membershipForm);

        // Zusätzliche Mitglieder sammeln
        document.querySelectorAll('.member-card').forEach((memberDiv, index) => {
            formData.append(`member_${index}_type`, memberDiv.querySelector('h4').innerText.split(' ')[0]);
            formData.append(`member_${index}_name`, memberDiv.querySelector('[name^="member_name_"]').value);
            formData.append(`member_${index}_lastname`, memberDiv.querySelector('[name^="member_lastname_"]').value);
            formData.append(`member_${index}_birthdate`, memberDiv.querySelector('[name^="member_birthdate_"]').value);
            formData.append(`member_${index}_email`, memberDiv.querySelector('[name^="member_email_"]').value);
            formData.append(`member_${index}_phone`, memberDiv.querySelector('[name^="member_phone_"]').value);
        });

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
