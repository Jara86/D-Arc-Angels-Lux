document.addEventListener('DOMContentLoaded', function () {
    const addAdultButton = document.getElementById('addAdultMember');
    const addJuniorButton = document.getElementById('addJuniorMember');
    const membershipForm = document.getElementById('membershipForm');
    const additionalMembersContainer = document.getElementById('additional-members');
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
                        <input type="text" placeholder="Vorname" oninput="updateMember(${index}, 'name', this.value)" required>
                        <input type="text" placeholder="Nachname" oninput="updateMember(${index}, 'lastname', this.value)" required>
                        <input type="date" oninput="updateMember(${index}, 'birthdate', this.value)" required>
                        <input type="email" placeholder="E-Mail-Adresse" oninput="updateMember(${index}, 'email', this.value)" required>
                        <input type="tel" placeholder="Handynummer" oninput="updateMember(${index}, 'phone', this.value)" required>
                    </div>
                    <button type="button" class="remove-member" onclick="removeMember(${index})">×</button>
                </div>
            `).join('');
        }
        window.updateMember = function (index, field, value) {
            allMembers[index][field] = value;
        };   window.removeMember = function (index) {
            const memberCard = document.querySelector(`.member-card[data-id="${allMembers[index].id}"]`);
            memberCard.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            memberCard.style.opacity = '0';
            memberCard.style.transform = 'translateX(20px)';
            setTimeout(() => {
                allMembers.splice(index, 1);
                updateMembersList();
            }, 300);
        };
        membershipForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData();
            // Hauptmitgliedsdaten
            formData.append('name', document.getElementById('name').value);
            formData.append('lastname', document.getElementById('lastname').value);
            formData.append('email', document.getElementById('email').value);
            formData.append('phone', document.getElementById('phone').value);
            formData.append('birthdate', document.getElementById('birthdate').value);
            formData.append('street', document.getElementById('street').value);
            formData.append('postal_code', document.getElementById('postal_code').value);
            formData.append('city', document.getElementById('city').value);
            // Zusätzliche Mitglieder
            allMembers.forEach((member, index) => {
                formData.append(`members[${index}][type]`, member.type);
                formData.append(`members[${index}][name]`, member.name);
                formData.append(`members[${index}][lastname]`, member.lastname);
                formData.append(`members[${index}][birthdate]`, member.birthdate);
              
                formData.append(`members[${index}][phone]`, member.phone);
            });
         
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
                alert('Order successfully sent!');
                allMembers = [];
                updateOrderList();
                this.reset();
            })
          
            .catch(error => {
                console.error('Submission error:', error);
                alert('Bitte versuchen Sie es erneut.');
            });
        });
    });
 