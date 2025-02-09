document.getElementById('addParticipant').addEventListener('click', function() {
    const participantCount = document.querySelectorAll('.participant-section').length + 1;
    
    const newParticipant = `
        <div class="participant-section">
            <div class="participant-header">
                <h3>Teilnehmer ${participantCount}</h3>
                <button type="button" class="remove-participant" onclick="removeParticipant(this)">
                    <i class="fas fa-times"></i> Entfernen
                </button>
            </div>
            <div class="form-group">
                <input type="text" name="Teilnehmer${participantCount}_Vorname" placeholder="Vorname" required maxlength="100">
                <input type="text" name="Teilnehmer${participantCount}_Nachname" placeholder="Nachname" required maxlength="100">
            </div>
            
            <div class="form-group">
                <input 
                    type="date" 
                    name="Teilnehmer${participantCount}_Geburtsdatum" 
                    placeholder="Geburtsdatum"
                    required
                    max="2050-12-31"
                    min="1900-01-01"
                >
            </div>
            
            <div class="form-group">
                <input type="email" name="Teilnehmer${participantCount}_Email" placeholder="E-Mail-Adresse" required maxlength="250">
            </div>
            
            <div class="form-group">
                <input type="tel" name="Teilnehmer${participantCount}_Telefon" placeholder="Handynummer" required maxlength="50">
            </div>

            <div class="form-group radio-group">
                <p class="radio-label">Teilnahmeart:</p>
                <div class="radio-options">
                    <div class="radio-item">
                        <input type="radio" id="Teilnehmer${participantCount}_Fuss" name="Teilnehmer${participantCount}_Art" value="Fuss" required>
                        <label for="Teilnehmer${participantCount}_Fuss">Ich nehme am Turnier zu Fuß als Bodenschütze ohne Pferd teil (nur möglich, wenn vom Veranstalter angeboten).</label>
                    </div>
                    <div class="radio-item">
                        <input type="radio" id="Teilnehmer${participantCount}_Pferd" name="Teilnehmer${participantCount}_Art" value="Pferd" required>
                        <label for="Teilnehmer${participantCount}_Pferd">Ich habe ein Pferd/Pony, das für das berittene Bogenschießen ausgebildet ist und den landesveterinärrechtlichen Bestimmungen des Turnierlandes entspricht. Den Transport organisiere ich selbst.</label>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('weitere-Teilnehmer').insertAdjacentHTML('beforeend', newParticipant);
});

function removeParticipant(button) {
    button.closest('.participant-section').remove();
}