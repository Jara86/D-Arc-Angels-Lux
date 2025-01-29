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

    fetch('https://formsubmit.co/your-jarouschka@gmail.com', {
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
        // Remove additional members
        document.getElementById('additional-members').innerHTML = '';
    })
    .catch(error => {
        alert('Error sending form: ' + error.message);
    });
});

