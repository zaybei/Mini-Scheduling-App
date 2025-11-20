import './Dashboard.css';

const Dashboard = ({ user, connectedPages }) => {
    const stats = [
        {
            label: 'Total Posts',
            value: '0',
            change: '+0%',
            trend: 'up',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
            ),
            gradient: 'linear-gradient(135deg, hsl(220, 90%, 56%) 0%, hsl(280, 85%, 60%) 100%)'
        },
        {
            label: 'Scheduled',
            value: '0',
            change: '+0%',
            trend: 'up',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
            ),
            gradient: 'linear-gradient(135deg, hsl(142, 71%, 45%) 0%, hsl(170, 71%, 45%) 100%)'
        },
        {
            label: 'Engagement',
            value: '0',
            change: '+0%',
            trend: 'neutral',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                </svg>
            ),
            gradient: 'linear-gradient(135deg, hsl(340, 82%, 58%) 0%, hsl(280, 85%, 60%) 100%)'
        },
        {
            label: 'Connected Pages',
            value: connectedPages.length.toString(),
            change: connectedPages.length > 0 ? 'Active' : 'None',
            trend: connectedPages.length > 0 ? 'up' : 'neutral',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
            ),
            gradient: 'linear-gradient(135deg, hsl(38, 92%, 50%) 0%, hsl(340, 82%, 58%) 100%)'
        }
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">
                        Welcome back{user ? `, ${user.name.split(' ')[0]}` : ''}! 👋
                    </h1>
                    <p className="dashboard-subtitle">
                        Here's what's happening with your social media today
                    </p>
                </div>
            </div>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className="stat-card"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="stat-card-header">
                            <div className="stat-icon" style={{ background: stat.gradient }}>
                                {stat.icon}
                            </div>
                            <span className={`stat-change ${stat.trend}`}>
                                {stat.change}
                            </span>
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{stat.value}</h3>
                            <p className="stat-label">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {!user ? (
                <div className="welcome-section">
                    <div className="welcome-card">
                        <div className="welcome-icon">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                                <circle cx="32" cy="32" r="30" fill="url(#welcome-gradient)" opacity="0.1" />
                                <path
                                    d="M32 16L40 24L32 32L24 24L32 16Z"
                                    fill="url(#welcome-gradient)"
                                />
                                <path
                                    d="M32 32L40 40L32 48L24 40L32 32Z"
                                    fill="url(#welcome-gradient)"
                                    opacity="0.7"
                                />
                                <defs>
                                    <linearGradient id="welcome-gradient" x1="0" y1="0" x2="64" y2="64">
                                        <stop offset="0%" stopColor="hsl(220, 90%, 56%)" />
                                        <stop offset="100%" stopColor="hsl(280, 85%, 60%)" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <h2>Get Started with SocialFlow</h2>
                        <p>
                            Connect your Facebook account to start scheduling posts, analyzing engagement,
                            and managing your social media presence all in one place.
                        </p>
                        <div className="welcome-features">
                            <div className="welcome-feature">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Schedule posts in advance</span>
                            </div>
                            <div className="welcome-feature">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Track engagement analytics</span>
                            </div>
                            <div className="welcome-feature">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Manage multiple pages</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : connectedPages.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-card">
                        <div className="empty-state-icon">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="24" cy="24" r="20" />
                                <path d="M24 16v8m0 4h.01" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h3>No Pages Connected</h3>
                        <p>
                            Go to Settings to connect your Facebook pages and start managing your content.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="recent-activity">
                    <h2 className="section-title">Recent Activity</h2>
                    <div className="activity-card">
                        <div className="activity-empty">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="8" y="8" width="32" height="32" rx="4" />
                                <path d="M16 20h16M16 28h10" strokeLinecap="round" />
                            </svg>
                            <p>No recent activity yet. Create your first post to get started!</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
