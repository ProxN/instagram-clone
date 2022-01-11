import styled, {
  css,
  backgroundColor,
  BackgroundColorProps,
} from '@xstyled/styled-components';

export interface AvatarStyleProps extends BackgroundColorProps {
  /**  avatar size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /** if "true",set avatar border radius to 50% */
  isCircle?: boolean;

  addBorder?: boolean;
}

const sizes = {
  sm: {
    height: '2.4rem',
    width: '2.4rem',
  },
  md: {
    height: '3.4rem',
    width: '3.4rem',
  },
  lg: {
    height: '5.6rem',
    width: '5.6rem',
  },
  xl: {
    height: '8rem',
    width: '8rem',
  },
  '2xl': {
    height: '10rem',
    width: '10rem',
  },
};

export const AvatarContaienr = styled.div<AvatarStyleProps>`
  ${({ size }) => size && { ...sizes[size] }};
  ${({ isCircle }) => isCircle && css({ borderRadius: '50%' })};
  ${backgroundColor};
  border-radius: 50%;

  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  position:relative;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  ${({ addBorder }) =>
    addBorder &&
    css`
      position: relative;
      box-shadow: 0 0 0 2px #fff;
      z-index: 10;

      ::after {
        content: '';
        position: absolute;
        left: -4px;
        right: -4px;
        bottom: -4px;
        top: -4px;
        z-index: -1;
        border: 2px solid;
        border-color: red.6;
        border-radius: 50%;
      }
    `}
  }
`;
