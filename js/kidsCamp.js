document.getElementById('addChild').addEventListener('click', function() {
    const childCount = document.querySelectorAll('.child-section').length + 1;
    
    const newChild = `
        <div class="child-section">
            <div class="child-header">
                <h3>Kind ${childCount}</h3>
                <button type="button" class="remove-child" onclick="removeChild(this)">
                    <i class="fas fa-times"></i> Entfernen
                </button>
            </div>
            <div class="form-group">
                <input type="text" name="Kind${childCount}_Vorname" placeholder="Vorname" required maxlength="100">
                <input type="text" name="Kind${childCount}_Nachname" placeholder="Nachname" required maxlength="100">
            </div>
            <div class="form-group">
                <input type="date" name="Kind${childCount}_Geburtsdatum" required max="2024-12-31" min="2010-01-01">
            </div>
            <div class="form-group">
                <textarea name="Kind${childCount}_Allergien" placeholder="Allergien oder besondere Bedürfnisse" rows="2"></textarea>
            </div>
        </div>
    `;
    
    document.getElementById('weitere-Kinder').insertAdjacentHTML('beforeend', newChild);
});

function removeChild(button) {
    button.closest('.child-section').remove();
}

function setCCEmail(email) {
    document.querySelector('input[name="_cc"]').value = email;
}

$.ajax({
    url: "https://formsubmit.co/ajax/itdarcangels@gmail.com",
    method: "POST",
    data: formObject,
    dataType: "json",
    success: function(response) {
        console.log("Form submitted successfully:", response);
        // Show success message
        alert("Vielen Dank für deine Anmeldung! / Thank you for your registration!");
        
        // Reset form
        tournamentForm.reset();
        
        // Remove additional participants
        weitereTeilnehmerContainer.innerHTML = '';
        participantCount = 1;
        
        // Hide the form section
        document.getElementById('registration-forms').style.display = 'none';
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    },
    error: function(error) {
        console.error("Error submitting form:", error);
        alert("Es gab ein Problem bei der Anmeldung. Bitte versuche es später noch einmal. / There was a problem with the registration. Please try again later.");
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});
