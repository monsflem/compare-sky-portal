
import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  size?: 'default' | 'large';
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  className = '',
  fallbackSrc = '/placeholder.svg',
  size = 'default'
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  const logoSize = size === 'large' ? 'h-24 w-auto max-w-52' : 'h-20 w-auto max-w-48';
  
  return (
    <div className="w-64 h-40 bg-white rounded-lg p-8 flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
      <img
        src={imgSrc}
        alt={alt}
        className={className || `${logoSize} object-contain max-w-full max-h-full`}
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
};

export default ImageWithFallback;
