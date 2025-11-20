# Facebook App Configuration Guide

This guide will help you set up a Facebook App for use with SocialFlow.

## Step 1: Create a Facebook Developer Account

1. Go to [https://developers.facebook.com/](https://developers.facebook.com/)
2. Click "Get Started" or "My Apps"
3. Log in with your Facebook account
4. Complete the registration process if you're a new developer

## Step 2: Create a New App

1. Click "Create App" button
2. Select "Business" as the app type
3. Fill in the app details:
   - **App Name**: SocialFlow (or your preferred name)
   - **App Contact Email**: Your email address
   - **Business Account**: Select or create one
4. Click "Create App"
5. Complete the security check

## Step 3: Configure Facebook Login

1. In your app dashboard, find "Facebook Login" in the products list
2. Click "Set Up"
3. Select "Web" as the platform
4. Enter your site URL: `http://localhost:5173` (for development)
5. Click "Save"
6. Go to Facebook Login > Settings
7. Add these Valid OAuth Redirect URIs:
   ```
   http://localhost:5173/
   http://localhost:5173
   ```
8. Enable "Login with the JavaScript SDK"
9. Click "Save Changes"

## Step 4: Add Pages API

1. In the left sidebar, click "Add Product"
2. Find "Pages API" and click "Set Up"
3. No additional configuration needed for basic setup

## Step 5: Configure App Settings

1. Go to Settings > Basic
2. Note your **App ID** - you'll need this!
3. Add your **App Domains**: `localhost`
4. Add a **Privacy Policy URL** (required for production)
5. Add a **Terms of Service URL** (optional but recommended)
6. Select a **Category** for your app
7. Click "Save Changes"

## Step 6: Configure Permissions

1. Go to App Review > Permissions and Features
2. Request the following permissions (for production use):
   - `pages_show_list` - To display user's pages
   - `pages_read_engagement` - To read page insights
   - `pages_manage_posts` - To create posts
   - `pages_manage_engagement` - To manage post engagement
   - `public_profile` - Basic profile info
   - `email` - User's email address

**Note**: For development, you can use these permissions without review. For production, you'll need to submit your app for review.

## Step 7: Add Test Users (Optional)

1. Go to Roles > Test Users
2. Click "Add" to create test users
3. Use these accounts to test your app without affecting real data

## Step 8: Configure Your App Code

1. Open `src/services/facebookService.js` in your project
2. Find this line:
   ```javascript
   appId: 'YOUR_FACEBOOK_APP_ID',
   ```
3. Replace `'YOUR_FACEBOOK_APP_ID'` with your actual App ID from Step 5
4. Save the file

## Step 9: Set App Mode

### Development Mode (Default)
- Your app starts in Development Mode
- Only you and added testers can use it
- No app review required
- Perfect for testing

### Live Mode (Production)
To make your app public:
1. Complete all required settings
2. Add Privacy Policy URL
3. Submit required permissions for review
4. Wait for Facebook approval
5. Switch to Live Mode in Settings > Basic

## Step 10: Test Your App

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:5173` in your browser
3. Click "Connect Facebook"
4. Log in with your Facebook account (or test user)
5. Authorize the requested permissions
6. You should see your account connected!

## Common Issues and Solutions

### Issue: "App Not Set Up" Error
**Solution**: Make sure you've added `http://localhost:5173` to Valid OAuth Redirect URIs

### Issue: "Invalid App ID"
**Solution**: Double-check that you've copied the correct App ID from Settings > Basic

### Issue: Permissions Not Working
**Solution**: 
- Ensure you've added the Pages API product
- Check that your Facebook account manages at least one page
- Try logging out and logging back in

### Issue: "This app is in development mode"
**Solution**: This is normal! You can still use it. To go live, complete the app review process.

### Issue: Can't See Pages
**Solution**: 
- Make sure you're logged in with an account that manages Facebook pages
- Check that you've granted the `pages_show_list` permission
- Try clicking "Refresh Pages" in Settings

## Required Permissions Explained

| Permission | Purpose | Required For |
|------------|---------|--------------|
| `pages_show_list` | List user's pages | Displaying pages in Settings |
| `pages_read_engagement` | Read page insights | Analytics dashboard |
| `pages_manage_posts` | Create and manage posts | Post composer |
| `pages_manage_engagement` | Manage comments/reactions | Future features |
| `public_profile` | Basic profile info | User display in header |
| `email` | User's email | User identification |

## Production Checklist

Before deploying to production:

- [ ] Add production domain to App Domains
- [ ] Update OAuth Redirect URIs with production URLs
- [ ] Add Privacy Policy URL
- [ ] Add Terms of Service URL
- [ ] Submit app for review with required permissions
- [ ] Wait for approval
- [ ] Switch app to Live Mode
- [ ] Update `facebookService.js` with production App ID
- [ ] Set up proper backend for scheduling
- [ ] Implement secure token storage
- [ ] Add error tracking and monitoring

## Useful Links

- [Facebook Developers](https://developers.facebook.com/)
- [Graph API Documentation](https://developers.facebook.com/docs/graph-api)
- [Pages API Reference](https://developers.facebook.com/docs/pages)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- [App Review Process](https://developers.facebook.com/docs/app-review)

## Need Help?

- Check [Facebook Developer Community](https://developers.facebook.com/community/)
- Review [Facebook Platform Changelog](https://developers.facebook.com/docs/graph-api/changelog)
- Visit [Facebook Developer Support](https://developers.facebook.com/support/)

---

**Last Updated**: November 2024
**API Version**: v18.0
