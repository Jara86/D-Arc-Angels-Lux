document.addEventListener('DOMContentLoaded', function () {
    // Initialize the order items array
    let orderItems = [];
    let lastOrderNumber = parseInt(localStorage.getItem('lastOrderNumber') || '999');

    // Debug function to help troubleshoot form submission issues
    function debugFormSubmission() {
        console.log("Form submission debugging enabled");
        
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            console.log("Submit button found:", submitBtn);
            
            // Add a click event listener for debugging
            submitBtn.addEventListener('click', function(e) {
                console.log("Submit button clicked");
                const form = document.querySelector('form.order-form');
                if (form) {
                    console.log("Form validity:", form.checkValidity());
                    console.log("Form elements:", form.elements);
                    console.log("Order items:", orderItems);
                }
            });
        } else {
            console.error("Submit button not found!");
        }
    }

    // Call debug function
    debugFormSubmission();

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

    // Fallback submit function for direct form submission
    function submitFormDirectly() {
        console.log("Attempting direct form submission");
        const form = document.querySelector('form.order-form');
        if (form) {
            // Add order details to hidden field before direct submission
            const orderDetailsInput = form.querySelector('input[name="order_details"]');
            if (orderDetailsInput) {
                orderDetailsInput.value = formatOrderForEmail();
            }
            
            // Add order number to hidden field
            const orderNumberInput = document.createElement('input');
            orderNumberInput.type = 'hidden';
            orderNumberInput.name = 'order_number';
            orderNumberInput.value = generateOrderNumber();
            form.appendChild(orderNumberInput);
            
            form.action = "https://formsubmit.co/e1ac178ac36d6dc694765e53c76b9a45";
            form.method = "POST";
            form.submit();
        } else {
            console.error("Form not found for direct submission");
        }
    }

    // Form submission handler with multiple fallbacks
    const form = document.querySelector('form.order-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            console.log("Form submission started");
            
            if (orderItems.length === 0) {
                alert('Bitte fügen Sie mindestens einen Artikel zur Bestellung hinzu.');
                return;
            }
            
            const customerEmail = document.getElementById('email').value;
            if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                return;
            }
            
            // Show loading indicator
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Senden...';
            
            // Get form data
            const formData = new FormData(form);
            const formObject = {};
            
            // Convert FormData to object for submission
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Add order details
            const orderNumber = generateOrderNumber();
            formObject.order_number = orderNumber;
            formObject.order_details = formatOrderForEmail();
            
            // Add CC field with customer email
            if (formObject.email) {
                formObject._cc = formObject.email;
            }
            
            // Add subject line
            formObject._subject = `Merchandise Bestellung: ${orderNumber}`;
            
            console.log("Preparing to send form data:", formObject);
            
            // Try using fetch API first
            try {
                fetch('https://formsubmit.co/ajax/e1ac178ac36d6dc694765e53c76b9a45', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formObject)
                })
                .then(response => {
                    console.log("Response status:", response.status);
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Success data:", data);
                    alert(`Vielen Dank für Ihre Bestellung!\nIhre Bestellnummer lautet: ${orderNumber}`);
                    
                    // Reset form and order items
                    orderItems = [];
                    updateOrderList();
                    form.reset();
                    
                    // Reset button
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
                    success: function(response) {
                        console.log("Form submitted successfully with jQuery:", response);
                        
                        // Show success message
                        alert(`Vielen Dank für Ihre Bestellung!\nIhre Bestellnummer lautet: ${orderNumber}`);
                        
                        // Reset form and order items
                        orderItems = [];
                        updateOrderList();
                        form.reset();
                        
                        // Reset button
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    },
                    error: function(error) {
                        console.error("Error submitting form with jQuery:", error);
                        
                        // Try direct form submission as last resort
                        console.log("Trying direct form submission as last resort");
                        submitFormDirectly();
                        
                        // Reset submit button after a delay
                        setTimeout(function() {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalBtnText;
                        }, 3000);
                    }
                });
            }
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
});
