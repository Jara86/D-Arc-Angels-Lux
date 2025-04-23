// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        console.log("Contact form found and ready.");

        // Debugging function to troubleshoot form submission
        function debugFormSubmission() {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                console.log("Submit button found:", submitBtn);
                submitBtn.addEventListener('click', function () {
                    console.log("Submit button clicked");
                    console.log("Form validity:", contactForm.checkValidity());
                });
            } else {
                console.error("Submit button not found!");
            }
        }

        // Call debug function
        debugFormSubmission();

        // Handle form submission
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission

            console.log("Form submission started");

            // Show loading indicator
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Collect form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Add a dynamic subject line
            formObject._subject = `Contact Request from ${formObject.name || 'Unknown User'}`;

            console.log("Preparing to send form data:", formObject);

            // Try using fetch API first
            try {
                fetch('https://formsubmit.co/ajax/darcangelsletzebuerg@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formObject)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Form submitted successfully:", data);

                    // Show success message
                    alert("Vielen Dank für deine Nachricht! / Thank you for your message!");

                    // Reset form
                    contactForm.reset();

                    // Reset submit button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                })
                .catch(error => {
                    console.error("Error with fetch API:", error);

                    // Fall back to jQuery if fetch fails
                    fallbackToJQuery();
                });
            } catch (error) {
                console.error("Error with fetch attempt:", error);

                // Fall back to jQuery
                fallbackToJQuery();
            }

            // Fallback to jQuery AJAX if fetch fails
            function fallbackToJQuery() {
                console.log("Falling back to jQuery AJAX");

                if (typeof $ === 'undefined') {
                    console.error("jQuery not available, trying direct submission");
                    submitFormDirectly();
                    return;
                }

                $.ajax({
                    url: "https://formsubmit.co/ajax/e1ac178ac36d6dc694765e53c76b9a45",
                    method: "POST",
                    data: formObject,
                    dataType: "json",
                    success: function (response) {
                        console.log("Form submitted successfully with jQuery:", response);

                        // Show success message
                        alert("Vielen Dank für deine Nachricht! / Thank you for your message!");

                        // Reset form
                        contactForm.reset();

                        // Reset submit button
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    },
                    error: function (error) {
                        console.error("Error submitting form with jQuery:", error);

                        // Try direct form submission as last resort
                        console.log("Trying direct form submission as last resort");
                        submitFormDirectly();

                        // Reset submit button after a delay
                        setTimeout(function () {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalBtnText;
                        }, 3000);
                    }
                });
            }

            // Fallback to direct form submission
            function submitFormDirectly() {
                console.log("Attempting direct form submission");
                contactForm.action = "https://formsubmit.co/e1ac178ac36d6dc694765e53c76b9a45";
                contactForm.method = "POST";
                contactForm.submit();
            }
        });
    } else {
        console.error("Contact form not found. Check the form's ID.");
    }
});