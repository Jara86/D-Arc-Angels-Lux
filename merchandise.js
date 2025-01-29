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