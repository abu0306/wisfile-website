"use client";

// import { useState } from "react";
import Link from "next/link";

export function DownloadSection() {
  return (
    <>
      <Link href="/downloads">
        <button className="hidden md:block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md rounded-full font-semibold text-gray-900 text-base md:text-lg transition w-[199px] h-[62px]">
          Download
        </button>
      </Link>
      <Link href="/downloads">
        <button className="md:hidden block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md rounded-full text-gray-900 text-sm md:text-lg transition w-[150px]  md:w-[199px] h-[40px] md:h-[62px]">
          Download
        </button>
      </Link>
    </>
  );
}
