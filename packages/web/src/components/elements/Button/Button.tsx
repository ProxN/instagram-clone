import React from 'react';
import { DefaultTheme } from 'styled-components';
import { useTheme, x } from '@xstyled/styled-components';
import { forwardRef } from '@lib/utility/forwardRef';
import {
  OutlineButton,
  LightButton,
  SolidButton,
  BaseButtonProps,
  LinkButton,
  ButtonIcon,
  GhostButton,
} from './Button.styles';
import { Loader } from '../Loader';

export interface ButtonProps extends BaseButtonProps {
  /** if "true" set button to disbaled. */
  isDisabled?: boolean;

  /** If "true" set color to primary color. */
  isPrimary?: boolean;

  /** Button appearance. */
  variant?: 'solid' | 'outline' | 'link' | 'light' | 'ghost';

  /** Set button type attribute. */
  type?: 'submit' | 'button' | 'reset';

  /** If `true`, show spinner  */
  isLoading?: boolean;

  /** The label to show in the button when `isLoading` is true */
  loadingText?: string;

  /** Show icon before the button label */
  leftIcon?: React.ReactElement;

  /** Show icon after the button label */
  rightIcon?: React.ReactElement;
}

const getStyledButton = (variant: string) => {
  if (variant === 'outline') {
    return OutlineButton;
  }

  if (variant === 'light') {
    return LightButton;
  }

  if (variant === 'link') {
    return LinkButton;
  }

  if (variant === 'ghost') {
    return GhostButton;
  }

  return SolidButton;
};

const Button = forwardRef<ButtonProps, 'button'>((props, ref) => {
  const {
    children,
    variant = 'solid',
    size = 'md',
    radius = 'xs',
    color = 'gray',
    isDisabled = false,
    isLoading = false,
    isPrimary = false,
    leftIcon,
    rightIcon,
    onClick,
    loadingText,
    ...rest
  } = props;

  const theme: DefaultTheme = useTheme();

  const StyledButton = getStyledButton(variant);

  return (
    <StyledButton
      ref={ref}
      disabled={isDisabled || isLoading}
      radius={radius}
      size={size}
      onClick={onClick}
      color={isPrimary ? theme.primary : color}
      {...rest}
    >
      {leftIcon && <ButtonIcon mr={2}>{leftIcon}</ButtonIcon>}

      {isLoading && (
        <x.div
          display='flex'
          justifyContent='center'
          alignItems='center'
          position='absolute'
          h='100%'
        >
          <Loader size='small' />
        </x.div>
      )}

      {isLoading
        ? loadingText || <x.div opacity={0}>{children}</x.div>
        : children}

      {rightIcon && <ButtonIcon ml={2}>{rightIcon}</ButtonIcon>}
    </StyledButton>
  );
});

export default Button;
