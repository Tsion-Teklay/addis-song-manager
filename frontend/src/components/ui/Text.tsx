import styled from '@emotion/styled';
import { color, space, typography, type ColorProps, type SpaceProps, type TypographyProps } from 'styled-system';

export type TextProps = SpaceProps & ColorProps & TypographyProps;

export const Text = styled.p<TextProps>(
  { margin: 0 },
  space,
  color,
  typography,
);

export const Heading = styled.h2<TextProps>(
  { margin: 0, fontWeight: 700, letterSpacing: '-0.01em' },
  space,
  color,
  typography,
);

export const Label = styled.label<TextProps>(
  { display: 'block', fontSize: 13, fontWeight: 500 },
  space,
  color,
  typography,
);