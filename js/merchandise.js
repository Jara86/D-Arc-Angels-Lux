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

    // Update hidden input for email submission
    let orderInput = document.querySelector('input[name="order_details"]');
    if (!orderInput) {
        orderInput = document.createElement('input');
        orderInput.type = 'hidden';
        orderInput.name = 'order_details';
        document.querySelector('form').appendChild(orderInput);
    }
    orderInput.value = formatOrderForEmail();
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