# Teralit Frontend

A modern React + Vite frontend application with Tailwind CSS and ESLint.

## Tech Stack

- **React** 19.2.6 - A JavaScript library for building user interfaces
- **Vite** 8.0.12 - Next generation frontend tooling for faster development
- **Tailwind CSS** 4.3.0 - Utility-first CSS framework
- **React Router** 7.15.1 - Client-side routing
- **React Hot Toast** 2.6.0 - Notifications
- **React Icons** 5.6.0 - Icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)

### Installation

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint and fix issues
- `npm run preview` - Preview production build

## Code Quality

This project uses:

- **ESLint** - With React-specific rules and Dicode Academy configuration
- **React Compiler** - Enabled for automatic memoization optimization
- **Babel** - JavaScript transpiler with React Compiler preset

### Linting

Run ESLint:

```bash
npm run lint
```

## Project Structure

```
src/
├── components/     # React components
├── pages/         # Page components
├── styles/        # CSS files
└── App.jsx        # Root component
```

## Features

- Fast refresh with Vite HMR
- Styled with Tailwind CSS
- Type-safe with TypeScript
- Responsive design
- Client-side routing with React Router
- Toast notifications
- Optimized with React Compiler
