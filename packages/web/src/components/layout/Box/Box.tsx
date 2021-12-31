import styled, { system, SystemProps } from '@xstyled/styled-components';
import { forwardRef } from '@lib/utility/forwardRef';

export interface BoxProps extends SystemProps {
  color?: React.HTMLAttributes<HTMLDivElement>['color'];
  minW?: string | Record<string, string>;
}

const CustomBox = styled.div.withConfig({
  shouldForwardProp: (prop, validate) =>
    validate(prop) && !system.meta.props.includes(prop),
})<BoxProps>`
  ${system}
`;

const Box = forwardRef<BoxProps, 'div'>((props, ref) => {
  return <CustomBox ref={ref} {...props} />;
});

export default Box;
