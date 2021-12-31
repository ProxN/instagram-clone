import styled, {
  css,
  borderRadius,
  BorderRadiusProps,
  width,
  WidthProps,
  maxWidth,
  MaxWidthProps,
  compose,
  space,
  SpaceProps,
  border,
  BorderProps,
  height,
  HeightProps,
} from '@xstyled/styled-components';
import { mode } from '@lib/utility/component';

export interface InputBaseProps
  extends BorderRadiusProps,
    MaxWidthProps,
    WidthProps,
    SpaceProps,
    BorderProps,
    HeightProps {
  /** Input appearance */
  variant?: 'filled' | 'default' | 'unstyled';

  /** if "true", set border color to red and aria-invalid on input */
  isInvalid?: boolean;
}

const inputSystem = compose(
  borderRadius,
  width,
  maxWidth,
  space,
  border,
  height
);

const BaseInput = styled.input<InputBaseProps>`
  width: 100%;
  min-width: 0px;
  outline: none;
  position: relative;
  user-select: none;
  appearance: none;
  transition-property: border-color, background-color;
  transition-duration: slow;
  transition-timing-function: ease-in-out;
  line-height: 1.4;
  font-family: inherit;
  resize: none;
  font-size: sm;
  height: 4rem;
  padding: 0 1.2rem;
  color: inherit;

  &:disabled {
    cursor: not-allowed;
    background-color: gray.1;
    opacity: 0.6;
  }
`;

export const DefaultInput = styled(BaseInput)`
  border: 1px solid transparent;
  background-color: inherit;

  ${({ theme }) => css`
    border-color: ${mode('gray.3', 'whiteAlpha.3')(theme.colorMode)};

    &:not(:focus):not(:disabled):hover {
      border-color: ${mode('gray.4', 'whiteAlpha.4')(theme.colorMode)};
    }

    &:focus {
      outline: none;
      border-color: ${mode(
        `${String(theme.primary)}.6`,
        `${String(theme.primary)}.3`
      )(theme.colorMode)};
    }

    &::placeholder {
      color: ${mode('gray.5', 'whiteAlpha.4')(theme.colorMode)};
    }
  `}

  ${({ isInvalid, theme }) =>
    isInvalid &&
    css`
      color: ${mode('red.6', 'red.3')(theme.colorMode)};
      border-color: inherit;

      &:not(:focus):not(:disabled):hover {
        border-color: ${mode('red.7', 'red.4')(theme.colorMode)};
      }

      &:focus {
        border-color: ${mode('red.8', 'red.5')(theme.colorMode)};
      }

      &::placeholder {
        opacity: 1;
        color: inherit;
      }
    `}
      ${inputSystem};
`;

export const FilledInput = styled(BaseInput)`
  ${({ theme }) => css`
    background-color: ${mode('gray.1', 'whiteAlpha.0')(theme.colorMode)};

    &:hover {
      background-color: ${mode('gray.2', 'whiteAlpha.1')(theme.colorMode)};
    }

    &:focus {
      outline: none;
      border-color: ${mode(
        `${String(theme.primary)}.6`,
        `${String(theme.primary)}.3`
      )(theme.colorMode)};
    }
  `};

  border: 1px solid;
  border-color: transparent;

  &::placeholder {
    opacity: 0.6;
  }

  ${({ isInvalid, theme }) =>
    isInvalid &&
    css`
      color: ${mode('red.6', 'red.3')(theme.colorMode)};
      border-color: inherit;
      background-color: red.1;

      &:hover {
        border-color: ${mode('red.7', 'red.4')(theme.colorMode)};
        background-color: red.1;
      }

      &:focus {
        border-color: ${mode('red.8', 'red.5')(theme.colorMode)};
      }

      &::placeholder {
        opacity: 1;
        color: red.6;
      }
    `}
  ${inputSystem};
`;

export const UnStyledInput = styled(BaseInput)`
  background-color: transparent;
  border: 0;
  outline: 0;
  padding: 0;

  &:disabled {
    background-color: transparent;
  }

  &::placeholder {
    opacity: 0.6;
  }

  ${({ isInvalid }) =>
    isInvalid &&
    css`
      color: red.6;

      &::placeholder {
        opacity: 1;
        color: red.6;
      }
    `}
  ${inputSystem};
`;

export const InputContainer = styled.div<{ withIcon?: boolean }>`
  position: relative;

  & ${BaseInput} {
    ${({ withIcon }) =>
      withIcon &&
      css`
        padding-left: 3.2rem;
      `}
  }
  ${inputSystem};
`;

export const InputIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  pointer-events: none;
  width: 3.4rem;
  opacity: 0.5;
`;
