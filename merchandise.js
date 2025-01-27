let orderItems = [];

document.getElementById('add-item').addEventListener('click', function() {
    const product = document.getElementById('product');
    const size = document.getElementById('size');
    const quantity = document.getElementById('quantity');
    
    if (product.value) {
        orderItems.push({
            product: product.value,
            size: size.value,
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
            ${item.product} - ${item.size ? `Größe: ${item.size} -` : ''} ${item.quantity}x
            <button onclick="removeItem(${index})" class="btn-remove">Entfernen</button>
        </div>
    `).join('');
}

function removeItem(index) {
    orderItems.splice(index, 1);
    updateOrderList();
}

function resetForm() {
    document.getElementById('product').value = '';
    document.getElementById('size').value = '';
    document.getElementById('quantity').value = '1';
}