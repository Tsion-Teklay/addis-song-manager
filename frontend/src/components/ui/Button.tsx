import styled from '@emotion/styled';
import { space, typography, variant, type SpaceProps, type TypographyProps } from 'styled-system';

export type ButtonVariant = 'primary' | 'ghost' | 'danger';

export interface ButtonProps extends SpaceProps, TypographyProps {
  variant?: ButtonVariant;
}

const variants = variant({
  variants: {
    primary: {
      bg: 'primary',
      color: '#0f1115',
      border: 'none',
      '&:hover:enabled': { bg: 'primaryDark', color: '#fff' },
    },
    ghost: {
      bg: 'transparent',
      color: 'text',
      border: '1px solid',
      borderColor: 'border',
      '&:hover:enabled': { bg: 'surfaceAlt' },
    },
    danger: {
      bg: 'transparent',
      color: 'danger',
      border: '1px solid',
      borderColor: 'danger',
      '&:hover:enabled': { bg: 'danger', color: '#fff' },
    },
  },
});

export const Button = styled.button<ButtonProps>(
  {
    cursor: 'pointer',
    borderRadius: '8px',
    padding: '8px 14px',
    fontSize: 14,
    fontWeight: 600,
    transition: 'background 120ms ease, color 120ms ease',
    '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
  },
  variants,
  space,
  typography,
);

Button.defaultProps = { variant: 'primary' };