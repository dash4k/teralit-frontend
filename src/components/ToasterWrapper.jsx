import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import ThemeContext from '../contexts/ThemeContext.js';

const ToasterWrapper = () => {
  const theme = useContext(ThemeContext);
  const dark = theme === 'dark';

  const base = {
    borderRadius: 'var(--radius-lg)',
    fontFamily: 'var(--font-body-md)',
    fontSize: 'var(--text-body-sm)',
    fontWeight: 'var(--text-body-sm--font-weight)',
    lineHeight: 'var(--text-body-sm--line-height)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    background: dark ? '#1e2028' : '#ededf8',
    color: dark ? '#e2e2ee' : '#191b23',
    border: `1px solid ${dark ? '#43465a' : '#c3c6d6'}`,
  };

  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 5000,
        removeDelay: 1000,
        style: base,
        success: {
          duration: 3000,
          style: {
            ...base,
            background: dark ? '#004f52' : '#81f1f5',
            color: dark ? '#81f1f5' : '#006e71',
            border: `1px solid ${dark ? '#65d7db' : '#00696c'}`,
          },
          iconTheme: {
            primary: dark ? '#65d7db' : '#00696c',
            secondary: dark ? '#004f52' : '#ffffff',
          },
        },
        error: {
          duration: 4000,
          style: {
            ...base,
            background: dark ? '#93000a' : '#ffdad6',
            color: dark ? '#ffdad6' : '#93000a',
            border: `1px solid ${dark ? '#ffb4ab' : '#ba1a1a'}`,
          },
          iconTheme: {
            primary: dark ? '#ffb4ab' : '#ba1a1a',
            secondary: dark ? '#93000a' : '#ffffff',
          },
        },
        loading: {
          style: base,
          iconTheme: {
            primary: dark ? '#b2c5ff' : '#003d9b',
            secondary: dark ? '#1e2028' : '#ededf8',
          },
        },
      }}
    />
  );
};

export default ToasterWrapper;
