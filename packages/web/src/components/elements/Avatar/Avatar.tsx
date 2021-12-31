import Image from 'next/image';
import { useMemo } from 'react';
import { AvatarContaienr, AvatarStyleProps } from './Avatar.styles';

const SplitName = (name: string) => {
  const nameArr = name.split(' ');
  return nameArr[0][0] + nameArr[1][0];
};

interface AvatarProps extends AvatarStyleProps {
  /* The src attribute for the img element. */
  src?: string;

  /* Used in combination with src to provide an alt attribute for the rendered img element. */
  alt?: string;

  /* Attributes applied to the img element if the component is used to display an image.  */
  imgProps?: Record<string, string>;

  name?: string;

  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  isCircle = true,
  addBorder = false,
  src,
  imgProps,
  alt,
  backgroundColor,
  name,
  onClick,
}) => {
  let mmemoizedName;
  if (name) {
    mmemoizedName = useMemo(() => SplitName(name), [name]);
  }

  return (
    <AvatarContaienr
      onClick={onClick}
      backgroundColor={!src ? 'gray.4' : backgroundColor}
      size={size}
      addBorder={addBorder}
      isCircle={isCircle}
    >
      {mmemoizedName ? (
        <span>{mmemoizedName}</span>
      ) : (
        src && (
          <Image height='100%' width='100%' src={src} alt={alt} {...imgProps} />
        )
      )}
    </AvatarContaienr>
  );
};
export default Avatar;
