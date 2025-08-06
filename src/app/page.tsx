import Link from "next/link";
import { ScenarioSection } from "@/components/home/ScenarioSection";
import { FeedbackSection } from "@/components/home/FeedbackSection";
import { DownloadSection } from "@/components/home/DownloadSection";
import LazyImage from "@/components/LazyImage";

export default function Home() {
  return (
    <main className="flex flex-col bg-[#FEFCF7] px-4 min-h-screen">
      {/* Hero Section - 完全静态 */}
      <section className="flex md:flex-row flex-col justify-center items-center gap-8 mx-auto pt-[120px] md:pt-[180px] w-full max-w-7xl">
        {/* Left: Title, Subtitle, Buttons */}
        <div className="flex flex-col flex-1 justify-center items-start w-full max-w-2xl">
          {/* Hero Title */}
          <div className="relative w-full">
            <h1 className="font-bold text-[26px] md:text-[56px] text-left leading-tight">
              Tidy Your Files with AI
            </h1>
            <div className="hidden md:block top-0 right-0 absolute w-fit -translate-y-[10px] translate-x-[-65px]">
              <LazyImage
                src="/images/star.png"
                alt="star"
                width={28}
                height={28}
                priority
              />
            </div>
          </div>
          {/* Subtitle */}
          <div className="flex md:flex-row flex-col items-start md:items-center gap-2 md:gap-6 mb-6 md:mb-10 text-gray-700 text-sm md:text-xl text-left">
            <span>
              100% Local AI File Renamer and Organizer — No Fees, No Data Leaks.
            </span>
          </div>
          {/* Buttons */}
          <div className="flex flex-row md:flex-row items-start md:items-center gap-4 mb-6 md:mb-16 w-full max-w-5xl">
            <DownloadSection />
            <Link href={"features/ai-renamer"}>
              <button className="bg-transparent hover:bg-gray-100 border-2 border-gray-400 rounded-full w-[199px] h-[62px] font-semibold text-gray-900 text-sm md:text-lg transition">
                Online Demo
              </button>
            </Link>
          </div>
        </div>
        {/* Right: Hero Image */}
        <div className="flex flex-1 justify-center items-center w-full max-w-xl">
          <LazyImage
            src="/images/hero.png"
            alt="AI Renaming Hero Screenshot"
            width={1190}
            height={612}
            className="-mt-8 md:-mt-12 w-full object-contain"
            priority
          />
        </div>
      </section>

      {/* Scenario Section - 客户端交互组件 */}
      <ScenarioSection />

      {/* Customer Feedback Section - 客户端交互组件 */}
      <FeedbackSection />

      {/* FAQ Section - 完全静态 */}
      <section className="flex flex-col items-center mx-auto mt-9 md:mt-24 mb-16 md:mb-24 w-full max-w-7xl">
        {/* Section Title */}
        <h2 className="mb-5 md:mb-12 px-4 font-bold text-[28px] md:text-[44px] text-center">
          Frequently Asked Questions
        </h2>
        {/* FAQ Cards */}
        <div className="flex flex-col gap-6 md:gap-8 w-full">
          {/* FAQ Item 1 */}
          <div
            className="flex flex-col bg-white shadow-lg mb-2 p-6 md:p-8 rounded-2xl"
            style={{ boxShadow: "0px 20px 40px 0px rgba(255,160,21,0.08)" }}
          >
            <div className="flex items-center mb-2">
              <span className="inline-block bg-[#FFA800] mr-3 md:mr-4 rounded-sm w-1 md:w-1.5 h-6 md:h-8" />
              <span className="font-bold text-lg md:text-xl">
                What are the features of this product?
              </span>
            </div>
            <div className="ml-4 md:ml-6 text-gray-700 text-sm md:text-base">
              Our product provides ai-renaming and auto-folding, please check
              details at the Navigation Bar
            </div>
          </div>
          {/* FAQ Item 2 */}
          <div
            className="flex flex-col bg-white shadow-lg mb-2 p-6 md:p-8 rounded-2xl"
            style={{ boxShadow: "0px 20px 40px 0px rgba(255,160,21,0.08)" }}
          >
            <div className="flex items-center mb-2">
              <span className="inline-block bg-[#FFA800] mr-3 md:mr-4 rounded-sm w-1 md:w-1.5 h-6 md:h-8" />
              <span className="font-bold text-lg md:text-xl">
                How much does this service cost?
              </span>
            </div>
            <div className="ml-4 md:ml-6 text-gray-700 text-sm md:text-base">
              Our product is totally free, you can use all features for free.
            </div>
          </div>
          {/* FAQ Item 3 */}
          <div
            className="flex flex-col bg-white shadow-lg p-6 md:p-8 rounded-2xl"
            style={{ boxShadow: "0px 20px 40px 0px rgba(255,160,21,0.08)" }}
          >
            <div className="flex items-center mb-2">
              <span className="inline-block bg-[#FFA800] mr-3 md:mr-4 rounded-sm w-1 md:w-1.5 h-6 md:h-8" />
              <span className="font-bold text-lg md:text-xl">
                How can I contact customer service?
              </span>
            </div>
            <div className="ml-4 md:ml-6 text-gray-700 text-sm md:text-base">
              You can send your advice or your questions to our support e-mail:{" "}
              <span className="text-[#FFA800]">support@atominfinite.ai</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - 完全静态 */}
      <section className="flex flex-col items-center mx-auto md:mt-24 md:mb-12 w-full max-w-7xl">
        <h1 className="mb-4 px-4 font-bold text-[#232323] text-3xl md:text-5xl text-center leading-tight">
          Tidy Your Files with <span className="text-[#FFA800]">AI</span>
        </h1>
        <p className="mb-6 px-4 text-gray-600 text-sm md:text-base text-center">
          100% Local & Free AI File Manager — No Fees, No Data Leaks.
        </p>
        <div className="flex flex-row md:flex-row justify-center items-center gap-4 mt-8 md:mt-12 mb-4 md:mb-16 w-full">
          <DownloadSection />
          <Link href={"features/ai-renamer"}>
            <button className="bg-transparent hover:bg-gray-100 border-2 border-gray-400 rounded-full w-[199px] h-[62px] font-semibold text-gray-900 text-sm md:text-lg transition">
              Online Demo
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
