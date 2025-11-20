import { useState } from 'react';
import './Header.css';
import { loginToFacebook, logoutFromFacebook, getUserProfile } from '../services/facebookService';

const Header = ({ user, onLogin, onLogout }) => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = async () => {
        setIsLoggingIn(true);
        try {
            const authResponse = await loginToFacebook();
            const userProfile = await getUserProfile();

            onLogin({
                ...userProfile,
                accessToken: authResponse.accessToken
            });
        } catch (error) {
            console.error('Login error:', error);
            alert('Failed to login with Facebook. Please try again.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutFromFacebook();
            onLogout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo">
                    <div className="logo-icon">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
                            <path
                                d="M16 8L20 12L16 16L12 12L16 8Z"
                                fill="white"
                                opacity="0.9"
                            />
                            <path
                                d="M16 16L20 20L16 24L12 20L16 16Z"
                                fill="white"
                                opacity="0.7"
                            />
                            <defs>
                                <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32">
                                    <stop offset="0%" stopColor="hsl(220, 90%, 56%)" />
                                    <stop offset="100%" stopColor="hsl(280, 85%, 60%)" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <span className="logo-text">SocialFlow</span>
                </div>

                <div className="header-actions">
                    {user ? (
                        <div className="user-menu">
                            <div className="user-info">
                                <img
                                    src={user.picture?.data?.url || 'https://via.placeholder.com/40'}
                                    alt={user.name}
                                    className="user-avatar"
                                />
                                <div className="user-details">
                                    <span className="user-name">{user.name}</span>
                                    <span className="user-email">{user.email}</span>
                                </div>
                            </div>
                            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M3 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h5v-2H4V3h4V1H3zm9.707 4.293l-4 4a1 1 0 0 0 0 1.414l4 4 1.414-1.414L11.414 11H16V9h-4.586l2.707-2.707-1.414-1.414z" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={handleLogin}
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? (
                                <>
                                    <div className="btn-spinner"></div>
                                    Connecting...
                                </>
                            ) : (
                                <>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" />
                                    </svg>
                                    Connect Facebook
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
