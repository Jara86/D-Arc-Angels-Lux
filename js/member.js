
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

    // Generate a unique member number in format DAL-YYYY-XXX
    const generateMemberNumber = () => {
        // Get current year for the member number
        const now = new Date();
        const year = now.getFullYear(); // Full 4-digit year

        // Generate a 3-digit number with leading zeros
        const randomPart = Math.floor(1 + Math.random() * 999).toString().padStart(3, '0');

        // Combine parts to create member number: DAL-YYYY-XXX
        return `DAL-${year}-${randomPart}`;
    };

    // Update CC field when email changes
    const emailField = document.querySelector('input[name="email"]');
    if (emailField) {
        emailField.addEventListener('input', function () {
            const ccField = document.querySelector('input[name="_cc"]');
            if (ccField) {
                ccField.value = this.value;
            }
        });
    }

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
                <input type="tel" name="Member_${memberCounter}_Handynummer" placeholder="Handynummer"
                    required>
                <div class="membership-type">
                    <h5>Mitgliedschaft auswählen</h5>
                    <div class="checkbox-group membership-options">
                        ${Object.entries(PRICES).map(([type, price]) => `
                            <div class="checkbox-option">
                                <input type="checkbox" id="Member_${memberCounter}_${type.replace(/\s+/g, '_')}"
                                        name="Member_${memberCounter}_MembershipType[]"
                                        value="${type}">
                                <label for="Member_${memberCounter}_${type.replace(/\s+/g, '_')}">
                                    ${type} (${price}€)
                                </label>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <input type="hidden" name="Member_${memberCounter}_Type"
                    value="${isJunior ? 'Junior' : 'Adult'}">
            </div>
            <button type="button" class="remove-member">×</button>
        `;
        memberDiv.querySelector('.remove-member').addEventListener('click', function () {
            memberDiv.remove();
            updateMemberNumbers();
            calculateTotal();
        });

        // Add event listeners to all checkboxes in this member card
        memberDiv.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', calculateTotal);
        });

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
                const fieldName = input.name.split('_').pop().replace('[]', '');
                if (input.type === 'checkbox') {
                    const typeValue = input.value.replace(/\s+/g, '_');
                    input.id = `Member_${newNumber}_${typeValue}`;
                    input.name = `Member_${newNumber}_MembershipType[]`;

                    // Also update the associated label's 'for' attribute
                    const label = input.nextElementSibling;
                    if (label && label.tagName === 'LABEL') {
                        label.setAttribute('for', `Member_${newNumber}_${typeValue}`);
                    }
                } else {
                    input.name = `Member_${newNumber}_${fieldName}`;
                }
            });
        });
        memberCounter = memberCards.length + 2;
    }

    function calculateTotal() {
        let total = 0;

        // Calculate main member's membership costs
        document.querySelectorAll('input[name="membership_type[]"]:checked').forEach(checkbox => {
            total += PRICES[checkbox.value];
        });

        // Calculate additional members' membership costs
        document.querySelectorAll('.member-card input[type="checkbox"]:checked').forEach(checkbox => {
            total += PRICES[checkbox.value];
        });

        const totalElement = document.getElementById('total-amount') ||
            (() => {
                const el = document.createElement('div');
                el.id = 'total-amount';
                el.className = 'total-amount';
                membershipForm.appendChild(el);
                return el;
            })();

        totalElement.textContent = `Gesamtbetrag: ${total}€`;
    }

    // Add event listeners to main member's membership checkboxes
    document.querySelectorAll('input[name="membership_type[]"]').forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });

    // Handle rules checkbox validation
    const rulesCheckbox = document.getElementById('regeln');
    const rulesButton = document.querySelector('.text-link');
    if (rulesCheckbox && rulesButton) {
        // Initially disable the checkbox
        rulesCheckbox.disabled = true;
  
                // Add click event to the rules
            }
        });