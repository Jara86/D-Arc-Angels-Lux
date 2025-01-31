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

// Add member button event listeners
document.getElementById('addAdultMember').addEventListener('click', () => addMember(false));
document.getElementById('addJuniorMember').addEventListener('click', () => addMember(true));

// Form submission handler
document.getElementById('membershipForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const memberSections = document.querySelectorAll('.member-section');
    let membersData = [];
    
    memberSections.forEach((section, index) => {
        const isJunior = section.classList.contains('junior');
        const prefix = index === 0 ? '' : `member${index}_`;
        
        const memberData = {
            type: index === 0 ? 'Hauptmitglied' : (isJunior ? 'Jugendmitglied' : 'Erwachsenes Mitglied'),
            name: section.querySelector(`[name="${prefix}name"]`).value,
            lastname: section.querySelector(`[name="${prefix}lastname"]`).value,
            dateOfBirth: section.querySelector(`[name="${prefix}dateOfBirth"]`).value,
            email: section.querySelector(`[name="${prefix}email"]`).value,
            phone: section.querySelector(`[name="${prefix}phone"]`).value
        };
        
        if (isJunior) {
            memberData.guardian = section.querySelector(`[name="${prefix}guardian"]`).value;
        }
        
        membersData.push(memberData);
    });

    fetch('https://formsubmit.co/jarouschka@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            members: membersData,
            _subject: 'New Membership Application',
            _template: 'table'
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Membership application successfully sent!');
        this.reset();
        document.getElementById('additional-members').innerHTML = '';
    })
    .catch(error => {
        alert('Error sending form: ' + error.message);
    });
});