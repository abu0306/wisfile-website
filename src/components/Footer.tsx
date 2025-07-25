"use client";
import LazyImage from "@/components/LazyImage";

export default function Footer() {
  return (
    <footer
      className="flex flex-col items-center bg-white mt-12 pt-16 pb-8 w-full"
      style={{ borderRadius: "121px 121px 0px 0px" }}
    >
      <div className="flex md:flex-row flex-col justify-between items-start md:items-start px-6 sm:px-8 w-full max-w-6xl">
        {/* Left: Logo and Navigation */}
        <div className="flex flex-col items-start md:items-start mb-12 md:mb-0 w-full md:w-auto">
          <div className="flex items-center mb-6 md:mb-2">
            <LazyImage
              src="/images/logo.png"
              alt="WisFile Logo"
              width={52}
              height={52}
              className="mr-3 md:w-14 md:h-14"
              priority
            />
            <span className="font-bold text-gray-800 text-2xl md:text-3xl">
              WisFile
            </span>
          </div>
          <div className="flex flex-row md:flex-row justify-start md:justify-start gap-14 md:gap-12 mt-6 md:mt-4 w-full">
            {/* Left Column: Home, AI Renaming, AI Foldering, Metadata Remover */}
            <div className="flex flex-col gap-4 md:gap-2 text-left md:text-left">
              <a
                href="/"
                className="font-medium text-gray-600 hover:text-[#FFA800] text-base md:text-lg transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="/features/ai-renamer"
                className="font-medium text-gray-600 hover:text-[#FFA800] text-base md:text-lg transition-colors duration-200"
              >
                AI Renaming
              </a>
              <a
                href="/features/auto-foldering"
                className="font-medium text-gray-600 hover:text-[#FFA800] text-base md:text-lg transition-colors duration-200"
              >
                AI Foldering
              </a>
              <a
                href="/features/metadata-remover"
                className="font-medium text-gray-600 hover:text-[#FFA800] text-base md:text-lg transition-colors duration-200"
              >
                Metadata Remover
              </a>
            </div>
            {/* Right Column: Blog, Downloads, About Us */}
            <div className="flex flex-col gap-4 md:gap-2 text-left md:text-left">
              <a
                href="/blog"
                className="font-medium text-gray-600 hover:text-[#FFA800] text-base md:text-lg transition-colors duration-200"
              >
                Blog
              </a>
              <a
                href="/downloads"
                className="font-medium text-gray-600 hover:text-[#FFA800] text-base md:text-lg transition-colors duration-200"
              >
                Downloads
              </a>
              <a
                href="/about"
                className="font-medium text-gray-600 hover:text-[#FFA800] text-base md:text-lg transition-colors duration-200"
              >
                About Us
              </a>
            </div>
          </div>
        </div>
        {/* Right: Contact Us */}
        <div className="flex flex-col items-start md:items-end w-full md:w-auto">
          <div className="mb-6 md:mb-4 font-semibold text-gray-800 text-xl md:text-2xl text-left md:text-left">
            Contact Us
          </div>
          <div className="flex flex-row gap-5 md:gap-6 mb-6 md:mb-4">
            {/* X (Twitter) icon */}
            <a
              href="https://x.com/Wisfileofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center bg-[#FFF6E0] hover:bg-[#FFD36A] shadow-lg hover:shadow-xl p-4 md:p-4 rounded-2xl hover:scale-105 transition-all duration-300 transform"
            >
              <LazyImage
                src="/images/x-logo.png"
                alt="X"
                width={36}
                height={36}
                className="md:w-10 md:h-10"
              />
            </a>
            {/* Discord icon */}
            <a
              href="https://discord.gg/Yzmgc7vKDw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center bg-[#FFF6E0] hover:bg-[#FFD36A] shadow-lg hover:shadow-xl p-4 md:p-4 rounded-2xl hover:scale-105 transition-all duration-300 transform"
            >
              <LazyImage
                src="/images/discord-logo.png"
                alt="Discord"
                width={36}
                height={36}
                className="md:w-10 md:h-10"
              />
            </a>
          </div>
          <div className="font-medium text-gray-700 text-sm md:text-base text-left md:text-left">
            support@atominfinite.ai
          </div>
        </div>
      </div>
      {/* Bottom Row: Copyright and Links */}
      <div className="flex md:flex-row flex-col justify-s items-start md:items-center mt-12 md:mt-8 px-6 sm:px-8 w-full max-w-6xl text-gray-400 text-xs md:text-base">
        <div className="mb-4 md:mb-0 font-medium text-left md:text-left">
          @2025 ATOM INFINITE PTE. LTD. All rights reserved
        </div>
        <div className="flex flex-row gap-4 md:gap-6">
          <a
            href="/privacy-policy"
            className="font-medium hover:text-gray-600 transition-colors duration-200"
          >
            &nbsp; Privacy Policy
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="/terms-of-service"
            className="font-medium hover:text-gray-600 transition-colors duration-200"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
