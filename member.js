let allMembers = [];

// Add this function to store additional members
function addMember(isJunior) {
    const memberData = {
        type: isJunior ? 'Junior' : 'Adult',
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        // Add other fields as needed
    };
    allMembers.push(memberData);
    updateMembersList();
}

// Update form submission to include all members
document.querySelector('.order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        mainMember: {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            member: document.getElementById('member').value,
        },
        additionalMembers: allMembers,
        orderItems: orderItems
    };

    fetch('https://formsubmit.co/jarouschka@gmail.com', {
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
        allMembers = [];
        updateOrderList();
        this.reset();
    })
    .catch(error => {
        alert('Error sending form: ' + error.message);
    });
});