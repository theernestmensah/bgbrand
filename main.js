// Helper to hide preloader
const hidePreloader = () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.setProperty('opacity', '0', 'important');
        setTimeout(() => {
            preloader.style.setProperty('display', 'none', 'important');
        }, 500);
    }
};

// Accessing globals directly
const products = window.products;
const store = window.store;
const renderProductCard = window.renderProductCard;

// --- CONTENT PROTECTION SCRIPT ---
// Disable right-click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Disable text selection
document.addEventListener('selectstart', (e) => {
    e.preventDefault();
    return false;
});

// Disable image dragging
document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
});

// Disable keyboard shortcuts (F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S)
document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+J (DevTools Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+C (DevTools Element Inspector)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
    // Ctrl+S (Save Page)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
    }
});

// --- GSAP Animations ---
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const initAnimations = () => {
    // Skip if GSAP not loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, skipping animations');
        return;
    }

    // Hero Text Reveal
    const heroTitle = document.querySelector('.hero h1');
    const heroText = document.querySelector('.hero p');
    const heroBtn = document.querySelector('.hero .btn');

    if (heroTitle) {
        const tl = gsap.timeline();
        tl.from(heroTitle, {
            y: 50,
            duration: 1.5,
            ease: "power4.out"
        })
            .from(heroText, {
                y: 30,
                duration: 1.2,
                ease: "power3.out"
            }, "-=1.0")
            .from(heroBtn, {
                y: 20,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");
    }

    // Category Cards Reveal (Staggered)
    const categoryCards = document.querySelectorAll('.category-card');
    if (categoryCards.length > 0) {
        gsap.from(categoryCards, {
            scrollTrigger: {
                trigger: ".row.g-4", // Parent row
                start: "top 80%",
            },
            y: 50,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out"
        });
    }

    // Editorial Section
    const editorialImg = document.querySelector('.bg-gradient-primary-to-pastel img');
    const editorialText = document.querySelector('.bg-gradient-primary-to-pastel .col-md-6:last-child');

    if (editorialImg && editorialText) {
        gsap.from(editorialImg, {
            scrollTrigger: {
                trigger: editorialImg,
                start: "top 80%",
                scrub: 1, // Parallax feel
            },
            y: 30,
            scale: 1,
            duration: 1.5
        });

        gsap.from(editorialText, {
            scrollTrigger: {
                trigger: editorialText,
                start: "top 75%",
            },
            x: 30,
            duration: 1.5,
            ease: "power3.out"
        });
    }
};

// Start everything on load
const handleLoad = () => {
    // Hide preloader (backup for inline scripts)
    hidePreloader();

    // Initialize standard animations
    initAnimations();

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
        // Ensure refresh after layout
        setTimeout(() => AOS.refresh(), 500);
    }
};

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', handleLoad);
} else {
    handleLoad();
}
window.addEventListener('load', hidePreloader);

// Helper for re-triggering animations on dynamic content
const initProductAnimations = (containerSelector) => {
    setTimeout(() => {
        const cards = document.querySelectorAll(`${containerSelector} .product-card`);
        if (cards.length > 0 && typeof gsap !== 'undefined') {
            gsap.fromTo(cards,
                { y: 50, opacity: 1 },
                {
                    scrollTrigger: {
                        trigger: containerSelector,
                        start: "top 85%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    overwrite: "auto"
                }
            );
        }
    }, 100);
};

// Navbar Transition on Scroll
if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
        start: 'top -1',
        end: 99999,
        toggleClass: { className: 'scrolled', targets: '.navbar' }
    });
} else {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 10) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// expose addToCart to window for button clicks
window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
        store.addToCart(product);
        const offcanvasEl = document.getElementById('cartSidebar');
        if (offcanvasEl) {
            const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
            bsOffcanvas.show();
        }
    }
};

// Cart UI Logic
const cartItemsContainer = document.getElementById('cart-items-container');
const cartEmptyState = document.getElementById('cart-empty-state');
const cartSubtotal = document.getElementById('cart-subtotal');

const updateCartUI = (cart) => {
    if (!cartItemsContainer) return;

    // Update badge count
    const totalItems = store.getCartItemCount ? store.getCartItemCount() : cart.length;
    const badge = document.querySelector('bg-header')?.querySelector('#cart-badge');
    if (badge) badge.innerText = totalItems;

    if (cart.length > 0) {
        if (cartEmptyState) cartEmptyState.style.display = 'none';
        cartItemsContainer.innerHTML = '';

        let total = 0;

        cart.forEach((item, index) => {
            const quantity = item.quantity || 1;
            total += item.price * quantity;

            const itemHTML = `
                <div class="cart-item d-flex align-items-center mb-3">
                    <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;" onerror="this.src='./images/placeholder.jpg'">
                    <div class="flex-grow-1">
                        <h6 class="mb-0 font-serif" style="font-size: 0.9rem;">${item.title}</h6>
                        <div class="d-flex justify-content-between align-items-center mt-1">
                            <small class="text-muted">GH₵ ${item.price}.00 x ${quantity}</small>
                            <span class="fw-bold" style="font-size: 0.9rem;">GH₵ ${(item.price * quantity).toFixed(2)}</span>
                        </div>
                    </div>
                    <button class="btn btn-sm text-danger ms-2" onclick="window.removeFromCart(${index})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHTML;
        });

        if (cartSubtotal) cartSubtotal.innerText = '$' + total.toFixed(2);
    } else {
        if (cartEmptyState) cartEmptyState.style.display = 'block';
        cartItemsContainer.innerHTML = '';
        if (cartSubtotal) cartSubtotal.innerText = 'GH₵ 0.00';
    }
};

window.removeFromCart = (index) => {
    store.removeFromCart(index);
};

// Make updateCartUI global so collection page can use it
window.updateCartUI = () => updateCartUI(store.getCart());

if (store) {
    store.subscribe(() => updateCartUI(store.getCart()));
    updateCartUI(store.getCart());
}

// Global: Sidebar Checkout Button Logic
const initSidebarCheckout = () => {
    // Only run if NOT on checkout page (to avoid conflict with actual checkout form)
    if (window.location.pathname.includes('checkout.html')) return;

    const sidebarCheckoutBtn = document.querySelector('#cartSidebar #checkout-btn');
    if (sidebarCheckoutBtn) {
        sidebarCheckoutBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Check cart empty
            const cartCount = store.getCartItemCount ? store.getCartItemCount() : store.getCart().length;
            if (cartCount === 0) {
                alert('Your bag is currently empty.');
                return;
            }

            // Check Auth
            if (window.authStore && window.authStore.isAuthenticated()) {
                // User is logged in -> Go to checkout
                window.location.href = 'checkout.html';
            } else {
                // User is NOT logged in -> Show login
                if (window.openClerkSignIn) {
                    // Redirect to checkout after login
                    const checkoutUrl = new URL('checkout.html', window.location.href).href;
                    window.openClerkSignIn(checkoutUrl);
                } else {
                    alert('Please log in to proceed to checkout.');
                    window.location.href = 'auth.html'; // Fallback
                }
            }
        });
    }
};

// Call sidebar checkout init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebarCheckout);
} else {
    initSidebarCheckout();
}

// Page Specific Logic
const path = window.location.pathname.toLowerCase();

// Home Page: Render Featured Products
if (path.includes('index.html') || path === '/' || path.endsWith('/') || path === '') {
    const container = document.getElementById('featured-products-container');
    if (container && products) {
        const featured = products.slice(0, 4);
        container.innerHTML = featured.map((p, i) => renderProductCard(p)).join('');
        initProductAnimations('#featured-products-container');
    }
}

// Collection Page: Render All Products & Filter (Runs after DOM loaded)
function initCollectionPage() {
    if (!path.includes('collection.html')) return;

    const grid = document.getElementById('products-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    const renderGrid = (filter = 'all') => {
        if (!grid) {
            console.warn('⚠️ Products grid not found');
            return;
        }
        const currentProducts = window.products || [];
        console.log('📦 Current products in window:', currentProducts.length);

        const filtered = filter === 'all'
            ? currentProducts
            : currentProducts.filter(p => p.category === filter);

        if (filtered.length === 0) {
            grid.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">No products available. Please add products in Contentful.</p></div>';
        } else {
            grid.innerHTML = filtered.map((p, i) => renderProductCard(p)).join('');
            initProductAnimations('#products-grid');
        }

        console.log('🎨 Rendered', filtered.length, 'products on grid');
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            renderGrid(filter);
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('filter', filter);
            window.history.pushState({}, '', newUrl);
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const initialFilter = urlParams.get('filter') || 'all';
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === initialFilter) {
            btn.classList.add('active');
        }
    });

    // Initial render
    renderGrid(initialFilter);

    // Listen for product updates from Contentful
    window.addEventListener('products:updated', (event) => {
        console.log('🔄 Products updated, re-rendering grid...');
        renderGrid(initialFilter);
    });

    window.addEventListener('contentful:ready', (event) => {
        console.log('🎉 Contentful ready, re-rendering grid...');
        renderGrid(initialFilter);
    });
}

// Call collection page init after DOM loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCollectionPage);
} else {
    initCollectionPage();
}

// About Page: Scroll Reveals
if (path.includes('about.html')) {
    const revealContainers = document.querySelectorAll('.reveal-img-container');
    revealContainers.forEach(container => {
        const img = container.querySelector('img');
        if (typeof gsap !== 'undefined') {
            gsap.from(container, {
                scrollTrigger: {
                    trigger: container,
                    start: "top 80%",
                },
                y: 50,
                duration: 1.5,
                ease: "power4.out"
            });
            if (img) {
                gsap.from(img, {
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%",
                        scrub: true
                    },
                    scale: 1.1,
                    duration: 2
                });
            }
        }
    });
}

// Authentication is now handled by js/auth-store.js and js/clerk-config.js

// Checkout Page: Paystack Payment Integration
if (path.includes('checkout.html')) {
    const PAYSTACK_PUBLIC_KEY = 'pk_live_5d791d2c8781be18c674a6448adf0a5cab385852';

    // Load and display cart items
    const loadCheckoutCart = () => {
        const cart = store.getCart();
        const orderItemsContainer = document.getElementById('order-items');
        const cartCountEl = document.getElementById('cart-count');
        const orderTotalEl = document.getElementById('order-total');

        if (!orderItemsContainer) return;

        if (cart.length === 0) {
            orderItemsContainer.innerHTML = `
                <li class="list-group-item text-center p-4">
                    <i class="fas fa-shopping-bag fa-2x text-muted mb-3"></i>
                    <p class="text-muted mb-0">Your cart is empty</p>
                    <a href="collection.html" class="btn btn-sm btn-outline-dark rounded-0 mt-3">Continue Shopping</a>
                </li>
            `;
            if (cartCountEl) cartCountEl.textContent = '0';
            if (orderTotalEl) orderTotalEl.textContent = 'GH₵ 0.00';
            return;
        }

        // Render cart items
        let itemsHTML = '';
        cart.forEach((item, index) => {
            const quantity = item.quantity || 1;
            itemsHTML += `
                <li class="list-group-item d-flex justify-content-between lh-sm p-3">
                    <div>
                        <h6 class="my-0">${item.title}</h6>
                        <small class="text-muted">Quantity: ${quantity}</small>
                    </div>
                    <span class="text-muted">GH₵ ${(item.price * quantity).toFixed(2)}</span>
                </li>
            `;
        });

        orderItemsContainer.innerHTML = itemsHTML;

        // Update cart count and total
        const total = store.getCartTotal();
        const itemCount = store.getCartItemCount ? store.getCartItemCount() : cart.length;

        if (cartCountEl) cartCountEl.textContent = itemCount;
        if (orderTotalEl) orderTotalEl.textContent = '$' + total.toFixed(2);
    };

    // Initialize checkout on page load
    loadCheckoutCart();

    // Listen for cart changes
    if (store) {
        store.subscribe(loadCheckoutCart);
    }

    // Handle Paystack Payment
    const checkoutBtn = document.getElementById('checkout-btn');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Get form values (with Clerk pre-fill if available)
            let email = document.getElementById('email')?.value.trim();
            const firstName = document.getElementById('first-name')?.value.trim();
            const lastName = document.getElementById('last-name')?.value.trim();
            const address = document.getElementById('address')?.value.trim();

            // Try to get email from Clerk if not filled
            if (!email && window.authStore && window.authStore.isAuthenticated()) {
                const user = window.authStore.getUser();
                if (user && user.email) {
                    email = user.email;
                    document.getElementById('email').value = email;
                }
            }

            // Validate form
            if (!email || !firstName || !lastName || !address) {
                alert('Please fill in all shipping information fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Get cart total
            const cart = store.getCart();
            if (cart.length === 0) {
                alert('Your cart is empty. Please add items to your cart before checking out.');
                window.location.href = 'collection.html';
                return;
            }

            const amount = store.getCartTotal() * 100; // Paystack uses kobo (smallest currency unit)

            // Initialize Paystack payment popup
            const handler = PaystackPop.setup({
                key: PAYSTACK_PUBLIC_KEY,
                email: email,
                amount: amount,
                currency: 'GHS', // Ghanaian Cedi
                ref: 'BG-' + Math.floor(Math.random() * 1000000000 + 1), // Generate unique reference
                metadata: {
                    custom_fields: [
                        {
                            display_name: "Customer Name",
                            variable_name: "customer_name",
                            value: `${firstName} ${lastName}`
                        },
                        {
                            display_name: "Shipping Address",
                            variable_name: "shipping_address",
                            value: address
                        },
                        {
                            display_name: "Cart Items",
                            variable_name: "cart_items",
                            value: JSON.stringify(cart.map(item => ({
                                title: item.title,
                                price: item.price,
                                quantity: item.quantity || 1
                            })))
                        }
                    ]
                },
                callback: function (response) {
                    // Payment successful
                    console.log('Payment successful:', response);

                    // Clear the cart
                    store.clearCart();

                    // Show success message
                    alert(`Payment successful! Reference: ${response.reference}\n\nThank you for your purchase. We'll send a confirmation email to ${email}`);

                    // Redirect to home page
                    window.location.href = 'index.html';
                },
                onClose: function () {
                    // User closed the popup
                    console.log('Payment popup closed');
                    alert('Payment cancelled. Your cart items are still saved.');
                }
            });

            handler.openIframe();
        });
    }
}
