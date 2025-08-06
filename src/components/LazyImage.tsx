"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
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
  loading?: "lazy" | "eager";
  rootMargin?: string;
  threshold?: number;
}

const LazyImage: React.FC<LazyImageProps> = ({
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
  loading = "lazy",
  rootMargin = "50px",
  threshold = 0.1,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // 如果设置了 priority，则立即加载
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    // 创建 Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // 停止观察
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, rootMargin, threshold]);

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
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/></svg>`
  )}`;

  return (
    <div
      ref={imgRef}
      className={`relative ${className}`}
      style={
        {
          backgroundColor: "#f9fafb",
          borderRadius: "8px",
          overflow: "hidden",
          minHeight: fill ? "200px" : `${height}px`,
          "--image-bg": "#f9fafb",
          ...style,
        } as React.CSSProperties
      }
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

      {/* 实际的图片 - 参考 HeroImage.tsx 的属性 */}
      {isInView && !hasError && (
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
          loading={priority ? undefined : loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 bg-transparent w-full h-auto object-contain text-transparent ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      )}
    </div>
  );
};

export default LazyImage;
