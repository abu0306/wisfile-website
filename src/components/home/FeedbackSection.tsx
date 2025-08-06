"use client";

import LazyImage from "@/components/LazyImage";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-cards";

export function FeedbackSection() {
  const [currentGroup, setCurrentGroup] = useState(0);

  // 9 feedbacks, 3 per group
  const feedbackGroups = [
    [
      {
        text: "I collect a wide range of teaching materials. This tool not only renames files using real content but also groups them into folders like 'Dynasty-Topic'.",
        user: {
          name: "Ms. Liu",
          title: "History Teacher | K-12 Education",
          avatar: "/images/user1.png",
        },
      },
      {
        text: "Managing project files used to be a headache. This tool lets me define naming templates like 'Project-Date-DocumentType', and then it renames and sorts everything for me. No fees, no sign-up, and everything stays on my device. It's the kind of tool you didn't know you needed until you used it.",
        user: {
          name: "Engineer Chen",
          title: "Project Manager | Construction Industry",
          avatar: "/images/user2.png",
        },
      },
      {
        text: "I deal with hundreds of papers every semester, and used to waste time figuring out which '12345.pdf' was what. This AI tool renames everything based on actual content — title, author, year — and organizes them by subject. Best part? It's completely free and runs locally on my computer, so I never have to worry about privacy.",
        user: {
          name: "Dr. Emily Walker",
          title: "Associate Professor | Academic Researcher",
          avatar: "/images/user3.png",
        },
      },
    ],
    [
      {
        text: "As a freelance designer, my downloads folder was chaos. Now, everything is named and sorted by project and client. Love it!",
        user: {
          name: "Alex Kim",
          title: "Freelance Designer",
          avatar: "/images/user4.png",
        },
      },
      {
        text: "I use this tool to organize legal documents. The AI understands the content and helps me find files in seconds.",
        user: {
          name: "Attorney Wang",
          title: "Lawyer | Legal Services",
          avatar: "/images/user5.png",
        },
      },
      {
        text: "No more duplicate files! The smart renaming and grouping feature is a lifesaver for my research data.",
        user: {
          name: "Dr. Smith",
          title: "Medical Researcher",
          avatar: "/images/user6.png",
        },
      },
    ],
    [
      {
        text: "I share a computer with my family. Now everyone's files are auto-sorted into personal folders. Super convenient!",
        user: {
          name: "Mrs. Zhao",
          title: "Parent & Home Organizer",
          avatar: "/images/user7.png",
        },
      },
      {
        text: "The batch renaming is so fast. I processed thousands of files in minutes, all named by date and event.",
        user: {
          name: "Tom Lee",
          title: "Photographer",
          avatar: "/images/user8.png",
        },
      },
      {
        text: "I recommend this to all my students for managing their assignments and notes. Simple and effective.",
        user: {
          name: "Prof. Garcia",
          title: "University Lecturer",
          avatar: "/images/user9.png",
        },
      },
    ],
  ];

  const handlePrev = () =>
    setCurrentGroup((prev) => (prev === 0 ? 2 : prev - 1));
  const handleNext = () =>
    setCurrentGroup((prev) => (prev === 2 ? 0 : prev + 1));

  return (
    <>
      {/* Desktop Version */}
      <section className="hidden md:flex flex-col items-center mt-16 md:mt-24 w-full max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="mb-8 md:mb-12 px-4 font-bold text-[26px] md:text-[44px] text-center">
          Check Feedback from Our Users
        </h2>
        {/* Feedback Carousel */}
        <div className="flex justify-center items-center w-full">
          {/* Left Arrow */}
          <button
            className="flex justify-center items-center bg-[#FFF6E0] hover:bg-[#FFD36A] mr-2 md:mr-4 rounded-full w-8 md:w-10 h-8 md:h-10 text-[#FFA800] transition"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <LazyImage
              src="/images/webp/left-arrow-1024w.webp"
              alt="Previous"
              width={48}
              height={48}
              className="w-4 md:w-6 h-4 md:h-6"
            />
          </button>
          {/* Feedback Cards */}
          <div className="flex md:flex-row flex-col flex-1 gap-4 md:gap-8">
            {feedbackGroups[currentGroup].map((fb, idx) => (
              <div
                key={idx}
                className="flex flex-col flex-1 justify-between bg-white shadow-lg p-6 md:p-8 rounded-2xl"
                style={{
                  boxShadow: "0px 20px 40px 0px rgba(255,160,21,0.08)",
                }}
              >
                <div>
                  <div className="mb-4 text-gray-400 text-3xl md:text-5xl">
                    &quot;
                  </div>
                  <div className="mb-6 text-gray-700 text-sm md:text-base">
                    {fb.text}
                  </div>
                </div>
                <Link
                  href="/downloads"
                  className="mt-4 font-semibold text-[#FFA800] text-sm md:text-base cursor-pointer"
                >
                  Get the Same →
                </Link>
              </div>
            ))}
          </div>
          {/* Right Arrow */}
          <button
            className="flex justify-center items-center bg-[#FFF6E0] hover:bg-[#FFD36A] ml-2 md:ml-4 rounded-full w-8 md:w-10 h-8 md:h-10 text-[#FFA800] transition"
            onClick={handleNext}
            aria-label="Next"
          >
            <LazyImage
              src="/images/webp/right-arrow-1024w.webp"
              alt="Next"
              width={48}
              height={48}
              className="w-4 md:w-6 h-4 md:h-6"
            />
          </button>
        </div>
        {/* User Info Row */}
        <div className="flex md:flex-row flex-col justify-center items-center gap-4 md:gap-8 mt-6 md:mt-8 w-full">
          {feedbackGroups[currentGroup].map((fb, idx) => (
            <div key={idx} className="flex flex-col flex-1 items-center">
              <div className="font-semibold text-base md:text-lg">
                {fb.user.name}
              </div>
              <div className="text-gray-500 text-xs md:text-sm text-center">
                {fb.user.title}
              </div>
            </div>
          ))}
        </div>
        {/* Indicator Dots */}
        <div className="flex flex-row gap-2 mt-4 md:mt-6">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                currentGroup === i ? "bg-[#FFA800]" : "bg-gray-300"
              } inline-block transition`}
            />
          ))}
        </div>
      </section>

      {/* Mobile Version */}
      <section className="md:hidden flex flex-col items-center mt-9 md:mt-24 w-full overflow-hidden">
        {/* Section Title */}
        <h2 className="mb-5 md:mb-12 px-4 font-bold text-[26px] md:text-[44px] text-center">
          Check Feedback from Our Users
        </h2>
        {/* Feedback Swiper Cards */}
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
            {/* Flatten all feedbacks for mobile */}
            {feedbackGroups.flat().map((fb, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="relative flex flex-col items-start gap-4 bg-white p-4 w-full h-full overflow-hidden"
                  style={{
                    boxShadow: "0px 35px 60px 0px rgba(255,160,21,0.1)",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,185,82,0.1)",
                    maxWidth: "100%",
                  }}
                >
                  <div className="flex flex-col flex-1 justify-start items-start w-full">
                    <div className="mb-3 text-gray-400 text-2xl">&quot;</div>
                    <div className="mb-4 text-gray-700 text-xs leading-relaxed">
                      {fb.text}
                    </div>
                    <div className="mt-auto">
                      <div className="font-semibold text-[#FFA800] text-sm">
                        {fb.user.name}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {fb.user.title}
                      </div>
                    </div>
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
