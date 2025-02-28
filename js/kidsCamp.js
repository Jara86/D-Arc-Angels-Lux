
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


