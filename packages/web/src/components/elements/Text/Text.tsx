import { FontSizes } from '@lib/theme/theme';
import { forwardRef } from '@lib/utility/forwardRef';
import { TextDiv, TextBaseProps } from './Text.styles';

export interface TextProps extends Omit<TextBaseProps, 'fontSize'> {
  size?: FontSizes | number | Record<string, string>;
}

const Text = forwardRef<TextProps, 'div'>((props, ref) => {
  const {
    size = 'sm',
    isLink = false,
    fontWeight = 400,
    children,
    lineHeight = '1.4',
    ...rest
  } = props;

  return (
    <TextDiv
      ref={ref}
      isLink={isLink}
      fontWeight={fontWeight}
      fontSize={size}
      lineHeight={lineHeight}
      {...rest}
    >
      {children}
    </TextDiv>
  );
});

export default Text;
