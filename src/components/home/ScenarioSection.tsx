"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { DownloadSection } from "./DownloadSection";
import LazyImage from "@/components/LazyImage";

export function ScenarioSection() {
  const [scenarioTab, setScenarioTab] = useState(0);

  const scenarios = [
    {
      id: 0,
      title: "Messy File Names? AI-Powered Renaming in One Click!",
      description:
        'Downloaded tons of papers, only to find filenames like "Ogvh2345.pdf" or "749sci-ab96.pdf"? Our AI automatically extracts key information such as the title, authors, and publication year, and renames your files based on content and context in one click! Restore the original paper titles effortlessly — no more guessing or digging through folders to find what you need!',
      image: "/images/ai-rename.png",
      alt: "AI Renaming Scenario 1",
    },
    {
      id: 1,
      title: "Struggling to Standardize File-Names? Custom Formatting in 1s!",
      description:
        "Tired of papers named in all sorts of ways from different sources, making organization a nightmare? With support for custom naming templates (e.g., Author-Year-Title), our AI renames your files in bulk—uniform, clean, and well-structured in seconds. Perfect for easy citation, management, and archiving.",
      image: "/images/rename-slots.png",
      alt: "Standardize Filenames Scenario",
    },
    {
      id: 2,
      title: "Papers Scattered Everywhere? AI Sorting + Renaming in One Step!",
      description:
        "Downloaded papers are scattered across multiple folders, and manually organizing them feels like a chore? Let AI take over—automatically detect subject areas, fields, or journal names, then batch classify and rename your files. Papers of the same type are neatly grouped into unified folders, turning chaos into order—clean, structured, and done in one go.",
      image: "/images/auto-foldering.png",
      alt: "Papers Scattered Scenario",
    },
  ];

  return (
    <>
      {/* Desktop Version */}
      <section className="hidden md:flex flex-col items-center mt-9 md:mt-24 w-full">
        {/* Section Title */}
        <h2 className="mb-8 md:mb-12 px-4 font-bold text-[28px] md:text-[44px] text-center">
          What can you do with us?
        </h2>
        {/* Tabs */}
        <div className="flex md:flex-row flex-col gap-4 md:gap-10 mb-8 md:mb-10 border-b w-full max-w-5xl overflow-x-auto">
          {scenarios.map((scenario, index) => (
            <button
              key={scenario.id}
              className={`font-semibold pb-2 px-2 transition whitespace-nowrap text-sm md:text-base ${
                scenarioTab === index
                  ? "text-[#FFA800] border-b-2 border-[#FFA800]"
                  : "text-gray-700 hover:text-[#FFA800]"
              }`}
              onClick={() => setScenarioTab(index)}
            >
              {index === 0 && "Messy File Names"}
              {index === 1 && "Struggling to Standardize Filenames"}
              {index === 2 && "Papers Scattered Everywhere"}
            </button>
          ))}
        </div>
        {/* Card */}
        <div
          className="relative flex md:flex-row flex-col items-center gap-6 md:gap-8 bg-white p-6 md:p-10 w-full md:w-[1164px] h-auto md:h-[481px] overflow-hidden"
          style={{
            boxShadow: "0px 35px 60px 0px rgba(255,160,21,0.1)",
            borderRadius: "20px 260px 20px 20px",
            border: "1px solid rgba(255,185,82,0.1)",
          }}
        >
          {/* Left Illustration */}
          <div
            className="relative flex justify-center items-center w-full md:w-[407px] h-[300px] md:h-[449px]"
            style={{
              background: "#FEFCF7",
              borderRadius: "12px",
            }}
          >
            <LazyImage
              src={scenarios[scenarioTab].image}
              alt={scenarios[scenarioTab].alt}
              width={611}
              height={674}
              className="w-full h-full object-contain"
            />
            {/* Fade-out overlay at the bottom */}
            <div
              className="bottom-0 left-0 absolute w-full"
              style={{
                height: "40%",
                background:
                  "linear-gradient(to bottom, rgba(254,252,247,0) 0%, #FEFCF7 100%)",
                borderRadius: "0 0 12px 12px",
                pointerEvents: "none",
              }}
            />
          </div>
          {/* Right: Scenario description */}
          <div className="flex flex-col flex-1 justify-center items-start max-w-xl">
            <div
              className="mb-2 font-semibold text-[#FFA800] text-base md:text-lg"
              style={{ width: "103px" }}
            >
              Scenario {scenarioTab + 1}
            </div>
            <div
              className="mb-4 font-bold text-xl md:text-2xl"
              style={{
                width: "100%",
                height: "auto",
                fontFamily: "Source Han Sans CN, Source Han Sans CN",
                fontWeight: "bold",
                fontSize: "20px",
                color: "#333333",
                textAlign: "left",
                fontStyle: "normal",
                textTransform: "none",
              }}
            >
              {scenarios[scenarioTab].title}
            </div>
            <div className="mb-6 text-gray-700 text-sm md:text-base leading-relaxed">
              {scenarios[scenarioTab].description}
            </div>
            <DownloadSection />
          </div>
        </div>
      </section>

      {/* Mobile Version */}
      <section className="md:hidden flex flex-col items-center mt-9 md:mt-24 w-full overflow-hidden">
        {/* Section Title */}
        <h2 className="mb-5 md:mb-12 px-4 font-semibold text-[26px] text-center">
          What can you do with us?
        </h2>
        {/* Swiper Effect Cards */}
        <div className="px-4 w-full max-w-[320px] overflow-hidden">
          <style jsx>{`
            .swiper-slide {
              opacity: 1 !important;
              transform: scale(1) !important;
            }
            .swiper-slide-active {
              opacity: 1 !important;
              transform: scale(1) !important;
            }
            .swiper-slide-prev,
            .swiper-slide-next {
              opacity: 1 !important;
              transform: scale(1) !important;
            }
            .swiper {
              overflow: visible !important;
              width: 100% !important;
            }
            .swiper-wrapper {
              overflow: visible !important;
            }
          `}</style>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="w-full"
            style={{
              maxWidth: "100%",
              overflow: "visible",
            }}
          >
            {scenarios.map((scenario) => (
              <SwiperSlide key={scenario.id}>
                <div
                  className="relative flex flex-col items-center gap-4 bg-white p-4 w-full h-full overflow-hidden"
                  style={{
                    boxShadow: "0px 35px 60px 0px rgba(255,160,21,0.1)",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,185,82,0.1)",
                    maxWidth: "100%",
                  }}
                >
                  {/* Illustration */}
                  <div
                    className="relative flex justify-center items-center w-full h-[200px]"
                    style={{
                      background: "#FEFCF7",
                      borderRadius: "12px",
                    }}
                  >
                    <LazyImage
                      src={scenario.image}
                      alt={scenario.alt}
                      width={611}
                      height={674}
                      className="w-full h-full object-contain"
                    />
                    {/* Fade-out overlay at the bottom */}
                    <div
                      className="bottom-0 left-0 absolute w-full"
                      style={{
                        height: "40%",
                        background:
                          "linear-gradient(to bottom, rgba(254,252,247,0) 0%, #FEFCF7 100%)",
                        borderRadius: "0 0 12px 12px",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                  {/* Scenario description */}
                  <div className="flex flex-col flex-1 justify-start items-start w-full">
                    <div className="mb-2 font-semibold text-[#FFA800] text-sm">
                      Scenario {scenario.id + 1}
                    </div>
                    <div
                      className="mb-3 font-bold text-lg"
                      style={{
                        fontFamily: "Source Han Sans CN, Source Han Sans CN",
                        fontWeight: "bold",
                        color: "#333333",
                        textAlign: "left",
                        fontStyle: "normal",
                        textTransform: "none",
                      }}
                    >
                      {scenario.title}
                    </div>
                    <div className="mb-4 text-gray-700 text-xs leading-relaxed">
                      {scenario.description}
                    </div>
                    <DownloadSection />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
