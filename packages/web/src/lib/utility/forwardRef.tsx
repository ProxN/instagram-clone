import React from 'react';
import {
  ComponentWithAs,
  ExtendableProps,
  As,
  PropsOf,
} from '../types/utility-types';

const forwardRef = <P extends object, C extends React.ElementType>(
  component: React.ForwardRefRenderFunction<
    any,
    ExtendableProps<PropsOf<C>, P> & {
      as?: As;
    }
  >
) => {
  // prettier-ignore
  return (React.forwardRef(component) as unknown) as ComponentWithAs<P, C>;
};

export { forwardRef };
