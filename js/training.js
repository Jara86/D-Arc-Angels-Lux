// Update your button click handlers
document.querySelectorAll('.btn-primary').forEach(button => {
    if (!button.closest('a')) {  // Exclude link buttons
        button.addEventListener('click', function() {
            const trainingCard = this.closest('.training-card');
            const trainingType = trainingCard.querySelector('h3').textContent;
            document.getElementById('training-type').value = trainingType;
            document.getElementById('registration-modal').style.display = 'block';
        });
    }
});

// Close modal
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('registration-modal').style.display = 'none';
});

// Send to WhatsApp function
function sendToWhatsApp(event) {
    event.preventDefault();
    
    const name = document.getElementById('participant-name').value;
    const phone = document.getElementById('participant-phone').value;
    const membership = document.getElementById('membership').value;
    const training = document.getElementById('training-type').value;
    
    const message = `Neue Anmeldung:
Training: ${training}
Name: ${name}
Telefon: ${phone}
Status: ${membership}`;

    // Replace with your WhatsApp number
    const whatsappNumber = '0032479800587';
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
    
    document.getElementById('registration-modal').style.display = 'none';
    document.getElementById('training-registration').reset();
}