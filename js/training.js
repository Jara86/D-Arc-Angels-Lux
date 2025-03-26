// Update your button click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize event listeners after DOM is fully loaded
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (!button.closest('a')) {  // Exclude link buttons
            button.addEventListener('click', function() {
                const trainingCard = this.closest('.training-card');
                const trainingType = trainingCard.querySelector('h3').textContent;
                document.getElementById('training-type').value = trainingType;
                
                // Set up the date picker to only allow Sundays
                setupDatePicker();
                
                document.getElementById('registration-modal').style.display = 'block';
            });
        }
    });

    // Close modal
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('registration-modal').style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('registration-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Set up date picker to only allow Sundays
function setupDatePicker() {
    // Get the date input element
    const dateInput = document.getElementById('training-date');
    
    // Calculate the next 3 months of Sundays
    const today = new Date();
    const threemonthsLater = new Date();
    threemonthsLater.setMonth(today.getMonth() + 3);
    
    // Generate array of all Sundays in the next 3 months
    const enabledDates = [];
    const current = new Date(today);
    
    // Move to the next Sunday if today is not Sunday
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0) { // 0 is Sunday
        current.setDate(current.getDate() + (7 - dayOfWeek));
    }
    
    // Add all Sundays to the array
    while (current <= threemonthsLater) {
        enabledDates.push(new Date(current));
        current.setDate(current.getDate() + 7);
    }
    
    // Initialize flatpickr
    if (dateInput._flatpickr) {
        dateInput._flatpickr.destroy(); // Destroy previous instance if exists
    }
    
    flatpickr(dateInput, {
        enable: enabledDates,
        dateFormat: "d.m.Y",
        mode: "multiple", // Allow multiple date selection
        locale: {
            firstDayOfWeek: 1, // Monday as first day (European format)
            weekdays: {
                shorthand: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                longhand: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
            },
            months: {
                shorthand: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
                longhand: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
            }
        },
        disableMobile: false, // Set to true if you want to use custom picker on mobile
        onChange: function(selectedDates, dateStr) {
            // You can add custom validation here if needed
        }
    });
    
    // Set default value to the next Sunday
    if (enabledDates.length > 0) {
        const nextSunday = enabledDates[0];
        dateInput._flatpickr.setDate(nextSunday);
    }
}

// Send to WhatsApp function
function sendToWhatsApp(event) {
    event.preventDefault();
    
    const name = document.getElementById('participant-name').value;
    const phone = document.getElementById('participant-phone').value;
    const membership = document.getElementById('membership').value;
    const training = document.getElementById('training-type').value;
    const dates = document.getElementById('training-date').value; // This contains all selected dates
    
    const message = `Neue Anmeldung:
Training: ${training}
Datum: ${dates}
Name: ${name}
Telefon: ${phone}
Status: ${membership}`;

    // Replace with your WhatsApp number
   // Hide WhatsApp number by splitting it
   const countryCode = '00352';
   const part1 = '621';
   const part2 = '788';
   const part3 = '349';
   const whatsappNumber = countryCode + part1 + part2 + part3;
   
   window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
   
   document.getElementById('registration-modal').style.display = 'none';
   document.getElementById('training-registration').reset();
}
    

