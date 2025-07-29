"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { initTracking, logEvent } from "@/utils/eventLogger";

function QueryParamsHandlerContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get parameters from URL
    const from = searchParams.get("from");
    const utm_source = searchParams.get("utm_source");

    // 优先取 from 的值，如果没有则取 utm_source
    // 处理可能有多个值的情况（用逗号分隔）
    let channelValue = "";

    if (from) {
      // 如果 from 有多个值，取第一个
      channelValue = from.split(",")[0].trim();
    } else if (utm_source) {
      // 如果没有 from 但有 utm_source，取 utm_source 的第一个值
      channelValue = utm_source.split(",")[0].trim();
    }

    // 只有当有值时才保存到 localStorage
    if (channelValue) {
      localStorage.setItem("channel", channelValue);
    }

    // Initialize tracking parameters
    initTracking();

    // Log the event
    logEvent("page_view", {
      page_url: window.location.href,
    });
  }, [searchParams]);

  return null; // This component doesn't render anything
}

export function QueryParamsHandler() {
  return (
    <Suspense fallback={null}>
      <QueryParamsHandlerContent />
    </Suspense>
  );
}
