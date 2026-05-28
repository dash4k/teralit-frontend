import { useState, useRef, useCallback } from 'react';

// ─── Ripple hook ──────────────────────────────────────────────────────────────
function useRipple() {
  const [ripples, setRipples] = useState([]);
  const nextId = useRef(0);

  const addRipple = useCallback((e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;
    const id = nextId.current++;
    setRipples((prev) => [...prev, { id, x, y, size }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  }, []);

  return [ripples, addRipple];
}

const COLOR_TOKENS = {
  primary: {
    solid:           'var(--color-primary)',
    solidHover:      'var(--color-primary-container)',   // darker container
    onSolid:         'var(--color-on-primary)',
    container:       'var(--color-primary-fixed)',       // very light tint
    containerHover:  'var(--color-primary-fixed-dim)',
    onContainer:     'var(--color-primary)',
    outline:         'var(--color-primary)',
    ring:            'var(--color-primary)',
  },
  secondary: {
    solid:           'var(--color-secondary)',
    solidHover:      'color-mix(in srgb, var(--color-secondary) 85%, black)',
    onSolid:         'var(--color-on-secondary)',
    container:       'var(--color-secondary-fixed)',
    containerHover:  'var(--color-secondary-fixed-dim)',
    onContainer:     'var(--color-secondary)',
    outline:         'var(--color-secondary)',
    ring:            'var(--color-secondary)',
  },
  tertiary: {
    solid:           'var(--color-tertiary)',
    solidHover:      'var(--color-tertiary-container)',
    onSolid:         'var(--color-on-tertiary)',
    container:       'var(--color-tertiary-fixed)',
    containerHover:  'var(--color-tertiary-fixed-dim)',
    onContainer:     'var(--color-tertiary)',
    outline:         'var(--color-tertiary)',
    ring:            'var(--color-tertiary)',
  },
  error: {
    solid:           'var(--color-error)',
    solidHover:      'color-mix(in srgb, var(--color-error) 85%, black)',
    onSolid:         'var(--color-on-error)',
    container:       'var(--color-error-container)',
    containerHover:  'color-mix(in srgb, var(--color-error-container) 80%, var(--color-error))',
    onContainer:     'var(--color-on-error-container)',
    outline:         'var(--color-error)',
    ring:            'var(--color-error)',
  },
};

// ─── Per-variant style builders ───────────────────────────────────────────────
function getStyle(variant, colorKey, hovered) {
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

  case 'tonal': // Material 3 "filled tonal"
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
      // color: t.outline,
      border: '2px solid transparent',
      boxShadow: 'none',
    };

  default:
    return {};
  }
}

// ─── Ripple color per variant ─────────────────────────────────────────────────
const RIPPLE_OPACITY = {
  filled:   'rgba(255,255,255,0.30)',
  tonal:    'rgba(0,0,0,0.08)',
  outlined: 'rgba(0,0,0,0.08)',
  ghost:    'rgba(0,0,0,0.08)',
};

// ─── Size classes (only spacing/typography, no color) ─────────────────────────
const SIZES = {
  sm: 'h-8  px-4  gap-1.5 rounded',        // --radius-DEFAULT (0.25rem)
  md: 'h-10 px-5  gap-2   rounded-lg',     // --radius-lg (0.5rem)
  lg: 'h-12 px-7  gap-2.5 rounded-xl',     // --radius-xl (0.75rem)
};

// ─── Font style per size (matches your @theme label tokens) ──────────────────
const FONT_STYLES = {
  sm: { fontFamily: 'var(--font-label-md)', fontSize: 'var(--text-label-md)', fontWeight: 'var(--text-label-md--font-weight)', lineHeight: 'var(--text-label-md--line-height)' },
  md: { fontFamily: 'var(--font-label-md)', fontSize: 'var(--text-label-md)', fontWeight: 'var(--text-label-md--font-weight)', lineHeight: 'var(--text-label-md--line-height)' },
  lg: { fontFamily: 'var(--font-body-md)',  fontSize: 'var(--text-body-sm)',  fontWeight: 500,                                  lineHeight: 'var(--text-body-sm--line-height)'  },
};

// ─── Button ───────────────────────────────────────────────────────────────────
export function Button({
  children,
  variant = 'filled',   // "filled" | "tonal" | "outlined" | "ghost"
  color   = 'primary',  // "primary" | "secondary" | "tertiary" | "error"
  size    = 'md',       // "sm" | "md" | "lg"
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
  const [ripples, addRipple] = useRipple();
  const [hovered, setHovered] = useState(false);
  const isDisabled = disabled || loading;

  const handleClick = (e) => {
    if (isDisabled) return;
    addRipple(e);
    onClick?.(e);
  };

  const variantStyle = getStyle(variant, color, hovered);
  const rippleColor  = RIPPLE_OPACITY[variant] ?? RIPPLE_OPACITY.filled;

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
        'relative inline-flex items-center justify-center',
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
      {/* Ripple layer */}
      <span aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {ripples.map(({ id, x, y, size: s }) => (
          <span
            key={id}
            className="absolute rounded-full animate-ripple"
            style={{
              width: s,
              height: s,
              left: x - s / 2,
              top: y - s / 2,
              backgroundColor: rippleColor,
            }}
          />
        ))}
      </span>

      {/* Start icon / spinner */}
      {loading ? (
        <svg className="animate-spin shrink-0" width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      ) : (
        startIcon && <span className="shrink-0">{startIcon}</span>
      )}

      <span className="relative z-10">{children}</span>

      {!loading && endIcon && <span className="shrink-0">{endIcon}</span>}
    </button>
  );
}

export default Button;
