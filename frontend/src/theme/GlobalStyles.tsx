import { Global, css, useTheme } from '@emotion/react';
import type { JSX } from 'react';

export function GlobalStyles(): JSX.Element {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          background: ${theme.colors.bg};
          color: ${theme.colors.text};
          font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
          font-size: 16px;
          line-height: 1.5;
        }
        button {
          font-family: inherit;
        }
        table {
          border-collapse: collapse;
        }
      `}
    />
  );
}