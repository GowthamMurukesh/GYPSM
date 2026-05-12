# Firebase Setup Guide

## Overview
This project uses Firebase for:
- Authentication (user login/signup)
- Firestore Database (content, services, users, messages)
- Cloud Storage (media uploads)

## Prerequisites
1. Google account
2. Firebase project created at https://console.firebase.google.com

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Name it "Royal Gypsum" (or preferred name)
4. Skip Google Analytics (optional)
5. Create the project

## Step 2: Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click "Web" app icon (</>)
4. Register app as "Royal Gypsum Website"
5. Copy the Firebase config object - you'll need it for environment variables

Your config should look like:
```javascript
{
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
}
```

## Step 3: Set Up Environment Variables

Create a `.env.local` file in the project root with:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Step 4: Enable Authentication

1. In Firebase Console, go to Authentication (left sidebar)
2. Go to "Sign-in method" tab
3. Click "Email/Password"
4. Enable "Email/Password" toggle
5. Save

## Step 5: Set Up Firestore Database

1. In Firebase Console, go to Firestore Database
2. Click "Create database"
3. Select "Production mode"
4. Choose location (default is fine)
5. Create

### Security Rules

After creating Firestore, go to "Rules" tab and replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() {
      return request.auth != null;
    }

    function userProfile() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
    }

    function hasRole(roles) {
      return signedIn() && userProfile().role in roles;
    }

    // Allow public read for published content
    match /pages/{document=**} {
      allow read: if resource.data.published == true || hasRole(['admin', 'editor']);
      allow write: if hasRole(['admin', 'editor']);
    }

    match /services/{document=**} {
      allow read: if resource.data.published == true || hasRole(['admin', 'editor']);
      allow write: if hasRole(['admin', 'editor']);
    }

    match /contacts/{document=**} {
      allow create: if true;
      allow read, update, delete: if hasRole(['admin', 'editor']);
    }

    match /media/{document=**} {
      allow read: if true;
      allow write: if hasRole(['admin', 'editor']);
    }

    match /users/{uid} {
      allow read: if signedIn() && (request.auth.uid == uid || hasRole(['admin']));
      allow create: if signedIn()
        && request.auth.uid == uid
        && request.resource.data.role == 'viewer';
      allow update, delete: if hasRole(['admin']);
    }
  }
}
```

## Step 6: Enable Cloud Storage

1. In Firebase Console, go to Storage
2. Click "Get started"
3. Start in Production mode
4. Choose default location
5. Create

### Storage Rules

Go to "Rules" tab and replace with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    function signedIn() {
      return request.auth != null;
    }

    function userProfile() {
      return firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data;
    }

    function hasRole(roles) {
      return signedIn() && userProfile().role in roles;
    }

    // Public site images can be read by visitors; CMS writes require staff access.
    match /media/{allPaths=**} {
      allow read: if true;
      allow write: if hasRole(['admin', 'editor']);
    }
  }
}
```

## Step 7: Create Initial Admin User

You need to create the first admin user manually:

1. In Firebase Console, go to Authentication
2. Click "Add user"
3. Enter admin email and password
4. Create
5. Note the User UID

Then manually create a user document in Firestore:

1. Go to Firestore Database
2. Create new collection called "users"
3. Create document with ID = (User UID from step 5)
4. Add fields:
   - email: (admin email)
   - displayName: "Admin"
   - role: "admin"
   - createdAt: (current timestamp)

## Step 8: Create Sample Collections

Create the following collections in Firestore (they can be empty initially):

- `pages` (for website pages)
- `services` (for services)
- `contacts` (for contact form submissions)
- `media` (for uploaded files)
- `users` (for user profiles)

## Deployment

Once configured locally and tested:

1. Deploy to Vercel
2. Add environment variables in Vercel project settings
3. Your app will work with Firebase backend

## Troubleshooting

**"Firebase API key is not set"**
- Check `.env.local` file exists in root directory
- Verify all environment variables are correctly copied from Firebase console
- Restart dev server after changes

**"Permission denied" errors**
- Ensure user is authenticated
- Check Firestore security rules allow the operation
- Verify user role is set correctly in users collection

**File upload fails**
- Check Cloud Storage rules allow authenticated users
- Verify file size is reasonable
- Check browser console for specific error

## Support

For Firebase documentation: https://firebase.google.com/docs
