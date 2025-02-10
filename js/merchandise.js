let orderItems = [];

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

document.getElementById('add-item').addEventListener('click', function() {
    const product = document.getElementById('product');
    const size = document.getElementById('size');
    const quantity = document.getElementById('quantity');
    
    if (product.value) {
        const isClothing = clothingItems.includes(product.value);
        if (isClothing && !size.value) {
            alert('Bitte wählen Sie eine Größe für Kleidungsstücke');
            return;
        }
        
        orderItems.push({
            product: product.value,
            size: isClothing ? size.value : null,
            quantity: quantity.value
        });
        
        updateOrderList();
        resetForm();
    }
});

function formatEmailContent(formData) {
    return `
Name: ${formData.get('name')}
Email: ${formData.get('email')}
Member: ${formData.get('member')}
Address: ${formData.get('address')}
Pickup: ${formData.get('pickup')}
Order Details:
${formatOrderForEmail()}
    `.trim();
}

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    // Create and update hidden input for email content
    let orderInput = document.querySelector('input[name="order_details"]');
    if (!orderInput) {
        orderInput = document.createElement('input');
        orderInput.type = 'hidden';
        orderInput.name = 'order_details';
        this.appendChild(orderInput);
    }
    
    orderInput.value = formatEmailContent(formData);
    
    // Submit the form
    this.submit();
});