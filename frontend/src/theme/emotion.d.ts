import '@emotion/react';
import type { Theme as AppTheme } from './index';

declare module '@emotion/react' {
  // Makes props.theme fully typed inside styled components.
  export interface Theme extends AppTheme {}
}