# SocialFlow - Social Media Scheduling App

A modern, beautiful social media scheduling web application similar to Buffer, built with React and Facebook Graph API integration.

![SocialFlow](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![Facebook API](https://img.shields.io/badge/Facebook%20API-v18.0-4267B2)

## 🔗 Repository

**GitHub**: [https://github.com/zaybei/Mini-Scheduling-App](https://github.com/zaybei/Mini-Scheduling-App)

```bash
# Clone the repository
git clone https://github.com/zaybei/Mini-Scheduling-App.git
cd Mini-Scheduling-App
npm install
```

## ✨ Features

- 🔐 **Facebook Authentication** - Secure OAuth login with Facebook
- 📝 **Post Composer** - Create and schedule posts with rich text and images
- 📊 **Analytics Dashboard** - Track engagement, impressions, and post performance
- 📅 **Post Scheduling** - Schedule posts for optimal engagement times
- 🎨 **Modern UI** - Stunning light-themed interface with smooth animations
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🔄 **Multi-Page Management** - Manage multiple Facebook pages from one dashboard
- 📈 **Real-time Insights** - View page insights and engagement metrics

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Facebook Developer Account
- A Facebook App with appropriate permissions

### Facebook App Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or use an existing one
3. Add the following products to your app:
   - Facebook Login
   - Pages API
4. Configure OAuth redirect URIs:
   - Add `http://localhost:5173/` for development
5. Get your App ID from the app dashboard
6. Required permissions:
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_manage_posts`
   - `pages_manage_engagement`
   - `public_profile`
   - `email`

### Installation

1. Clone or navigate to the project directory:
```bash
cd buffer_app
```

2. Install dependencies:
```bash
npm install
```

3. Configure Facebook App ID:
   - Open `src/services/facebookService.js`
   - Replace `YOUR_FACEBOOK_APP_ID` with your actual Facebook App ID:
   ```javascript
   export const FACEBOOK_CONFIG = {
     appId: 'YOUR_ACTUAL_APP_ID_HERE',
     version: 'v18.0',
     // ...
   };
   ```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🎯 Usage

### Connecting Your Facebook Account

1. Click the "Connect Facebook" button in the header
2. Authorize the app with the required permissions
3. Your account will be connected and displayed in the header

### Managing Pages

1. Navigate to **Settings** from the sidebar
2. Click "Connect Pages" to load your Facebook pages
3. All your managed pages will be displayed

### Creating a Post

1. Navigate to **Create Post** from the sidebar
2. Write your post content (up to 5,000 characters)
3. Optionally add an image URL
4. Select which pages to post to
5. Choose to post immediately or schedule for later
6. Click "Publish Now" or "Schedule Post"

### Viewing Analytics

1. Navigate to **Analytics** from the sidebar
2. Select a page from the dropdown (if you have multiple pages)
3. View metrics like:
   - Page Impressions
   - Engaged Users
   - Recent Posts
4. Click on individual posts to view them on Facebook

## 🏗️ Project Structure

```
buffer_app/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Top navigation with auth
│   │   ├── Header.css
│   │   ├── Sidebar.jsx         # Side navigation menu
│   │   ├── Sidebar.css
│   │   ├── Dashboard.jsx       # Main dashboard view
│   │   ├── Dashboard.css
│   │   ├── Composer.jsx        # Post creation interface
│   │   ├── Composer.css
│   │   ├── Analytics.jsx       # Analytics and insights
│   │   ├── Analytics.css
│   │   ├── Settings.jsx        # Settings and page management
│   │   └── Settings.css
│   ├── services/
│   │   └── facebookService.js  # Facebook API integration
│   ├── App.jsx                 # Main app component
│   ├── App.css
│   ├── index.css               # Global styles and design system
│   └── main.jsx                # App entry point
├── index.html
├── package.json
└── README.md
```

## 🎨 Design System

The app features a comprehensive design system with:

- **Color Palette**: Vibrant gradients and harmonious colors
- **Typography**: Inter and Outfit Google Fonts
- **Animations**: Smooth micro-animations and transitions
- **Components**: Reusable buttons, cards, inputs, and badges
- **Glassmorphism**: Modern glass effects on UI elements

### Key Design Tokens

- Primary: `hsl(220, 90%, 56%)`
- Secondary: `hsl(280, 85%, 60%)`
- Accent: `hsl(340, 82%, 58%)`
- Success: `hsl(142, 71%, 45%)`

## 🔧 Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Facebook Graph API v18.0** - Social media integration
- **CSS3** - Styling with custom properties and animations
- **JavaScript ES6+** - Modern JavaScript features

## 📝 API Reference

### Facebook Service Functions

- `initFacebookSDK()` - Initialize the Facebook SDK
- `loginToFacebook()` - Authenticate user with Facebook
- `logoutFromFacebook()` - Log out the current user
- `getUserProfile()` - Get user profile information
- `getUserPages()` - Fetch user's managed pages
- `postToFacebookPage()` - Post content to a page
- `schedulePost()` - Schedule a post (requires backend)
- `getPageInsights()` - Get page analytics
- `getPagePosts()` - Fetch recent posts from a page

## 🚧 Important Notes

### Scheduling Posts

The current implementation includes a scheduling interface, but **Facebook's Graph API does not support direct post scheduling via the JavaScript SDK**. To implement full scheduling functionality, you would need to:

1. Set up a backend server (Node.js, Python, etc.)
2. Store scheduled posts in a database
3. Use a cron job or task scheduler to post at the scheduled time
4. Use the page access token to post on behalf of the page

The current app demonstrates the UI/UX for scheduling but stores the data locally.

### Production Deployment

Before deploying to production:

1. Set up a proper backend for scheduling
2. Implement secure token storage
3. Add environment variables for sensitive data
4. Configure Facebook app for production domain
5. Implement proper error handling and logging
6. Add rate limiting and API quota management

## 🔒 Security Considerations

- Never commit your Facebook App ID or secrets to version control
- Use environment variables for sensitive configuration
- Implement proper CORS policies
- Validate all user inputs
- Use HTTPS in production
- Implement proper session management

## 🤝 Contributing

This is a demonstration project. Feel free to fork and modify for your own use.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Facebook Graph API Documentation
- React Documentation
- Vite Documentation
- Design inspiration from Buffer, Hootsuite, and modern web apps

## 📞 Support

For issues or questions:
1. Check the Facebook Developer documentation
2. Review the code comments
3. Ensure your Facebook app is properly configured
4. Verify all required permissions are granted

---

**Built with ❤️ using React and Facebook Graph API**
