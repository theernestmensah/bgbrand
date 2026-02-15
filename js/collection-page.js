/**
 * Collection Page Product Renderer
 * Standalone script to display Contentful products with Buy Now functionality
 */

(function () {
    'use strict';

    console.log('🎨 Collection page script loaded');

    const grid = document.getElementById('products-grid');
    if (!grid) {
        console.error('❌ Products grid not found!');
        return;
    }

    // Store current product for modal
    let currentProduct = null;

    function renderProducts(products) {
        console.log('🎨 Rendering', products.length, 'products...');

        if (!products || products.length === 0) {
            grid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="text-muted">No products available yet.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = products.map(product => `
            <div class="col-lg-3 col-md-6 product-item" data-category="${product.category}">
                <div class="product-card">
                    <div class="product-image-container">
                        <img src="${product.image}" class="product-image" alt="${product.title}">
                        <div class="product-actions">
                            <button class="btn btn-quick-add" onclick="window.openBuyNowModal('${product.id}')">
                                <i class="fas fa-shopping-bag me-2"></i>Buy Now
                            </button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h5 class="product-title">${product.title}</h5>
                        <p class="product-price">GH₵ ${product.price}.00</p>
                    </div>
                </div>
            </div>
        `).join('');

        console.log('✅ Products rendered successfully!');
    }

    // Open Buy Now Modal
    window.openBuyNowModal = function (productId) {
        const product = window.products.find(p => p.id === productId);
        if (!product) {
            console.error('Product not found:', productId);
            return;
        }

        currentProduct = product;

        // Update modal content
        document.getElementById('modal-product-image').src = product.image;
        document.getElementById('modal-product-title').textContent = product.title;
        document.getElementById('modal-product-price').textContent = `GH₵ ${product.price}.00`;
        document.getElementById('quantity-input').value = 1;
        updateModalTotal();

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('buyNowModal'));
        modal.show();
    };

    // Update quantity
    window.updateQuantity = function (change) {
        const input = document.getElementById('quantity-input');
        let value = parseInt(input.value) || 1;
        value = Math.max(1, value + change);
        input.value = value;
        updateModalTotal();
    };

    // Update total price in modal
    function updateModalTotal() {
        if (!currentProduct) return;
        const quantity = parseInt(document.getElementById('quantity-input').value) || 1;
        const total = currentProduct.price * quantity;
        document.getElementById('modal-total-price').textContent = `GH₵ ${total.toFixed(2)}`;
    }

    // Add to cart with quantity
    window.addToCartWithQuantity = function () {
        if (!currentProduct) return;

        const quantity = parseInt(document.getElementById('quantity-input').value) || 1;
        const selectedSize = document.getElementById('size-select').value;

        // Validate size selection
        if (!selectedSize) {
            alert('Please select a size before adding to cart');
            return;
        }

        if (!window.store) {
            console.error('Store not available');
            return;
        }

        // Get current cart
        const cart = window.store.getCart();

        // Check if same product with same size exists
        const existingItemIndex = cart.findIndex(item =>
            item.id === currentProduct.id && item.size === selectedSize
        );

        if (existingItemIndex > -1) {
            // Item exists with same size, update quantity
            cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + quantity;
        } else {
            // New item or different size, add as new entry
            cart.push({
                id: currentProduct.id,
                title: currentProduct.title,
                price: currentProduct.price,
                image: currentProduct.image,
                quantity: quantity,
                size: selectedSize
            });
        }

        // Save the updated cart
        window.store.cart = cart;
        window.store.saveCart();

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('buyNowModal'));
        if (modal) modal.hide();

        // Show success message with size
        showSuccessMessage(`Added ${quantity} ${currentProduct.title} (Size ${selectedSize}) to your bag!`);

        // Reset size selector for next time
        document.getElementById('size-select').value = '';

        // Update cart UI if available
        if (window.updateCartUI) {
            window.updateCartUI();
        }
    };

    // Show success message
    function showSuccessMessage(message) {
        // Create toast element if it doesn't exist
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'position-fixed top-0 end-0 p-3';
            toastContainer.style.zIndex = '9999';
            document.body.appendChild(toastContainer);
        }

        const toastId = 'toast-' + Date.now();
        const toastHTML = `
            <div id="${toastId}" class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <div><i class="fas fa-check-circle me-2"></i>${message}</div>
                        <button class="btn btn-sm btn-light mt-2 w-100" onclick="document.querySelector('[data-bs-target=\\'#cartSidebar\\']').click(); bootstrap.Toast.getInstance(document.getElementById('${toastId}')).hide();" style="font-size: 0.8rem;">
                            <i class="fas fa-shopping-cart me-1"></i>View Cart & Checkout
                        </button>
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;

        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, { delay: 5000 }); // Increased to 5s
        toast.show();

        // Remove toast element after it's hidden
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }

    // Update Cart UI - Render cart items in sidebar
    window.updateCartUI = function () {
        console.log('🛒 updateCartUI called');

        if (!window.store) {
            console.error('Store not available');
            return;
        }

        const cart = window.store.getCart();
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartEmptyState = document.getElementById('cart-empty-state');
        const cartSubtotal = document.getElementById('cart-subtotal');
        const checkoutBtn = document.getElementById('checkout-btn');

        console.log('Cart items:', cart.length);
        console.log('Checkout button found:', !!checkoutBtn);

        if (!cartItemsContainer) {
            console.error('Cart container not found');
            return;
        }

        // Show/hide empty state
        if (cart.length === 0) {
            if (cartEmptyState) cartEmptyState.style.display = 'block';
            cartItemsContainer.innerHTML = '';
            if (cartSubtotal) cartSubtotal.textContent = 'GH₵ 0.00';
            if (checkoutBtn) {
                checkoutBtn.disabled = true;
                console.log('Checkout button disabled (empty cart)');
            }
            return;
        }

        if (cartEmptyState) cartEmptyState.style.display = 'none';
        if (checkoutBtn) {
            checkoutBtn.disabled = false;
            checkoutBtn.style.display = 'block';
            // Make sure parent is visible too
            if (checkoutBtn.parentElement) {
                checkoutBtn.parentElement.style.display = 'block';
            }
            console.log('Checkout button enabled and visible');
        }

        // Render cart items
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item d-flex gap-3 mb-3 pb-3 border-bottom">
                <img src="${item.image}" alt="${item.title}" class="rounded" style="width: 80px; height: 80px; object-fit: cover;">
                <div class="flex-grow-1">
                    <h6 class="mb-1" style="font-size: 0.9rem;">${item.title}</h6>
                    <p class="text-muted mb-1" style="font-size: 0.85rem;">
                        ${item.size ? `Size: <strong>${item.size}</strong>` : ''}
                    </p>
                    <p class="text-muted mb-2" style="font-size: 0.85rem;">
                        GH₵ ${item.price}.00 × ${item.quantity || 1}
                    </p>
                    <button class="btn btn-sm btn-outline-danger" onclick="window.removeFromCart(${index})" style="font-size: 0.75rem;">
                        <i class="fas fa-trash-alt me-1"></i>Remove
                    </button>
                </div>
                <div class="text-end">
                    <p class="fw-bold mb-0">GH₵ ${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                </div>
            </div>
        `).join('');

        // Update subtotal
        const total = window.store.getCartTotal();
        if (cartSubtotal) {
            cartSubtotal.textContent = `GH₵ ${total.toFixed(2)}`;
        }

        console.log('✅ Cart UI updated successfully');
    };

    // Remove from cart function
    window.removeFromCart = function (index) {
        if (window.store) {
            window.store.removeFromCart(index);
            window.updateCartUI();
        }
    };

    // Listen for quantity input changes
    document.addEventListener('DOMContentLoaded', function () {
        const quantityInput = document.getElementById('quantity-input');
        if (quantityInput) {
            quantityInput.addEventListener('input', updateModalTotal);
        }

        // Initialize cart UI
        if (window.updateCartUI) {
            window.updateCartUI();
        }

        // Setup checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function () {
                // Check if user is logged in (using Clerk)
                if (window.Clerk && window.Clerk.user) {
                    window.location.href = 'checkout.html';
                } else {
                    // Prompt user to sign in
                    if (window.openClerkSignIn) {
                        window.openClerkSignIn();
                    } else {
                        window.location.href = 'auth.html';
                    }
                }
            });
        }
    });

    // Wait for products to be ready
    function checkAndRender() {
        if (window.products && window.products.length > 0) {
            console.log('✅ Found', window.products.length, 'products in window');
            renderProducts(window.products);
        } else {
            console.log('⏳ Waiting for products...');
        }
    }

    // Listen for Contentful ready event
    window.addEventListener('contentful:ready', function (event) {
        console.log('🎉 Contentful ready event received!');
        if (event.detail && event.detail.products) {
            renderProducts(event.detail.products);
        }
    });

    // Listen for products updated event
    window.addEventListener('products:updated', function (event) {
        console.log('🔄 Products updated event received!');
        if (event.detail && event.detail.products) {
            renderProducts(event.detail.products);
        }
    });

    // Check immediately
    checkAndRender();

    // Check after 1 second
    setTimeout(checkAndRender, 1000);

    // Check after 2 seconds
    setTimeout(checkAndRender, 2000);

    // Check after 3 seconds (final attempt)
    setTimeout(checkAndRender, 3000);

})();
