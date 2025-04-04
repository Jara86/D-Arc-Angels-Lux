// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm'); // Replace with your form's ID

    if (contactForm) {
        console.log("Contact form found and ready.");

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission
            console.log("Form submission prevented. Collecting form data...");

            // Collect form data
            const formData = new FormData(contactForm);
            const formObject = {};

            // Convert FormData to a plain object
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            console.log("Form data collected:", formObject);

            // Make the AJAX request
            $.ajax({
                url: "https://formsubmit.co/ajax/e1ac178ac36d6dc694765e53c76b9a45",
                method: "POST",
                data: formObject,
                dataType: "json",
                success: function (response) {
                    console.log("Form submitted successfully with jQuery:", response);

                    // Show success message
                    alert("Vielen Dank für dein Interesse! / Thank you for your Interest!");

                    // Optionally reset the form
                    contactForm.reset();
                },
                error: function (error) {
                    console.error("Error submitting form with jQuery:", error);

                    // Show error message
                    alert("Es gab ein Problem beim Senden des Formulars. Bitte versuche es erneut. / There was an issue submitting the form. Please try again.");
                }
            });
        });
    } else {
        console.error("Contact form not found. Check the form's ID.");
    }
});