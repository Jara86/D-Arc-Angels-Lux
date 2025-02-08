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
                <input type="text" name="Member_${memberId}_Name" placeholder="Vorname" required>
                <input type="text" name="Member_${memberId}_Lastname" placeholder="Nachname" required>
                <input type="date" name="Member_${memberId}_Birthdate" required>
                <input type="email" name="Member_${memberId}_Email" placeholder="E-Mail-Adresse" required>
                <input type="tel" name="Member_${memberId}_Phone" placeholder="Handynummer" required>
                <input type="hidden" name="Member_${memberId}_Type" value="${isJunior ? 'Junior' : 'Adult'}">
            </div>
            <button type="button" class="remove-member">×</button>
        `;

        memberDiv.querySelector('.remove-member').addEventListener('click', function() {
            memberDiv.remove();
        });

        additionalMembersContainer.appendChild(memberDiv);
    }

    // Remove the preventDefault() to allow natural form submission
    membershipForm.addEventListener('submit', function(e) {
        // Form will submit naturally to FormSubmit endpoint
        return true;
    });
});