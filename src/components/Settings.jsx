import { useState, useEffect } from 'react';
import './Settings.css';
import { getUserPages } from '../services/facebookService';

const Settings = ({ user, connectedPages, onPagesConnected }) => {
    const [isLoadingPages, setIsLoadingPages] = useState(false);
    const [pages, setPages] = useState(connectedPages);

    useEffect(() => {
        setPages(connectedPages);
    }, [connectedPages]);

    const handleConnectPages = async () => {
        if (!user) {
            alert('Please login with Facebook first');
            return;
        }

        setIsLoadingPages(true);
        try {
            const userPages = await getUserPages();
            setPages(userPages);
            onPagesConnected(userPages);
        } catch (error) {
            console.error('Error fetching pages:', error);
            alert('Failed to fetch pages. Please try again.');
        } finally {
            setIsLoadingPages(false);
        }
    };

    return (
        <div className="settings">
            <div className="settings-header">
                <h1 className="settings-title">Settings</h1>
                <p className="settings-subtitle">Manage your account and connected pages</p>
            </div>

            <div className="settings-grid">
                {/* Account Section */}
                <div className="settings-section">
                    <div className="section-header">
                        <div className="section-icon" style={{ background: 'linear-gradient(135deg, hsl(220, 90%, 56%) 0%, hsl(280, 85%, 60%) 100%)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="section-title">Account Information</h2>
                            <p className="section-description">Your Facebook account details</p>
                        </div>
                    </div>

                    <div className="settings-card">
                        {user ? (
                            <div className="account-info">
                                <div className="account-avatar">
                                    <img
                                        src={user.picture?.data?.url || 'https://via.placeholder.com/80'}
                                        alt={user.name}
                                    />
                                </div>
                                <div className="account-details">
                                    <h3>{user.name}</h3>
                                    <p>{user.email}</p>
                                    <span className="badge badge-success">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                                            <circle cx="6" cy="6" r="6" />
                                        </svg>
                                        Connected
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="account-empty">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="24" cy="24" r="20" />
                                    <path d="M24 16v8m0 4h.01" strokeLinecap="round" />
                                </svg>
                                <p>No account connected</p>
                                <span>Click "Connect Facebook" in the header to get started</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pages Section */}
                <div className="settings-section">
                    <div className="section-header">
                        <div className="section-icon" style={{ background: 'linear-gradient(135deg, hsl(142, 71%, 45%) 0%, hsl(170, 71%, 45%) 100%)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="section-title">Connected Pages</h2>
                            <p className="section-description">Manage your Facebook pages</p>
                        </div>
                    </div>

                    <div className="settings-card">
                        {user ? (
                            <>
                                <div className="pages-header">
                                    <p className="pages-count">
                                        {pages.length} {pages.length === 1 ? 'page' : 'pages'} connected
                                    </p>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={handleConnectPages}
                                        disabled={isLoadingPages}
                                    >
                                        {isLoadingPages ? (
                                            <>
                                                <div className="btn-spinner"></div>
                                                Loading...
                                            </>
                                        ) : (
                                            <>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z" clipRule="evenodd" />
                                                </svg>
                                                {pages.length > 0 ? 'Refresh Pages' : 'Connect Pages'}
                                            </>
                                        )}
                                    </button>
                                </div>

                                {pages.length === 0 ? (
                                    <div className="pages-empty">
                                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="8" y="8" width="32" height="32" rx="4" />
                                            <path d="M16 20h16M16 28h10" strokeLinecap="round" />
                                        </svg>
                                        <p>No pages found</p>
                                        <span>Click "Connect Pages" to load your Facebook pages</span>
                                    </div>
                                ) : (
                                    <div className="pages-list-settings">
                                        {pages.map((page, index) => (
                                            <div
                                                key={page.id}
                                                className="page-item-settings"
                                                style={{ animationDelay: `${index * 50}ms` }}
                                            >
                                                <div className="page-info-settings">
                                                    <div className="page-icon">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M2 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zm3.293 1.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L7.586 10 5.293 7.707a1 1 0 0 1 0-1.414zM11 12a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3z" />
                                                        </svg>
                                                    </div>
                                                    <div className="page-details">
                                                        <h4>{page.name}</h4>
                                                        <p>{page.category || 'Facebook Page'}</p>
                                                    </div>
                                                </div>
                                                <span className="badge badge-success">Active</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="pages-empty">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="24" cy="24" r="20" />
                                    <path d="M24 16v8m0 4h.01" strokeLinecap="round" />
                                </svg>
                                <p>Login required</p>
                                <span>Connect your Facebook account to manage pages</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* App Information */}
                <div className="settings-section">
                    <div className="section-header">
                        <div className="section-icon" style={{ background: 'linear-gradient(135deg, hsl(340, 82%, 58%) 0%, hsl(280, 85%, 60%) 100%)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 9a1 1 0 0 0 0 2v3a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2v-3a1 1 0 0 0-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="section-title">App Information</h2>
                            <p className="section-description">About SocialFlow</p>
                        </div>
                    </div>

                    <div className="settings-card">
                        <div className="app-info">
                            <div className="info-item">
                                <span className="info-label">Version</span>
                                <span className="info-value">1.0.0</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Status</span>
                                <span className="badge badge-success">Active</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">API Version</span>
                                <span className="info-value">Facebook Graph API v18.0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
