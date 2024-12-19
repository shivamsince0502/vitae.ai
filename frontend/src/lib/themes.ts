export const theme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    background: {
      primary: '#0f172a',   // Dark blue background
      secondary: '#1e293b', // Slightly lighter blue
      accent: '#334155',    // Accent background
    },
    text: {
      primary: '#f8fafc',   // Almost white
      secondary: '#94a3b8', // Light gray
      accent: '#0ea5e9',    // Sky blue for emphasis
    }
  },
  fonts: {
    sans: 'var(--font-inter)',
    mono: 'var(--font-mono)',
  },
  spacing: {
    section: '6rem',
    container: '1200px',
  }
} as const;
