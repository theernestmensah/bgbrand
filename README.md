# 🛍️ BG Brand - E-Commerce Website

> Luxury eyewear, clothing, and fragrances for the discerning customer.

![BG Brand](./images/logo-removebg-preview.png)

## 🌍 **Live Demo**
Coming soon...

## ✨ **Features**

### 🛒 Shopping Experience
- **Product Collections** - Eyewear, Clothing, Fragrances
- **Size Selection** - S, M, L, XL sizing with guide
- **Shopping Cart** - Dynamic cart with size tracking
- **Secure Checkout** - Ghana-localized checkout process

### 💳 **Payment Integration**
- **Paystack Integration** - Live payment gateway for Ghana
- **Mobile Money** - MTN, Telecel, AirtelTigo support
- **Card Payments** - Visa, Mastercard support
- **WhatsApp Notifications** - Auto-send orders to business

### 🇬🇭 **Ghana Localization**
- **Currency** - Ghana Cedis (GH₵)
- **Regions** - All Ghana regions
- **Phone Format** - 10-digit Ghana format
- **Payment Methods** - Mobile Money providers in Ghana

### 🔐 **Authentication**
- **Clerk Auth** - Secure user authentication
- **Email/Password** - Simple login system
- **User Profiles** - Account management
- **Session Management** - Secure sessions

### 📱 **Responsive Design**
- **Mobile-First** - Optimized for all devices
- **Modern UI** - Premium design aesthetic
- **Bootstrap 5** - Responsive framework
- **Font Awesome** - Beautiful icons

## 🚀 **Technologies Used**

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5
- Font Awesome Icons
- AOS (Animate On Scroll)

### Authentication
- Clerk.js - User authentication
- Session management

### Payment
- Paystack - Payment gateway
- Mobile Money integration

### Backend (Future)
- To be implemented
- Order management
- Email notifications

## 📁 **Project Structure**

```
BG-Brand/
├── index.html              # Homepage
├── collection.html         # Products page
├── checkout.html           # Checkout page
├── about.html             # About page
├── auth.html              # Login/Signup
├── order-success.html     # Success page
├── size-guide.html        # Size guide
├── shipping.html          # Shipping info
├── terms.html             # Terms & Conditions
├── privacy.html           # Privacy Policy
├── faq.html               # FAQ page
├── contact.html           # Contact page
│
├── js/
│   ├── components.js      # Reusable components
│   ├── collection-page.js # Product page logic
│   ├── checkout.js        # Checkout logic
│   ├── store.js           # Cart management
│   ├── data.js            # Product data
│   ├── auth.js            # Auth logic
│   ├── auth-store.js      # Auth state
│   └── clerk-config.js    # Clerk setup
│
├── images/                # Product images & assets
├── style.css              # Main stylesheet
└── main.js                # Main JavaScript

```

## 🛠️ **Setup Instructions**

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/bgbrand.git
cd bgbrand
```

### 2. Open in Browser
Simply open `index.html` in your browser - no build process needed!

### 3. Configure Clerk (Optional)
1. Create account at [Clerk.com](https://clerk.com)
2. Get your publishable key
3. Replace in HTML files

### 4. Configure Paystack (Optional)
1. Create account at [Paystack.com](https://paystack.com)
2. Get your public key
3. Replace in `js/checkout.js`

## 📝 **Configuration**

### Update Paystack Key
In `js/checkout.js`:
```javascript
key: 'YOUR_PAYSTACK_PUBLIC_KEY'
```

### Update WhatsApp Number
In `js/checkout.js`:
```javascript
const whatsappNumber = 'YOUR_WHATSAPP_NUMBER';
```

### Update Social Media Links
In `js/components.js` (footer section):
```javascript
<a href="YOUR_INSTAGRAM_URL">Instagram</a>
<a href="YOUR_TIKTOK_URL">TikTok</a>
// etc.
```

## 🎨 **Customization**

### Colors
Edit `style.css`:
```css
:root {
    --primary-color: #000;
    --secondary-color: #f5f5f5;
}
```

### Products
Edit `js/data.js`:
```javascript
const products = [
    {
        id: 1,
        title: "Your Product",
        price: 150,
        // ...
    }
];
```

## 📦 **Deployment**

### GitHub Pages
1. Push to GitHub
2. Go to Settings → Pages
3. Select branch: `main`
4. Save

### Netlify
1. Connect GitHub repo
2. Deploy automatically

### Vercel
1. Import GitHub repo
2. Deploy with one click

## 🔒 **Environment Variables**

For production, set these:
- `CLERK_PUBLISHABLE_KEY` - Your Clerk production key
- `PAYSTACK_PUBLIC_KEY` - Your Paystack live key
- `WHATSAPP_NUMBER` - Your business WhatsApp

## 📱 **Browser Support**

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🤝 **Contributing**

This is a private project. Contact the owner for collaboration.

## 📄 **License**

© 2025 BG Brand. All Rights Reserved.

## 📞 **Contact**

- **Email**: awareness@bgbrand.com
- **WhatsApp**: +233 20 554 7117
- **Instagram**: [@_bgbrand](https://instagram.com/_bgbrand)
- **TikTok**: [@bgbrand4](https://tiktok.com/@bgbrand4)
- **Snapchat**: [bgbrand25](https://snapchat.com/add/bgbrand25)

---

Made with ❤️ in Ghana 🇬🇭
