import styled, {
  alignItems,
  justifyContent,
  css,
  flexDirection,
  getSpace,
  compose,
  margin,
  marginTop,
  marginBottom,
  MarginProps,
  MarginTopProps,
  MarginBottomProps,
  FlexDirectionProps,
  AlignItemsProps,
  JustifyContentProps,
} from '@xstyled/styled-components';

export interface SpaceBaseProps
  extends MarginProps,
    MarginTopProps,
    MarginBottomProps,
    FlexDirectionProps,
    AlignItemsProps,
    JustifyContentProps {
  /** if "true", set flex-wrap:wrap */
  $wrap?: boolean;

  /** horizontal space */
  hSize?: number;

  /** vertical   space */
  vSize?: number;
}

const SpaceSystem = compose(
  margin,
  marginTop,
  marginBottom,
  alignItems,
  justifyContent,
  flexDirection
);

export const SpaceContainer = styled.div.withConfig({
  shouldForwardProp: (prop, validate) =>
    validate(prop) && !SpaceSystem.meta.props.includes(prop),
})<SpaceBaseProps>`
  display: flex;
  width: 100%;

  ${({ $wrap }) => $wrap && css({ flexWrap: $wrap ? 'wrap' : 'nowrap' })};
  ${SpaceSystem};

  & > :not(style) ~ :not(style) {
    ${({ flexDirection: direction, hSize, vSize }) => {
      if (!hSize) return css``;
      if (direction === 'column') {
        return css`
          margin-top: ${getSpace(`${vSize}`)};
          margin-inline: 0;
          margin-bottom: 0;
        `;
      }

      return css`
        margin-inline-end: 0;
        margin-top: 0;
        margin-bottom: 0;
        margin-inline-start: ${getSpace(`${hSize}`)};
      `;
    }}
  }
`;
