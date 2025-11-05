# 👥 Seed Users Guide

## Overview

MangaShelf comes with **two pre-configured seed users** (Rahman and Rivai) that can be automatically created for easy testing and demonstration purposes.

## Default Seed Users

| Username | Email | Password | Bio |
|----------|-------|----------|-----|
| **Rahman** | rahman@mangashelf.com | rahman123 | Manga enthusiast and collector. Love action and adventure series! |
| **Rivai** | rivai@mangashelf.com | rivai123 | Passionate manga reader. Into shonen and mystery genres. |

## How to Create Seed Users

### Prerequisites

1. **Firebase Project Setup**: Ensure you have a Firebase project with Authentication enabled
2. **Environment Variables**: Your `.env` file must be configured with valid Firebase credentials
3. **Authentication Enabled**: Email/Password authentication must be enabled in Firebase Console

### Step-by-Step Instructions

#### 1. Ensure Environment Variables are Set

Make sure your `.env` file exists in the root directory with Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### 2. Run the Seed Script

From your project root directory, run:

```bash
npm run seed-users
```

#### 3. Expected Output

You should see output similar to:

```
🌱 Starting user seeding process...
================================

📝 Creating user: Rahman...
✅ User created successfully!
   Username: Rahman
   Email: rahman@mangashelf.com
   Password: rahman123
   UID: abc123def456...

📝 Creating user: Rivai...
✅ User created successfully!
   Username: Rivai
   Email: rivai@mangashelf.com
   Password: rivai123
   UID: xyz789uvw012...

================================
✅ User seeding completed!

📋 Login Credentials:
--------------------------------
Username: Rahman
Email: rahman@mangashelf.com
Password: rahman123
--------------------------------
Username: Rivai
Email: rivai@mangashelf.com
Password: rivai123
--------------------------------
```

#### 4. If Users Already Exist

If the users already exist in your Firebase project, you'll see:

```
ℹ️  User Rahman already exists!
   Email: rahman@mangashelf.com
   Password: rahman123
```

This is normal and means the users were previously created.

## Using Seed Users

### Quick Login Buttons

The login page (`/login`) includes **Quick Login** buttons for both seed users:

1. Navigate to the login page
2. Look for the "Quick Login (Seed Users)" section
3. Click either the **Rahman** or **Rivai** button
4. You'll be automatically logged in!

### Manual Login

You can also login manually:

1. Go to the login page
2. Enter email and password:
   - Rahman: `rahman@mangashelf.com` / `rahman123`
   - Rivai: `rivai@mangashelf.com` / `rivai123`
3. Click "Sign In"

## What Gets Created

When you run the seed script, the following is created in Firebase:

### Firebase Authentication

Each user is registered in Firebase Authentication with:
- Email/Password authentication
- Display name set
- UID generated

### Firestore User Document

A user document is created in the `users` collection with:

```javascript
{
  uid: "generated-uid",
  email: "user@mangashelf.com",
  displayName: "Username",
  photoURL: null,
  role: "user",
  bio: "User bio text",
  createdAt: "2024-...",
  updatedAt: "2024-...",
  stats: {
    totalManga: 0,
    reading: 0,
    completed: 0,
    onHold: 0,
    dropped: 0,
    planToRead: 0
  },
  following: [],
  followers: []
}
```

## Troubleshooting

### Error: "auth/email-already-in-use"

**Cause**: The users already exist in your Firebase project.

**Solution**: This is not an error! The script handles this gracefully. You can login with the existing credentials.

### Error: Firebase config not found

**Cause**: Environment variables are not set or `.env` file is missing.

**Solution**: 
1. Create a `.env` file in the root directory
2. Copy contents from `.env.example`
3. Replace with your actual Firebase credentials

### Error: "auth/operation-not-allowed"

**Cause**: Email/Password authentication is not enabled in Firebase Console.

**Solution**:
1. Go to Firebase Console > Authentication > Sign-in method
2. Enable "Email/Password" provider
3. Save and try again

### Error: "auth/weak-password"

**Cause**: The seed passwords are considered too weak by Firebase (less than 6 characters).

**Solution**: The default passwords (rahman123, rivai123) are 9 characters and should work. If you've modified the passwords in the script, ensure they're at least 6 characters.

## Customizing Seed Users

You can customize the seed users by editing `/scripts/seed-users.js`:

```javascript
const seedUsers = [
  {
    displayName: 'Your Name',
    email: 'your-email@example.com',
    password: 'your-password',
    bio: 'Your bio text'
  },
  // Add more users...
];
```

After editing, run `npm run seed-users` again to create the new users.

## Security Considerations

### For Development

- The seed users are perfect for development and testing
- Passwords are simple and easy to remember
- No real user data is at risk

### For Production

⚠️ **Important**: 

1. **Do NOT use seed users in production** with these simple passwords
2. If you deploy to production:
   - Delete the seed users from Firebase Authentication
   - Or change their passwords to something secure
   - Or disable the Quick Login feature in the code

3. **Remove Quick Login buttons** before production deployment:
   - Edit `/src/components/auth/Login.jsx`
   - Remove the Quick Login section (lines 139-161)

## Best Practices

### For Testing

✅ Use seed users for:
- Local development
- Staging environment
- Demo presentations
- QA testing
- User acceptance testing (UAT)

### For Team Collaboration

- Share the seed user credentials with your team
- Keep them updated in documentation
- Use consistent credentials across environments

### For Demos

- Create sample manga data for seed users
- Add reviews and activities
- Show social interactions between Rahman and Rivai
- Demonstrate all features with realistic data

## Related Scripts

- **Create Demo Account**: `npm run setup-demo` (creates a single demo user)
- **Check Firebase Config**: `npm run check-config` (validates your Firebase setup)

## Support

If you encounter issues with seed users:

1. Check the troubleshooting section above
2. Verify your Firebase configuration
3. Ensure Authentication is properly enabled
4. Check the browser console for detailed error messages
5. Review Firebase Console > Authentication for user status

## Summary

✅ Two seed users (Rahman & Rivai) ready for testing  
✅ Simple one-command creation: `npm run seed-users`  
✅ Quick Login buttons for easy access  
✅ Perfect for development, testing, and demos  
⚠️ Remember to secure or remove before production  

Happy testing! 🎉
