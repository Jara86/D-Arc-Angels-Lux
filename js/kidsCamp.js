document.addEventListener('DOMContentLoaded', function() {
    let childCount = 1;
    const maxChildren = 5;
    
    // Add child form section
    document.getElementById('addChild').addEventListener('click', function() {
        childCount++;
        if (childCount <= maxChildren) {
            const childSection = document.createElement('div');
            childSection.className = 'child-section';
            childSection.id = `child-section-${childCount}`;
            
            childSection.innerHTML = `
                <div class="child-header">
                    <h3>Kind ${childCount}</h3>
                    <button type="button" class="remove-child" data-child="${childCount}">
                        <i class="fas fa-times"></i> Entfernen
                    </button>
                </div>
                <div class="form-group">
                    <input type="text" name="Kind${childCount}_Vorname" placeholder="Vorname" maxlength="100">
                    <input type="text" name="Kind${childCount}_Nachname" placeholder="Nachname" maxlength="100">
                </div>
                <div class="form-group">
                    <input type="date" name="Kind${childCount}_Geburtsdatum" max="2024-12-31" min="2010-01-01">
                </div>
                <div class="form-group">
                    <textarea name="Kind${childCount}_Allergien" placeholder="Allergien oder besondere Bedürfnisse" rows="2"></textarea>
                </div>
            `;
            
            document.getElementById('weitere-Kinder').appendChild(childSection);
            
            // Add event listener to the remove button
            childSection.querySelector('.remove-child').addEventListener('click', function() {
                const childId = this.getAttribute('data-child');
                removeChild(childId);
            });
        }
        
        if (childCount >= maxChildren) {
            document.getElementById('addChild').style.display = 'none';
        }
    });
    
    // Function to remove a child section
    function removeChild(childId) {
        const childSection = document.getElementById(`child-section-${childId}`);
        if (childSection) {
            childSection.remove();
            childCount--;
            document.getElementById('addChild').style.display = 'flex';
        }
    }
    
    // Event delegation for remove buttons
    document.getElementById('weitere-Kinder').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-child') || e.target.parentElement.classList.contains('remove-child')) {
            const button = e.target.classList.contains('remove-child') ? e.target : e.target.parentElement;
            const childId = button.getAttribute('data-child');
            removeChild(childId);
        }
    });
    
    // Add visual indicator when rules are viewed
    document.querySelector('.text-link').addEventListener('click', function() {
        document.getElementById('regeln').parentElement.classList.add('rules-viewed');
    });
    
    // Form submission with AJAX
    const form = document.getElementById('kidscamp-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        
        // Disable submit button during submission
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Wird gesendet...';
        
        // Send data using fetch API
        fetch('https://formsubmit.co/ajax/info@darc-angels.com', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            
            // Show success message
            alert('Vielen Dank für Ihre Anmeldung! Wir werden uns in Kürze bei Ihnen melden.');
            
            // Reset form
            form.reset();
            
            // Remove any additional child sections
            const additionalChildren = document.getElementById('weitere-Kinder');
            additionalChildren.innerHTML = '';
            childCount = 1;
            
            // Reset submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            // Show add child button if it was hidden
            document.getElementById('addChild').style.display = 'flex';
        })
        .catch(error => {
            console.error('Error:', error);
            
            // Show error message
            alert('Es gab ein Problem bei der Übermittlung des Formulars. Bitte versuchen Sie es später noch einmal oder kontaktieren Sie uns direkt.');
            
            // Reset submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
    });
    
    // Set the form action for non-JS fallback
    form.setAttribute('action', 'https://formsubmit.co/e1ac178ac36d6dc694765e53c76b9a45');
    
    // Add necessary FormSubmit attributes
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = '_honey';
    honeypot.style.display = 'none';
    form.appendChild(honeypot);
    
    const disableAutocomplete = document.createElement('input');
    disableAutocomplete.type = 'hidden';
    disableAutocomplete.name = '_autoresponse';
    disableAutocomplete.value = 'Vielen Dank für Ihre Anmeldung zum KidsCamp! Wir werden uns in Kürze bei Ihnen melden.';
    form.appendChild(disableAutocomplete);
    
    const nextPage = document.createElement('input');
    nextPage.type = 'hidden';
    nextPage.name = '_next';
    nextPage.value = window.location.href;
    form.appendChild(nextPage);
});
