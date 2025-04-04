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
    
    // Form submission
    const form = document.getElementById('kidscamp-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        
        // Here you would typically send the data to your server or email service
        // For now, we'll just log it to the console
        console.log('Form submitted!');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        // Show success message
        alert('Vielen Dank für Ihre Anmeldung! Wir werden uns in Kürze bei Ihnen melden.');
        
        // Reset form
        form.reset();
    });
});
