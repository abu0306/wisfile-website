"use client";
import LazyImage from "@/components/LazyImage";
import Folder001 from "@/assets/svg/folder-001.svg";
import Folder002 from "@/assets/svg/folder-002.svg";
import Aos from "aos";
import { useEffect } from "react";
import Link from "next/link";
export default function FileClassificationPage() {
  useEffect(() => {
    Aos.init({
      once: true,
      easing: "ease-in-out",
      disable: "mobile",
    });
  }, []);

  return (
    <main className="flex flex-col items-center bg-[#FEFCF7] w-full min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center mt-16 md:mt-24 mb-6 md:mb-12 px-4 md:px-0 max-w-6xl">
        <h1 className="mb-4 px-4 md:px-0 font-bold text-[#232323] text-[26px] md:text-5xl text-center leading-tight">
          Let <span className="text-[#FFA800]">AI</span> sort your files{" "}
          <br className="hidden md:block" />
          <span className="md:hidden">into the correct folders</span>
          <span className="hidden md:inline">into the correct folders</span>
        </h1>
        <div className="flex flex-row md:flex-row justify-center items-start md:items-center gap-4 mb-6 md:mb-16 px-4 md:px-0 w-full max-w-5xl">
          <Link href="/downloads">
            <button className="hidden md:block flex-1 bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-full md:w-auto font-semibold text-gray-900 text-base md:text-lg transition">
              Download
            </button>
          </Link>
          <Link href="/downloads">
            <button className="md:hidden block flex-1 bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md md:px-8 py-3 md:py-4 rounded-full md:w-auto h-[48px] text-gray-900 text-sm md:text-lg transition">
              Download
            </button>
          </Link>
          <Link href={"/features/ai-renamer"} className="w-full md:w-auto">
            <button className="flex justify-center items-center bg-transparent hover:bg-gray-100 md:px-8 py-3 md:py-4 border-2 border-gray-400 rounded-full w-full h-[48px] md:h-auto md:font-semibold text-gray-900 text-sm md:text-lg transition">
              Online Demo
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex flex-col gap-12 md:gap-16 mb-9 md:mb-20 px-4 md:px-0 w-full max-w-5xl">
        {/* Feature 1: Auto-Sort by Content */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-8 md:gap-12">
          <div
            className="flex flex-col flex-1 items-start order-2 md:order-1"
            data-aos="zoom-out"
          >
            <h2 className="mb-2 font-bold text-lg md:text-xl">
              Auto-Sort by Content
            </h2>
            <p className="mb-6 text-gray-600 text-sm md:text-base">
              Drowning in unorganized files? Let AI read and understand your
              documents — then automatically group them into meaningful folders
              by topic, document type, or subject area. No tags, no rules — it
              just works.
            </p>
            <Link href="/downloads">
              <button className="hidden md:block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-8 py-4 rounded-full font-semibold text-gray-900 text-lg transition">
                Sorting Now
              </button>
            </Link>
            <Link href="/downloads">
              <button className="md:hidden block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-fit md:w-auto text-gray-900 text-sm md:text-lg transition">
                Sorting Now
              </button>
            </Link>
          </div>
          <div
            className="flex flex-1 justify-center order-1 md:order-2 bg-white [box-shadow:0px_35px_60px_0px_rgba(255,160,21,0.1)] p-[8px] md:p-[12px] border-[#FFB952] rounded-[16px] md:rounded-[20px] w-full md:w-auto"
            data-aos="fade-up-left"
          >
            <div className="w-full md:max-w-none">
              <Folder001 className="w-full h-auto" />
            </div>
          </div>
        </div>
        {/* Feature 2: Instant Folder Cleanup */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-8 md:gap-12">
          <div
            className="flex flex-1 justify-center order-1 md:order-1 bg-white [box-shadow:0px_35px_60px_0px_rgba(255,160,21,0.1)] p-[8px] md:p-[12px] border-[#FFB952] rounded-[16px] md:rounded-[20px] w-full md:w-auto"
            data-aos="fade-up-left"
          >
            <div className="w-full md:max-w-none">
              <Folder002 className="w-full h-auto" />
            </div>
          </div>
          <div
            className="flex flex-col flex-1 items-start order-2 md:order-2"
            data-aos="zoom-out"
          >
            <h2 className="mb-2 font-bold text-lg md:text-xl">
              Instant Folder Cleanup
            </h2>
            <p className="mb-6 text-gray-600 text-sm md:text-base">
              Stop wasting time dragging files one by one. With a single click,
              turn chaotic downloads into a clean, structured library.
            </p>
            <Link href="/downloads">
              <button className="hidden md:block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-8 py-4 rounded-full font-semibold text-gray-900 text-lg transition">
                Sorting Now
              </button>
            </Link>
            <Link href="/downloads">
              <button className="md:hidden block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-fit md:w-auto text-gray-900 text-sm md:text-lg transition">
                Sorting Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center mt-8 md:mt-24 md:mb-12 px-4 md:px-0 max-w-6xl">
        <div className="mb-4">
          <LazyImage
            src="/images/logo.png"
            alt="WisFile Logo"
            width={64}
            height={64}
          />
        </div>
        <h1 className="mb-4 px-4 md:px-0 font-bold text-[#232323] text-3xl md:text-5xl text-center leading-tight">
          Organize your files just in One App
        </h1>
        <div className="flex md:flex-row flex-col items-start md:items-center gap-2 md:gap-6 mb-6 md:mb-10 px-4 md:px-0 text-gray-700 text-lg md:text-xl text-left">
          locally, securely, and for free
        </div>
        <div className="flex flex-row md:flex-row justify-center items-start md:items-center gap-4 md:mb-16 px-4 md:px-0 w-full max-w-5xl">
          <Link href="/downloads">
            <button className="hidden md:block flex-1 bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-full md:w-auto font-semibold text-gray-900 text-base md:text-lg transition">
              Download
            </button>
          </Link>
          <Link href="/downloads">
            <button className="md:hidden block flex-1 bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md md:px-8 py-3 md:py-4 rounded-full md:w-auto h-[48px] text-gray-900 text-sm md:text-lg transition">
              Download
            </button>
          </Link>
          <Link href={"/features/ai-renamer"} className="w-full md:w-auto">
            <button className="flex justify-center items-center bg-transparent hover:bg-gray-100 md:px-8 py-3 md:py-4 border-2 border-gray-400 rounded-full w-full h-[48px] md:h-auto md:font-semibold text-gray-900 text-sm md:text-lg transition">
              Online Demo
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
