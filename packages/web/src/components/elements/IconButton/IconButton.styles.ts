import styled, { css } from '@xstyled/styled-components';
import { Button } from '../Button';

export interface IconButtonBaseProps {
  /** if "true",set button border radius to 50% */
  isCircle?: boolean;

  /** Button appearance. */
  variant?: 'solid' | 'outline' | 'light' | 'link' | 'ghost';

  /**  button size */
  size?: 'sm' | 'md' | 'lg';

  fontSize?: string | number;
}

const sizes = {
  sm: {
    padding: '0',
    fontSize: '2.4rem',
  },
  md: {
    padding: '.4rem 0',
    fontSize: '3.2rem',
  },
  lg: {
    height: '4rem',
    padding: '.6rem 0rem',
    width: '4rem',
    fontSize: '2rem',
  },
};

export const StyledButton = styled(Button)<IconButtonBaseProps>`
  ${({ size }) => size && { ...sizes[size] }};
  ${({ isCircle }) => isCircle && css({ borderRadius: '50%' })};
  ${({ fontSize }) => fontSize && css({ fontSize })};
  display: flex;
  cursor: pointer;
  align-items: center;
`;
