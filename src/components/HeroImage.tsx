import Image from "next/image";
import { isMobileServer } from "@/lib/device-detection";

interface HeroImageProps {
  className?: string;
}

const HeroImage = async ({ className = "" }: HeroImageProps) => {
  const lightGrayBlurDataURL = `data:image/svg+xml;base64,${btoa(
    `<svg width="1190" height="612" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/></svg>`
  )}`;

  // 服务端检测是否为移动端
  const isMobile = await isMobileServer();

  return (
    <div
      className={`relative ${className}`}
      style={
        {
          borderRadius: "8px",
          overflow: "hidden",
          minHeight: "200px",
        } as React.CSSProperties
      }
    >
      {!isMobile && (
        <Image
          src={"/images/webp/hero-1024w.webp"}
          alt="AI Renaming Hero Screenshot"
          width={1190}
          height={612}
          priority
          quality={85}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
          placeholder="blur"
          blurDataURL={lightGrayBlurDataURL}
          className="hidden md:block bg-transparent w-full h-auto object-contain text-transparent"
          fetchPriority="high"
          decoding="async"
        />
      )}

      {isMobile && (
        <Image
          src={"/images/webp/hero-480w.webp"}
          alt="AI Renaming Hero Screenshot"
          width={1190}
          height={612}
          priority
          quality={85}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
          placeholder="blur"
          blurDataURL={lightGrayBlurDataURL}
          className="md:hidden block bg-transparent w-full h-auto object-contain text-transparent"
          fetchPriority="high"
          decoding="async"
        />
      )}
    </div>
  );
};

export default HeroImage;
