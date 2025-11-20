import { useState, useEffect } from 'react';
import './Analytics.css';
import { getPageInsights, getPagePosts } from '../services/facebookService';

const Analytics = ({ user, connectedPages }) => {
    const [selectedPage, setSelectedPage] = useState(null);
    const [insights, setInsights] = useState(null);
    const [recentPosts, setRecentPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (connectedPages.length > 0 && !selectedPage) {
            setSelectedPage(connectedPages[0]);
        }
    }, [connectedPages, selectedPage]);

    useEffect(() => {
        if (selectedPage) {
            loadAnalytics();
        }
    }, [selectedPage]);

    const loadAnalytics = async () => {
        if (!selectedPage) return;

        setIsLoading(true);
        try {
            const [insightsData, postsData] = await Promise.all([
                getPageInsights(selectedPage.id, selectedPage.access_token),
                getPagePosts(selectedPage.id, selectedPage.access_token, 5)
            ]);

            setInsights(insightsData);
            setRecentPosts(postsData);
        } catch (error) {
            console.error('Error loading analytics:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (connectedPages.length === 0) {
        return (
            <div className="analytics">
                <div className="analytics-header">
                    <h1 className="analytics-title">Analytics</h1>
                    <p className="analytics-subtitle">Track your social media performance</p>
                </div>
                <div className="empty-state-card">
                    <div className="empty-state-icon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="24" cy="24" r="20" />
                            <path d="M24 16v8m0 4h.01" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h3>No Pages Connected</h3>
                    <p>Connect your Facebook pages in Settings to view analytics</p>
                </div>
            </div>
        );
    }

    return (
        <div className="analytics">
            <div className="analytics-header">
                <div>
                    <h1 className="analytics-title">Analytics</h1>
                    <p className="analytics-subtitle">Track your social media performance</p>
                </div>

                {connectedPages.length > 1 && (
                    <select
                        className="page-selector"
                        value={selectedPage?.id || ''}
                        onChange={(e) => {
                            const page = connectedPages.find(p => p.id === e.target.value);
                            setSelectedPage(page);
                        }}
                    >
                        {connectedPages.map(page => (
                            <option key={page.id} value={page.id}>
                                {page.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {isLoading ? (
                <div className="analytics-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading analytics...</p>
                </div>
            ) : (
                <>
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <div className="metric-icon" style={{ background: 'linear-gradient(135deg, hsl(220, 90%, 56%) 0%, hsl(280, 85%, 60%) 100%)' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                            <div className="metric-content">
                                <h3 className="metric-value">
                                    {insights?.find(i => i.name === 'page_impressions')?.values?.[0]?.value || '0'}
                                </h3>
                                <p className="metric-label">Page Impressions</p>
                            </div>
                        </div>

                        <div className="metric-card">
                            <div className="metric-icon" style={{ background: 'linear-gradient(135deg, hsl(142, 71%, 45%) 0%, hsl(170, 71%, 45%) 100%)' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                                </svg>
                            </div>
                            <div className="metric-content">
                                <h3 className="metric-value">
                                    {insights?.find(i => i.name === 'page_engaged_users')?.values?.[0]?.value || '0'}
                                </h3>
                                <p className="metric-label">Engaged Users</p>
                            </div>
                        </div>

                        <div className="metric-card">
                            <div className="metric-icon" style={{ background: 'linear-gradient(135deg, hsl(340, 82%, 58%) 0%, hsl(280, 85%, 60%) 100%)' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                                </svg>
                            </div>
                            <div className="metric-content">
                                <h3 className="metric-value">{recentPosts.length}</h3>
                                <p className="metric-label">Recent Posts</p>
                            </div>
                        </div>
                    </div>

                    <div className="recent-posts-section">
                        <h2 className="section-title">Recent Posts</h2>

                        {recentPosts.length === 0 ? (
                            <div className="empty-posts">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="8" y="8" width="32" height="32" rx="4" />
                                    <path d="M16 20h16M16 28h10" strokeLinecap="round" />
                                </svg>
                                <p>No posts yet</p>
                            </div>
                        ) : (
                            <div className="posts-grid">
                                {recentPosts.map((post, index) => (
                                    <div key={post.id} className="post-card" style={{ animationDelay: `${index * 100}ms` }}>
                                        {post.full_picture && (
                                            <div className="post-image">
                                                <img src={post.full_picture} alt="Post" />
                                            </div>
                                        )}
                                        <div className="post-content">
                                            <p className="post-message">
                                                {post.message || 'No caption'}
                                            </p>
                                            <div className="post-meta">
                                                <span className="post-date">
                                                    {new Date(post.created_time).toLocaleDateString()}
                                                </span>
                                                <a
                                                    href={post.permalink_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="post-link"
                                                >
                                                    View Post →
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Analytics;
