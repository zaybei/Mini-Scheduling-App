# ⚡ Quick Start Guide

Get SocialFlow up and running in 5 minutes!

## Prerequisites
- ✅ Node.js installed (already done!)
- ✅ npm installed (already done!)
- ✅ Facebook account

## Step 1: Get Your Facebook App ID (5 minutes)

### Option A: Create New Facebook App
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Business" type
4. Name it "SocialFlow" (or anything you like)
5. Add "Facebook Login" product
6. Add "Pages API" product
7. Go to Settings → Basic
8. Copy your **App ID**

### Option B: Use Existing App
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Select your app
3. Go to Settings → Basic
4. Copy your **App ID**

**📝 Note**: See `FACEBOOK_SETUP.md` for detailed instructions!

## Step 2: Configure the App (30 seconds)

1. Open this file in your code editor:
   ```
   src/services/facebookService.js
   ```

2. Find line 2 and replace the App ID:
   ```javascript
   // BEFORE:
   appId: 'YOUR_FACEBOOK_APP_ID',
   
   // AFTER:
   appId: '1234567890123456',  // Your actual App ID
   ```

3. Save the file

## Step 3: Configure Facebook App Settings (2 minutes)

1. In Facebook Developers, go to your app
2. Click "Facebook Login" → "Settings"
3. Add to "Valid OAuth Redirect URIs":
   ```
   http://localhost:5173/
   ```
4. Click "Save Changes"

## Step 4: Start Using the App! (Already Running!)

The development server is already running at:
```
http://localhost:5173
```

If you need to restart it:
```bash
npm run dev
```

## Step 5: Connect Your Facebook Account

1. Open http://localhost:5173 in your browser
2. Click the **"Connect Facebook"** button in the top-right
3. Log in with your Facebook account
4. Click "Continue" to authorize the app
5. Done! You're connected! 🎉

## Step 6: Add Your Facebook Pages

1. Click **"Settings"** in the sidebar
2. Click **"Connect Pages"** button
3. Your Facebook pages will load automatically
4. You'll see all pages you manage

## Step 7: Create Your First Post!

1. Click **"Create Post"** in the sidebar
2. Write your post content
3. (Optional) Add an image URL
4. Select which pages to post to
5. Choose "Post Now" or "Schedule for Later"
6. Click **"Publish Now"** or **"Schedule Post"**
7. Success! 🚀

## Troubleshooting

### "App Not Set Up" Error
**Fix**: Add `http://localhost:5173/` to OAuth Redirect URIs in Facebook app settings

### "Invalid App ID" Error
**Fix**: Double-check you copied the correct App ID from Facebook

### Can't See Pages
**Fix**: 
- Make sure you manage at least one Facebook page
- Click "Refresh Pages" in Settings
- Check that you granted the `pages_show_list` permission

### "This app is in development mode"
**Fix**: This is normal! You can still use it for testing. To go live, submit for Facebook review.

## What's Next?

### Explore the Features
- 📊 **Dashboard** - View your stats and activity
- ✍️ **Create Post** - Compose and schedule posts
- 📈 **Analytics** - Track engagement and insights
- ⚙️ **Settings** - Manage pages and account

### Read the Docs
- `README.md` - Full documentation
- `FACEBOOK_SETUP.md` - Detailed Facebook setup
- `PROJECT_SUMMARY.md` - Feature overview

### Customize
- Change colors in `src/index.css`
- Modify components in `src/components/`
- Add new features!

## Quick Reference

### Important Files
```
src/services/facebookService.js  ← Configure App ID here
src/index.css                    ← Design system & colors
src/components/                  ← All UI components
```

### Useful Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Facebook Permissions
The app requests these permissions:
- `pages_show_list` - See your pages
- `pages_read_engagement` - View insights
- `pages_manage_posts` - Create posts
- `pages_manage_engagement` - Manage posts
- `public_profile` - Your name and photo
- `email` - Your email address

## Need Help?

1. Check the error in browser console (F12)
2. Read `FACEBOOK_SETUP.md` for detailed setup
3. Review Facebook Developer documentation
4. Check that all permissions are granted

## Success Checklist

- [ ] Facebook App created
- [ ] App ID copied and configured
- [ ] OAuth redirect URI added
- [ ] Development server running
- [ ] Facebook account connected
- [ ] Pages loaded in Settings
- [ ] First post created

## 🎉 You're All Set!

Enjoy your beautiful social media scheduling app!

**App URL**: http://localhost:5173

---

**Need detailed instructions?** See `FACEBOOK_SETUP.md`
**Want to learn more?** See `README.md` and `PROJECT_SUMMARY.md`
