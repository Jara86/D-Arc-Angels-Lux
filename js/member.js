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

    // Generate a unique member number starting at 100
    const generateMemberNumber = () => {
        // Get current date components for the member number
        const now = new Date();
        const year = now.getFullYear().toString().substr(2); // Last 2 digits of year
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        
        // Generate a random 3-digit number
        const randomPart = Math.floor(100 + Math.random() * 900);
        
        // Combine parts to create member number: DAL-YY-MM-DD-XXX
        return `DAL-${year}-${month}-${day}-${randomPart}`;
    };

    // Update CC field when email changes
    const emailField = document.querySelector('input[name="email"]');
    if (emailField) {
        emailField.addEventListener('input', function() {
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
                <input type="tel" name="Member_${memberCounter}_Handynummer" placeholder="Handynummer" required>
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
                <input type="hidden" name="Member_${memberCounter}_Type" value="${isJunior ? 'Junior' : 'Adult'}">
            </div>
            <button type="button" class="remove-member">×</button>
        `;

        memberDiv.querySelector('.remove-member').addEventListener('click', function() {
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
                membershipForm.appendChild(el);
                return el;
            })();
        
        totalElement.textContent = `Gesamtbetrag: ${total}€`;
    }

    // Add event listeners to main member's membership checkboxes
    document.querySelectorAll('input[name="membership_type[]"]').forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });

    // Function to clean up form before submission
    function cleanupFormBeforeSubmission() {
        // Remove any unnecessary fields or large data
        const allInputs = membershipForm.querySelectorAll('input');
        allInputs.forEach(input => {
            // Remove any data- attributes that might be adding size
            for (const attr of input.attributes) {
                if (attr.name.startsWith('data-')) {
                    input.removeAttribute(attr.name);
                }
            }
        });
    }

    // Add CC to customer and generate member number - USING FETCH API
    membershipForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clean up form first
        cleanupFormBeforeSubmission();
        
        const formData = new FormData(membershipForm);
        
        // Add the member number
        const memberNumber = generateMemberNumber();
        formData.append('Member_Number', memberNumber);
        
        // Update subject
        formData.set('_subject', `en neie Member 🎯 - ${memberNumber}`);
        
        // Set CC to customer email
        const customerEmail = document.querySelector('input[name="email"]').value;
        formData.set('_cc', customerEmail);
        
        // Calculate total
        calculateTotal();
        
        // Show loading indicator
        const submitButton = membershipForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Wird gesendet...';
        submitButton.disabled = true;
        
        fetch('https://formsubmit.co/jarouschka@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Redirect to thank you page
            window.location.href = 'https://darc-angels-letzebuerg.netlify.app/thankyou.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Es gab ein Problem beim Absenden des Formulars. Bitte versuchen Sie es später erneut.');
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    });
});