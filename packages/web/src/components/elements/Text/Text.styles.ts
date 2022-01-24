import styled, {
  compose,
  textAlign,
  textTransform,
  fontWeight,
  fontSize,
  TextAlignProps,
  FontWeightProps,
  TextTransformProps,
  FontSizeProps,
  lineHeight,
  LineHeightProps,
  space,
  SpaceProps,
  opacity,
  OpacityProps,
  css,
  th,
  display,
  DisplayProps,
  textDecoration,
  TextDecorationProps,
  cursor,
  CursorProps,
  whiteSpace,
  WhiteSpaceProps,
  textOverflow,
  TextOverflowProps,
  MaxWidthProps,
  maxWidth,
  OverflowProps,
  overflow,
} from '@xstyled/styled-components';
import { mode } from '@lib/utility/component';

const TextSystem = compose(
  textAlign,
  textTransform,
  fontWeight,
  fontSize,
  lineHeight,
  space,
  opacity,
  display,
  textDecoration,
  cursor,
  textOverflow,
  whiteSpace,
  maxWidth,
  overflow
);

export interface TextBaseProps
  extends TextAlignProps,
    FontWeightProps,
    TextTransformProps,
    FontSizeProps,
    LineHeightProps,
    SpaceProps,
    OpacityProps,
    DisplayProps,
    CursorProps,
    TextDecorationProps,
    TextOverflowProps,
    WhiteSpaceProps,
    MaxWidthProps,
    OverflowProps {
  /** color from theme.colors */
  color?: string;

  /** */
  isLink?: boolean;
}

const LinkStyles = css`
  color: ${({ theme }) =>
    mode(
      theme.colors[theme.primary][6],
      theme.colors[theme.primary][4]
    )(theme.colorMode)};
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
  :hover {
    text-decoration: underline;
  }
`;

export const TextDiv = styled.div.withConfig({
  shouldForwardProp: (props, validate) =>
    validate(props) && ![...TextSystem.meta.props, 'color'].includes(props),
})<TextBaseProps>`
  overflow-wrap: break-word;
  display: inline;
  background: transparent;
  ${({ color, theme }) => css`
    color: ${color
      ? mode(`${color}.6`, `${color}.4`)(theme.colorMode)
      : 'inherit'};
  `}
  font-family: ${th('fontFamily')};
  ${({ isLink }) => isLink && LinkStyles}
  ${TextSystem};
`;
