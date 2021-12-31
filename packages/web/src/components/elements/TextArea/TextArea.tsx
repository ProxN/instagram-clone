import { Input, InputProps } from '../Input';
import { InputWrapper, InputWrapperProps } from '../InputWrapper';

interface TextAreaProps
  extends InputProps,
    Omit<InputWrapperProps, 'children'> {}

const TextArea: React.FC<TextAreaProps> = ({
  icon,
  id,
  label,
  isRequired,
  error,
  ...inputProps
}) => {
  return (
    <InputWrapper id={id} label={label} error={error} isRequired={isRequired}>
      <Input
        as='textarea'
        id={id}
        isRequired={isRequired}
        icon={icon}
        {...inputProps}
      />
    </InputWrapper>
  );
};

export default TextArea;
