import React from "react";
import Link from "next/link";
import { FaqMeta } from "@/types/faq";

interface ArticleRecommendationsProps {
  series: FaqMeta[];
  continueReading: FaqMeta[];
  className?: string;
  variant?: "sidebar" | "bottom";
}

const ArticleRecommendations: React.FC<ArticleRecommendationsProps> = ({
  series,
  continueReading,
  className = "",
  variant = "sidebar",
}) => {
  // 侧边栏样式 - 推荐系列文章（只显示标题）
  if (variant === "sidebar") {
    return (
      <div className={`space-y-6 ${className}`}>
        {series.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Related Recommendations
            </h3>

            <div className="relative pl-6">
              {/* 左侧竖条 - 从标题下方开始 */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#E9EAEE]"
                style={{ width: "2px" }}
              ></div>

              <div className="space-y-2.5">
                {series.slice(0, 5).map((article) => (
                  <Link
                    key={article.id}
                    href={`/faq/${article.slug}`}
                    className="block group"
                  >
                    <div className="text-gray-600 group-hover:text-[#FFA015] transition-colors duration-200 leading-relaxed">
                      {article.question}
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-2.5">
                <Link
                  href="/faq"
                  className="inline-flex items-center text-[#FFA015] hover:text-[#e8900c] font-medium text-base transition-colors duration-200"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 底部样式 - 继续阅读（包括标题和简介）
  return (
    <div className={`${className}`}>
      {continueReading.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-black mb-8">
            Quick Article Links
          </h2>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {continueReading.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                href={`/faq/${article.slug}`}
                className="block group"
              >
                <div className="bg-white p-6 rounded-lg shadow-[0px_37px_60px_-50px_#FFE0B4] hover:shadow-[0px_37px_60px_-50px_#FFE0B4] transition-all duration-200 h-full flex flex-col">
                  <h3 className="text-xl font-bold text-black group-hover:text-[#FFA015] transition-colors duration-200 mb-4 leading-snug flex-shrink-0">
                    <span className="line-clamp-2">{article.question}</span>
                  </h3>
                  {article.description && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
                      <span className="line-clamp-3">
                        {article.description
                          .replace(/[#*]/g, "")
                          .substring(0, 120)}
                        {article.description.length > 120 ? "..." : ""}
                      </span>
                    </p>
                  )}
                  <div className="flex items-center text-gray-600 text-sm font-medium group-hover:text-[#FFA015] transition-colors duration-200">
                    <span className="mr-2">Read Now →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleRecommendations;
