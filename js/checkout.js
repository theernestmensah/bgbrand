// Checkout Page JavaScript
// Populates order summary from cart and handles checkout process

document.addEventListener('DOMContentLoaded', function () {
    console.log('🛒 Checkout page loaded');

    // Load and display cart items
    loadCheckoutOrder();

    // Setup checkout button handler
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
});

// Load cart items into checkout order summary
function loadCheckoutOrder() {
    if (!window.store) {
        console.error('Store not available');
        return;
    }

    const cart = window.store.getCart();
    const orderItemsContainer = document.getElementById('order-items');
    const cartCountEl = document.getElementById('cart-count');
    const orderTotalEl = document.getElementById('order-total');

    console.log('Loading checkout order, cart items:', cart.length);

    if (!orderItemsContainer) {
        console.error('Order items container not found');
        return;
    }

    // Update cart count
    if (cartCountEl) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        cartCountEl.textContent = totalItems;
    }

    // If cart is empty, show message and disable checkout
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = `
            <li class="list-group-item text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <p class="text-muted">Your cart is empty</p>
                <a href="collection.html" class="btn btn-dark rounded-0 mt-2">Shop Now</a>
            </li>
        `;
        if (orderTotalEl) orderTotalEl.textContent = 'GH₵ 0.00';
        if (document.getElementById('checkout-btn')) {
            document.getElementById('checkout-btn').disabled = true;
        }
        return;
    }

    // Render cart items
    orderItemsContainer.innerHTML = cart.map((item, index) => {
        const quantity = item.quantity || 1;
        const itemTotal = item.price * quantity;

        return `
            <li class="list-group-item d-flex justify-content-between lh-sm border-0 py-3">
                <div class="d-flex align-items-start gap-3">
                    <img src="${item.image}" alt="${item.title}"
                         style="width: 60px; height: 60px; object-fit: cover;"
                         class="rounded">
                    <div>
                        <h6 class="my-0">${item.title}</h6>
                        ${item.size ? `<small class="text-muted">Size: <strong>${item.size}</strong></small><br>` : ''}
                        <small class="text-muted">Quantity: ${quantity}</small>
                    </div>
                </div>
                <span class="text-muted fw-bold">GH₵ ${itemTotal.toFixed(2)}</span>
            </li>
        `;
    }).join('');

    // Calculate and display total
    const total = window.store.getCartTotal();
    if (orderTotalEl) {
        orderTotalEl.textContent = `GH₵ ${total.toFixed(2)}`;
    }

    console.log('✅ Checkout order loaded successfully');
}

// Handle checkout process
function handleCheckout() {
    console.log('🚀 Checkout button clicked');

    // Get form data
    const firstName = document.getElementById('first-name')?.value;
    const lastName = document.getElementById('last-name')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    const address = document.getElementById('address')?.value;
    const city = document.getElementById('city')?.value;
    const region = document.getElementById('region')?.value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !address || !city || !region) {
        alert('Please fill in all required fields');
        return;
    }

    // Validate phone number (Ghana format - 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number (e.g., 0240000000)');
        return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Get cart data
    if (!window.store) {
        alert('Cart data not available');
        return;
    }

    const cart = window.store.getCart();
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const total = window.store.getCartTotal();

    // Prepare order data
    const orderData = {
        customer: {
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            region,
            country: 'Ghana'
        },
        items: cart,
        total: total,
        currency: 'GHS',
        paymentMethod: paymentMethod || 'mobile_money',
        timestamp: new Date().toISOString()
    };

    console.log('Order data:', orderData);

    // Initialize Paystack payment
    if (typeof PaystackPop === 'undefined') {
        console.error('Paystack not loaded');
        alert('Payment system not available. Please try again.');
        return;
    }

    // Convert total to pesewas (Paystack requires amount in smallest currency unit)
    const amountInPesewas = Math.round(total * 100);

    const paystackHandler = PaystackPop.setup({
        key: 'pk_live_5d791d2c8781be18c674a6448adf0a5cab385852', // Live Paystack public key
        email: email,
        amount: amountInPesewas,
        currency: 'GHS',
        ref: 'BG-' + Math.floor((Math.random() * 1000000000) + 1),
        channels: paymentMethod === 'mobile_money' ? ['mobile_money'] : ['card'],
        metadata: {
            custom_fields: [
                {
                    display_name: "Customer Name",
                    variable_name: "customer_name",
                    value: `${firstName} ${lastName}`
                },
                {
                    display_name: "Phone Number",
                    variable_name: "phone_number",
                    value: phone
                }
            ]
        },
        callback: function (response) {
            console.log('Payment successful:', response);

            // Format order details for WhatsApp
            const orderMessage = `🛍️ *NEW ORDER - BG BRAND*

📦 *Order Reference:* ${response.reference}
📅 *Date:* ${new Date().toLocaleDateString('en-GB')}

👤 *CUSTOMER DETAILS*
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

📍 *DELIVERY ADDRESS*
${address}
${city}, ${region}
Ghana

🛒 *ORDER ITEMS*
${cart.map(item => `• ${item.title}${item.size ? ` (Size: ${item.size})` : ''} x${item.quantity} = GH₵${(item.price * item.quantity).toFixed(2)}`).join('\n')}

💰 *TOTAL: GH₵ ${total.toFixed(2)}*
💳 Payment Method: ${paymentMethod === 'mobile_money' ? 'Mobile Money' : 'Card'}

✅ *PAYMENT CONFIRMED*`;

            // Send order to WhatsApp
            const whatsappNumber = '233205547117'; // Your business number
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderMessage)}`;

            // Open WhatsApp in new window
            window.open(whatsappURL, '_blank');

            // Clear cart
            window.store.clearCart();

            // Small delay before redirect to allow WhatsApp to open
            setTimeout(() => {
                window.location.href = `order-success.html?ref=${response.reference}`;
            }, 1000);
        },
        onClose: function () {
            console.log('Payment window closed');
            alert('Payment cancelled. Your items are still in your cart.');
        }
    });

    paystackHandler.openIframe();
}

// Make functions globally available
window.loadCheckoutOrder = loadCheckoutOrder;
window.handleCheckout = handleCheckout;
