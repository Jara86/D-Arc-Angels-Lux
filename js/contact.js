$.ajax({
    url: "https://formsubmit.co/ajax/e1ac178ac36d6dc694765e53c76b9a45",
    method: "POST",
    data: formObject,
    dataType: "json",
    success: function(response) {
        console.log("Form submitted successfully with jQuery:", response);
        
        // Show success message
        alert("Vielen Dank für dein Interesse! / Thank you for your Interest!");
    }
});