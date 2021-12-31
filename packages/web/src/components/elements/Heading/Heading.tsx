import { Text, TextProps } from '../Text';

interface HeadingProps extends TextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const getLineHeight = (heading: string) => {
  if (heading === 'h1') {
    return { lineHeight: '1.2' };
  }
  if (heading === 'h2') {
    return { lineHeight: '1.3' };
  }
  return { lineHeight: '1.4' };
};

const Heading: React.FC<HeadingProps> = ({ as = 'h2', ...rest }) => {
  return <Text as={as} fontWeight='bold' {...getLineHeight(as)} {...rest} />;
};

export default Heading;
