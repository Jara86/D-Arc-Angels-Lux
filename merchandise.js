let orderItems = [];

// Product adding functionality
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

// Form submission
document.querySelector('.order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        member: document.getElementById('member').value,
        orderItems: orderItems.map(item => `${item.product} - Size: ${item.size} - Quantity: ${item.quantity}`).join('\n')
    };

    fetch('https://formsubmit.co/jarouschka@hotmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Order successfully sent!');
        orderItems = [];
        updateOrderList();
        this.reset();
    })
    .catch(error => {
        alert('Error sending form: ' + error.message);
    });
});