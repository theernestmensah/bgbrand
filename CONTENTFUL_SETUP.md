# 📦 Contentful CMS Setup for BG Brand

## Step 1: Create a Contentful Account

1. Go to [contentful.com](https://www.contentful.com/sign-up/)
2. Sign up for a **free account**  
3. Create a new **Space** (name it "BG Brand Products")

## Step 2: Create Product Content Type

In your Contentful dashboard:

1. **Navigate to**: Content model → Add content type
2. **Name**: `Product` (API Identifier: `product`)
3. **Add these fields**:

| Field Name | Type | Required | Notes |
|------------|------|----------|-------|
| `title` | Short text | ✅ Yes | Product name |
| `price` | Number (Integer) | ✅ Yes | Price in GHS |
| `image` | Media (Single file) | ✅ Yes | Product photo |
| `category` | Short text | ✅ Yes | eyewear, dresses, or fragrances |
| `description` | Long text | ❌ No | Product description |
| `featured` | Boolean | ❌ No | Show on homepage |
| `comingSoon` | Boolean | ❌ No | Coming soon badge |
| `inStock` | Boolean | ❌ No | Availability (default: true) |

4. **Save** the content type

## Step 3: Add Products

1. Navigate to **Content** tab
2. Click **Add entry** → Select "Product"
3. Fill in product details
4. Click **Publish**

## Step 4: Get API Credentials

1. Navigate to **Settings** → **API keys**
2. Click **Add API key**
3. Name it "BG Brand Website"
4. Copy these values:
   - **Space ID**
   - **Content Delivery API - access token**

## Step 5: Configure Your Project

Open `js/contentful.js` and update lines 7-9 with your credentials.

## Step 6: Enable Contentful

Run in browser console:
```javascript
localStorage.setItem('useContentful', 'true');
```

Then refresh the page!

## Troubleshooting

**401 Error**: Check your Access Token  
**No products**: Make sure they're Published in Contentful  
** Images missing**: Already handled in code

---

**Your products will now load from Contentful!** 🚀
