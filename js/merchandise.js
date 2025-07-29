document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const clothingItems = ['grey-shirt', 'turquoise-shirt', 'black-shirt', 'hoodie', 'gilet-m', 'gilet-w'];
    let orderItems = [];
    let lastOrderNumber = parseInt(localStorage.getItem('lastOrderNumber') || '999');

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
        if (!orderList) return;
        
        if (orderItems.length === 0) {
            orderList.innerHTML = '<p>Keine Artikel in der Bestellung</p>';
            return;
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
                otherCountryField.style.display = 'block';
                otherCountryInput.required = true;
            } else {
                otherCountryField.style.display = 'none';
                otherCountryInput.required = false;
                otherCountryInput.value = '';
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

    // Fallback submit function for direct form submission
    function submitFormDirectly(form) {
        console.log("Attempting direct form submission");
        
        if (form) {
            form.action = "https://formsubmit.co/darcangelsletzebuerg@gmail.com";
            form.method = "POST";
            form.submit();
        } else {
            console.error("Form not found for direct submission");
        }
    }

    // Set up form submission with fallbacks
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            console.log("Form submission started");
            
            if (orderItems.length === 0) {
                alert('Bitte fügen Sie mindestens einen Artikel zur Bestellung hinzu');
                return;
            }
            
            // Show loading indicator
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Senden...';
            
            // Get customer email for CC
            const customerEmail = document.getElementById('email').value;
            
            // Create or update the CC field
            let ccField = document.querySelector('input[name="_cc"]');
            if (!ccField) {
                ccField = document.createElement('input');
                ccField.type = 'hidden';
                ccField.name = '_cc';
                this.appendChild(ccField);
            }
            ccField.value = customerEmail;
            
            // Also add a replyto field as a backup
            let replyToField = document.querySelector('input[name="_replyto"]');
            if (!replyToField) {
                replyToField = document.createElement('input');
                replyToField.type = 'hidden';
                replyToField.name = '_replyto';
                this.appendChild(replyToField);
            }
            replyToField.value = customerEmail;
            
            // Combine address fields into a formatted address
            const street = document.getElementById('street').value;
            const houseNumber = document.getElementById('house_number').value;
            const zipCode = document.getElementById('zip_code').value;
            const city = document.getElementById('city').value;
            const countrySelect = document.getElementById('country');
            let country = countrySelect.value;
            
            if (country === 'other') {
                country = document.getElementById('other_country').value;
            } else {
                country = countrySelect.options[countrySelect.selectedIndex].text;
            }
            
            const formattedAddress = `${street} ${houseNumber}, ${zipCode} ${city}, ${country}`;
            
            // Create a hidden field for the formatted address
            let addressField = document.querySelector('input[name="formatted_address"]');
            if (!addressField) {
                addressField = document.createElement('input');
                addressField.type = 'hidden';
                addressField.name = 'formatted_address';
                this.appendChild(addressField);
            }
            addressField.value = formattedAddress;
            
            // Generate order number and create order details
            const orderNumber = generateOrderNumber();
            let orderDetails = '';
            
            // Add order number at the top
            orderDetails += `Bestellnummer: ${orderNumber}\n\n`;
            
            // Add order items
            orderDetails += 'Bestellte Artikel:\n';
            orderDetails += formatOrderForEmail();
            
            // Add payment instructions
            orderDetails += '\n\n-----------------------------------\n';
            orderDetails += 'Zahlungsinformationen:\n';
            orderDetails += `Bitte geben Sie bei der Überweisung die Bestellnummer ${orderNumber} an.\n`;
            orderDetails += 'Bankverbindung: IBAN: LU17 1111 7008 0577 0000 Swift: CCPLLULL\n';
            orderDetails += '-----------------------------------\n';
            
            // Add hidden input for order number
            let orderNumberInput = document.querySelector('input[name="order_number"]');
            if (!orderNumberInput) {
                orderNumberInput = document.createElement('input');
                orderNumberInput.type = 'hidden';
                orderNumberInput.name = 'order_number';
                this.appendChild(orderNumberInput);
            }
            orderNumberInput.value = orderNumber;
            
            // Add order details
            let orderInput = document.querySelector('input[name="order_details"]');
            if (!orderInput) {
                orderInput = document.createElement('input');
                orderInput.type = 'hidden';
                orderInput.name = 'order_details';
                this.appendChild(orderInput);
            }
            
            orderInput.value = orderDetails;
            
            // Add subject line
            let subjectInput = document.querySelector('input[name="_subject"]');
            if (!subjectInput) {
                subjectInput = document.createElement('input');
                subjectInput.type = 'hidden';
                subjectInput.name = '_subject';
                this.appendChild(subjectInput);
            }
            subjectInput.value = `Merchandise Bestellung: ${orderNumber}`;
            
            // Store order number for confirmation
            const orderNumForConfirmation = orderNumber;
            
            // Get form data for AJAX submission
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            console.log("Preparing to send form data:", formObject);
            
            // Try using jQuery AJAX first (since it works in your other forms)
            if (typeof $ !== 'undefined') {
                console.log("Using jQuery AJAX for submission");
                
                $.ajax({
                    url: "https://formsubmit.co/ajax/darcangelsletzebuerg@gmail.com",
                    method: "POST",
                    data: formObject,
                    dataType: "json",
                    success: function(response) {
                        console.log("Form submitted successfully with jQuery:", response);
                        
                        // Show success message
                        showConfirmation(orderNumForConfirmation);
                        
                        // Reset button
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    },
                    error: function(error) {
                        console.error("Error submitting form with jQuery:", error);
                        
                        // Try direct form submission as fallback
                        console.log("Falling back to direct form submission");
                        submitFormDirectly(form);
                        
                        // Reset button after a delay
                        setTimeout(function() {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalBtnText;
                        }, 3000);
                    }
                });
            } else {
                // If jQuery is not available, try fetch API
                console.log("jQuery not available, using fetch API");
                
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
                    console.log("Form submitted successfully with fetch:", data);
                    
                    // Show success message
                    showConfirmation(orderNumForConfirmation);
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                })
                .catch(error => {
                    console.error("Error with fetch API:", error);
                    
                    // Try direct form submission as last resort
                    console.log("Falling back to direct form submission");
                    submitFormDirectly(form);
                    
                    // Reset button after a delay
                    setTimeout(function() {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }, 3000);
                });
            }
        });
    }

    // Initialize the order list
    updateOrderList();
});
