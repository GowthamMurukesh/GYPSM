# Quick Start Guide

Get your Royal Gypsum website up and running in 5 easy steps!

## Step 1: Firebase Setup (15 minutes)

### Create Firebase Project
- [ ] Go to https://console.firebase.google.com
- [ ] Click "Add project"
- [ ] Name it "Royal Gypsum"
- [ ] Skip Google Analytics
- [ ] Create project

### Get Firebase Credentials
- [ ] Go to Project Settings (gear icon)
- [ ] Find "Your apps" section
- [ ] Click Web app icon (</>)
- [ ] Register as "Website"
- [ ] Copy the config object

### Enable Services
- [ ] Enable Email/Password Authentication
- [ ] Create Firestore Database in Production mode
- [ ] Create Cloud Storage bucket
- [ ] Create user collection with admin user

**See FIREBASE_SETUP.md for detailed steps**

## Step 2: Local Setup (10 minutes)

### Clone & Install
```bash
# Clone the repository
git clone <your-repo-url>
cd royal-gypsum

# Install dependencies
pnpm install
```

### Configure Environment
```bash
# Create .env.local file
nano .env.local

# Add these variables:
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Test Locally
```bash
# Start development server
pnpm dev

# Visit http://localhost:3000
```

**Checklist:**
- [ ] Home page loads
- [ ] Can navigate to pages
- [ ] Can access `/login`
- [ ] Can login with Firebase credentials
- [ ] Admin dashboard loads

## Step 3: Customize Content (20 minutes)

### Update Branding
- [ ] Change company name in Header/Footer
- [ ] Update colors in `globals.css`
- [ ] Update phone number in Footer
- [ ] Update email in Footer
- [ ] Update address in Footer

### Create Initial Content
- [ ] Login to admin panel (`/login`)
- [ ] Go to Services → New Service
- [ ] Add 3-5 services with descriptions
- [ ] Go to Pages → New Page
- [ ] Create About page with company info

### Upload Media
- [ ] Go to Media Library
- [ ] Upload logo image
- [ ] Upload service/team photos
- [ ] Upload project images

## Step 4: Deploy to Vercel (10 minutes)

### Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Create Vercel Project
- [ ] Go to https://vercel.com
- [ ] Click "New Project"
- [ ] Import your GitHub repository
- [ ] Project automatically detected as Next.js
- [ ] Click "Deploy"

### Add Environment Variables
- [ ] Go to project Settings
- [ ] Click "Environment Variables"
- [ ] Add all 6 FIREBASE variables
- [ ] Make sure they're set for Production, Preview, and Development
- [ ] Click Redeploy

**Checklist:**
- [ ] Deployment completes successfully
- [ ] Public site loads at vercel.com URL
- [ ] Login works on production
- [ ] Admin panel accessible

## Step 5: Custom Domain (Optional, 10 minutes)

### Add Domain to Vercel
- [ ] Go to project Settings
- [ ] Click "Domains"
- [ ] Add your domain (e.g., royalgypsum.com)
- [ ] Follow Vercel's DNS configuration instructions

### Update DNS at Registrar
- [ ] Login to your domain registrar
- [ ] Update nameservers OR add CNAME records
- [ ] Wait 24-48 hours for propagation
- [ ] Visit your domain to verify

**Checklist:**
- [ ] Domain points to Vercel
- [ ] HTTPS certificate auto-generated
- [ ] Site loads on custom domain

## Common Tasks

### Add New Service
1. Login to admin (`/login`)
2. Go to Services
3. Click "New Service"
4. Fill in title, description, details
5. Click "Publish"
6. Refresh public site

### Add New Page
1. Go to Pages
2. Click "New Page"
3. Enter slug, title, content
4. Click "Publish"
5. Access at `/[slug]`

### Upload Images
1. Go to Media Library
2. Click "Select Files"
3. Choose image or video
4. Click "Open"
5. Image automatically uploaded to cloud

### Manage Users
1. Go to Users (Admin only)
2. Select user
3. Change role from dropdown
4. Changes apply immediately

### View Contact Messages
1. Go to Messages
2. Click message to view details
3. Mark as read when reviewed
4. Delete when no longer needed

## Troubleshooting

**Can't login?**
- Check Firebase Auth is enabled
- Verify user exists in Firebase Authentication
- Check user document exists in Firestore

**Images won't upload?**
- Check Cloud Storage is enabled
- Verify security rules allow authenticated users
- Check file size (under 5MB recommended)

**Pages not showing?**
- Make sure "Publish" checkbox is checked
- Check Firestore has data in collections
- Clear browser cache

**Deployment fails?**
- Check all environment variables are set
- Verify Firebase credentials are correct
- Check build logs for errors

**See FIREBASE_SETUP.md and DEPLOYMENT.md for more help**

## What's Next?

### Immediate (Day 1)
- [ ] Configure Firebase
- [ ] Deploy to Vercel
- [ ] Test all pages

### Short-term (Week 1)
- [ ] Add company content
- [ ] Upload project photos
- [ ] Create all services
- [ ] Set up custom domain

### Medium-term (Month 1)
- [ ] Add more users
- [ ] Create blog/case studies (add Pages)
- [ ] Set up email notifications
- [ ] Monitor analytics

### Long-term (Ongoing)
- [ ] Update content monthly
- [ ] Add new services
- [ ] Share client testimonials
- [ ] Track contact leads

## File Locations Reference

| What | Location |
|------|----------|
| Home page | `app/page.tsx` |
| About page | `app/about/page.tsx` |
| Services page | `app/services/page.tsx` |
| Contact page | `app/contact/page.tsx` |
| Admin dashboard | `app/admin/page.tsx` |
| Styling | `app/globals.css` |
| Header/Footer | `components/Header.tsx`, `Footer.tsx` |
| Firebase config | `lib/firebase.ts` |
| Database helpers | `lib/firebaseUtils.ts` |

## Support

**Questions?**
1. Check README.md for full documentation
2. Check FIREBASE_SETUP.md for Firebase issues
3. Check DEPLOYMENT.md for deployment issues
4. Check browser console for error messages
5. Check Vercel build logs for deployment errors

## Success Checklist

After following this guide, you should have:

- [ ] Firebase project created and configured
- [ ] Local development environment running
- [ ] Website deployed to Vercel
- [ ] Custom domain configured (optional)
- [ ] Content created and published
- [ ] Admin panel working
- [ ] Contact form receiving submissions
- [ ] Media library functional
- [ ] Users can login with different roles
- [ ] Site is live and accessible

**Congratulations! Your professional website is now live! 🎉**

---

**Total Time**: 45-60 minutes from start to live website

For detailed information on any step, see the full documentation files:
- README.md - Full project documentation
- FIREBASE_SETUP.md - Firebase configuration
- DEPLOYMENT.md - Vercel deployment
- PROJECT_SUMMARY.md - Project overview
