import styled, { css } from '@xstyled/styled-components';

export interface BaseCheckBoxProps {
  /** The color of the checkbox icon when checked. */
  iconColor?: string;

  /** The size of the checkbox icon */
  iconSize?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: {
    height: '1.4rem',
    width: '1.4rem',
    fontSize: '1.4rem',
  },
  md: {
    height: '1.6rem',
    width: '1.6rem',
    fontSize: '1.4rem',
  },
  lg: {
    height: '2.4rem',
    width: '2.4rem',
    fontSize: '2.4rem',
  },
};

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
export const CheckBoxInput = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const CustomCheckBox = styled.span`
  border: 1px solid transparent;
  border-color: gray.5;
  background-color: gray.0;
  height: 1.6rem;
  width: 1.6rem;
  margin-right: 0.8rem;
  border-radius: xs;
  transition-property: border-color;
  transition-duration: normal;
  transition-timing-function: ease-in-out;
  transition-duration: normal;
`;

export const CheckBoxWrapper = styled.label<BaseCheckBoxProps>`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &:hover > ${CheckBoxInput}:not(:disabled) ~ ${CustomCheckBox} {
    border-color: ${({ theme, iconColor }) =>
      iconColor ? theme.colors[iconColor][6] : theme.colors[theme.primary][6]};
  }

  & ${CheckBoxInput}:checked ~ ${CustomCheckBox} {
    background: ${({ theme, iconColor }) =>
      iconColor ? theme.colors[iconColor][6] : theme.colors[theme.primary][6]};
    border-color: transparent;
    color: #fff;
  }

  & ${CheckBoxInput}:disabled ~ ${CustomCheckBox} {
    background-color: gray.1;
    cursor: not-allowed;
  }

  & ${CustomCheckBox} {
    ${({ iconSize }) => iconSize && css({ ...sizes[iconSize] })}
  }
`;

export const CheckBoxLabel = styled.span`
  font-size: inherit;
  color: inherit;
`;
