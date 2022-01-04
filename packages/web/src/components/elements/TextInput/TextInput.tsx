import { forwardRef } from '@lib/utility/forwardRef';
import { Input, InputProps } from '../Input';
import { InputWrapper, InputWrapperProps } from '../InputWrapper';

interface TextInputProps
  extends InputProps,
    Omit<InputWrapperProps, 'children'> {
  type?: 'number' | 'text' | 'search' | 'tel' | 'url' | 'email' | 'password';

  ref?: React.ForwardedRef<HTMLInputElement>;
}

// const TextInput: React.FC<TextInputProps> = (props) => {
//   const {
//     icon,
//     id,
//     label,
//     isRequired,
//     error,
//     type = 'text',
//     ref,
//     ...inputProps
//   } = props;

//   return (
//     <InputWrapper id={id} label={label} error={error} isRequired={isRequired}>
//       <Input
//         type={type}
//         isRequired={isRequired}
//         id={id}
//         icon={icon}
//         ref={ref}
//         {...inputProps}
//       />
//     </InputWrapper>
//   );
// };

const TextInput = forwardRef<TextInputProps, 'input'>((props, ref) => {
  const {
    icon,
    id,
    label,
    isRequired,
    error,
    type = 'text',

    ...inputProps
  } = props;

  return (
    <InputWrapper id={id} label={label} error={error} isRequired={isRequired}>
      <Input
        type={type}
        isRequired={isRequired}
        id={id}
        icon={icon}
        ref={ref}
        {...inputProps}
      />
    </InputWrapper>
  );
});

export default TextInput;
