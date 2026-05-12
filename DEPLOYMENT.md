# Deployment Guide

This guide walks you through deploying Royal Gypsum Plastering website to Vercel.

## Prerequisites

1. GitHub account with the project repository
2. Vercel account (free at https://vercel.com)
3. Firebase project with configuration ready
4. Custom domain (optional)

## Step 1: Prepare Your Project

### 1.1 Set Up Firebase First

Before deploying to Vercel, ensure Firebase is fully configured:

1. Follow all steps in `FIREBASE_SETUP.md`
2. Create initial admin user in Firebase
3. Test Firebase connection locally

### 1.2 Push to GitHub

```bash
# Initialize git if not done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Royal Gypsum website"

# Create GitHub repository and push
# Visit https://github.com/new to create repository
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/royal-gypsum.git
git branch -M main
git push -u origin main
```

## Step 2: Create Vercel Project

### 2.1 Connect GitHub to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Select "Continue with GitHub"
4. Authorize Vercel to access GitHub
5. Select your repository
6. Click "Import"

### 2.2 Configure Project Settings

1. Project Name: `royal-gypsum` (or preferred name)
2. Framework: `Next.js` (should auto-detect)
3. Root Directory: `.` (default)
4. Build Command: `pnpm build` (or `npm run build`)
5. Output Directory: `.next` (default)
6. Install Command: `pnpm install` (or `npm install`)

## Step 3: Add Environment Variables

In Vercel Dashboard:

1. Go to your project
2. Click "Settings"
3. Go to "Environment Variables"
4. Add all Firebase variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Make sure all variables are set for:
- Production
- Preview
- Development

5. Click "Save"

## Step 4: Deploy

### 4.1 Automatic Deployment

Once you push to GitHub, Vercel automatically:
1. Builds your project
2. Runs tests (if configured)
3. Deploys to preview URL
4. Shows deployment status

### 4.2 Manual Deployment

To manually trigger deployment:

1. Go to Vercel Dashboard
2. Select your project
3. Go to "Deployments"
4. Click "Redeploy" on any deployment
5. Select environment and branch
6. Click "Redeploy"

## Step 5: Configure Custom Domain

### 5.1 Add Domain in Vercel

1. In project settings, go to "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., royalgypsum.com)
4. Click "Add"

### 5.2 Configure DNS

Follow Vercel's instructions to update DNS records at your domain registrar:

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Update DNS settings with Vercel's nameservers OR
3. Add CNAME/A records as shown in Vercel dashboard
4. Wait for DNS propagation (can take 24-48 hours)

### 5.3 Enable HTTPS

Vercel automatically provisions SSL certificate for custom domains.

## Step 6: Verify Deployment

### 6.1 Check Deployment Status

1. Visit your Vercel URL: `https://royal-gypsum.vercel.app`
2. Check all pages load correctly
3. Verify admin panel is accessible

### 6.2 Test Public Pages

- [ ] Home page loads
- [ ] About page loads
- [ ] Services page loads
- [ ] Contact form submits
- [ ] Header/footer display correctly

### 6.3 Test Admin Panel

- [ ] Login page works
- [ ] Admin can login with Firebase credentials
- [ ] Dashboard shows stats
- [ ] Can navigate to different sections
- [ ] Can create/edit/delete content
- [ ] Can upload media
- [ ] Can view contact messages

## Step 7: Post-Deployment Setup

### 7.1 Update Firebase Security Rules

Ensure Firestore security rules are properly configured (see FIREBASE_SETUP.md)

### 7.2 Configure Email Notifications (Optional)

To send email notifications when contacts submit the form:

1. Set up Firebase Extension for emails, or
2. Integrate Mailgun/SendGrid via API

### 7.3 Set Up Monitoring

1. Go to Vercel Analytics
2. Monitor site performance
3. Set up error tracking with Sentry (optional)

### 7.4 Create Backups

1. Enable Firestore automatic backups
2. Set up regular data exports

## Troubleshooting

### Build Fails with "Invalid API Key"

**Solution**: Environment variables not set in Vercel

1. Go to project Settings → Environment Variables
2. Verify all FIREBASE variables are present
3. Click "Redeploy" after adding/updating variables

### Pages Show Blank or 404

**Solution**: Routes not configured correctly

1. Check that all page files exist in `/app` directory
2. Verify file naming follows Next.js conventions
3. Check build logs for errors

### Admin Panel Shows Loading but Never Loads

**Solution**: Firebase initialization issue

1. Verify environment variables are correct
2. Check Firebase project is active
3. Check browser console for errors
4. Try incognito/private browsing to clear cache

### Contact Form Not Saving

**Solution**: Firestore write permission issue

1. Check Firestore security rules allow writes
2. Verify contacts collection exists
3. Check browser console for specific error

### Image Upload Fails

**Solution**: Cloud Storage permission issue

1. Verify Cloud Storage rules allow authenticated users
2. Check storage bucket is active
3. Check user is authenticated
4. Verify file size is reasonable

### Custom Domain Not Working

**Solution**: DNS propagation or configuration issue

1. Wait 24-48 hours for DNS propagation
2. Verify DNS records in registrar match Vercel's requirements
3. Clear browser cache
4. Try different browser/device
5. Check Vercel domain settings for errors

## Monitoring & Maintenance

### Daily Tasks
- Check for error logs
- Review new contact messages
- Monitor site performance

### Weekly Tasks
- Update content as needed
- Review analytics
- Check Firebase metrics

### Monthly Tasks
- Review and update services
- Check user management
- Backup database
- Review security settings

## Rollback Procedure

If deployment has issues:

1. Go to Vercel Deployments
2. Find previous stable deployment
3. Click three dots menu
4. Select "Promote to Production"
5. Verify site works

## Performance Optimization

### Image Optimization
- Use Next.js Image component for images
- Compress images before upload (under 2MB recommended)
- Use WebP format when possible

### Database Optimization
- Index frequently queried fields in Firestore
- Archive old contact messages
- Clean up unused media files

### Caching
- Vercel automatically caches static pages
- Configure ISR (Incremental Static Regeneration) for dynamic content
- Set appropriate cache headers

## Security Checklist

- [ ] Firebase security rules are restrictive
- [ ] Admin accounts use strong passwords
- [ ] Environment variables not exposed in code
- [ ] HTTPS enabled for all pages
- [ ] Regular security audits performed
- [ ] Backup strategy in place
- [ ] Rate limiting configured (if needed)

## Support

If you encounter issues:

1. Check Vercel Documentation: https://vercel.com/docs
2. Check Firebase Documentation: https://firebase.google.com/docs
3. Check Next.js Documentation: https://nextjs.org/docs
4. Check deployment logs in Vercel Dashboard
5. Open issue in repository

---

Happy deploying! Your Royal Gypsum website will be live soon.
