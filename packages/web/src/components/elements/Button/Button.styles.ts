import styled, {
  th,
  css,
  system,
  space,
  SpaceProps,
} from '@xstyled/styled-components';
import { Size } from '@lib/theme';
import { getColor, transparentize } from '@lib/utility/color';
import { mode } from '@lib/utility/component';

export interface BaseButtonProps extends SpaceProps {
  /**  button size */
  size?: 'sm' | 'md' | 'lg';

  /** Border radius size */
  radius?: Size;

  /** Set button width to 100% of parent container */
  fullWidth?: boolean;

  /** Set button color from Theme */
  color?: string;
}

const sizes = {
  sm: {
    height: '2.4rem',
    padding: '0 .7rem',
  },
  md: {
    height: '3.6rem',
    padding: '.4rem 1.5rem',
  },
  lg: {
    height: '4rem',
    padding: '.6rem 1.5rem',
  },
};

const BaseButton = styled.button.withConfig({
  shouldForwardProp: (prop, validate) =>
    validate(prop) && !['radius', 'color'].includes(prop),
})<BaseButtonProps>`
  ${space};
  ${({ size }) => size && { ...sizes[size] }};
  ${({ radius, theme }) =>
    radius && css({ borderRadius: theme.radii[radius] })};
  ${({ fullWidth }) => fullWidth && css({ width: '100%' })};
  font-size: ${({ size, theme }) =>
    size === 'lg' ? theme.fontSizes.md : theme.fontSizes.sm};
  font-family: ${th('fontFamily')};
  transition-property: default;
  transition-duration: normal;
  transition-timing-function: ease-in-out;
  background: transparent;
  text-transform: capitalize;
  user-select: none;
  border: 1px solid transparent;
  line-height: 1.54;
  font-weight: 600;
  appearance: none;
  text-align: center;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  position: relative;

  &:disabled {
    cursor: not-allowed;
  }

  &:not(:disabled):active {
    transform: translateY(1px);
  }

  &:focus {
    outline: none;
    ${system.apply({ ring: 'default', ringColor: 'blue.3' })}
  }

  &:focus:not(:focus-visible) {
    box-shadow: none;
  }
`;

export const SolidButton = styled(BaseButton)<BaseButtonProps>`
  ${({ color, theme }) => {
    if (!color) return css``;
    return css`
      background-color: ${mode(`${color}.6`, `${color}.2`)(theme.colorMode)};
      color: ${mode('white', 'gray.8')(theme.colorMode)};
      :hover:not(:disabled) {
        background-color: ${mode(`${color}.7`, `${color}.3`)(theme.colorMode)};
      }

      :active:not(:disabled) {
        background-color: ${mode(`${color}.8`, `${color}.4`)(theme.colorMode)};
      }

      :disabled {
        opacity: 0.6;
        border-color: transparent;
        background-color: ${mode(`${color}.6`, `${color}.2`)(theme.colorMode)};
      }
    `;
  }}
`;

export const GhostButton = styled(BaseButton)<BaseButtonProps>`
  ${({ color, theme }) => {
    if (!color) return css``;

    if (color === 'gray') {
      return css`
        background-color: transparent;
        color: ${mode('inherit', 'whiteAlpha.9')(theme.colorMode)};
        border-color: transparent;

        :hover:not(:disabled) {
          background-color: ${mode('gray.1', 'whiteAlpha.2')(theme.colorMode)};
        }

        :active:not(:disabled) {
          background-color: ${mode('gray.2', 'whiteAlpha.3')(theme.colorMode)};
        }

        :disabled {
          opacity: 0.6;
        }
      `;
    }
    const c = getColor(theme.colors, color, 2);
    const darkHoverBg = transparentize(c, 0.12);
    const darkActiveBg = transparentize(c, 0.24);
    return css`
      background-color: transparent;
      color: ${mode(`${color}.6`, `${color}.2`)(theme.colorMode)};
      border-color: transparent;

      :hover:not(:disabled) {
        background-color: ${mode(`${color}.0`, darkHoverBg)(theme.colorMode)};
      }

      :active:not(:disabled) {
        background-color: ${mode(`${color}.1`, darkActiveBg)(theme.colorMode)};
      }

      :disabled {
        opacity: 0.6;
      }
    `;
  }}
`;

export const OutlineButton = styled(GhostButton)<BaseButtonProps>`
  ${({ color, theme }) => {
    if (!color) return css``;
    const borderColor = mode('gray.3', 'whiteAlpha.3')(theme.colorMode);
    return css`
      background: transparent;
      border-color: ${color === 'gray' ? borderColor : 'currentColor'};
    `;
  }}
`;

export const LightButton = styled(BaseButton)<BaseButtonProps>`
  ${({ color, theme }) => {
    if (!color) return css``;
    const col = getColor(theme.colors, color, 0);
    return css`
      background-color: ${col};
      color: ${getColor(theme.colors, color, 9)};
      border-color: ${col};

      :hover:not(:disabled) {
        background-color: ${getColor(theme.colors, color, 1)};
      }

      :active:not(:disabled) {
        background-color: ${getColor(theme.colors, color, 2)};
      }

      :disabled {
        opacity: 0.6;
      }
    `;
  }}
`;

export const LinkButton = styled(BaseButton)<BaseButtonProps>`
  ${({ color, theme }) => {
    if (!color) return css``;
    return css`
      background-color: transparent;
      color: ${mode(`${color}.7`, `${color}.2`)(theme.colorMode)};
      border-color: transparent;
      text-decoration: none;

      &:not(:disabled):hover {
        text-decoration: underline;
        color: ${mode(`${color}.8`, `${color}.3`)(theme.colorMode)};
      }

      &:not(:disabled):active {
        transform: none;
        color: ${mode(`${color}.9`, `${color}.4`)(theme.colorMode)};
      }

      :disabled {
        opacity: 0.6;
      }
    `;
  }}
`;

export const ButtonIcon = styled.span<SpaceProps>`
  ${space};
  display: flex;
  align-items: center;
  font-size: 2rem;
`;
