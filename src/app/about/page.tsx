import LazyImage from "@/components/LazyImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Wisfile: AI-Powered File Renaming & Organizing Tool",
  description:
    "100% Local AI File Renamer and Organizer — No Fees, No Data Leaks. " +
    "Automatically generates clear, consistent filenames based on content. " +
    "Instantly sorts your files into logical folders for easy access. " +
    "All operations run on your device — no cloud, no data leaks.",
  alternates: {
    canonical: "https://www.wisfile.ai/about",
  },
  openGraph: {
    title: "About Us | Wisfile: AI-Powered File Renaming & Organizing Tool",
    description:
      "100% Local AI File Renamer and Organizer — No Fees, No Data Leaks. " +
      "Automatically generates clear, consistent filenames based on content.",
    url: "https://www.wisfile.ai/about",
    siteName: "WisFile",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Wisfileofficial",
    title: "About Us | Wisfile: AI-Powered File Renaming & Organizing Tool",
    description:
      "100% Local AI File Renamer and Organizer — No Fees, No Data Leaks. " +
      "Automatically generates clear, consistent filenames based on content.",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center bg-[#FEFCF7] px-4 sm:px-0 sm:py-8 pt-10 pb-4 min-h-screen">
      <div className="flex flex-col items-center mt-8 sm:mt-12 mb-6 sm:mb-8">
        <LazyImage
          src="/images/logo.png"
          alt="About Us Icon"
          width={128}
          height={128}
          className="w-20 sm:w-32 h-20 sm:h-32"
        />
      </div>
      <div className="flex flex-col items-start bg-transparent px-4 sm:px-0 w-full max-w-4xl">
        <h1 className="mb-4 sm:mb-6 w-full md:font-bold text-2xl sm:text-3xl md:text-5xl text-center leading-tight">
          About Us
        </h1>
        <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg leading-relaxed">
          <span className="font-bold">Wisfile</span> is one of the first
          products of ATOM INFINITE, a trustworthy AI partner dedicated to
          solving real-world challenges with intelligent, user-centered
          technology.
        </p>
        <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg leading-relaxed">
          At ATOM INFINITE, we&apos;re driven by the belief that AI should solve
          real-world problems — simply, securely, and intelligently. Founded by
          a team of passionate innovators with strong academic backgrounds, we
          are committed to developing practical, privacy-conscious tools that
          spark creativity and make work easier.
        </p>
        <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg leading-relaxed">
          As we continue to grow, our mission remains clear: Be
          customer-centric. Innovate consistently. Build with integrity.
        </p>
        <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg leading-relaxed">
          WisFile is just the beginning. We are building a future where AI is
          not a black box, but a transparent, reliable partner — one that drives
          both technological advancement and social progress.
        </p>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed">
          Feel free to reach out to us at:{" "}
          <a
            href="mailto:support@wisfile.ai"
            className="text-blue-600 active:text-blue-800 hover:underline touch-manipulation"
          >
            support@wisfile.ai
          </a>
        </p>
      </div>
    </div>
  );
}
