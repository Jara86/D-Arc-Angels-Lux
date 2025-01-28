// Update the form submission to include all members
document.getElementById('membershipForm').addEventListener('submit', function(e) {
    // Collect all member sections
    const memberSections = document.querySelectorAll('.member-section');
    const allMembersData = [];
    
    memberSections.forEach((section, index) => {
        const isJunior = section.classList.contains('junior');
        const memberData = {
            type: index === 0 ? 'Hauptmitglied' : (isJunior ? 'Jugendmitglied' : 'Erwachsenes Mitglied'),
            name: section.querySelector('[name$="_name"]').value,
            lastname: section.querySelector('[name$="_lastname"]').value,
            dateOfBirth: section.querySelector('[name$="_dateOfBirth"]').value,
            email: section.querySelector('[name$="_email"]').value,
            phone: section.querySelector('[name$="_phone"]').value
        };
        
        if (isJunior) {
            memberData.guardian = section.querySelector('[name$="_guardian"]').value;
        }
        
        allMembersData.push(memberData);
    });
    
    // Store all members data in hidden field
    document.getElementById('additional_members_data').value = JSON.stringify(allMembersData);
});


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

document.getElementById('addAdultMember').addEventListener('click', () => addMember(false));
document.getElementById('addJuniorMember').addEventListener('click', () => addMember(true));
