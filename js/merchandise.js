let orderItems = [];

// Define which products need size selection
const clothingItems = [
    'grey-shirt',
    'turquoise-shirt',
    'black-shirt',
    'hoodie',
    'gilet-m',
    'gilet-w'
];

// Show/hide size selector based on product type
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

// Add item to order
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
            ${getProductName(item.product)} 
            ${item.size ? `- Größe: ${item.size}` : ''} 
            - ${item.quantity}x
            <button type="button" onclick="removeItem(${index})" class="btn-remove">
                <i class="fas fa-times"></i> 
            </button>
        </div>
    `).join('');
}

function getProductName(productCode) {
    const productSelect = document.getElementById('product');
    const option = Array.from(productSelect.options).find(opt => opt.value === productCode);
    return option ? option.text : productCode;
}