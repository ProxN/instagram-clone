import { InputMaybe } from '@lib/graphql';
import { forwardRef } from '@lib/utility/forwardRef';
import {
  DefaultInput,
  FilledInput,
  UnStyledInput,
  InputBaseProps,
  InputContainer,
  InputIcon,
} from './Input.styles';

type Omitted = 'disabled' | 'required';

export interface InputProps
  extends Omit<React.HTMLAttributes<HTMLInputElement>, Omitted>,
    InputBaseProps {
  /** if "true", disable ionput element */
  isDisabled?: boolean;

  /** if "true", set aria-required   */
  isRequired?: boolean;

  /** Add icon on left side of input */
  icon?: React.ReactNode;

  value?: string | InputMaybe<string>;
}

const getInput = (variant: string) => {
  if (variant === 'filled') {
    return FilledInput;
  }

  if (variant === 'unstyled') {
    return UnStyledInput;
  }

  return DefaultInput;
};

const Input = forwardRef<InputProps, 'input'>((props, ref) => {
  const {
    isDisabled = false,
    isInvalid = false,
    isRequired = false,
    variant = 'default',
    borderRadius = 'sm',
    id,
    icon,
    ...rest
  } = props;

  const StyledInput = getInput(variant);

  const input = (
    <StyledInput
      id={id}
      required={isRequired}
      aria-invalid={isInvalid}
      aria-required={isRequired}
      aria-describedby={`${id}-feedback`}
      isInvalid={isInvalid}
      disabled={isDisabled}
      ref={ref}
      borderRadius={borderRadius}
      {...rest}
    />
  );

  if (icon) {
    return (
      <InputContainer withIcon>
        <InputIcon>{icon}</InputIcon>
        {input}
      </InputContainer>
    );
  }

  return input;
});

export default Input;
