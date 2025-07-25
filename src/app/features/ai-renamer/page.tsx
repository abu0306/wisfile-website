"use client";
import Renaming from "@/components/Renaming";
import Rename002 from "@/assets/svg/rename-002.svg";
import Rename003 from "@/assets/svg/rename-003.svg";
import Rename004 from "@/assets/svg/rename-004.svg";
import Rename005 from "@/assets/svg/rename-005.svg";
import { useEffect } from "react";
import AOS from "aos";
import Link from "next/link";
export default function AiRenamePage() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 平滑滚动
    });
  };

  useEffect(() => {
    AOS.init({
      once: true,
      easing: "ease-in-out",
      disable: "mobile",
    });
  }, []);

  return (
    <main className="flex flex-col items-center bg-[#FEFCF7] w-full min-h-screen">
      <section className="flex flex-col items-center mt-16 md:mt-24 px-4 md:px-0 max-w-6xl">
        <h1 className="mb-4 px-4 md:px-0 font-bold text-[#232323] text-[26px] md:text-5xl text-center leading-tight">
          Let <span className="text-[#FFA800]">AI</span> rename your Messy Files{" "}
          <br className="hidden md:block" />
          <span className="md:hidden">Fitting the content perfectly</span>
          <span className="hidden md:inline">
            Fitting the content perfectly
          </span>
        </h1>
        <div className="flex md:flex-row flex-col justify-center items-center gap-4 mt-8 md:mt-12 mb-12 md:mb-16 px-4 md:px-0 w-full max-w-5xl">
          <Link href="/downloads">
            <button className="hidden md:block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-full md:w-auto font-semibold text-gray-900 text-base md:text-lg transition">
              Download
            </button>
          </Link>
          <Link href="/downloads">
            <button className="md:hidden block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-fit md:w-auto text-gray-900 text-sm md:text-lg transition">
              Download
            </button>
          </Link>
        </div>
      </section>
      <div
        id="renaming-anchor"
        style={{ paddingTop: "80px", marginTop: "-80px" }}
      ></div>
      <Renaming />
      {/* Features Section */}
      <section className="flex flex-col gap-12 md:gap-16 mb-16 md:mb-20 px-4 md:px-0 w-full max-w-5xl">
        {/* Feature 1 */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-8 md:gap-12">
          <div
            className="flex flex-col flex-1 items-start order-2 md:order-1"
            data-aos="zoom-out"
          >
            <h2 className="mb-2 font-bold text-lg md:text-xl">Bulk Renaming</h2>
            <p className="mb-6 text-gray-600 text-sm md:text-base">
              Clean Names in a Click. AI understands your documents — titles,
              authors, dates — and renames them automatically based on real
              content and context.
            </p>
            <Link href="/downloads">
              <button className="hidden md:block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-full md:w-auto font-semibold text-gray-900 text-base md:text-lg transition">
                Renaming Now
              </button>
            </Link>
            <Link href="/downloads">
              <button className="md:hidden block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-fit md:w-auto text-gray-900 text-sm md:text-lg transition">
                Renaming Now
              </button>
            </Link>
          </div>
          <div
            className="flex flex-1 justify-center order-1 md:order-2 bg-white [box-shadow:0px_35px_60px_0px_rgba(255,160,21,0.1)] p-[8px] md:p-[12px] border-[#FFB952] rounded-[16px] md:rounded-[20px] w-full md:w-auto"
            data-aos="fade-up-left"
          >
            <div className="w-full md:max-w-none">
              <Rename005 className="w-full h-auto" />
            </div>
          </div>
        </div>
        {/* Feature 2 */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-8 md:gap-12">
          <div
            className="flex flex-1 justify-center order-1 md:order-1 bg-white [box-shadow:0px_35px_60px_0px_rgba(255,160,21,0.1)] p-[8px] md:p-[12px] border-[#FFB952] rounded-[16px] md:rounded-[20px] w-full md:w-auto"
            data-aos="fade-up-left"
          >
            <div className="w-full md:max-w-none">
              <Rename002 className="w-full h-auto" />
            </div>
          </div>
          <div
            className="flex flex-col flex-1 items-start order-2 md:order-2"
            data-aos="zoom-out"
          >
            <h2 className="mb-2 font-bold text-lg md:text-xl">
              100% Local, 100% Private
            </h2>
            <p className="mb-6 text-gray-600 text-sm md:text-base">
              All processing happens right on your device. No uploads, no
              tracking, no compromise — your files stay yours.
            </p>
            <Link href="/downloads">
              <button className="hidden md:block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-full md:w-auto font-semibold text-gray-900 text-base md:text-lg transition">
                Renaming Now
              </button>
            </Link>

            <Link href="/downloads">
              <button className="md:hidden block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-fit md:w-auto text-gray-900 text-sm md:text-lg transition">
                Renaming Now
              </button>
            </Link>
          </div>
        </div>
        {/* Feature 3 */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-8 md:gap-12">
          <div
            className="flex flex-col flex-1 items-start order-2 md:order-1"
            data-aos="zoom-out"
          >
            <h2 className="mb-2 font-bold text-lg md:text-xl">Free to Use</h2>
            <p className="mb-6 text-gray-600 text-sm md:text-base">
              No fees, no subscriptions, no strings attached. Just powerful AI
              file renaming — available offline, anytime.
            </p>
            <Link href="/downloads">
              <button className="hidden md:block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-full md:w-auto font-semibold text-gray-900 text-base md:text-lg transition">
                Renaming Now
              </button>
            </Link>

            <Link href="/downloads">
              <button className="md:hidden block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-fit md:w-auto text-gray-900 text-sm md:text-lg transition">
                Renaming Now
              </button>
            </Link>
          </div>
          <div
            className="flex flex-1 justify-center order-1 md:order-2 bg-white [box-shadow:0px_35px_60px_0px_rgba(255,160,21,0.1)] p-[8px] md:p-[12px] border-[#FFB952] rounded-[16px] md:rounded-[20px] w-full md:w-auto"
            data-aos="fade-up-left"
          >
            <div className="w-full md:max-w-none">
              <Rename003 className="w-full h-auto" />
            </div>
          </div>
        </div>
        {/* Feature 4 */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-8 md:gap-12">
          <div
            className="flex flex-1 justify-center order-1 md:order-1 bg-white [box-shadow:0px_35px_60px_0px_rgba(255,160,21,0.1)] p-[8px] md:p-[12px] border-[#FFB952] rounded-[16px] md:rounded-[20px] w-full md:w-auto"
            data-aos="fade-up-left"
          >
            <div className="w-full md:max-w-none">
              <Rename004 className="w-full h-auto" />
            </div>
          </div>
          <div
            className="flex flex-col flex-1 items-start order-2 md:order-2"
            data-aos="zoom-out"
          >
            <h2 className="mb-2 font-bold text-lg md:text-xl">
              Customize Your Naming Rules
            </h2>
            <p className="mb-6 text-gray-600 text-sm md:text-base">
              Prefer &quot;Author-Year-Title&quot; or your own format? Create
              personalized templates to fit your workflow perfectly.
            </p>
            <Link href="/downloads">
              <button className="hidden md:block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-full md:w-auto font-semibold text-gray-900 text-base md:text-lg transition">
                Renaming Now
              </button>
            </Link>
            <Link href="/downloads">
              <button className="md:hidden block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-fit md:w-auto text-gray-900 text-sm md:text-lg transition">
                Renaming Now
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="flex flex-col items-center mt-4 md:mt-24 px-4 md:px-0 max-w-6xl">
        <h1 className="mb-4 px-4 md:px-0 font-bold text-[#232323] text-3xl md:text-5xl text-center leading-tight">
          Tidy Your Files with <span className="text-[#FFA800]">AI</span>
        </h1>
        <p className="mb-6 px-4 md:px-0 text-gray-600 text-sm md:text-base text-center">
          100% Local AI File Renamer and Orgnizer — No Fees, No Data Leaks.
        </p>
        <div className="flex flex-row md:flex-row justify-center items-center gap-4 mt-8 md:mt-12 md:mb-16 px-2 md:px-0 max-w-5xl">
          <Link href="/downloads">
            <button className="hidden md:block flex-1 bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-full md:w-auto font-semibold text-gray-900 text-base md:text-lg transition">
              Download
            </button>
          </Link>
          <Link href="/downloads">
            <button className="md:hidden block flex-1 bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-full md:w-auto h-[48px] text-gray-900 text-sm md:text-lg whitespace-nowrap transition">
              Download
            </button>
          </Link>
          <button
            onClick={scrollToTop}
            className="bg-transparent hover:bg-gray-100 px-6 md:px-8 md:py-4 border-2 border-gray-400 rounded-full w-full md:w-full h-[48px] md:h-auto md:font-semibold text-gray-900 text-sm md:text-lg transition"
          >
            Online Demo
          </button>
        </div>
      </section>
    </main>
  );
}
