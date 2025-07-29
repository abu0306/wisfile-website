"use client";

import React from "react";
import styles from "./RecommendBanner.module.css";

interface RecommendBannerProps {
  className?: string;
}

const RecommendBanner: React.FC<RecommendBannerProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`w-full max-w-[402px] h-[289px] bg-[#FFF8E7] rounded-lg flex flex-col items-center justify-center shadow-sm ${styles.bannerContainer} ${className}`}
    >
      <p className={styles.questionText}>
        Still wasting time sorting files byhand?
      </p>

      {/* Title */}
      <h3 className={styles.titleText}>Meet WisFile</h3>

      {/* Subtitle */}
      <p className={styles.subtitleText}>100% Local & Free AI File Manager</p>

      {/* Description */}
      <p className={styles.descriptionText}>
        Batch rename & organize your files — fast, smart, offline.
      </p>

      {/* Try it Now Button */}
      <button
        className={`${styles.recommendBannerButton} hover:opacity-90 hover:shadow-md transition-all duration-200`}
        onClick={() => {
          // 跳转到下载页面
          window.open("/downloads", "_blank");
        }}
      >
        Try it Now
      </button>
    </div>
  );
};

export default RecommendBanner;
