# 📤 How to Upload BG Brand to GitHub

## 🎯 **Step-by-Step Guide**

### **Step 1: Create GitHub Repository**

1. Go to: https://github.com
2. Click the **+** button (top right) → **New repository**
3. Fill in:
   - **Repository name**: `bgbrand` (or `bg-brand-ecommerce`)
   - **Description**: `E-commerce website for BG Brand - Ghana`
   - **Public** or **Private** (your choice)
   - ❌ DON'T initialize with README (we already have one)
4. Click **Create repository**

---

### **Step 2: Open Terminal in Your Project Folder**

**Option A - Using File Explorer:**
1. Open folder: `C:\Users\Admin\Desktop\WORK\The BGBrand`
2. Right-click in empty space
3. Select **"Open in Terminal"** or **"Git Bash Here"**

**Option B - Using PowerShell:**
```powershell
cd "C:\Users\Admin\Desktop\WORK\The BGBrand"
```

---

### **Step 3: Initialize Git** (If Not Already Done)

Run these commands one by one:

```bash
# Initialize Git repository
git init

# Check status
git status
```

---

### **Step 4: Add All Files**

```bash
# Add all files to Git
git add .

# Verify files were added
git status
```

You should see all your files listed in green.

---

### **Step 5: Create First Commit**

```bash
# Create commit with message
git commit -m "Initial commit: BG Brand e-commerce site with Ghana localization, Paystack payment, and size selection"
```

---

### **Step 6: Connect to GitHub**

Replace `YOUR_USERNAME` with your GitHub username:

```bash
# Add GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/bgbrand.git

# Verify remote was added
git remote -v
```

---

### **Step 7: Push to GitHub**

```bash
# Push to GitHub (main branch)
git push -u origin main
```

**Note:** If you get an error about `master` vs `main`, use:
```bash
git branch -M main
git push -u origin main
```

---

### **Step 8: Verify Upload**

1. Go to your GitHub repository in browser
2. Refresh the page
3. You should see all your files! ✅

---

## 🔐 **If Asked for Login**

### Option 1: Personal Access Token (Recommended)

1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `repo` (all)
4. Copy token
5. Use as password when pushing

### Option 2: GitHub CLI

```bash
# Install GitHub CLI first, then:
gh auth login
```

---

## ⚠️ **Common Issues & Fixes**

### **Issue: Large Image Files**

Your images folder is **~60MB+**. GitHub has limits:
- Single file: 100MB max
- Repository: 1GB recommended

**Solution:**
```bash
# If images are too large, add to .gitignore:
# Open .gitignore and add:
images/*.JPG
images/*.jpeg

# Keep only logo and small images
```

### **Issue: "remote origin already exists"**

```bash
# Remove old remote and add new one
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/bgbrand.git
```

### **Issue: "Updates were rejected"**

```bash
# Force push (only if new repo)
git push -u origin main --force
```

---

## 📊 **Check Your Upload**

After push succeeds, verify:
- ✅ All HTML files uploaded
- ✅ `js/` folder with all JavaScript files
- ✅ `images/` folder with images
- ✅ `README.md` visible on GitHub homepage
- ✅ `.gitignore` working (no node_modules, etc.)

---

## 🔄 **Future Updates**

When you make changes:

```bash
# 1. Add changes
git add .

# 2. Commit with message
git commit -m "Updated checkout with new feature"

# 3. Push to GitHub
git push
```

---

## 🌐 **Deploy to GitHub Pages** (Optional)

Make your site live for FREE:

1. Go to repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** → folder: **/ (root)**
4. Click **Save**
5. Wait 1-2 minutes
6. Your site will be at: `https://YOUR_USERNAME.github.io/bgbrand/`

---

## 📝 **Summary Commands (All in One)**

```bash
# Navigate to project
cd "C:\Users\Admin\Desktop\WORK\The BGBrand"

# Initialize Git
git init

# Add all files
git add .

# Create commit
git commit -m "Initial commit: BG Brand e-commerce site"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/bgbrand.git

# Push to GitHub
git push -u origin main
```

---

## ✅ **Checklist Before Pushing**

- [ ] Created GitHub repository
- [ ] `.gitignore` file created
- [ ] `README.md` file created
- [ ] Sensitive keys removed (or using test keys)
- [ ] Images not too large
- [ ] All important files included

---

**Ready? Run the commands above and your site will be on GitHub!** 🚀

Need help? Just ask! 😊
