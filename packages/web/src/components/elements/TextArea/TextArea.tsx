import { forwardRef } from '@lib/utility/forwardRef';
import { Input, InputProps } from '../Input';
import { InputWrapper, InputWrapperProps } from '../InputWrapper';

interface TextAreaProps
  extends InputProps,
    Omit<InputWrapperProps, 'children'> {}

const TextArea = forwardRef<TextAreaProps, 'textarea'>((props, ref) => {
  const { icon, id, label, isRequired, error, ...inputProps } = props;

  return (
    <InputWrapper id={id} label={label} error={error} isRequired={isRequired}>
      <Input
        as='textarea'
        id={id}
        isRequired={isRequired}
        icon={icon}
        padding='.5rem 1.2rem'
        ref={ref}
        {...inputProps}
      />
    </InputWrapper>
  );
});

export default TextArea;
