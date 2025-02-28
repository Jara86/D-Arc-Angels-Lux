document.addEventListener('DOMContentLoaded', function () {
    const addAdultButton = document.getElementById('addAdultMember');
    const addJuniorButton = document.getElementById('addJuniorMember');
    const membershipForm = document.getElementById('membershipForm');
    const additionalMembersContainer = document.getElementById('additional-members');
    let memberCounter = 2;

    const PRICES = {
        'Aktive Mitgliedschaft': 40,
        'Mitgliedschaft Isis vum Roude Léiw': 25,
        'Familienmitgliedschaft': 75,
        'FLSE Freizeitlizenz': 25
    };

    if (addAdultButton && addJuniorButton) {
        addAdultButton.addEventListener('click', () => addMember(false));
        addJuniorButton.addEventListener('click', () => addMember(true));
    }

    function addMember(isJunior) {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'member-card';
        memberDiv.dataset.id = memberCounter;
        memberDiv.innerHTML = `
            <h4>${isJunior ? 'Junior' : 'Adult'} Mitglied</h4>
            <div class="form-group">
                <input type="text" name="Member_${memberCounter}_Nachname" placeholder="Nachname" required>
                <input type="text" name="Member_${memberCounter}_Vorname" placeholder="Vorname" required>
                <input type="date" name="Member_${memberCounter}_Geburtsdatum" required>
                <input type="email" name="Member_${memberCounter}_Email" placeholder="E-Mail-Adresse" required>
                <input type="tel" name="Member_${memberCounter}_Handynummer" placeholder="Handynummer" required>
                <div class="membership-type">
                    <select name="Member_${memberCounter}_MembershipType" required>
                        <option value="">Mitgliedschaft auswählen</option>
                        ${Object.entries(PRICES).map(([type, price]) => 
                            `<option value="${type}">${type} (${price}€)</option>`
                        ).join('')}
                    </select>
                </div>
                <input type="hidden" name="Member_${memberCounter}_Type" value="${isJunior ? 'Junior' : 'Adult'}">
            </div>
            <button type="button" class="remove-member">×</button>
        `;

        memberDiv.querySelector('.remove-member').addEventListener('click', function() {
            memberDiv.remove();
            updateMemberNumbers();
            calculateTotal();
        });

        memberDiv.querySelector('select').addEventListener('change', calculateTotal);

        additionalMembersContainer.appendChild(memberDiv);
        memberCounter++;
        calculateTotal();
    }

    function updateMemberNumbers() {
        const memberCards = document.querySelectorAll('.member-card');
        memberCards.forEach((card, index) => {
            const newNumber = index + 2;
            card.dataset.id = newNumber;
            
            const inputs = card.querySelectorAll('input, select');
            inputs.forEach(input => {
                const fieldName = input.name.split('_').pop();
                input.name = `Member_${newNumber}_${fieldName}`;
            });
        });
        memberCounter = memberCards.length + 2;
    }

    function calculateTotal() {
        let total = 0;
        const mainMembershipType = document.querySelector('input[name="membership_type"]:checked');
        if (mainMembershipType) {
            total += PRICES[mainMembershipType.value];
        }

        document.querySelectorAll('.member-card select').forEach(select => {
            if (select.value) {
                total += PRICES[select.value];
            }
        });

        const totalElement = document.getElementById('total-amount') || 
            (() => {
                const el = document.createElement('div');
                el.id = 'total-amount';
                membershipForm.appendChild(el);
                return el;
            })();
        
        totalElement.textContent = `Gesamtbetrag: ${total}€`;
    }

    document.querySelectorAll('input[name="membership_type"]').forEach(radio => {
        radio.addEventListener('change', calculateTotal);
    });

    membershipForm.addEventListener('submit', function(e) {
        calculateTotal();
        return true;
    });
});