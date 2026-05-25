import React from 'react';
import PageFooter from './components/PageFooter';
import Navigation from './components/Navigation';
import {
  getThemeState,
  putThemeState
} from './utils/api/localStorage.js';

import ThemeContext from './contexts/ThemeContext.js';

function App() {
  const [theme, setTheme] = React.useState(getThemeState() || 'light');

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

  return (
    <ThemeContext.Provider value={theme}>
      <div className="flex flex-col justify-between items-center min-h-screen w-full bg-background dark:bg-on-background">
        <Navigation toggleTheme={toggleTheme} />
        <main className='flex-1 w-full'>
        </main>
        <PageFooter />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
