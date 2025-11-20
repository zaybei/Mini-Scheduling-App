import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Composer from './components/Composer';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import { initFacebookSDK } from './services/facebookService';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [connectedPages, setConnectedPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Facebook SDK on mount
    const initSDK = async () => {
      try {
        await initFacebookSDK();
        console.log('Facebook SDK initialized successfully');
      } catch (error) {
        console.error('Error initializing Facebook SDK:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initSDK();
  }, []);

  const handleUserLogin = (userData) => {
    setUser(userData);
  };

  const handleUserLogout = () => {
    setUser(null);
    setConnectedPages([]);
  };

  const handlePagesConnected = (pages) => {
    setConnectedPages(pages);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={user} connectedPages={connectedPages} />;
      case 'composer':
        return <Composer user={user} connectedPages={connectedPages} />;
      case 'analytics':
        return <Analytics user={user} connectedPages={connectedPages} />;
      case 'settings':
        return (
          <Settings
            user={user}
            connectedPages={connectedPages}
            onPagesConnected={handlePagesConnected}
          />
        );
      default:
        return <Dashboard user={user} connectedPages={connectedPages} />;
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Initializing SocialFlow...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Header
        user={user}
        onLogin={handleUserLogin}
        onLogout={handleUserLogout}
      />
      <div className="app-layout">
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          user={user}
        />
        <main className="app-main">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;
