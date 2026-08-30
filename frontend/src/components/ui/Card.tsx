import styled from '@emotion/styled';
import { Box } from './Box';

export const Card = styled(Box)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: ${({ theme }) => theme.space[4]}px;
`;