document.addEventListener('DOMContentLoaded', function() {
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
    } // Set up email field to update CC
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('input', function() {
            const ccField = document.querySelector('input[name="_cc"]');
            if (ccField) {
                ccField.value = this.value;
            }
        });
    }   // Set up country select
    const countrySelect = document.getElementById('country');
    const otherCountryField = document.getElementById('other_country_field');
    const otherCountryInput = document.getElementById('other_country');   if (countrySelect) {
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
    } // Set up add item button
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
    } // Set up form submission - COMBINED EVENT LISTENER
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (orderItems.length === 0) {
                alert('Bitte fügen Sie mindestens einen Artikel zur Bestellung hinzu');
                return;
            }
            
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
            
            // Store order number for confirmation
            const orderNumForConfirmation = orderNumber;
            
            // Show confirmation after submission
            setTimeout(() => {
                showConfirmation(orderNumForConfirmation);
            }, 100);
            
            this.submit();
        });
    }
});