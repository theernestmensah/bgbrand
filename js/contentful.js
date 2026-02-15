/**
 * Contentful CMS Integration - BG Brand
 * Fetches products from Contentful headless CMS
 */

// Contentful Configuration
const CONTENTFUL_CONFIG = {
    space: '4ss02lueims8',
    accessToken: 'wMyx_YUgvYEZF-8m2fYLjwuihtOezt-mAfRh6x0NtAs',
    environment: 'master',
    host: 'cdn.contentful.com'
};

/**
 * Fetch all products from Contentful
 * @returns {Promise<Array>} Array of product objects
 */
async function fetchProductsFromContentful() {
    const { space, accessToken, environment, host } = CONTENTFUL_CONFIG;

    // Construct the API URL
    const url = `https://${host}/spaces/${space}/environments/${environment}/entries?access_token=${accessToken}&content_type=product&include=2`;

    try {
        console.log('Loading products...');
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // DEBUG: Log the raw response (only in development)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('📦 Raw API Response:', data);
            console.log('📊 Total items found:', data.items?.length || 0);
            console.log('🖼️ Total assets found:', data.includes?.Asset?.length || 0);
        }

        // Process the response to extract products
        const products = processContentfulResponse(data);

        console.log(`✅ Successfully loaded ${products.length} products`);
        return products;

    } catch (error) {
        console.error('❌ Error loading products:', error);
        // Return fallback products if API fails
        return getFallbackProducts();
    }
}

/**
 * Process Contentful API response and transform to our product format
 * @param {Object} data - Raw Contentful API response
 * @returns {Array} Processed products array
 */
function processContentfulResponse(data) {
    const { items, includes } = data;

    // Create a map of assets (images) for quick lookup
    const assetMap = {};
    if (includes && includes.Asset) {
        includes.Asset.forEach(asset => {
            assetMap[asset.sys.id] = asset;
        });
    }

    // Transform Contentful entries to our product format
    return items.map(item => {
        const fields = item.fields;

        // Get image URL from linked asset
        let imageUrl = './images/placeholder.jpg'; // Default fallback
        if (fields.image && fields.image.sys && fields.image.sys.id) {
            const asset = assetMap[fields.image.sys.id];
            if (asset && asset.fields && asset.fields.file) {
                imageUrl = 'https:' + asset.fields.file.url;
            }
        }

        return {
            id: item.sys.id,
            title: fields.title || 'Untitled Product',
            price: fields.price || 0,
            image: imageUrl,
            category: fields.category || 'uncategorized',
            description: fields.description || '',
            comingSoon: fields.comingSoon || false,
            featured: fields.featured || false,
            inStock: fields.inStock !== false // Default to true if not specified
        };
    });
}

/**
 * Fallback in case Contentful is unavailable
 * @returns {Array} Empty array (all products managed in Contentful)
 */
function getFallbackProducts() {
    console.warn('⚠️ Contentful unavailable - No products to display');
    console.warn('💡 Please check your Contentful configuration or internet connection');
    return [];
}

/**
 * Get products by category
 * @param {Array} products - All products
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered products
 */
function getProductsByCategory(products, category) {
    if (!category || category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

/**
 * Get featured products
 * @param {Array} products - All products
 * @returns {Array} Featured products
 */
function getFeaturedProducts(products) {
    return products.filter(product => product.featured);
}

/**
 * Get product by ID
 * @param {Array} products - All products
 * @param {string|number} id - Product ID
 * @returns {Object|null} Product or null if not found
 */
function getProductById(products, id) {
    return products.find(product => product.id == id) || null;
}

/**
 * Initialize Contentful and load products
 * @returns {Promise<Array>} Products array
 */
async function initializeContentful() {
    try {
        const products = await fetchProductsFromContentful();

        // Store products globally
        window.contentfulProducts = products;
        window.products = products; // Update main products array

        // Dispatch event to notify that products are loaded
        const event = new CustomEvent('contentful:ready', { detail: { products } });
        window.dispatchEvent(event);

        console.log('🎉 Products ready:', products.length);

        return products;
    } catch (error) {
        console.error('Failed to load products:', error);
        return getFallbackProducts();
    }
}

// Export functions for use in other files
window.Contentful = {
    initialize: initializeContentful,
    fetchProducts: fetchProductsFromContentful,
    getByCategory: getProductsByCategory,
    getFeatured: getFeaturedProducts,
    getById: getProductById,
    config: CONTENTFUL_CONFIG
};

// Auto-initialize Contentful on collection page
if (window.location.pathname.includes('collection.html') ||
    window.location.search.includes('contentful=true') ||
    localStorage.getItem('useContentful') === 'true') {
    initializeContentful();
}
 