let orderItems = [];

// Add item event listener
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

// Form submission handler
document.querySelector('.order-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Create form data
    const formData = new FormData(this);
    
    // Add order items as JSON string
    formData.append('orderItems', JSON.stringify(orderItems));

    // Get form name
    const formName = this.getAttribute('name');

    // Create the data object for Netlify
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Send to Netlify forms
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'form-name': formName,
            ...data
        }).toString()
    })
    .then(response => {
        if (response.ok) {
            alert('Bestellung erfolgreich gesendet!');
            orderItems = [];
            updateOrderList();
            this.reset();
        } else {
            throw new Error('Fehler beim Senden der Bestellung');
        }
    })
    .catch(error => {
        alert('Fehler beim Senden der Bestellung: ' + error.message);
    });
});