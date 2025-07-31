"use client";

import { useState, useMemo } from "react";
import FaqCard from "./FaqCard";
import Pagination from "./Pagination";
import { FaqMeta } from "@/types/faq";

interface FaqSearchClientProps {
  initialFaqs: FaqMeta[];
}

const ITEMS_PER_PAGE = 48; // 16 行 × 3 列 = 48 条数据

export default function FaqSearchClient({ initialFaqs }: FaqSearchClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // 分页后的 FAQs
  const paginatedFaqs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return initialFaqs.slice(startIndex, endIndex);
  }, [initialFaqs, currentPage]);

  // 总页数
  const totalPages = Math.ceil(initialFaqs.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* FAQ List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 mb-8">
        {paginatedFaqs.map((faq) => (
          <FaqCard key={faq.id} faq={faq} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* No Results */}
      {initialFaqs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No questions found
          </h3>
          <p className="text-gray-500">No FAQ content available</p>
        </div>
      )}
    </>
  );
}
