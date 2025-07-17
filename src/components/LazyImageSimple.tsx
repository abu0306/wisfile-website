"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLazyLoad } from "@/hooks/useLazyLoad";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  rootMargin?: string;
  threshold?: number;
}

const LazyImageSimple: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholder = "blur",
  blurDataURL,
  onLoad,
  onError,
  style,
  fill = false,
  sizes,
  quality = 75,
  rootMargin = "50px",
  threshold = 0.1,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [ref, isInView] = useLazyLoad({ rootMargin, threshold });

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // 生成默认的模糊占位符
  const defaultBlurDataURL = `data:image/svg+xml;base64,${btoa(
    `<svg width="${width || 400}" height="${
      height || 300
    }" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/></svg>`
  )}`;

  // 如果设置了 priority，立即显示图片
  const shouldShowImage = priority || isInView;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {/* 加载状态的占位符 */}
      {!isLoaded && !hasError && (
        <div
          className={`absolute inset-0 bg-gray-200 animate-pulse ${
            fill ? "w-full h-full" : ""
          }`}
          style={fill ? {} : { width, height }}
        />
      )}

      {/* 错误状态的占位符 */}
      {hasError && (
        <div
          className={`absolute inset-0 bg-gray-100 flex items-center justify-center ${
            fill ? "w-full h-full" : ""
          }`}
          style={fill ? {} : { width, height }}
        >
          <div className="text-gray-400 text-center">
            <svg
              className="mx-auto mb-2 w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span className="text-sm">Failed to load</span>
          </div>
        </div>
      )}

      {/* 实际的图片 */}
      {shouldShowImage && !hasError && (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          sizes={sizes}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL || defaultBlurDataURL}
          priority={priority}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

export default LazyImageSimple;
