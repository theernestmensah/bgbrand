// import { store } from './store.js'; // Removed module import

/**
 * BG Header Component
 * Renders the main navigation and handles cart badge updates.
 */
class BGHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="announcement-bar text-center py-2" style="background-color: var(--secondary-color); color: white; font-size: 0.8rem; letter-spacing: 1px;">
                For every purchase, Two Cedis supports the needy and less privileged
            </div>
            <nav class="navbar navbar-expand-lg sticky-top">
                <div class="container">
                    <a class="navbar-brand" href="index.html">
                        <img src="https://i.ibb.co/T95Tb6w/logo-removebg-preview.png" alt="BG BRAND" style="height: 65px;">
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                            <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
                            <li class="nav-item"><a class="nav-link" href="collection.html">Collection</a></li>
                        </ul>
                    </div>
                    <div class="d-flex align-items-center gap-3">
                        <div class="dropdown" id="user-menu-container">
                            <!-- User Avatar (shown when logged in) -->
                            <a href="#" class="text-reset d-none" id="user-avatar-btn" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="" alt="User" id="user-avatar-img" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 2px solid #000;">
                            </a>
                            
                            <!-- Sign In Icon (shown when logged out) -->
                            <a href="#" class="text-reset" id="signin-link" onclick="window.openClerkSignIn(); return false;">
                                <i class="fas fa-user"></i>
                            </a>
                            
                            <!-- User Dropdown Menu -->
                            <ul class="dropdown-menu dropdown-menu-end" id="user-dropdown">
                                <li><span class="dropdown-item-text small text-muted" id="user-email-display">User Email</span></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#" id="logout-btn"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
                            </ul>
                        </div>

                        <a href="#" class="text-reset position-relative" data-bs-toggle="offcanvas" data-bs-target="#cartSidebar">
                            <i class="fas fa-shopping-bag"></i>
                            <span id="cart-badge" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark" style="font-size: 0.6rem;">0</span>
                        </a>
                    </div>
                </div>
            </nav>
        `;

        // Subscribe to store updates for badge
        window.store.subscribe((cart) => {
            const count = window.store.getCartItemCount ? window.store.getCartItemCount() : cart.length;
            this.updateBadge(count);
        });

        // Initialize badge with current state
        const initialCount = window.store.getCartItemCount ? window.store.getCartItemCount() : window.store.getCart().length;
        this.updateBadge(initialCount);

        // Subscribe to auth state changes
        if (window.authStore) {
            window.authStore.subscribe((user) => {
                this.updateUserUI(user);
            });

            // Initialize user UI with current state
            const currentUser = window.authStore.getUser();
            this.updateUserUI(currentUser);
        }

        // Setup logout handler
        const logoutBtn = this.querySelector('#logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.authStore.signOut();
                window.location.href = 'index.html';
            });
        }

        // Highlight active link
        this.highlightActiveLink();
    }

    updateBadge(count) {
        const badge = this.querySelector('#cart-badge');
        if (badge) badge.innerText = count;
    }

    updateUserUI(user) {
        const avatarBtn = this.querySelector('#user-avatar-btn');
        const avatarImg = this.querySelector('#user-avatar-img');
        const signinLink = this.querySelector('#signin-link');
        const emailDisplay = this.querySelector('#user-email-display');

        if (user) {
            // User is logged in - show avatar
            if (avatarBtn && avatarImg && signinLink) {
                avatarImg.src = user.avatar;
                avatarBtn.classList.remove('d-none');
                signinLink.classList.add('d-none');
            }
            if (emailDisplay) {
                emailDisplay.textContent = user.email;
            }
        } else {
            // User is logged out - show sign in link
            if (avatarBtn && signinLink) {
                avatarBtn.classList.add('d-none');
                signinLink.classList.remove('d-none');
            }
        }
    }

    highlightActiveLink() {
        const currentPath = window.location.pathname;
        const links = this.querySelectorAll('.nav-link');
        links.forEach(link => {
            if (link.href.includes(currentPath) && currentPath !== '/') { // Simple check, can be robust
                link.classList.add('active');
            } else if (currentPath === '/' && link.getAttribute('href') === 'index.html') {
                // link.classList.add('active'); // Homepage check
            }
        });
    }
}

/**
 * BG Footer Component
 */
class BGFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="container">
                    <div class="row g-5">
                        <div class="col-lg-4">
                            <a href="#" class="footer-logo text-dark text-decoration-none">BG BRAND</a>
                            <p class="text-muted">Luxury is in each detail. Experience the finest in eyewear, couture, and fragrance.</p>
                            <div class="mt-4">
                                <a href="https://instagram.com/_bgbrand" target="_blank" class="text-dark me-3"><i class="fab fa-instagram fa-lg"></i></a>
                                <a href="https://www.snapchat.com/add/bgbrand25" target="_blank" class="text-dark me-3"><i class="fab fa-snapchat fa-lg"></i></a>
                                <a href="https://www.tiktok.com/@bgbrand4" target="_blank" class="text-dark me-3"><i class="fab fa-tiktok fa-lg"></i></a>
                                <a href="https://wa.me/233205547117" target="_blank" class="text-dark me-3"><i class="fab fa-whatsapp fa-lg"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-2 col-6 footer-links">
                            <h5>Shop</h5>
                            <ul>
                                <li><a href="collection.html">New Arrivals</a></li>
                                <li><a href="collection.html?filter=eyewear">Eyewear</a></li>
                                <li><a href="collection.html?filter=dresses">Dresses</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-2 col-6 footer-links">
                            <h5>Help</h5>
                            <ul>
                                <li><a href="shipping.html">Shipping & Returns</a></li>
                                <li><a href="size-guide.html">Size Guide</a></li>
                                <li><a href="faq.html">FAQ</a></li>
                                <li><a href="contact.html">Contact Us</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-4">
                            <h5 class="mb-4 text-uppercase" style="color: var(--secondary-color);">The Insider</h5>
                            <p class="text-muted small">Subscribe to receive updates, access to exclusive deals, and more.</p>
                            <form class="d-flex mt-3">
                                <input type="email" class="form-control newsletter-input" placeholder="Your Email Address">
                                <button class="btn btn-light" style="border-radius: 0 30px 30px 0;" type="button">JOIN</button>
                            </form>
                        </div>
                    </div>
                    <div class="row mt-5 pt-4 border-top border-dark">
                        <div class="col-12 text-center">
                            <p class="small text-muted">&copy; ${new Date().getFullYear()} BG Brand. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

/**
 * Renders a single product card HTML
 * @param {Object} product - Product object from data.js
 * @param {Number} delay - Animation delay in ms
 * @returns {String} HTML string
 */
function renderProductCard(product, delay = 0) {
    // Note: We use a custom 'data-product-id' for potential future JS hookups
    // We keep the AOS attributes for now, but will replace with GSAP later effectively
    return `
        <div class="col-lg-3 col-md-6 product-item" data-category="${product.category}">
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${product.image}" class="product-image" alt="${product.title}">
                    <div class="product-actions">
                        <button class="btn btn-quick-add" onclick="window.addToCart(${product.id})">Add to Bag</button>
                    </div>
                </div>
                <div class="product-info">
                    <h5 class="product-title">${product.title}</h5>
                    <p class="product-price">GH₵ ${product.price}.00</p>
                </div>
            </div>
        </div>
    `;
}

// Define Custom Elements
customElements.define('bg-header', BGHeader);
customElements.define('bg-footer', BGFooter);

window.renderProductCard = renderProductCard;
