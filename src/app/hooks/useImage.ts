import { useState, useEffect } from 'react';

const useImage = (src: string) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImage(img);
      setStatus('loaded');
    };
    img.onerror = () => {
      setStatus('error');
    };
  }, [src]);

  return [image, status];
};

export default useImage;
