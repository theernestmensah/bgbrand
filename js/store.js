/**
 * Centralized Store / State Management
 * Handles Cart logic with LocalStorage persistence.
 */

// Key for localStorage
const CART_STORAGE_KEY = 'bg_brand_cart_v1';

class Store {
    constructor() {
        this.cart = this.loadCart();
        this.listeners = [];
    }

    // Load cart from LocalStorage
    loadCart() {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    // Save cart to LocalStorage
    saveCart() {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
        this.notifyListeners();
    }

    // Add item to cart
    addToCart(product) {
        // Check if item already exists in cart
        const existingItemIndex = this.cart.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
            // Item exists, increment quantity
            if (this.cart[existingItemIndex].quantity) {
                this.cart[existingItemIndex].quantity += 1;
            } else {
                // Convert old format to new format with quantity
                this.cart[existingItemIndex].quantity = 2;
            }
        } else {
            // New item, add with quantity of 1
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
    }

    // Get cart total
    getCartTotal() {
        return this.cart.reduce((total, item) => {
            const quantity = item.quantity || 1;
            return total + (item.price * quantity);
        }, 0);
    }

    // Get total item count
    getCartItemCount() {
        return this.cart.reduce((count, item) => {
            return count + (item.quantity || 1);
        }, 0);
    }

    // Remove item from cart by index
    removeFromCart(index) {
        if (index > -1 && index < this.cart.length) {
            this.cart.splice(index, 1);
            this.saveCart();
        }
    }

    // Clear cart
    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    // Get current cart
    getCart() {
        return this.cart;
    }

    // Subscribe to changes
    subscribe(listener) {
        this.listeners.push(listener);
    }

    // Notify all listeners
    notifyListeners() {
        this.listeners.forEach(listener => listener(this.cart));
    }
}

// Export a single instance to be used across the app
// Export a single instance to be used across the app
const store = new Store();
window.store = store;
