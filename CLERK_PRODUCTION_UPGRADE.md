# 🚀 Upgrading Clerk to Production Mode - Step by Step Guide

## ✅ **Step 1: Prepare Your Site**

Before upgrading, make sure:
- ✅ Your site is working properly
- ✅ Authentication (login/signup) works in test mode
- ✅ You have a domain name (or plan to use one)
- ✅ You're ready to go live!

---

## 📋 **Step 2: Go to Clerk Dashboard**

1. **Visit**: https://dashboard.clerk.com
2. **Sign in** with your Clerk account
3. **Select your app** (BG Brand / Primary Lemming)

---

## 🎯 **Step 3: Switch to Production**

### In Clerk Dashboard:

1. **Look for the environment switcher** (top of dashboard)
   - You'll see: **Development** | **Production**
   
2. **Click "Go to Production"** button
   - OR switch environment to **Production**

3. **You'll be prompted to:**
   - Add your production domain
   - Configure DNS (if using custom domain)
   - Agree to terms

---

## 🌐 **Step 4: Add Your Domain**

### Option A: Using Custom Domain (Recommended)
```
Example: www.bgbrand.com or bgbrand.com
```

1. Enter your domain name
2. Clerk will give you **DNS records** to add
3. Add those records to your domain provider
4. Wait for DNS propagation (5-60 minutes)

### Option B: Using Vercel/Netlify/Hosting Platform
```
Example: bgbrand.vercel.app
```

1. Enter your hosting platform URL
2. Clerk will auto-configure

---

## 🔑 **Step 5: Get Production Keys**

Once in Production mode:

1. Go to **API Keys** section
2. You'll see **TWO** new keys:
   - **Publishable Key**: `pk_live_...` (replaces `pk_test_...`)
   - **Secret Key**: `sk_live_...` (for backend - you don't need this yet)

3. **COPY** the Publishable Key (pk_live_...)

---

## 💻 **Step 6: Update Your Code**

### Find and Replace in Your Project:

**Current Test Key:**
```javascript
pk_test_cHJpbWFyeS1sZW1taW5nLTQxLmNsZXJrLmFjY291bnRzLmRldiQ
```

**Replace with Production Key:**
```javascript
pk_live_YOUR_NEW_PRODUCTION_KEY_HERE
```

### Files to Update:

I'll search for files with the test key and update them automatically once you provide the production key.

---

## 📁 **Files That Need Updating**

Based on your current setup, these files contain the Clerk test key:

1. `index.html`
2. `collection.html`
3. `checkout.html`
4. `about.html`
5. `contact.html`
6. `faq.html`
7. `shipping.html`
8. `terms.html`
9. `privacy.html`
10. `size-guide.html`

---

## ⚙️ **Step 7: Configure Production Settings**

In Clerk Dashboard → Production:

1. **Allowed Origins** (Important!)
   - Add your production domain
   - Example: `https://bgbrand.com`
   - Example: `https://www.bgbrand.com`

2. **Session & JWT Settings** (Leave default)
   - Session lifetime: 7 days (default)
   - JWT template: Default

3. **Email/SMS Settings** (Optional)
   - Configure email provider if needed
   - Customize email templates

---

## 🚨 **Important Notes**

### ⚠️ **Users Don't Transfer Automatically**
- Test users ≠ Production users
- You'll start fresh in production
- This is NORMAL and GOOD (test users aren't real)

### ⚠️ **Keep Test Keys**
- Don't delete test environment
- Useful for future testing
- Can switch between Dev/Prod anytime

### ⚠️ **Still FREE**
- Production FREE tier: 10,000 MAU
- No credit card required
- Upgrade to Pro only if you need advanced features

---

## 📝 **What to Send Me**

Once you complete steps 1-5, send me:

1. **Your Production Publishable Key**
   - Format: `pk_live_xxxxxxxxxx`
   - I'll update all files automatically

2. **Your Production Domain** (optional)
   - Example: `bgbrand.com`
   - I'll verify the setup

---

## 🎉 **After Upgrade**

You'll notice:
- ✅ No more "Development Mode" banner
- ✅ Professional appearance
- ✅ Better email deliverability
- ✅ Ready for real customers!

---

## ❓ **Getting Stuck?**

Common issues:

**"Can't find Production mode"**
- Some accounts need billing info first (even for free tier)
- Check if you need to verify email

**"Domain not verifying"**
- DNS takes 5-60 minutes to propagate
- Check DNS records are correct
- Try www and non-www versions

**"Keys not showing"**
- Make sure you're in Production environment (switch in dashboard)
- Refresh the page

---

## 📞 **Need Help?**

**Clerk Support:**
- Dashboard → Support
- https://clerk.com/support

**Me:**
- Just send your production key when ready
- I'll update all files for you!

---

**Ready? Go to https://dashboard.clerk.com and follow Steps 1-5!** 🚀

Once you have your production key, paste it here and I'll update everything! 
