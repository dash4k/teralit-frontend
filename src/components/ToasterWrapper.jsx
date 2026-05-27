import { Toaster } from 'react-hot-toast';

const ToasterWrapper = () => {
    return <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: '',
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: 'var(--color-surface-container)',
            color: 'var(--color-on-surface)',
            border: '1px solid var(--color-outline-variant)',
            borderRadius: 'var(--radius-lg)',
            fontFamily: 'var(--font-body-md)',
            fontSize: 'var(--text-body-sm)',
            fontWeight: 'var(--text-body-sm--font-weight)',
            lineHeight: 'var(--text-body-sm--line-height)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          },

          success: {
            duration: 3000,
            style: {
              background: 'var(--color-secondary-container)',
              color: 'var(--color-on-secondary-container)',
              border: '1px solid var(--color-secondary)',
            },
            iconTheme: {
              primary: 'var(--color-secondary)',
              secondary: 'var(--color-surface-container-lowest)',
            },
          },

          error: {
            duration: 4000,
            style: {
              background: 'var(--color-error-container)',
              color: 'var(--color-on-error-container)',
              border: '1px solid var(--color-error)',
            },
            iconTheme: {
              primary: 'var(--color-error)',
              secondary: 'var(--color-surface-container-lowest)',
            },
          },

          loading: {
            style: {
              background: 'var(--color-surface-container)',
              color: 'var(--color-on-surface)',
              border: '1px solid var(--color-outline-variant)',
            },
            iconTheme: {
              primary: 'var(--color-primary)',
              secondary: 'var(--color-surface-container)',
            },
          },
        }}
      />;
};

export default ToasterWrapper;
