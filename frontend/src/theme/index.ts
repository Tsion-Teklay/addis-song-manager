export const theme = {
  colors: {
    bg: '#0f1115',
    surface: '#181b22',
    surfaceAlt: '#1f232c',
    border: '#2a2f3a',
    text: '#e8eaf0',
    muted: '#9aa3b2',
    primary: '#6c8cff',
    primaryDark: '#4f6ee0',
    danger: '#ef5b6b',
    success: '#37c98b',
  },
  space: [0, 4, 8, 12, 16, 24, 32, 48, 64],
  fontSizes: [12, 14, 16, 18, 22, 28, 36],
  fontWeights: { body: 400, medium: 500, bold: 700 },
  radii: { sm: '6px', md: '10px', lg: '16px', pill: '999px' },
  shadows: { card: '0 8px 24px rgba(0,0,0,0.28)' },
  breakpoints: ['640px', '900px', '1200px'],
} as const;

export type Theme = typeof theme;