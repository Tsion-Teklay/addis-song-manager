import styled from '@emotion/styled';
import {
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
  type BorderProps,
  type ColorProps,
  type FlexboxProps,
  type GridProps,
  type LayoutProps,
  type PositionProps,
  type ShadowProps,
  type SpaceProps,
  type TypographyProps,
} from 'styled-system';

export type BoxProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  GridProps &
  BorderProps &
  PositionProps &
  ShadowProps &
  TypographyProps;

export const Box = styled.div<BoxProps>(
  space,
  color,
  layout,
  flexbox,
  grid,
  border,
  position,
  shadow,
  typography,
);

export const Flex = styled(Box)({ display: 'flex' });

export const Grid = styled(Box)({ display: 'grid' });