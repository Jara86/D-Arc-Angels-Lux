// Single form submission event handler
document.getElementById('membershipForm').addEventListener('submit', function(e) {
    const memberSections = document.querySelectorAll('.member-section');
    let formattedData = '';
    
    memberSections.forEach((section, index) => {
        const isJunior = section.classList.contains('junior');
        const prefix = index === 0 ? '' : `member${index}_`;
        
        formattedData += `\n--- ${index === 0 ? 'Hauptmitglied' : (isJunior ? 'Jugendmitglied' : 'Erwachsenes Mitglied')} ---\n`;
        formattedData += `Name: ${section.querySelector(`[name="${prefix}name"]`).value}\n`;
        formattedData += `Nachname: ${section.querySelector(`[name="${prefix}lastname"]`).value}\n`;
        formattedData += `Geburtsdatum: ${section.querySelector(`[name="${prefix}dateOfBirth"]`).value}\n`;
        formattedData += `Email: ${section.querySelector(`[name="${prefix}email"]`).value}\n`;
        formattedData += `Telefon: ${section.querySelector(`[name="${prefix}phone"]`).value}\n`;
        
        if (isJunior) {
            formattedData += `Erziehungsberechtigter: ${section.querySelector(`[name="${prefix}guardian"]`).value}\n`;
        }
    });
    
    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = 'all_members_data';
    hiddenField.value = formattedData;
    this.appendChild(hiddenField);
});

// Function to add new members
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

// Event listeners for adding members
document.getElementById('addAdultMember').addEventListener('click', () => addMember(false));
document.getElementById('addJuniorMember').addEventListener('click', () => addMember(true));