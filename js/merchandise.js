document.addEventListener('DOMContentLoaded', function () {
    // Initialize the order items array
    let orderItems = [];
    let lastOrderNumber = parseInt(localStorage.getItem('lastOrderNumber') || '999');

    // Make removeItem function available globally
    window.removeItem = function(index) {
        orderItems.splice(index, 1);
        updateOrderList();
    };

    // Generate a unique order number
    function generateOrderNumber() {
        lastOrderNumber++;
        localStorage.setItem('lastOrderNumber', lastOrderNumber.toString());
        return `ORDER-${lastOrderNumber}`;
    }

    // Format order details for email
    function formatOrderForEmail() {
        return orderItems.map((item, index) => {
            return `Produkt ${index + 1}: ${item.product} ${item.size ? `- Größe: ${item.size}` : ''} - ${item.quantity}x`;
        }).join('\n');
    }

    // Reset the form fields
    function resetForm() {
        document.getElementById('size').value = '';
        document.getElementById('quantity').value = '1';
        document.getElementById('size-group').style.display = 'none';
        // Do not reset the product field to preserve the selected product
        updateOrderList();
    }

    // Update the order list display
    function updateOrderList() {
        const orderList = document.getElementById('order-list');
        if (!orderList) return;
        
        orderList.innerHTML = orderItems.map((item, index) => `
            <div class="order-item">
                Produkt ${index + 1}: ${item.product} 
                ${item.size ? `- Größe: ${item.size}` : ''}
                - ${item.quantity}x
                <button type="button" onclick="removeItem(${index})" class="btn-remove">
                    🗑️
                </button>
            </div>
        `).join('');
        
        // Update the hidden input for form submission
        const orderDetailsInput = document.querySelector('input[name="order_details"]');
        if (orderDetailsInput) {
            orderDetailsInput.value = formatOrderForEmail();
        }
    }

    // Add an item to the order list
    const addItemBtn = document.getElementById('add-item');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', function () {
            const product = document.getElementById('product').value;
            const size = document.getElementById('size').value;
            const quantity = parseInt(document.getElementById('quantity').value);
            
            if (!product) {
                alert('Bitte wählen Sie ein Produkt aus.');
                return;
            }
            
            // For products that require sizes, validate size selection
            const requiresSize = ['grey-shirt', 'turquoise-shirt', 'black-shirt', 'hoodie', 'gilet-m', 'gilet-w'].includes(product);
            if (requiresSize && !size) {
                alert('Bitte wählen Sie eine Größe aus.');
                return;
            }
            
            // Get the product display name from the select option
            const productSelect = document.getElementById('product');
            const selectedOption = productSelect.options[productSelect.selectedIndex];
            const productDisplayName = selectedOption.textContent;
            
            orderItems.push({ 
                product: productDisplayName, 
                size, 
                quantity 
            });
            
            updateOrderList();
            resetForm();
        });
    }

   // Replace the form submission part of your merchandise.js file with this updated code
const form = document.querySelector('form.order-form');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        if (orderItems.length === 0) {
            alert('Bitte fügen Sie mindestens einen Artikel zur Bestellung hinzu.');
            return;
        }
        
        const customerEmail = document.getElementById('email').value;
        if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
            alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
            return;
        }
        
        // Create form data object
        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Add order details
        const orderNumber = generateOrderNumber();
        formObject.order_number = orderNumber;
        formObject.order_details = formatOrderForEmail();
        
        // Update button state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Senden...';
        
        console.log("Sending form data:", formObject); // Debug log
        
        // Send the form data
        fetch('https://formsubmit.co/ajax/e1ac178ac36d6dc694765e53c76b9a45', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formObject)
        })
        .then(response => {
            console.log("Response status:", response.status); // Debug log
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Success data:", data); // Debug log
            alert(`Vielen Dank für Ihre Bestellung!\nIhre Bestellnummer lautet: ${orderNumber}`);
            orderItems = []; // Clear all items after successful submission
            updateOrderList();
            form.reset();
        })
        .catch(error => {
            console.error("Error submitting order:", error);
            alert("Es gab ein Problem beim Senden der Bestellung. Bitte versuchen Sie es erneut.");
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
    });
}


    // Show or hide the size dropdown based on the selected product
    const productSelect = document.getElementById('product');
    if (productSelect) {
        productSelect.addEventListener('change', function () {
            const sizeGroup = document.getElementById('size-group');
            const selectedProduct = this.value;
            
            if (['grey-shirt', 'turquoise-shirt', 'black-shirt', 'hoodie', 'gilet-m', 'gilet-w'].includes(selectedProduct)) {
                sizeGroup.style.display = 'block';
                document.getElementById('size').required = true;
            } else {
                sizeGroup.style.display = 'none';
                document.getElementById('size').required = false;
                document.getElementById('size').value = '';
            }
        });
    }

    // Show the "other country" field if "other" is selected in the country dropdown
    const countrySelect = document.getElementById('country');
    const otherCountryField = document.getElementById('other_country_field');
    const otherCountryInput = document.getElementById('other_country');
    
    if (countrySelect) {
        countrySelect.addEventListener('change', function () {
            if (this.value === 'other') {
                otherCountryField.style.display = 'block';
                otherCountryInput.required = true;
            } else {
                otherCountryField.style.display = 'none';
                otherCountryInput.required = false;
                otherCountryInput.value = '';
            }
        });
    }
});// Add this to the end of your merchandise.js file
document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('.submit-btn');
    if (submitButton) {
        console.log("Submit button found");
        submitButton.addEventListener('click', function(e) {
            console.log("Submit button clicked");
            // The form's submit event should handle the rest
        });
    } else {
        console.error("Submit button not found");
    }
});

