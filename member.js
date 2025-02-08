let allMembers = [];

function addMember(isJunior) {
    const memberData = {
        type: isJunior ? 'Junior' : 'Adult',
        name: document.getElementById('name').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        birthdate: document.getElementById('birthdate').value,
        street: document.getElementById('street').value,
        postal_code: document.getElementById('postal_code').value,
        city: document.getElementById('city').value
    };
    
    allMembers.push(memberData);
    updateMembersList();
}

function updateMembersList() {
    const membersContainer = document.getElementById('additional-members');
    membersContainer.innerHTML = allMembers.map((member, index) => `
        <div class="member-card">
            <h4>${member.type} Member - ${member.name} ${member.lastname}</h4>
            <button type="button" onclick="removeMember(${index})">Remove</button>
        </div>
    `).join('');
}

function removeMember(index) {
    allMembers.splice(index, 1);
    updateMembersList();
}

document.getElementById('membershipForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        mainMember: {
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            birthdate: document.getElementById('birthdate').value,
            street: document.getElementById('street').value,
            postal_code: document.getElementById('postal_code').value,
            city: document.getElementById('city').value
        },
        additionalMembers: allMembers
    };

    fetch('https://formsubmit.co/jarouschka@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector('.success-message').style.display = 'block';
        allMembers = [];
        updateMembersList();
        this.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    });
});document.addEventListener('DOMContentLoaded', function() {
    // Button click handlers
    document.getElementById('addAdultMember').addEventListener('click', function() {
        createMemberForm(false);
    });

    document.getElementById('addJuniorMember').addEventListener('click', function() {
        createMemberForm(true);
    });

    function createMemberForm(isJunior) {
        const memberContainer = document.getElementById('additional-members');
        const memberDiv = document.createElement('div');
        memberDiv.className = `member-section ${isJunior ? 'junior' : 'adult'}`;
        
        memberDiv.innerHTML = `
            <h3>${isJunior ? 'Jugendmitglied' : 'Erwachsenes Mitglied'}</h3>
            <button type="button" class="remove-member">×</button>
            
            <div class="form-group">
                <input type="text" name="additional_name[]" placeholder="Vorname" required maxlength="100">
                <input type="text" name="additional_lastname[]" placeholder="Nachname" required maxlength="100">
            </div>
            
            <div class="form-group">
                <input type="date" name="additional_birthdate[]" placeholder="Geburtsdatum" required>
            </div>
            
            <div class="form-group">
                <input type="email" name="additional_email[]" placeholder="E-Mail-Adresse" required maxlength="250">
            </div>
            
            <div class="form-group">
                <input type="tel" name="additional_phone[]" placeholder="Handynummer" required maxlength="50">
            </div>
        `;
        
        memberContainer.appendChild(memberDiv);
        
        // Add remove functionality
        memberDiv.querySelector('.remove-member').addEventListener('click', function() {
            memberDiv.remove();
        });
    }
});