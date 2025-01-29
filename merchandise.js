let orderItems = [];

document.querySelector('.order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData();
    
    // Add basic form fields
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('member', document.getElementById('member').value);
    
    // Add each order item as a separate entry
    orderItems.forEach((item, index) => {
        formData.append(`Product ${index + 1}`, `${item.product} - Size: ${item.size} - Quantity: ${item.quantity}`);
    });

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString()
    })
    .then(response => {
        if (response.ok) {
            alert('Order successfully sent!');
            orderItems = [];
            updateOrderList();
            this.reset();
        } else {
            throw new Error('Error sending order');
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
});