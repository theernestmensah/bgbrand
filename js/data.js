/**
 * Product Data for BG Brand
 * Powered by Contentful CMS
 */

const categories = [
    { id: 'all', name: 'All' },
    { id: 'eyewear', name: 'Eyewear' },
    { id: 'dresses', name: 'Dresses' }
];

// Initialize with empty products (will be populated by Contentful)
window.products = [];
window.categories = categories;


// Listen for Contentful products
if (window.Contentful) {
    console.log('🎨 Waiting for Contentful products...');

    // Check if Contentful has already loaded products
    if (window.Contentful.isInitialized && window.Contentful.products) {
        window.products = window.Contentful.products;
        console.log('✅ Loaded existing Contentful products:', window.products.length);
    }

    // Listen for Contentful updates
    window.addEventListener('contentful:ready', (event) => {
        if (event.detail && event.detail.products) {
            window.products = event.detail.products;
            console.log('✅ Products loaded from Contentful:', window.products.length);

            // Trigger re-render
            const updateEvent = new CustomEvent('products:updated', { detail: { products: window.products } });
            window.dispatchEvent(updateEvent);
        }
    });
} else {
    console.log('📦 Using static products (Contentful not available)');
}
