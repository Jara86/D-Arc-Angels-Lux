document.addEventListener('DOMContentLoaded', function() {
    // Initialize form elements
    const addAdultButton = document.getElementById('addAdultMember');
    const addJuniorButton = document.getElementById('addJuniorMember');
    const membershipForm = document.getElementById('membershipForm');
    const additionalMembersContainer = document.getElementById('additional-members');

    // Track all members
    let allMembers = [];

    // Add event listeners
    addAdultButton.addEventListener('click', () => addMember(false));
    addJuniorButton.addEventListener('click', () => addMember(true));

    function addMember(isJunior) {
        const memberForm = createMemberForm(isJunior);
        additionalMembersContainer.appendChild(memberForm);
        
        // Add to members array
        allMembers.push({
            type: isJunior ? 'Junior' : 'Adult',
            id: Date.now() // Unique identifier
        });
    }

    function createMemberForm(isJunior) {
        const memberDiv = document.createElement('div');
        memberDiv.className = `member-section ${isJunior ? 'junior' : 'adult'}`;
        memberDiv.innerHTML = `
            <h3>${isJunior ? 'Jugendmitglied' : 'Erwachsenes Mitglied'}</h3>
            <button type="button" class="remove-member">×</button>
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

        // Add remove functionality
        const removeButton = memberDiv.querySelector('.remove-member');
        removeButton.addEventListener('click', () => {
            memberDiv.remove();
            allMembers = allMembers.filter(member => member.id !== memberDiv.dataset.id);
        });

        return memberDiv;
    }
});