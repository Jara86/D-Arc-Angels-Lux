document.getElementById('addParticipant').addEventListener('click', function() {
    const participantCount = document.querySelectorAll('.participant-section').length + 1;
    
    const newParticipant = `
        <div class="participant-section">
            <h3>Teilnehmer ${participantCount}</h3>
            <div class="form-group">
                <input type="text" name="participant${participantCount}_name" placeholder="Vorname" required maxlength="100">
                <input type="text" name="participant${participantCount}_lastname" placeholder="Nachname" required maxlength="100">
            </div>
            
            <div class="form-group">
                <input 
                    type="date" 
                    name="participant${participantCount}_dateOfBirth" 
                    placeholder="Geburtsdatum"
                    required
                    max="2050-12-31"
                    min="1900-01-01"
                >
            </div>
            
            <div class="form-group">
                <input type="email" name="participant${participantCount}_email" placeholder="E-Mail-Adresse" required maxlength="250">
            </div>
            
            <div class="form-group">
                <input type="tel" name="participant${participantCount}_phone" placeholder="Handynummer" required maxlength="50">
            </div>
             <div class="form-group radio-group">
                <p class="radio-label">Teilnahmeart:</p>
                <div class="radio-options">
                    <div class="radio-item">
                        <input type="radio" id="participant${participantCount}_foot" name="participant${participantCount}_type" value="foot" required>
                        <label for="participant${participantCount}_foot">"Ich nehme am Turnier zu Fuß als Bodenschütze ohne Pferd teil (nur möglich, wenn vom Veranstalter angeboten)."</label>
                    </div>
                    <div class="radio-item">
                        <input type="radio" id="participant${participantCount}_horse" name="participant${participantCount}_type" value="horse" required>
                        <label for="participant${participantCount}_horse">"Ich habe ein Pferd/Pony, das für das berittene Bogenschießen ausgebildet ist und den landesveterinärrechtlichen Bestimmungen des Turnierlandes entspricht. Den Transport organisiere ich selbst."</label>
        </div>
    `;
    
    document.getElementById('additional-participants').insertAdjacentHTML('beforeend', newParticipant);
});