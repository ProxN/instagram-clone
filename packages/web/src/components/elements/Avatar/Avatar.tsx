import Image from 'next/image';
import { useMemo } from 'react';
import { Loader } from '../Loader';
import { AvatarContaienr, AvatarStyleProps } from './Avatar.styles';

const SplitName = (name: string) => {
  const nameArr = name.split(' ');
  return nameArr[0][0] + nameArr[1][0];
};

interface AvatarProps extends AvatarStyleProps {
  /* The src attribute for the img element. */
  src?: string | null;

  /* Used in combination with src to provide an alt attribute for the rendered img element. */
  alt?: string;

  /* Attributes applied to the img element if the component is used to display an image.  */
  imgProps?: Record<string, string>;

  name?: string;

  onClick?: () => void;

  isLoading?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  isCircle = true,
  addBorder = false,
  isLoading,
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
          <>
            <Image layout='fill' src={src} alt={alt} {...imgProps} priority />
          </>
        )
      )}
      {isLoading && <Loader />}
    </AvatarContaienr>
  );
};
export default Avatar;
