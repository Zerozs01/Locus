import { useEffect, useState } from 'react';
import { getCachedImageUrl } from '../utils/imageCache';

interface CachedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
}

const fallbackSrc = getCachedImageUrl('');

export const CachedImage = ({ src, onError, ...props }: CachedImageProps) => {
  const [resolvedSrc, setResolvedSrc] = useState(() => getCachedImageUrl(src || ''));

  useEffect(() => {
    setResolvedSrc(getCachedImageUrl(src || ''));
  }, [src]);

  return (
    <img
      {...props}
      src={resolvedSrc}
      onError={(event) => {
        if (resolvedSrc !== fallbackSrc) {
          setResolvedSrc(fallbackSrc);
        }
        onError?.(event);
      }}
    />
  );
};
