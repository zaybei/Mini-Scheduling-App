import './Sidebar.css';

const Sidebar = ({ currentView, onViewChange, user }) => {
    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4zM3 10a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6zM14 9a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-2z" />
                </svg>
            )
        },
        {
            id: 'composer',
            label: 'Create Post',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
            ),
            requiresAuth: true
        },
        {
            id: 'analytics',
            label: 'Analytics',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5zM8 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V7zM14 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4z" />
                </svg>
            ),
            requiresAuth: true
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 0 1-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 0 1 .947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 0 1 2.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 0 1 2.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 0 1 .947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 0 1-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 0 1-2.287-.947zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" clipRule="evenodd" />
                </svg>
            ),
            requiresAuth: true
        }
    ];

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <ul className="sidebar-menu">
                    {menuItems.map((item, index) => {
                        const isDisabled = item.requiresAuth && !user;
                        const isActive = currentView === item.id;

                        return (
                            <li key={item.id} style={{ animationDelay: `${index * 50}ms` }}>
                                <button
                                    className={`sidebar-item ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                                    onClick={() => !isDisabled && onViewChange(item.id)}
                                    disabled={isDisabled}
                                    title={isDisabled ? 'Please connect Facebook first' : item.label}
                                >
                                    <span className="sidebar-item-icon">{item.icon}</span>
                                    <span className="sidebar-item-label">{item.label}</span>
                                    {isActive && <span className="sidebar-item-indicator"></span>}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-card">
                    <div className="sidebar-card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <circle cx="12" cy="17" r="0.5" fill="currentColor" />
                        </svg>
                    </div>
                    <h4>Need Help?</h4>
                    <p>Check out our documentation and tutorials</p>
                    <button className="btn btn-secondary btn-sm">
                        Learn More
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
