import { useMemo } from 'react';
import { useBreakpoint } from '@xstyled/styled-components';
import { Size } from '@lib/theme';
import { SpaceContainer, SpaceBaseProps } from './Space.styles';
import { forwardRef } from '@lib/utility/forwardRef';

export type SpaceSize = Size | number;

export interface SpaceProps extends Omit<SpaceBaseProps, 'hSize ' | 'vSize'> {
  /**  space Size */
  size?: SpaceSize | SpaceSize[];
}

const sizes = {
  xs: 1,
  sm: 2,
  md: 4,
  lg: 6,
  xl: 8,
};

const getSpaceSize = (spaceSize: SpaceSize) => {
  return typeof spaceSize === 'string' ? sizes[spaceSize] : spaceSize || 1;
};

interface BreakPoints {
  sm: string;
  xs: string;
  lg: string;
  md: string;
}

const Space = forwardRef<SpaceProps, 'div'>((props, ref) => {
  const {
    children,
    $wrap = false,
    size = 'sm',
    flexDirection = 'row',
    ...rest
  } = props;

  const [hSize, vSize] = useMemo(
    () =>
      (Array.isArray(size) ? size : [size, size]).map((el) => getSpaceSize(el)),
    [size]
  );
  const breakpoint = useBreakpoint();

  const direction =
    typeof flexDirection === 'object' && breakpoint
      ? flexDirection[breakpoint as keyof BreakPoints]
      : flexDirection;

  return (
    <SpaceContainer
      ref={ref}
      flexDirection={direction}
      hSize={hSize}
      vSize={vSize}
      $wrap={$wrap}
      {...rest}
    >
      {children}
    </SpaceContainer>
  );
});

// const Space: React.FC<SpaceProps> = ({
//   children,
//   $wrap = false,
//   size = 'sm',
//   flexDirection = 'row',
//   ...rest
// }) => {
//   const [hSize, vSize] = useMemo(
//     () =>
//       (Array.isArray(size) ? size : [size, size]).map((el) => getSpaceSize(el)),
//     [size]
//   );
//   const breakpoint = useBreakpoint();

//   const direction =
//     typeof flexDirection === 'object' && breakpoint
//       ? flexDirection[breakpoint as keyof BreakPoints]
//       : flexDirection;

//   return (
//     <SpaceContainer
//       flexDirection={direction}
//       hSize={hSize}
//       vSize={vSize}
//       $wrap={$wrap}
//       {...rest}
//     >
//       {children}
//     </SpaceContainer>
//   );
// };
export default Space;
