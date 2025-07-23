"use client";

// import { useState } from "react";
import Link from "next/link";

export function DownloadSection() {
  return (
    <>
      <Link href="/downloads">
        <button className="hidden md:block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-full md:w-auto font-semibold text-gray-900 text-base md:text-lg transition">
          Download
        </button>
      </Link>
      <Link href="/downloads">
        <button className="md:hidden block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-full md:w-auto text-gray-900 text-sm md:text-lg transition">
          Download
        </button>
      </Link>
    </>
  );
}
