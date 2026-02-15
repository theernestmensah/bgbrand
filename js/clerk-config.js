/**
 * Clerk Configuration for BG Brand
 * Dynamically loads and initializes Clerk with brand-specific settings
 */

// Your Clerk Publishable Key
const CLERK_PUBLISHABLE_KEY = 'pk_test_cHJpbWFyeS1sZW1taW5nLTQxLmNsZXJrLmFjY291bnRzLmRldiQ';

// Clerk script URL (domain-specific)
const CLERK_SCRIPT_URL = 'https://primary-lemming-41.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js';

// Initialize Clerk instance
let clerkInstance = null;
let clerkLoadPromise = null;

/**
 * Dynamically load Clerk script
 */
function loadClerkScript() {
    if (clerkLoadPromise) {
        return clerkLoadPromise;
    }

    clerkLoadPromise = new Promise((resolve, reject) => {
        // Check if Clerk is already loaded
        if (window.Clerk) {
            resolve(window.Clerk);
            return;
        }

        // Create script element
        const script = document.createElement('script');
        script.src = CLERK_SCRIPT_URL;
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.setAttribute('data-clerk-publishable-key', CLERK_PUBLISHABLE_KEY);
        script.type = 'text/javascript';

        script.onload = () => {
            // Wait a bit for Clerk to initialize
            setTimeout(() => resolve(window.Clerk), 100);
        };

        script.onerror = () => {
            reject(new Error('Failed to load Clerk'));
        };

        document.head.appendChild(script);
    });

    return clerkLoadPromise;
}

/**
 * Initialize Clerk with configuration
 */
async function initializeClerk() {
    if (clerkInstance) return clerkInstance;

    try {
        // Load Clerk script first
        await loadClerkScript();

        // window.Clerk is the instance after script loads
        if (!window.Clerk) {
            console.error('Clerk SDK not available');
            return null;
        }

        clerkInstance = window.Clerk;

        // Load with appearance configuration
        await clerkInstance.load({
            appearance: {
                variables: {
                    colorPrimary: '#000000',
                    colorBackground: '#ffffff',
                    colorText: '#000000',
                    colorTextSecondary: '#666666',
                    colorDanger: '#ff4444',
                    colorSuccess: '#00c851',
                    borderRadius: '0px',
                    fontFamily: '"Raleway", sans-serif',
                },
                layout: {
                    socialButtonsPlacement: 'bottom',
                    socialButtonsVariant: 'iconButton',
                },
                elements: {
                    formButtonPrimary: 'bg-dark text-white hover:opacity-80 transition-opacity',
                    card: 'shadow-lg',
                    headerTitle: 'font-playfair',
                    formFieldInput: 'border-dark focus:border-dark',
                }
            }
        });

        return clerkInstance;

    } catch (error) {
        console.error('Failed to initialize Clerk:', error);
        return null;
    }
}

// Auto-initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeClerk);
} else {
    initializeClerk();
}

// Export for use in other scripts
window.initializeClerk = initializeClerk;
window.getClerk = () => clerkInstance;

/**
 * Open Clerk Sign In modal
 * @param {string} redirectUrl - URL to redirect to after sign in
 */
window.openClerkSignIn = async (redirectUrl) => {
    const clerk = await initializeClerk();
    if (clerk) {
        const url = redirectUrl || window.location.href;
        clerk.openSignIn({
            afterSignInUrl: url,
            redirectUrl: url
        });
    }
};

/**
 * Open Clerk Sign Up modal
 * @param {string} redirectUrl - URL to redirect to after sign up
 */
window.openClerkSignUp = async (redirectUrl) => {
    const clerk = await initializeClerk();
    if (clerk) {
        const url = redirectUrl || window.location.href;
        clerk.openSignUp({
            afterSignUpUrl: url,
            redirectUrl: url
        });
    }
};
