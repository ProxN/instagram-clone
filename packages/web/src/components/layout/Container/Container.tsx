import styled, {
  compose,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  css,
} from '@xstyled/styled-components';

interface ContainerProps extends LayoutProps, SpaceProps {
  /** If fluid is set to true, the Container will always  take 100% of width */
  fluid?: boolean;
}

const ContainerSystem = compose(layout, space);

const XContainer = styled.div<ContainerProps>`
  ${({ fluid }) => fluid && css({ maxWidth: '100%' })};
  margin-left: auto;
  margin-right: auto;
  ${ContainerSystem}
`;

const Container: React.FC<ContainerProps> = ({ fluid = false, ...rest }) => {
  return (
    <XContainer
      px={4}
      container={fluid ? {} : { sm: false }}
      fluid={fluid}
      {...rest}
    />
  );
};

export default Container;
