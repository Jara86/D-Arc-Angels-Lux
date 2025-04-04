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
        
        // Add click event to the rules button
        rulesButton.addEventListener('click', function(e) {
            // Open the rules in a new window/tab
            window.open('docs/rules.html', '_blank');
            
            // Enable the checkbox
            rulesCheckbox.disabled = false;
            
            // Add a visual indicator that the checkbox is now available
            rulesCheckbox.parentElement.classList.add('rules-viewed');
            
            // Store in localStorage that rules have been viewed
            localStorage.setItem('rulesAgreed', 'true');
        });
        
        // Add a warning if someone tries to check the box without viewing rules
        rulesCheckbox.addEventListener('click', function(e) {
            if (rulesCheckbox.disabled) {
                e.preventDefault();
                alert('Bitte lesen Sie zuerst die Regeln, indem Sie auf den Link klicken. / Please read the rules first by clicking on the link.');
            }
        });
    }

    // Handle form submission with AJAX
    if (membershipForm) {
        membershipForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Show loading indicator immediately
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Generate member number for primary member
            const primaryMemberNumber = generateMemberNumber();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            // Convert FormData to object for AJAX submission
            formData.forEach((value, key) => {
                // Handle checkboxes with same name (arrays)
                if (key.endsWith('[]')) {
                    const baseKey = key.slice(0, -2);
                    if (!formObject[baseKey]) {
                        formObject[baseKey] = [];
                    }
                    formObject[baseKey].push(value);
                } else {
                    formObject[key] = value;
                }
            });
            
            // Update CC field with customer email
            if (formObject.email) {
                formObject._cc = formObject.email;
            }
            
            // Add member number to form data
            formObject.Member_Number = primaryMemberNumber;
            
            // Generate and add member numbers for additional members
            const memberCards = document.querySelectorAll('.member-card');
            memberCards.forEach((card, index) => {
                const memberNum = index + 2; // Member numbers start at 2
                const additionalMemberNumber = generateMemberNumber();
                formObject[`Member_${memberNum}_Number`] = additionalMemberNumber;
            });
            
            // Update subject line with member numbers
            let subjectText = `en neie Member 🎯 - ${primaryMemberNumber}`;
            
            // Add additional member numbers to subject if they exist
            if (memberCards.length > 0) {
                const additionalNumbers = [];
                memberCards.forEach((card, index) => {
                    const memberNum = index + 2;
                    const additionalMemberNumber = formObject[`Member_${memberNum}_Number`];
                    additionalNumbers.push(additionalMemberNumber);
                });
                
                if (additionalNumbers.length > 0) {
                    subjectText += ` + ${additionalNumbers.join(', ')}`;
                }
            }
            
            formObject._subject = subjectText;
            
            // Send data to FormSubmit
            $.ajax({
                url: "https://formsubmit.co/ajax/e1ac178ac36d6dc694765e53c76b9a45",
                method: "POST",
                data: formObject,
                dataType: "json",
                success: function(response) {
                    console.log("Form submitted successfully:", response);
                    
                    // Show success message
                    alert("Vielen Dank für deine Anmeldung! / Thank you for your registration!");
                    
                    // Reset form
                    membershipForm.reset();
                    
                    // Remove additional members
                    additionalMembersContainer.innerHTML = '';
                    
                    // Reset member counter
                    memberCounter = 2;
                    
                    // Reset total amount
                    const totalElement = document.getElementById('total-amount');
                    if (totalElement) {
                        totalElement.textContent = 'Gesamtbetrag: 0€';
                    }
                    
                    // Reset submit button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                },
                error: function(error) {
                    console.error("Error submitting form:", error);
                    
                    // Show error message
                    alert("Es gab ein Problem bei der Anmeldung. Bitte versuche es später noch einmal. / There was a problem with the registration. Please try again later.");
                    
                    // Reset submit button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            });
        });
    }

    // Calculate total on page load
    calculateTotal();
});
