document.addEventListener('DOMContentLoaded', function () {
    const addAdultButton = document.getElementById('addAdultMember');
    const addJuniorButton = document.getElementById('addJuniorMember');
    const membershipForm = document.getElementById('membershipForm');
    const additionalMembersContainer = document.getElementById('additional-members');
    let memberCounter = 2;

    if (addAdultButton && addJuniorButton) {
        addAdultButton.addEventListener('click', () => addMember(false));
        addJuniorButton.addEventListener('click', () => addMember(true));
    }

    function addMember(isJunior) {
        const memberType = isJunior ? 'Jugendmitglied' : 'Erwachsenenmitglied';
        const memberDiv = document.createElement('div');
        memberDiv.className = 'member-card';
        memberDiv.dataset.id = memberCounter;
        memberDiv.innerHTML = `
            <h4>${memberType} (M${memberCounter})</h4>
            <div class="form-group">
                <input type="text" name="M${memberCounter}_Vorname" placeholder="Vorname" required>
                <input type="text" name="M${memberCounter}_Nachname" placeholder="Nachname" required>
                <input type="date" name="M${memberCounter}_Geburtsdatum" required>
                <input type="email" name="M${memberCounter}_Email" placeholder="E-Mail-Adresse" required>
                <input type="tel" name="M${memberCounter}_Telefon" placeholder="Handynummer" required>
                <input type="hidden" name="M${memberCounter}_Type" value="${memberType}">
            </div>
            <button type="button" class="remove-member">×</button>
        `;

        memberDiv.querySelector('.remove-member').addEventListener('click', function() {
            memberDiv.remove();
            updateMemberNumbers();
        });

        additionalMembersContainer.appendChild(memberDiv);
        memberCounter++;
    }

    function updateMemberNumbers() {
        const memberCards = document.querySelectorAll('.member-card');
        memberCards.forEach((card, index) => {
            const newNumber = index + 1;
            card.dataset.id = newNumber;
            
            const inputs = card.querySelectorAll('input');
            inputs.forEach(input => {
                const fieldName = input.name.split('_').pop();
                input.name = `Member_${newNumber}_${fieldName}`;
            });
        });
        memberCounter = memberCards.length + 1;
    }

    membershipForm.addEventListener('submit', function(e) {
        return true;
    });
});