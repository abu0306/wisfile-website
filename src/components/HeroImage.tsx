import React from "react";
import Image from "next/image";

interface HeroImageProps {
  className?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ className = "" }) => {
  const lightGrayBlurDataURL = `data:image/svg+xml;base64,${btoa(
    `<svg width="1190" height="612" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/></svg>`
  )}`;

  return (
    <div 
      className={`relative ${className}`}
      style={{
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        overflow: 'hidden',
        minHeight: '200px',
        '--image-bg': '#f9fafb',
      } as React.CSSProperties}
    >
      <Image
        src={'/images/webp/hero-1200w.webp'}
        alt="AI Renaming Hero Screenshot"
        width={1190}
        height={612}
        priority
        quality={85}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
        placeholder="blur"
        blurDataURL={lightGrayBlurDataURL}
        className="w-full h-auto object-contain bg-transparent text-transparent block"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
};

export default HeroImage; 