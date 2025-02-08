membershipForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Create an object to hold all the data
    const formDataObject = {
        _subject: "Neue Mitgliedschaft Anfrage",
        mainMember: {
            name: document.querySelector('[name="name"]').value,
            lastname: document.querySelector('[name="lastname"]').value,
            email: document.querySelector('[name="email"]').value,
            phone: document.querySelector('[name="phone"]').value,
            street: document.querySelector('[name="street"]').value,
            postal_code: document.querySelector('[name="postal_code"]').value,
            city: document.querySelector('[name="city"]').value
        },
        additionalMembers: []
    };

    // Collect additional members
    document.querySelectorAll('.member-card').forEach((memberDiv, index) => {
        formDataObject.additionalMembers.push({
            type: memberDiv.querySelector('h4').innerText.split(' ')[0],
            name: memberDiv.querySelector('[name^="member_name_"]').value,
            lastname: memberDiv.querySelector('[name^="member_lastname_"]').value,
            birthdate: memberDiv.querySelector('[name^="member_birthdate_"]').value,
            email: memberDiv.querySelector('[name^="member_email_"]').value,
            phone: memberDiv.querySelector('[name^="member_phone_"]').value
        });
    });

    fetch('https://formsubmit.co/jarouschka@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formDataObject)
    })
    .then(response => {
        if (response.ok) {
            document.querySelector('.success-message').style.display = 'block';
            additionalMembersContainer.innerHTML = '';
            membershipForm.reset();
            window.scrollTo(0, 0);
        } else {
            throw new Error('Fehler beim Absenden des Formulars');
        }
    })
    .catch(error => {
        console.error('Submission error:', error);
        alert('Bitte versuchen Sie es erneut.');
    });
});