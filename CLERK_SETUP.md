# 🔐 Clerk Authentication Setup Guide

## Getting Your Clerk API Key

1. **Create a Clerk Account**  
   Visit [clerk.com](https://clerk.com) and sign up for a free account

2. **Create Your Application**
   - Click "Create Application"
   - Name it "BG Brand" (or any name you prefer)
   - Select **Email & Password** as the primary authentication method
   - Optionally enable **Google** social login

3. **Get Your Publishable Key**
   - On your Clerk Dashboard, navigate to **API Keys**
   - Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)

## Adding the Key to Your Project

Open `js/clerk-config.js` and replace line 6:

```javascript
// BEFORE:
const CLERK_PUBLISHABLE_KEY = 'YOUR_CLERK_PUBLISHABLE_KEY_HERE';

// AFTER (example):
const CLERK_PUBLISHABLE_KEY = 'pk_test_Y2xlcmsuZXhhbXBsZS5jb20k';
```

**⚠️ Important**: Use your actual key from the Clerk dashboard!

## Testing Authentication

1. **Start a local server**:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # OR using Node.js http-server
   npx http-server -p 8000
   ```

2. **Open your browser**:
   Navigate to `http://localhost:8000`

3. **Test Sign-Up**:
   - Click the user icon → should redirect to `auth.html`
   - Click "Sign Up" tab
   - Fill in the form and create an account
   - ✅ You should be redirected to homepage with your avatar showing in the header

4. **Test Sign-In**:
   - Sign out (click avatar → logout)
   - Sign in with your credentials
   - ✅ Should see your user avatar and email in the dropdown

5. **Test Checkout Integration**:
   - Add items to cart
   - Go to checkout
   - ✅ Email field should auto-fill with your Clerk email if you're signed in

## Configuration Options

### Customize Appearance

Edit `js/clerk-config.js` to match your brand:

```javascript
appearance: {
    variables: {
        colorPrimary: '#YOUR_BRAND_COLOR', // Change button colors
        borderRadius: '0px',                // Match BG Brand's sharp aesthetic
        fontFamily: '"Raleway", sans-serif'
    }
}
```

### Enable Additional Authentication Methods

In your Clerk Dashboard:
1. Go to **User & Authentication** →  **Social Connections**
2. Enable:
   - Google
   - Facebook
   - Apple
   - etc.

These will automatically appear on your `auth.html` page!

## Production Deployment

When deploying to production:

1. In Clerk Dashboard, add your production domain to **Allowed Domains**
2. Replace `pk_test_*` key with `pk_live_*` production key in `js/clerk-config.js`
3. Ensure your domain is using HTTPS (required for Clerk)

## Need Help?

- 📚 [Clerk Documentation](https://clerk.com/docs)
- 💬 [Clerk Discord Community](https://clerk.com/discord)
- 📧 Email: support@clerk.com

---

**🎉 Your BG Brand authentication is now powered by Clerk!**
