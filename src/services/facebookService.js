// Facebook SDK Configuration
export const FACEBOOK_CONFIG = {
  appId: '4463895880505017', // Your Facebook App ID
  version: 'v18.0',
  cookie: true,
  xfbml: true,
  status: true
};

// Facebook API Endpoints
export const FB_API_BASE = 'https://graph.facebook.com';

// Permissions needed for posting
// Note: Using basic permissions that work in development mode
export const FB_PERMISSIONS = [
  'public_profile',
  'pages_show_list'
];

// Initialize Facebook SDK
export const initFacebookSDK = () => {
  return new Promise((resolve) => {
    // Load the SDK asynchronously
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: FACEBOOK_CONFIG.appId,
        cookie: FACEBOOK_CONFIG.cookie,
        xfbml: FACEBOOK_CONFIG.xfbml,
        version: FACEBOOK_CONFIG.version
      });

      window.FB.AppEvents.logPageView();
      resolve(window.FB);
    };

    // Load SDK script
    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  });
};

// Facebook Login
export const loginToFacebook = () => {
  return new Promise((resolve, reject) => {
    window.FB.login((response) => {
      if (response.authResponse) {
        resolve(response.authResponse);
      } else {
        reject(new Error('User cancelled login or did not fully authorize.'));
      }
    }, { scope: FB_PERMISSIONS.join(',') });
  });
};

// Get Facebook Login Status
export const getFacebookLoginStatus = () => {
  return new Promise((resolve) => {
    window.FB.getLoginStatus((response) => {
      resolve(response);
    });
  });
};

// Logout from Facebook
export const logoutFromFacebook = () => {
  return new Promise((resolve) => {
    window.FB.logout((response) => {
      resolve(response);
    });
  });
};

// Get User Profile
export const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    window.FB.api('/me', { fields: 'id,name,email,picture' }, (response) => {
      if (response && !response.error) {
        resolve(response);
      } else {
        reject(response.error);
      }
    });
  });
};

// Get User's Facebook Pages
export const getUserPages = () => {
  return new Promise((resolve, reject) => {
    window.FB.api('/me/accounts', (response) => {
      if (response && !response.error) {
        resolve(response.data || []);
      } else {
        reject(response.error);
      }
    });
  });
};

// Post to Facebook Page
export const postToFacebookPage = (pageId, accessToken, message, imageUrl = null) => {
  return new Promise((resolve, reject) => {
    const params = {
      message: message,
      access_token: accessToken
    };

    if (imageUrl) {
      params.url = imageUrl;
      window.FB.api(`/${pageId}/photos`, 'POST', params, (response) => {
        if (response && !response.error) {
          resolve(response);
        } else {
          reject(response.error);
        }
      });
    } else {
      window.FB.api(`/${pageId}/feed`, 'POST', params, (response) => {
        if (response && !response.error) {
          resolve(response);
        } else {
          reject(response.error);
        }
      });
    }
  });
};

// Schedule a post (Note: Facebook doesn't support direct scheduling via SDK)
// You would need to implement this with a backend service
export const schedulePost = async (pageId, accessToken, message, scheduledTime, imageUrl = null) => {
  // This is a placeholder - in production, you'd send this to your backend
  // which would store it and post at the scheduled time
  const postData = {
    pageId,
    message,
    scheduledTime,
    imageUrl,
    status: 'scheduled'
  };

  // For now, we'll just return the data structure
  // In production, send this to your backend API
  console.log('Scheduling post:', postData);
  return postData;
};

// Get Page Insights
export const getPageInsights = (pageId, accessToken, metrics = ['page_impressions', 'page_engaged_users']) => {
  return new Promise((resolve, reject) => {
    const metricsString = metrics.join(',');
    window.FB.api(
      `/${pageId}/insights`,
      'GET',
      {
        metric: metricsString,
        access_token: accessToken,
        period: 'day'
      },
      (response) => {
        if (response && !response.error) {
          resolve(response.data || []);
        } else {
          reject(response.error);
        }
      }
    );
  });
};

// Get Page Posts
export const getPagePosts = (pageId, accessToken, limit = 10) => {
  return new Promise((resolve, reject) => {
    window.FB.api(
      `/${pageId}/posts`,
      'GET',
      {
        fields: 'id,message,created_time,permalink_url,full_picture',
        limit: limit,
        access_token: accessToken
      },
      (response) => {
        if (response && !response.error) {
          resolve(response.data || []);
        } else {
          reject(response.error);
        }
      }
    );
  });
};
