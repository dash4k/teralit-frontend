import React from 'react';
import { matchPath, Route, Routes, useLocation } from 'react-router-dom';

import PageFooter from './components/PageFooter';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ToasterWrapper from './components/ToasterWrapper.jsx';

import {
  putRefreshToken,
  getAccessToken,
  putAccessToken,
  getThemeState,
  putThemeState
} from './utils/api/localStorage.js';
import {
  viewProfile
} from './utils/api/user.js';
import {
  logout
} from './utils/api/authentication.js';

import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CheckEmailPage from './pages/CheckEmailPage.jsx';
import VerifyEmailPage from './pages/VerifyEmailPage.jsx';
import ResendVerificationPage from './pages/ResendVerificationPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import NewScanPage from './pages/NewScanPage.jsx';
import ResultDetailPage from './pages/ResultDetailPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import ThemeContext from './contexts/ThemeContext.js';

function App() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [theme, setTheme] = React.useState(getThemeState() || 'light');
  const [initializing, setInitializing] = React.useState(true);
  const [settingsVisibility, setSettingsVisibility] = React.useState(false);
  const [mobileSidebarVisibility, setMobileSidebarVisibility] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  const location = useLocation();
  const dashboardRoutes = ['/new', '/results', '/profile'];
  const onDashboard = dashboardRoutes.some((path) => location.pathname.startsWith(path));

  const validRoutes = [
    '/',
    '/login',
    '/register',
    '/check-email',
    '/verify-email',
    '/resend-verification-email',
    '/new',
    '/results',
    '/results/:sessionId',
    '/profile',
  ];
  const onValidRoutes = validRoutes.some((path) => matchPath({ path, end: true }, location.pathname));

  const setVisibilityFalse = () => {
    setSettingsVisibility(false);
    setMobileSidebarVisibility(false);
  };

  const loginHandler = async ({ refreshToken, accessToken }) => {
    putRefreshToken(refreshToken);
    putAccessToken(accessToken);

    const { data } = await viewProfile();

    setAuthedUser(data);
  };

  const logoutHandler = async () => {
    await logout();
    putRefreshToken('');
    putAccessToken('');
    setAuthedUser(null);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    putThemeState(newTheme);
  };

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  React.useEffect(() => {
    const init = async () => {
      try {
        const token = getAccessToken();
        if (token) {
          const { data } = await viewProfile();
          setAuthedUser(data);
        }
      } catch (_error) {
        setAuthedUser(null);
      } finally {
        setInitializing(false);
      }
    };

    init();
  }, []);

  if (initializing) return null;

  return (
    <ThemeContext.Provider value={theme}>
      <ToasterWrapper />
      <div
        onClick={setVisibilityFalse}
        className="
          flex flex-col justify-between items-center min-h-dvh w-full
          bg-background dark:bg-on-background transition-colors
        "
      >
        <Navigation
          toggleTheme={toggleTheme}
          authedUser={authedUser}
          logout={logoutHandler}
          settingsVisibility={settingsVisibility}
          setSettingsVisibility={setSettingsVisibility}
          mobileSidebarVisibility={mobileSidebarVisibility}
          setMobileSidebarVisibility={setMobileSidebarVisibility}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onDashboard={onDashboard}
          onValidRoutes={onValidRoutes}
        />
        <main className={`flex-1 w-full ${onDashboard ? (collapsed ? 'lg:ml-10 lg:w-auto' : 'lg:ml-60 lg:w-auto') : ''} ${onDashboard ? 'mt-15 mb-15' : ''} transition-all duration-300`}>
          <Routes>
            <Route
              path='/'
              element={<LandingPage />}
            />
            <Route
              path='/login'
              element={<LoginPage loginSuccess={loginHandler} />}
            />
            <Route
              path='/register'
              element={<RegisterPage />}
            />
            <Route
              path='/check-email'
              element={<CheckEmailPage />}
            />
            <Route
              path='/verify-email'
              element={<VerifyEmailPage />}
            />
            <Route
              path='/resend-verification-email'
              element={<ResendVerificationPage />}
            />
            <Route
              path='/new'
              element={
                <ProtectedRoute authedUser={authedUser}>
                  <NewScanPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/results'
              element={
                <ProtectedRoute authedUser={authedUser}>
                  <ResultsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/results/:sessionId'
              element={
                <ProtectedRoute authedUser={authedUser}>
                  <ResultDetailPage authedUser={authedUser} />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute authedUser={authedUser}>
                  <ProfilePage
                    authedUser={authedUser}
                    logout={logoutHandler}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path='*'
              element={<NotFoundPage />}
            />
          </Routes>
        </main>
        <PageFooter onDashboard={onDashboard} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
