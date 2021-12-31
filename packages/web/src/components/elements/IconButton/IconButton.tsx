import { ButtonProps } from '../Button';
import { IconButtonBaseProps, StyledButton } from './IconButton.styles';

type OmitButtonProps =
  | 'fullWidth'
  | 'variant'
  | 'loadingText'
  | 'leftIcon'
  | 'rightIcon'
  | 'size';

interface IconButtonProps
  extends Omit<ButtonProps, OmitButtonProps>,
    IconButtonBaseProps {
  /** The icon to be used in the button. */
  icon?: React.ReactElement;

  /** A label that describes the button */
  ariaLabel: string;

  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  size = 'sm',
  isCircle = false,
  ariaLabel,
  variant,
  icon,
  ...rest
}) => {
  return (
    <StyledButton
      // as={variant === 'link' ? 'a' : 'button'}
      variant={variant}
      aria-label={ariaLabel}
      isCircle={isCircle}
      size={size}
      {...rest}
    >
      {icon}
    </StyledButton>
  );
};

export default IconButton;
