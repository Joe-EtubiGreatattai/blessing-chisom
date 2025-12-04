import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ProjectDetail from './pages/ProjectDetail';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { DEFAULT_PORTFOLIO_ITEMS, DEFAULT_ABOUT_DATA } from './data/mockData';

// --- Error Boundary ---

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">Something went wrong.</h1>
            <p className="text-gray-600">We couldn't load the application properly.</p>
            <div className="bg-red-50 text-red-700 p-4 rounded-md text-left text-xs overflow-auto max-h-40">
              {this.state.error && this.state.error.toString()}
            </div>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Data & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// --- Main App Component ---

const AppContent = () => {
  // State Initialization from localStorage or Default
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_projects');
      return saved ? JSON.parse(saved) : DEFAULT_PORTFOLIO_ITEMS;
    } catch (e) {
      console.error("Failed to parse projects from localStorage", e);
      return DEFAULT_PORTFOLIO_ITEMS;
    }
  });

  const [aboutData, setAboutData] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_about');
      return saved ? JSON.parse(saved) : DEFAULT_ABOUT_DATA;
    } catch (e) {
      console.error("Failed to parse about data from localStorage", e);
      return DEFAULT_ABOUT_DATA;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('is_authenticated') === 'true';
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_about', JSON.stringify(aboutData));
  }, [aboutData]);

  useEffect(() => {
    localStorage.setItem('is_authenticated', isAuthenticated);
  }, [isAuthenticated]);

  // Handlers
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ParallaxProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900 selection:bg-pink-100 selection:text-pink-900">
          <Header
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />

          <Routes>
            <Route path="/" element={<Home projects={projects} />} />
            <Route path="/about" element={<About data={aboutData} />} />
            <Route path="/project/:id" element={<ProjectDetail projects={projects} />} />
            <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard
                    projects={projects}
                    aboutData={aboutData}
                    onUpdateProjects={setProjects}
                    onUpdateAbout={setAboutData}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </ParallaxProvider>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
};

export default App;