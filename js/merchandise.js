document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const clothingItems = ['grey-shirt', 'turquoise-shirt', 'black-shirt', 'hoodie', 'gilet-m', 'gilet-w'];
    let orderItems = [];
    let lastOrderNumber = parseInt(localStorage.getItem('lastOrderNumber') || '999');

    // Check if we're returning from a successful submission
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
        showSuccessMessage();
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    function showSuccessMessage() {
        const successDiv = document.getElementById('success-message');
        if (successDiv) {
            successDiv.style.display = 'block';
            successDiv.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function showErrorMessage(message = null) {
        const errorDiv = document.getElementById('error-message');
        if (errorDiv) {
            if (message) {
                const errorContent = errorDiv.querySelector('p');
                if (errorContent) {
                    errorContent.textContent = message;
                }
            }
            errorDiv.style.display = 'block';
            errorDiv.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function hideMessages() {
        const successDiv = document.getElementById('success-message');
        const errorDiv = document.getElementById('error-message');
        if (successDiv) successDiv.style.display = 'none';
        if (errorDiv) errorDiv.style.display = 'none';
    }

    // Improved form validation function
    function validateForm() {
        const form = document.querySelector('form');
        const requiredFields = form.querySelectorAll('[required]');
        const missingFields = [];

        // Check all required fields
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                missingFields.push(field.labels[0]?.textContent || field.name || field.id);
            }
        }

        // Check if at least one item is in the order
        if (orderItems.length === 0) {
            alert('Bitte fügen Sie mindestens einen Artikel zur Bestellung hinzu, bevor Sie das Formular absenden.');
            return false;
        }

        // If there are missing required fields, show error
        if (missingFields.length > 0) {
            alert(`Bitte füllen Sie alle erforderlichen Felder aus:\n\n${missingFields.join('\n')}`);
            return false;
        }

        return true;
    }

    // Debug function to help troubleshoot form submission issues
    function debugFormSubmission() {
        console.log("Form submission debugging enabled");
        
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) {
            console.log("Submit button found:", submitBtn);
            
            // Add a click event listener for debugging
            submitBtn.addEventListener('click', function(e) {
                console.log("Submit button clicked");
                const form = document.querySelector('form');
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
            const productSelect = document.getElementById('product');
            const options = Array.from(productSelect.options);
            const productName = options.find(option => option.value === item.product)?.textContent || item.product;
            
            return `Produkt ${index + 1}: ${productName} ${item.size ? `- Größe: ${item.size}` : ''} - ${item.quantity}x`;
        }).join('\n');
    }

    // Reset the form fields after adding an item
    function resetForm() {
        document.getElementById('size').value = '';
        document.getElementById('quantity').value = '1';
        document.getElementById('size-group').style.display = 'none';
        // Do not reset the product field to preserve the selected product
    }

    // Update the order list display
    function updateOrderList() {
        const orderList = document.getElementById('order-list');
        const orderInstructions = document.querySelector('.order-instructions');
        
        if (!orderList) return;
        
        if (orderItems.length === 0) {
            orderList.innerHTML = '<p>Keine Artikel in der Bestellung</p>';
            // Show instructions when no items
            if (orderInstructions) {
                orderInstructions.style.display = 'block';
            }
            return;
        }
        
        // Hide instructions when items are added
        if (orderInstructions) {
            orderInstructions.style.display = 'none';
        }
        
        orderList.innerHTML = orderItems.map((item, index) => {
            const productSelect = document.getElementById('product');
            const options = Array.from(productSelect.options);
            const productName = options.find(option => option.value === item.product)?.textContent || item.product;
            
            return `
                <div class="order-item">
                    Produkt ${index + 1}: ${productName} 
                    ${item.size ? `- Größe: ${item.size}` : ''}
                    - ${item.quantity}x
                    <button type="button" onclick="removeItem(${index})" class="btn-remove">
                        🗑️
                    </button>
                </div>
            `;
        }).join('');
    }

    // Show confirmation message after order submission
    function showConfirmation(orderNumber) {
        alert(`Vielen Dank für Ihre Bestellung!\nIhre Bestellnummer lautet: ${orderNumber}`);
        
        // Reset form and order items
        orderItems = [];
        updateOrderList();
        document.querySelector('form').reset();
    }

    // Set up product change event
    const productSelect = document.getElementById('product');
    if (productSelect) {
        productSelect.addEventListener('change', function() {
            const sizeGroup = document.getElementById('size-group');
            const selectedProduct = this.value;
            
            if (clothingItems.includes(selectedProduct)) {
                sizeGroup.style.display = 'block';
                document.getElementById('size').required = true;
            } else {
                sizeGroup.style.display = 'none';
                document.getElementById('size').required = false;
                document.getElementById('size').value = '';
            }
        });
    }

    // Set up email field to update CC
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('input', function() {
            const ccField = document.querySelector('input[name="_cc"]');
            if (ccField) {
                ccField.value = this.value;
            }
        });
    }

    // Set up country select
    const countrySelect = document.getElementById('country');
    const otherCountryField = document.getElementById('other_country_field');
    const otherCountryInput = document.getElementById('other_country');
    
    if (countrySelect) {
        countrySelect.addEventListener('change', function() {
            if (this.value === 'other') {
                if (otherCountryField) {
                    otherCountryField.style.display = 'block';
                    if (otherCountryInput) {
                        otherCountryInput.required = true;
                    }
                }
            } else {
                if (otherCountryField) {
                    otherCountryField.style.display = 'none';
                    if (otherCountryInput) {
                        otherCountryInput.required = false;
                        otherCountryInput.value = '';
                    }
                }
            }
        });
    }

    // Set up add item button
    const addItemBtn = document.getElementById('add-item');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', function() {
            const product = document.getElementById('product');
            const size = document.getElementById('size');
            const quantity = document.getElementById('quantity');
            
            if (!product.value) {
                alert('Bitte wählen Sie ein Produkt aus');
                return;
            }
            
            if (clothingItems.includes(product.value) && !size.value) {
                alert('Bitte wählen Sie eine Größe für Kleidungsstücke');
                return;
            }
            
            if (!quantity.value || quantity.value < 1) {
                alert('Bitte geben Sie eine gültige Menge ein');
                return;
            }
            
            orderItems.push({
                product: product.value,
                size: clothingItems.includes(product.value) ? size.value : null,
                quantity: quantity.value
            });
            
            updateOrderList();
            resetForm();
        });
    }

    // Simplified form submission
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            console.log("Form submission started");
            
            // TEMPORARILY DISABLE VALIDATION FOR TESTING
            // if (!validateForm()) {
            //     e.preventDefault();
            //     return false;
            // }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Senden...';
            
            console.log("Form is submitting to:", this.action);
            
            // Let the form submit naturally - don't prevent default
            // FormSubmit.co will handle the submission
            
            // Reset button after a delay (in case of errors)
            setTimeout(function() {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 5000);
        });
    }

    // Initialize the order list
    updateOrderList();
});
