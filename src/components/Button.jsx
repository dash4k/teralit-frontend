import { useState, useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext.js';

function getColorTokens(dark) {
  return {
    primary: {
      solid:          dark ? '#b2c5ff' : 'var(--color-primary)',
      solidHover:     dark ? '#dae2ff' : 'var(--color-primary-container)',
      onSolid:        dark ? '#001848' : 'var(--color-on-primary)',
      container:      dark ? '#0040a2' : 'var(--color-primary-fixed)',
      containerHover: dark ? '#0052cc' : 'var(--color-primary-fixed-dim)',
      onContainer:    dark ? '#dae2ff' : 'var(--color-primary)',
      outline:        dark ? '#b2c5ff' : 'var(--color-primary)',
      ring:           dark ? '#b2c5ff' : 'var(--color-primary)',
    },
    secondary: {
      solid:          dark ? '#65d7db' : 'var(--color-secondary)',
      solidHover:     dark ? '#84f4f8' : 'color-mix(in srgb, var(--color-secondary) 85%, black)',
      onSolid:        dark ? '#002021' : 'var(--color-on-secondary)',
      container:      dark ? '#004f52' : 'var(--color-secondary-fixed)',
      containerHover: dark ? '#006e71' : 'var(--color-secondary-fixed-dim)',
      onContainer:    dark ? '#84f4f8' : 'var(--color-secondary)',
      outline:        dark ? '#65d7db' : 'var(--color-secondary)',
      ring:           dark ? '#65d7db' : 'var(--color-secondary)',
    },
    tertiary: {
      solid:          dark ? '#ffb59b' : 'var(--color-tertiary)',
      solidHover:     dark ? '#ffdbcf' : 'var(--color-tertiary-container)',
      onSolid:        dark ? '#380d00' : 'var(--color-on-tertiary)',
      container:      dark ? '#a33500' : 'var(--color-tertiary-fixed)',
      containerHover: dark ? '#7b2600' : 'var(--color-tertiary-fixed-dim)',
      onContainer:    dark ? '#ffdbcf' : 'var(--color-tertiary)',
      outline:        dark ? '#ffb59b' : 'var(--color-tertiary)',
      ring:           dark ? '#ffb59b' : 'var(--color-tertiary)',
    },
    error: {
      solid:          dark ? '#ffb4ab' : 'var(--color-error)',
      solidHover:     dark ? '#ffdad6' : 'color-mix(in srgb, var(--color-error) 85%, black)',
      onSolid:        dark ? '#690005' : 'var(--color-on-error)',
      container:      dark ? '#93000a' : 'var(--color-error-container)',
      containerHover: dark ? '#ba1a1a' : 'color-mix(in srgb, var(--color-error-container) 80%, var(--color-error))',
      onContainer:    dark ? '#ffdad6' : 'var(--color-on-error-container)',
      outline:        dark ? '#ffb4ab' : 'var(--color-error)',
      ring:           dark ? '#ffb4ab' : 'var(--color-error)',
    },
  };
}

function getStyle(variant, colorKey, hovered, COLOR_TOKENS) {
  const t = COLOR_TOKENS[colorKey] ?? COLOR_TOKENS.primary;

  switch (variant) {
  case 'filled':
    return {
      backgroundColor: hovered ? t.solidHover : t.solid,
      color: t.onSolid,
      border: '2px solid transparent',
      boxShadow: hovered
        ? '0 4px 14px rgba(0,0,0,.18)'
        : '0 2px 6px rgba(0,0,0,.14)',
    };

  case 'tonal':
    return {
      backgroundColor: hovered ? t.containerHover : t.container,
      color: t.onContainer,
      border: '2px solid transparent',
      boxShadow: 'none',
    };

  case 'outlined':
    return {
      backgroundColor: hovered ? `color-mix(in srgb, ${t.container} 50%, transparent)` : 'transparent',
      color: t.outline,
      border: '2px solid var(--color-outline)',
      boxShadow: 'none',
    };

  case 'ghost':
    return {
      backgroundColor: hovered ? `color-mix(in srgb, ${t.container} 60%, transparent)` : 'transparent',
      color: t.onContainer,
      border: '2px solid transparent',
      boxShadow: 'none',
    };

  default:
    return {};
  }
}

const SIZES = {
  sm: 'h-8  px-4  gap-1.5 rounded',
  md: 'h-10 px-5  gap-2   rounded-lg',
  lg: 'h-12 px-7  gap-2.5 rounded-xl',
};

const FONT_STYLES = {
  sm: { fontFamily: 'var(--font-label-md)', fontSize: 'var(--text-label-md)', fontWeight: 'var(--text-label-md--font-weight)', lineHeight: 'var(--text-label-md--line-height)' },
  md: { fontFamily: 'var(--font-label-md)', fontSize: 'var(--text-label-md)', fontWeight: 'var(--text-label-md--font-weight)', lineHeight: 'var(--text-label-md--line-height)' },
  lg: { fontFamily: 'var(--font-body-md)',  fontSize: 'var(--text-body-sm)',  fontWeight: 500,                                  lineHeight: 'var(--text-body-sm--line-height)' },
};

export function Button({
  children,
  variant  = 'filled',
  color    = 'primary',
  size     = 'md',
  loading  = false,
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  className = '',
  style: styleProp = {},
  ...props
}) {
  const theme = useContext(ThemeContext);
  const dark  = theme === 'dark';

  const [hovered, setHovered] = useState(false);
  const isDisabled = disabled || loading;

  const handleClick = (e) => {
    if (isDisabled) return;
    onClick?.(e);
  };

  const COLOR_TOKENS = getColorTokens(dark);
  const variantStyle = getStyle(variant, color, hovered, COLOR_TOKENS);

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={isDisabled}
      style={{
        ...variantStyle,
        ...FONT_STYLES[size] ?? FONT_STYLES.md,
        transition: 'background-color .2s, box-shadow .2s, opacity .2s, transform .15s',
        letterSpacing: '0.01em',
        ...styleProp,
      }}
      className={[
        'inline-flex items-center justify-center',
        'select-none overflow-hidden',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'active:scale-[0.97]',
        isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
        fullWidth ? 'w-full' : '',
        SIZES[size] ?? SIZES.md,
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin shrink-0"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      ) : (
        startIcon && <span className="shrink-0">{startIcon}</span>
      )}

      <span>{children}</span>

      {!loading && endIcon && <span className="shrink-0">{endIcon}</span>}
    </button>
  );
}

export default Button;
