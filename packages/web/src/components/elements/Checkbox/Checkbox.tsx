import { forwardRef } from '@lib/utility/forwardRef';
import { Icon } from '../Icon';
import {
  CheckBoxWrapper,
  CheckBoxInput,
  CheckBoxLabel,
  CustomCheckBox,
  BaseCheckBoxProps,
} from './Checkbox.styles';

type HTMLInputProps = Omit<
  React.HTMLAttributes<HTMLInputElement>,
  'size' | 'onChange' | 'type' | 'onBlur' | 'name'
>;

interface CheckBoxProps extends BaseCheckBoxProps, HTMLInputProps {
  /** if "true", the checkbox will be checked. */
  isChecked?: boolean;

  /** If `true`, the checkbox will be initially checked. */
  defaultChecked?: boolean;

  /** If `true`, the checkbox will be disabled. */
  isDisabled?: boolean;

  /** The callback invoked when the checked state of the `Checkbox` changes.. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /** The callback invoked when the checkbox is blurred. */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /* The callback invoked when the checkbox is focused. */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /** The name of the input field in a checkbox. */
  name?: string;

  /** The value to be used in the checkbox input. */
  value?: string | number;

  /** Checked Icon */
  icon?: React.ReactElement;
}

const CheckBox = forwardRef<CheckBoxProps, 'input'>((props, ref) => {
  const {
    children,
    iconColor,
    iconSize = 'md',
    isChecked = false,
    isDisabled = false,
    id,
    icon = <Icon name='check' />,
    ...rest
  } = props;

  return (
    <CheckBoxWrapper iconSize={iconSize} iconColor={iconColor} htmlFor={id}>
      <CheckBoxInput
        disabled={isDisabled}
        type='checkbox'
        ref={ref}
        checked={isChecked}
        id={id}
        {...rest}
      />
      <CustomCheckBox>{isChecked && icon}</CustomCheckBox>
      <CheckBoxLabel>{children}</CheckBoxLabel>
    </CheckBoxWrapper>
  );
});

export default CheckBox;
