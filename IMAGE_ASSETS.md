# Royal Gypsum Plastering - Image Assets Guide

## Overview
This document describes all professional sample images included with the website. These images can be used as default content or replaced with your own photos.

## Generated Images

### 1. Hero Plastering (`/images/hero-plastering.jpg`)
**Purpose:** Featured image for custom finishing services and hero section
**Dimensions:** Optimized for web (650KB)
**Content:** Professional plastering team applying gypsum finish
**Used In:** 
- Home page - Services section
- Custom Finishing service card
- Admin dashboard mockups

---

### 2. Interior Finish (`/images/interior-finish.jpg`)
**Purpose:** Premium residential interior finishing
**Dimensions:** Optimized for web (68KB)
**Content:** Smooth gypsum wall finish in modern room
**Used In:**
- Services page - Professional Drywall Installation
- Home page services showcase
- Before/after examples

---

### 3. Commercial Project (`/images/commercial-project.jpg`)
**Purpose:** Large-scale commercial applications
**Dimensions:** Optimized for web (100KB)
**Content:** Commercial building interior with drywall installation
**Used In:**
- Services page - Large Commercial Projects
- Case studies section
- Commercial solutions showcase

---

### 4. Ceiling Installation (`/images/ceiling-installation.jpg`)
**Purpose:** Suspended ceiling systems
**Dimensions:** Optimized for web (69KB)
**Content:** Professional ceiling installation in modern space
**Used In:**
- Services page - Suspended Ceiling Systems
- Installation services portfolio
- Commercial applications

---

### 5. Fireproof Board (`/images/fireproof-board.jpg`)
**Purpose:** Fire-resistant product showcase
**Dimensions:** Optimized for web (53KB)
**Content:** Fire-resistant gypsum board material detail
**Used In:**
- Services page - Fire-Resistant Gypsum Board
- Safety solutions section
- Product specifications

---

### 6. Moisture Resistant (`/images/moisture-resistant.jpg`)
**Purpose:** Water-resistant gypsum applications
**Dimensions:** Optimized for web (68KB)
**Content:** Moisture-resistant board for wet areas
**Used In:**
- Services page - Moisture-Resistant Gypsum
- Bathroom/kitchen applications
- Specialty products section

---

### 7. Soundproof Solution (`/images/soundproof-solution.jpg`)
**Purpose:** Acoustic insulation systems
**Dimensions:** Optimized for web (73KB)
**Content:** Sound-control installation in modern space
**Used In:**
- Services page - Sound-Control Gypsum Solutions
- Acoustic solutions portfolio
- Benefits showcase

---

### 8. Renovation Before-After (`/images/renovation-before-after.jpg`)
**Purpose:** Complete renovation transformations
**Dimensions:** Optimized for web (115KB)
**Content:** Home renovation with new gypsum installation
**Used In:**
- Services page - Complete Renovation Services
- Transformation examples
- Success stories

---

## Sample Services Data

The website includes 8 pre-configured services with images:

1. **Professional Drywall Installation** - `/images/interior-finish.jpg`
2. **Fire-Resistant Gypsum Board** - `/images/fireproof-board.jpg`
3. **Moisture-Resistant Gypsum** - `/images/moisture-resistant.jpg`
4. **Sound-Control Gypsum Solutions** - `/images/soundproof-solution.jpg`
5. **Suspended Ceiling Systems** - `/images/ceiling-installation.jpg`
6. **Large Commercial Projects** - `/images/commercial-project.jpg`
7. **Complete Renovation Services** - `/images/renovation-before-after.jpg`
8. **Custom Finishing & Texture** - `/images/hero-plastering.jpg`

### Accessing Sample Data

Sample data is loaded automatically when Firebase is not configured. The data includes:
- Service descriptions, details, and features
- Professional product categories
- Sample page content (Home, About)

Location: `/lib/sampleData.ts`

---

## Using Images in Admin Panel

### Step 1: Upload Images to Firebase Storage
1. Go to `/admin/media`
2. Click "Upload Media" or drag files to upload
3. Select image files from your local drive

### Step 2: Associate with Services
1. Go to `/admin/services`
2. Edit a service
3. Paste the Firebase Storage URL into the image field

### Step 3: Use in Content Pages
1. Go to `/admin/pages`
2. Edit page content
3. Include image URLs in HTML: `<img src="URL" alt="Description">`

---

## Replacing Sample Images

### With Your Own Photos
1. Add images to `/public/images/` folder
2. Update image references in `/lib/sampleData.ts`
3. Or upload via admin panel to Firebase Storage

### Recommended Image Specifications
- **Format:** JPG or PNG
- **Width:** 800px - 1200px for product cards
- **Height:** 600px - 800px for service showcases
- **File Size:** Keep under 150KB for optimal performance
- **Aspect Ratio:** 16:9 or 4:3 for consistency

---

## Image Optimization Tips

1. **Compression:** Use modern image compression tools
2. **CDN:** Firebase Storage automatically serves via CDN
3. **Lazy Loading:** Images in cards use lazy loading by default
4. **Alt Text:** Always include descriptive alt text for accessibility
5. **Responsive:** Images automatically scale on mobile devices

---

## Image Placement in Components

### Home Page
- Hero section: Featured background
- Service cards: 3 column grid with hover effects
- Benefits section: Icon backgrounds

### Services Page
- Product showcase: 3 column grid with gradient overlays
- Product details: Full width with image overlay

### About Page
- Company info: Card-based layout
- Team members: Placeholder gradient backgrounds

---

## Static vs. Dynamic Images

**Static Images** (in `/public/images/`):
- Fast loading
- No authentication needed
- Use for sample/default content

**Dynamic Images** (Firebase Storage):
- Uploaded by admin
- Private storage options
- Used for custom content

---

## Troubleshooting Image Issues

**Images not showing:**
1. Check image path is correct
2. Verify file exists in `/public/images/`
3. Check Firebase Storage permissions if using dynamic images
4. Clear browser cache

**Images loading slowly:**
1. Compress images to under 150KB
2. Use modern formats (JPEG, WebP)
3. Check image dimensions aren't oversized

**Missing alt text warnings:**
- All images in sample data include descriptions
- Update alt text in admin panel when changing images

---

## File Structure
```
/public/images/
├── hero-plastering.jpg (111KB)
├── interior-finish.jpg (68KB)
├── commercial-project.jpg (100KB)
├── ceiling-installation.jpg (69KB)
├── fireproof-board.jpg (53KB)
├── moisture-resistant.jpg (68KB)
├── soundproof-solution.jpg (73KB)
└── renovation-before-after.jpg (115KB)

Total: ~668KB
```

All images are professionally optimized for web use and designed to showcase the quality and professionalism of Royal Gypsum Plastering services.
