"use client";

// import { useState } from "react";
import { message, Popover } from "antd";
import { Download } from "@/components/download";

export function DownloadSection() {
  const [messageApi, contextHolder] = message.useMessage();

  const handleMobileDownload = () => {
    messageApi.open({
      content: "Available on desktop only. Please use a laptop.",
      duration: 5,
    });
  };

  return (
    <>
      {contextHolder}
      <Popover arrow={false} placement={"bottom"} content={<Download />}>
        <button className="hidden md:block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-full md:w-auto font-semibold text-gray-900 text-base md:text-lg transition">
          Download ( Mac )
        </button>
      </Popover>
      <button
        onClick={handleMobileDownload}
        className="md:hidden block bg-[#FFD36A] hover:bg-[#FFCB3C] shadow-md px-6 md:px-8 py-3 md:py-4 rounded-full w-full md:w-auto text-gray-900 text-sm md:text-lg transition"
      >
        Download ( Mac )
      </button>
    </>
  );
}
