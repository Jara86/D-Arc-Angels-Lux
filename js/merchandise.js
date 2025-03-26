let orderItems = [];

function generateOrderNumber() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `ORDER-${timestamp}-${random}`;
}

function formatOrderForEmail() {
    return orderItems.map((item, index) => {
        return `Produkt ${index + 1}: ${getProductName(item.product)} ${item.size ? `- Größe: ${item.size}` : ''} - ${item.quantity}x`;
    }).join('\n');
}

const clothingItems = [
    'grey-shirt',
    'turquoise-shirt',
    'black-shirt',
    'hoodie',
    'gilet-m',
    'gilet-w'
];

document.getElementById('product').addEventListener('change', function() {
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

// Add event listener to email field to update the _cc field
document.getElementById('email').addEventListener('input', function() {
    const ccField = document.querySelector('input[name="_cc"]');
    ccField.value = this.value; // Set the CC field to the customer's email
});

document.getElementById('add-item').addEventListener('click', function() {
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

function showConfirmation(orderNumber) {
    alert(`Vielen Dank für Ihre Bestellung!\nIhre Bestellnummer lautet: ${orderNumber}\nEine Bestätigung wurde an Ihre E-Mail-Adresse gesendet.`);
}

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (orderItems.length === 0) {
        alert('Bitte fügen Sie mindestens einen Artikel zur Bestellung hinzu');
        return;
    }

    const orderNumber = generateOrderNumber();
    const formData = new FormData(this);
    let orderDetails = '';

    // Add order number at the top
    orderDetails += `Bestellnummer: ${orderNumber}\n\n`;

    // Add customer information
    orderDetails += `Name: ${formData.get('name')}\n`;
    orderDetails += `Email: ${formData.get('email')}\n`;
    orderDetails += `Telefon: ${formData.get('Handynummer')}\n`;
    orderDetails += `Adresse: ${formData.get('address')}\n`;
    orderDetails += `Abholung: ${formData.get('pickup')}\n`;
    orderDetails += `Mitgliedschaft: ${formData.get('member')}\n\n`;
    
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

function resetForm() {
    document.getElementById('product').value = '';
    document.getElementById('size').value = '';
    document.getElementById('quantity').value = '1';
    document.getElementById('size-group').style.display = 'none';
}

function updateOrderList() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = orderItems.map((item, index) => `
        <div class="order-item">
            Produkt ${index + 1}: ${getProductName(item.product)} 
            ${item.size ? `- Größe: ${item.size}` : ''} 
            - ${item.quantity}x
            <button type="button" onclick="removeItem(${index})" class="btn-remove">
                🗑️
            </button>
        </div>
    `).join('');
}

function getProductName(productCode) {
    const productSelect = document.getElementById('product');
    const option = Array.from(productSelect.options).find(opt => opt.value === productCode);
    return option ? option.text : productCode;
}

function removeItem(index) {
    orderItems.splice(index, 1);
    updateOrderList();
}