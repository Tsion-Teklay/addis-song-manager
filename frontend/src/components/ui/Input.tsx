import styled from '@emotion/styled';
import { space, width, type SpaceProps, type WidthProps } from 'styled-system';

export type FieldProps = SpaceProps & WidthProps;

export const Input = styled.input<FieldProps>`
  width: 100%;
  padding: 9px 12px;
  font-size: 14px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ${space}
  ${width}
`;

export const Select = styled.select<FieldProps>`
  width: 100%;
  padding: 9px 12px;
  font-size: 14px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ${space}
  ${width}
`;