export type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : TupleOf<T, N, []>
  : never;
type TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
  ? R
  : TupleOf<T, N, [T, ...R]>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type As<P = any> = React.ElementType<P>;

export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

export type ExtendableProps<
  ExtendedProps extends object,
  OverrideProps extends object
> = Omit<ExtendedProps, keyof OverrideProps> & OverrideProps;

export type ComponentWithAs<P extends object, C extends As> = {
  <T extends As>(
    props: ExtendableProps<React.ComponentProps<C>, P> &
      ExtendableProps<React.ComponentProps<T>, P> & {
        as?: T;
      }
  ): JSX.Element;
};
