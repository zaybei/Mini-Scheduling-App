# 🔧 Fix Facebook Connection on Vercel

## Issue
Your app is deployed at **https://mini-scheduling-app.vercel.app/** but Facebook authentication isn't working because the domain isn't authorized in your Facebook App settings.

## ✅ Solution: Update Facebook App Settings

Follow these steps to fix the Facebook connection:

### Step 1: Go to Facebook Developers Dashboard

1. Open [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps"
3. Select your SocialFlow app

### Step 2: Add Vercel Domain to App Domains

1. In the left sidebar, click **Settings** → **Basic**
2. Scroll down to **App Domains**
3. Click **Add Domain**
4. Add: `mini-scheduling-app.vercel.app`
5. Click **Save Changes** at the bottom

### Step 3: Update OAuth Redirect URIs

1. In the left sidebar, click **Facebook Login** → **Settings**
2. Find **Valid OAuth Redirect URIs**
3. Add these URLs (keep the localhost one for development):
   ```
   http://localhost:5173/
   https://mini-scheduling-app.vercel.app/
   ```
4. Click **Save Changes**

### Step 4: Update Site URL (Optional but Recommended)

1. Go back to **Settings** → **Basic**
2. Scroll to **Site URL**
3. Add: `https://mini-scheduling-app.vercel.app/`
4. Click **Save Changes**

### Step 5: Verify Your Changes

After making these changes:

1. Wait 1-2 minutes for Facebook to process the changes
2. Go to your Vercel app: https://mini-scheduling-app.vercel.app/
3. Click **Connect Facebook**
4. It should now work! 🎉

## 📋 Quick Checklist

- [ ] Added `mini-scheduling-app.vercel.app` to App Domains
- [ ] Added `https://mini-scheduling-app.vercel.app/` to OAuth Redirect URIs
- [ ] Added `https://mini-scheduling-app.vercel.app/` to Site URL
- [ ] Saved all changes
- [ ] Waited 1-2 minutes
- [ ] Tested the connection

## 🎯 Expected Facebook App Settings

After completing the steps, your Facebook app should have:

**App Domains:**
```
mini-scheduling-app.vercel.app
```

**Valid OAuth Redirect URIs:**
```
http://localhost:5173/
https://mini-scheduling-app.vercel.app/
```

**Site URL:**
```
https://mini-scheduling-app.vercel.app/
```

## 🔍 Troubleshooting

### Issue: "Given URL is not allowed by the Application configuration"
**Solution**: Make sure you added the EXACT URL to OAuth Redirect URIs, including the trailing slash

### Issue: "App Not Set Up"
**Solution**: 
- Check that you added the domain to App Domains
- Verify the domain doesn't have `https://` in App Domains (just the domain)
- Wait a few minutes and try again

### Issue: Still not working after 5 minutes
**Solution**:
1. Clear your browser cache
2. Try in an incognito/private window
3. Check browser console for errors (F12)
4. Verify your Facebook App ID is correct in the code

### Issue: "This app is in development mode"
**Solution**: This is normal! Your app works in development mode. To make it public:
1. Complete all required settings in Facebook app
2. Add Privacy Policy URL
3. Submit for App Review
4. Wait for approval

## 📱 Testing After Configuration

1. Open: https://mini-scheduling-app.vercel.app/
2. Open browser console (F12) to check for errors
3. Click "Connect Facebook"
4. You should see the Facebook login popup
5. Authorize the app
6. You should be logged in!

## 🎨 Visual Guide

### Where to Find Settings:

**Facebook Developers Dashboard:**
```
My Apps → [Your App] → Settings → Basic
  ↓
  App Domains: mini-scheduling-app.vercel.app
  Site URL: https://mini-scheduling-app.vercel.app/
```

**Facebook Login Settings:**
```
My Apps → [Your App] → Facebook Login → Settings
  ↓
  Valid OAuth Redirect URIs:
    - http://localhost:5173/
    - https://mini-scheduling-app.vercel.app/
```

## 🚀 After It's Working

Once Facebook connection is working:

1. **Test All Features**
   - Connect your Facebook account
   - Load your pages in Settings
   - Create a test post
   - View analytics

2. **Share Your App**
   - Your app is now live at: https://mini-scheduling-app.vercel.app/
   - Share with friends and colleagues
   - Get feedback

3. **Monitor Usage**
   - Check Vercel analytics
   - Monitor Facebook API usage
   - Watch for errors

## 📝 Important Notes

### Development vs Production

You now have TWO working environments:

**Development (Local):**
- URL: http://localhost:5173
- For testing and development
- Run with: `npm run dev`

**Production (Vercel):**
- URL: https://mini-scheduling-app.vercel.app/
- Live for everyone
- Auto-deploys when you push to GitHub

### Facebook App Modes

**Development Mode (Current):**
- Only you and test users can use it
- No app review needed
- Perfect for testing

**Live Mode (Future):**
- Anyone can use it
- Requires Facebook app review
- Need Privacy Policy URL
- Need to submit permissions for review

## 🎯 Next Steps

1. **Fix Facebook Settings** (follow steps above)
2. **Test the Connection** on Vercel
3. **Add Privacy Policy** (if you want to go live)
4. **Submit for Review** (optional, for public use)

## 💡 Pro Tips

- Keep both localhost and Vercel URLs in OAuth settings
- Test locally before pushing to GitHub (auto-deploys to Vercel)
- Use browser console to debug issues
- Check Facebook Developer logs for API errors

## ✅ Success Criteria

You'll know it's working when:
- ✅ No console errors on Vercel app
- ✅ "Connect Facebook" button works
- ✅ Facebook login popup appears
- ✅ You can authorize the app
- ✅ Your profile appears in the header
- ✅ You can load pages in Settings
- ✅ You can create posts

---

**Need Help?** Check the browser console (F12) for specific error messages.

**Still Stuck?** Make sure:
1. Facebook App ID is correct in your code
2. All URLs are added to Facebook app settings
3. You've waited a few minutes after making changes
4. You're using the correct Facebook account
