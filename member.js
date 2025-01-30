// Member addition functions
function addMember(isJunior) {
    const memberCount = document.querySelectorAll('.member-section').length + 1;
    const memberType = isJunior ? 'Jugendmitglied' : 'Erwachsenes Mitglied';
    const sectionClass = isJunior ? 'member-section junior' : 'member-section';
    
    const newMember = `
        <div class="${sectionClass}">
            <h3>${memberType} ${memberCount}</h3>
            <div class="form-group">
                <input type="text" name="member${memberCount}_name" placeholder="Vorname" required maxlength="100">
                <input type="text" name="member${memberCount}_lastname" placeholder="Nachname" required maxlength="100">
            </div>
            
            <div class="form-group">
                <input type="date" name="member${memberCount}_dateOfBirth" placeholder="Geburtsdatum" required max="2050-12-31" min="1900-01-01">
            </div>
            
            ${isJunior ? `
                <div class="form-group guardian-info">
                    <input type="text" name="member${memberCount}_guardian" placeholder="Name des Erziehungsberechtigten" required>
                </div>
            ` : ''}
            
            <div class="form-group">
                <input type="email" name="member${memberCount}_email" placeholder="E-Mail-Adresse" required maxlength="250">
                <input type="tel" name="member${memberCount}_phone" placeholder="Handynummer" required maxlength="50">
            </div>
        </div>
    `;
    
    document.getElementById('additional-members').insertAdjacentHTML('beforeend', newMember);
}

// Event Listeners
document.getElementById('addAdultMember').addEventListener('click', () => addMember(false));
document.getElementById('addJuniorMember').addEventListener('click', () => addMember(true));

// Form submission
document.getElementById('membershipForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const memberSections = document.querySelectorAll('.member-section');
    let membersData = [];
    
    memberSections.forEach((section, index) => {
        const isJunior = section.classList.contains('junior');
        const prefix = index === 0 ? '' : `member${index}_`;
        
        // Get elements and safely access their values
        const nameInput = section.querySelector(`[name="${prefix}name"]`);
        const lastnameInput = section.querySelector(`[name="${prefix}lastname"]`);
        const dateInput = section.querySelector(`[name="${prefix}dateOfBirth"]`);
        const emailInput = section.querySelector(`[name="${prefix}email"]`);
        const phoneInput = section.querySelector(`[name="${prefix}phone"]`);
        
        const memberData = {
            type: index === 0 ? 'Hauptmitglied' : (isJunior ? 'Jugendmitglied' : 'Erwachsenes Mitglied'),
            name: nameInput ? nameInput.value : '',
            lastname: lastnameInput ? lastnameInput.value : '',
            dateOfBirth: dateInput ? dateInput.value : '',
            email: emailInput ? emailInput.value : '',
            phone: phoneInput ? phoneInput.value : ''
        };
        
        if (isJunior) {
            const guardianInput = section.querySelector(`[name="${prefix}guardian"]`);
            memberData.guardian = guardianInput ? guardianInput.value : '';
        }
        
        membersData.push(memberData);
    });


    const formData = {
        members: membersData,
        _subject: "New Membership Application",
        _template: "table"
    };

    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    fetch('https://formsubmit.co/https://formsubmit.co/jarouschka@gmail.com ', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        alert('Membership application successfully sent!');
        this.reset();
        document.getElementById('additional-members').innerHTML = '';
    })
    .finally(() => {
        submitButton.textContent = 'Submit Application';
        submitButton.disabled = false;
    });
});