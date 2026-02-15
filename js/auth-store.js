/**
 * Auth Store - Clerk Wrapper
 * Provides a simple interface compatible with existing BGBrand code
 */

class AuthStore {
    constructor() {
        this.subscribers = [];
        this.currentUser = null;
        this.initializeClerkListeners();
    }

    async initializeClerkListeners() {
        // Wait for Clerk to be ready
        const clerk = await window.initializeClerk();

        if (!clerk) {
            console.warn('Clerk not initialized');
            return;
        }

        // Listen to Clerk user changes
        clerk.addListener((resources) => {
            const user = resources?.user || null;
            this.currentUser = user ? this.formatUser(user) : null;
            this.notifySubscribers(this.currentUser);
        });

        // Set initial user state immediately
        const initialUser = clerk.user;
        if (initialUser) {
            this.currentUser = this.formatUser(initialUser);
            this.notifySubscribers(this.currentUser);
        }
    }

    /**
     * Format Clerk user object to match existing app structure
     */
    formatUser(clerkUser) {
        return {
            id: clerkUser.id,
            email: clerkUser.primaryEmailAddress?.emailAddress || '',
            name: clerkUser.fullName || `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            avatar: clerkUser.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(clerkUser.firstName || 'User')}&background=000&color=fff`,
            createdAt: clerkUser.createdAt
        };
    }

    /**
     * Get current user
     */
    getUser() {
        return this.currentUser;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return this.currentUser !== null;
    }

    /**
     * Subscribe to auth state changes
     */
    subscribe(callback) {
        this.subscribers.push(callback);
        // Immediately call with current state
        if (this.currentUser !== null) {
            callback(this.currentUser);
        }
        return () => {
            this.subscribers = this.subscribers.filter(cb => cb !== callback);
        };
    }

    /**
     * Notify all subscribers of state change
     */
    notifySubscribers(user) {
        this.subscribers.forEach(callback => callback(user));
    }

    /**
     * Sign out
     */
    async signOut() {
        const clerk = window.getClerk();
        if (clerk) {
            await clerk.signOut();
            this.currentUser = null;
            this.notifySubscribers(null);
        }
    }

    /**
     * Get Clerk instance
     */
    async getClerkInstance() {
        return window.getClerk() || await window.initializeClerk();
    }
}

// Create global instance
window.authStore = new AuthStore();
