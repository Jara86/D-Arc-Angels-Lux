document.addEventListener('DOMContentLoaded', function () {
    const addAdultButton = document.getElementById('addAdultMember');
    const addJuniorButton = document.getElementById('addJuniorMember');
    const membershipForm = document.getElementById('membershipForm');
    const additionalMembersContainer = document.getElementById('additional-members');

    let allMembers = [];

    if (addAdultButton && addJuniorButton) {
        addAdultButton.addEventListener('click', () => addMember(false));
        addJuniorButton.addEventListener('click', () => addMember(true));
    }

    function addMember(isJunior) {
        const memberData = {
            id: Date.now(),
            type: isJunior ? 'Junior' : 'Adult',
            name: '',
            lastname: '',
            email: '',
            phone: '',
            birthdate: ''
        };
        allMembers.push(memberData);
        updateMembersList();
    }

    function updateMembersList() {
        additionalMembersContainer.innerHTML = allMembers.map((member, index) => `
            <div class="member-card" data-id="${member.id}">
                <h4>${member.type} Mitglied</h4>
                <div class="form-group">
                    <input type="text" placeholder="Vorname" value="${member.name}" oninput="updateMember(${index}, 'name', this.value)" required>
                    <input type="text" placeholder="Nachname" value="${member.lastname}" oninput="updateMember(${index}, 'lastname', this.value)" required>
                    <input type="date" value="${member.birthdate}" oninput="updateMember(${index}, 'birthdate', this.value)" required>
                    <input type="email" placeholder="E-Mail-Adresse" value="${member.email}" oninput="updateMember(${index}, 'email', this.value)" required>
                    <input type="tel" placeholder="Handynummer" value="${member.phone}" oninput="updateMember(${index}, 'phone', this.value)" required>
                </div>
                <button type="button" class="remove-member" onclick="removeMember(${index})">×</button>
            </div>
        `).join('');
    }

    window.updateMember = function(index, field, value) {
        allMembers[index][field] = value;
    };

    window.removeMember = function(index) {
        const memberCard = document.querySelector(`.member-card[data-id="${allMembers[index].id}"]`);
        memberCard.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
        memberCard.style.opacity = '0';
        memberCard.style.transform = 'translateX(20px)';

        setTimeout(() => {
            allMembers.splice(index, 1);
            updateMembersList();
        }, 300);
    };

    membershipForm.addEventListener('submit', function(e) {
        e.preventDefault();
    
        // Create form data object
        const formData = new FormData();
        
        // Add main member data
        formData.append('_subject', 'Neue Mitgliedschaft');
        formData.append('mainMember_name', document.getElementById('name').value);
        formData.append('mainMember_lastname', document.getElementById('lastname').value);
        formData.append('mainMember_email', document.getElementById('email').value);
        formData.append('mainMember_phone', document.getElementById('phone').value);
        formData.append('mainMember_birthdate', document.getElementById('birthdate').value);
        formData.append('mainMember_street', document.getElementById('street').value);
        formData.append('mainMember_postal_code', document.getElementById('postal_code').value);
        formData.append('mainMember_city', document.getElementById('city').value);
    
        // Add additional members data
        allMembers.forEach((member, index) => {
            formData.append(`additionalMember${index}_type`, member.type);
            formData.append(`additionalMember${index}_name`, member.name);
            formData.append(`additionalMember${index}_lastname`, member.lastname);
            formData.append(`additionalMember${index}_email`, member.email);
            formData.append(`additionalMember${index}_phone`, member.phone);
            formData.append(`additionalMember${index}_birthdate`, member.birthdate);
        });
    
        fetch('https://formsubmit.co/cdf96776353aec10207def6412ff3021', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            document.querySelector('.success-message').style.display = 'block';
            allMembers = [];
            updateMembersList();
            this.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
        });
    });})