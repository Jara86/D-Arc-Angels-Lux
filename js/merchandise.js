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
    updateOrderList();}