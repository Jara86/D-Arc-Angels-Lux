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
});